import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "shared/state/authStore";
import { useActivityStore } from "shared/state/activityStore";
import { useNotificationStore } from "shared/state/notificationStore";
import {
  useCompletePlan,
  useCreatePlan,
  useDeletePlan,
  usePlans,
  useUpdatePlan,
} from "shared/api/plans";
import type { Plan } from "shared/api/types";
import type { RecyclingEntry } from "shared/types/dashboard";
import { planToEntry, MATERIAL_TO_CATEGORY } from "shared/utils/planUtils";

// ============================================================
// 달력 데이터 통합 훅
// - 인증 시: API Plans 데이터 사용
// - 미인증 시: 로컬 ActivityStore 사용
// ============================================================

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
  // 항목 추가 핸들러 (복구용, 로컬 전용)
  addEntry: (entry: Omit<RecyclingEntry, "id">) => void;
  // 삭제 취소 핸들러 (API: createPlan, 로컬: addEntry)
  undoDelete: (backup: RecyclingEntry) => void;
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
  // 복원 중 상태
  isRestoring: boolean;
}

export function useCalendarData(): CalendarData {
  const { t } = useTranslation();
  const showSnackbar = useNotificationStore((state) => state.showSnackbar);

  // 인증 상태 확인
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // API 데이터 (인증된 경우에만 활성화, Plans API 사용)
  const {
    data: apiPlans,
    isLoading: apiLoading,
    error: apiError,
  } = usePlans({
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
  const createPlanMutation = useCreatePlan();

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
    async (id: string) => {
      const planId = extractPlanId(id);
      if (planId) {
        try {
          const response = await completePlanMutation.mutateAsync(planId);
          // 적립된 포인트 스낵바 표시
          showSnackbar(t("calendar.entries.pointsEarned", { points: response.addedPoint }), {
            type: "success",
          });
        } catch {
          // 에러는 React Query에서 처리
        }
      }
    },
    [extractPlanId, completePlanMutation, showSnackbar, t],
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

  // 삭제 취소 핸들러 (API: createPlan으로 재생성, 로컬: addEntry)
  const handleApiUndoDelete = useCallback(
    (backup: RecyclingEntry) => {
      // RecyclingEntry를 CreatePlan 형식으로 변환
      const entryDate = backup.date instanceof Date ? backup.date : new Date(backup.date);
      const dateStr = entryDate.toISOString().split("T")[0];
      const timeStr = entryDate.toTimeString().split(" ")[0];

      createPlanMutation.mutate({
        date: dateStr,
        time: timeStr,
        memo: backup.memo || "",
        items: [
          {
            category: MATERIAL_TO_CATEGORY[backup.type] || "GENERAL",
            quantity: backup.amount,
            detectedByAi: backup.detectedByAi ?? false,
          },
        ],
      });
    },
    [createPlanMutation],
  );

  // 로컬 삭제 취소 핸들러
  const handleLocalUndoDelete = useCallback(
    (backup: RecyclingEntry) => {
      localAddEntry(backup);
    },
    [localAddEntry],
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
      undoDelete: handleApiUndoDelete,
      completePlan: handleApiComplete,
      updatePlan: handleApiUpdate,
      isDeleting: deletePlanMutation.isPending,
      isCompleting: completePlanMutation.isPending,
      isUpdating: updatePlanMutation.isPending,
      isRestoring: createPlanMutation.isPending,
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
      undoDelete: handleLocalUndoDelete,
      completePlan: () => {},
      updatePlan: () => {},
      isDeleting: false,
      isCompleting: false,
      isUpdating: false,
      isRestoring: false,
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
      undoDelete: handleLocalUndoDelete,
      completePlan: () => {},
      updatePlan: () => {},
      isDeleting: false,
      isCompleting: false,
      isUpdating: false,
      isRestoring: false,
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
    undoDelete: handleLocalUndoDelete,
    completePlan: () => {},
    updatePlan: () => {},
    isDeleting: false,
    isCompleting: false,
    isUpdating: false,
    isRestoring: false,
  };
}
