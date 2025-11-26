import { useCallback, useMemo } from "react";
import { useAuthStore } from "shared/state/authStore";
import { useActivityStore } from "shared/state/activityStore";
import { useCompletePlan, useDeletePlan, useUpdatePlan } from "shared/api/plans";
import { useCalendar } from "shared/api/calendar";
import type { Plan, CategoryType } from "shared/api/types";
import type { RecyclingEntry } from "shared/types/dashboard";
import type { MaterialId } from "shared/utils/recyclingPoints";

// ============================================================
// 달력 데이터 통합 훅
// - 인증 시: API Plans 데이터 사용
// - 미인증 시: 로컬 ActivityStore 사용
// ============================================================

// API 카테고리를 로컬 MaterialId로 매핑
const CATEGORY_TO_MATERIAL: Record<CategoryType, MaterialId> = {
  CAN: "can",
  PAPER: "paper",
  PLASTIC: "petBottle",
  GLASS: "glassBottle",
  GENERAL: "other",
  ELECTRONICS: "electronics",
  METAL: "steelCan",
  CLOTHING: "clothes",
};

// API Plan을 로컬 RecyclingEntry 형식으로 변환
function planToEntry(plan: Plan): RecyclingEntry[] {
  // Plan 하나에 여러 items가 있을 수 있으므로 각 item을 별도 entry로 변환
  return plan.items.map((item, index) => ({
    id: `plan-${plan.id}-${index}`,
    type: CATEGORY_TO_MATERIAL[item.category] || "other",
    amount: item.quantity,
    date: new Date(`${plan.date}T${plan.time}`),
    points: Math.floor((plan.planPoint ?? 0) / plan.items.length), // 포인트를 아이템 수로 분배
    mode: plan.completed ? "record" : "plan",
    // 서버 Plan ID 저장 (API 연동용)
    planId: plan.id,
    // 완료 여부
    completed: plan.completed,
  }));
}

// 계획 수정 데이터 타입
export interface PlanUpdateData {
  date?: string;
  time?: string;
  memo?: string;
  items?: Plan["items"];
}

export interface CalendarData {
  // 모든 활동 엔트리 (기록 + 계획)
  entries: RecyclingEntry[];
  // 로딩 상태
  isLoading: boolean;
  // 에러 상태
  error: Error | null;
  // 데이터 소스
  source: "api" | "local";
  // 삭제 핸들러 (API 또는 로컬)
  deleteEntry: (id: string) => void;
  // 항목 추가 핸들러 (복구용)
  addEntry: (entry: Omit<RecyclingEntry, "id">) => void;
  // 계획 완료 핸들러
  completePlan: (id: string) => void;
  // 계획 수정 핸들러
  updatePlan: (id: string, data: PlanUpdateData) => void;
  // 삭제 중 상태
  isDeleting: boolean;
  // 완료 처리 중 상태
  isCompleting: boolean;
  // 수정 중 상태
  isUpdating: boolean;
}

export function useCalendarData(): CalendarData {
  // 인증 상태 확인
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // API 데이터 (인증된 경우에만 활성화, Calendar API 사용)
  const {
    data: apiPlans,
    isLoading: apiLoading,
    error: apiError,
  } = useCalendar({
    enabled: isAuthenticated,
  });

  // 로컬 스토어 데이터
  const localEntries = useActivityStore((state) => state.entries);
  const localDeleteEntry = useActivityStore((state) => state.deleteEntry);
  const localAddEntry = useActivityStore((state) => state.addEntry);

  // API mutation 훅
  const deletePlanMutation = useDeletePlan();
  const completePlanMutation = useCompletePlan();
  const updatePlanMutation = useUpdatePlan();

  // API Plans를 RecyclingEntry[]로 변환
  const apiEntries = useMemo(() => {
    if (!apiPlans) return [];
    return apiPlans.flatMap(planToEntry);
  }, [apiPlans]);

  // entry ID에서 planId 추출
  const extractPlanId = useCallback((entryId: string): number | null => {
    const match = entryId.match(/^plan-(\d+)-/);
    return match ? parseInt(match[1], 10) : null;
  }, []);

  // API 삭제 핸들러
  const handleApiDelete = useCallback(
    (id: string) => {
      const planId = extractPlanId(id);
      if (planId) {
        deletePlanMutation.mutate(planId);
      }
    },
    [extractPlanId, deletePlanMutation],
  );

  // API 계획 완료 핸들러
  const handleApiComplete = useCallback(
    (id: string) => {
      const planId = extractPlanId(id);
      if (planId) {
        completePlanMutation.mutate(planId);
      }
    },
    [extractPlanId, completePlanMutation],
  );

  // API 계획 수정 핸들러
  const handleApiUpdate = useCallback(
    (id: string, data: PlanUpdateData) => {
      const planId = extractPlanId(id);
      if (planId) {
        // 기존 Plan 찾기
        const existingPlan = apiPlans?.find((p) => p.id === planId);
        if (existingPlan) {
          updatePlanMutation.mutate({
            id: planId,
            data: {
              ...existingPlan,
              date: data.date ?? existingPlan.date,
              time: data.time ?? existingPlan.time,
              memo: data.memo ?? existingPlan.memo,
              items: data.items ?? existingPlan.items,
            },
          });
        }
      }
    },
    [extractPlanId, apiPlans, updatePlanMutation],
  );

  // API 데이터가 있으면 API 데이터 사용
  if (isAuthenticated && apiPlans) {
    return {
      entries: apiEntries,
      isLoading: false,
      error: null,
      source: "api",
      deleteEntry: handleApiDelete,
      addEntry: (entry) => {
        // API에서는 CreatePlan 사용 (CalendarPage에서 직접 처리)
        console.warn("Use createPlan mutation directly for API:", entry);
      },
      completePlan: handleApiComplete,
      updatePlan: handleApiUpdate,
      isDeleting: deletePlanMutation.isPending,
      isCompleting: completePlanMutation.isPending,
      isUpdating: updatePlanMutation.isPending,
    };
  }

  // 인증되었지만 API 로딩 중
  if (isAuthenticated && apiLoading) {
    return {
      entries: localEntries,
      isLoading: true,
      error: null,
      source: "local",
      deleteEntry: localDeleteEntry,
      addEntry: localAddEntry,
      completePlan: () => {},
      updatePlan: () => {},
      isDeleting: false,
      isCompleting: false,
      isUpdating: false,
    };
  }

  // 인증되었지만 API 에러 발생 시 로컬 폴백
  if (isAuthenticated && apiError) {
    return {
      entries: localEntries,
      isLoading: false,
      error: apiError,
      source: "local",
      deleteEntry: localDeleteEntry,
      addEntry: localAddEntry,
      completePlan: () => {},
      updatePlan: () => {},
      isDeleting: false,
      isCompleting: false,
      isUpdating: false,
    };
  }

  // 미인증 시 로컬 데이터 사용
  return {
    entries: localEntries,
    isLoading: false,
    error: null,
    source: "local",
    deleteEntry: localDeleteEntry,
    addEntry: localAddEntry,
    completePlan: () => {},
    updatePlan: () => {},
    isDeleting: false,
    isCompleting: false,
    isUpdating: false,
  };
}
