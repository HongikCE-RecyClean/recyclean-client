import { useMemo } from "react";
import { useAuthStore } from "shared/state/authStore";
import { useActivityStore } from "shared/state/activityStore";
import { usePlans } from "shared/api/plans";
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
    type: CATEGORY_TO_MATERIAL[item.category] || "기타",
    amount: item.quantity,
    date: new Date(`${plan.date}T${plan.time}`),
    points: Math.floor((plan.planPoint ?? 0) / plan.items.length), // 포인트를 아이템 수로 분배
    mode: plan.completed ? "record" : "plan",
  }));
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
}

export function useCalendarData(): CalendarData {
  // 인증 상태 확인
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // API 데이터 (인증된 경우에만 활성화)
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

  // API Plans를 RecyclingEntry[]로 변환
  const apiEntries = useMemo(() => {
    if (!apiPlans) return [];
    return apiPlans.flatMap(planToEntry);
  }, [apiPlans]);

  // API 데이터가 있으면 API 데이터 사용
  if (isAuthenticated && apiPlans) {
    return {
      entries: apiEntries,
      isLoading: false,
      error: null,
      source: "api",
      // API 삭제는 아직 미구현 (TODO: useDeletePlan 연동)
      deleteEntry: (id: string) => {
        console.warn("API delete not yet implemented for id:", id);
      },
      addEntry: (entry) => {
        console.warn("API add not yet implemented for entry:", entry);
      },
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
  };
}
