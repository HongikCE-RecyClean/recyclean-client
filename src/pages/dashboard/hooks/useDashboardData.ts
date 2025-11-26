import { useMemo } from "react";
import { isSameMonth } from "date-fns";
import { useAuthStore } from "shared/state/authStore";
import { useActivityStore } from "shared/state/activityStore";
import { useSettingsStore } from "shared/state/settingsStore";
import { useDashboardSummary } from "shared/api/dashboard";
import { usePlans } from "shared/api/plans";
import { calculateTodayStats, calculateTotalStats } from "shared/utils/userStats";
import { planToEntry } from "shared/utils/planUtils";
import type { TodayStats } from "shared/utils/userStats";
import type { RecyclingEntry } from "shared/types/dashboard";

// ============================================================
// 대시보드 데이터 통합 훅
// - 인증 시: API 데이터 사용 (통계 + 최근 활동)
// - 미인증 시: 로컬 스토어 데이터 사용
// ============================================================

// 최근 활동 표시 개수
const RECENT_ACTIVITY_LIMIT = 3;

export interface DashboardData {
  // 오늘 통계
  todayStats: TodayStats;
  // 총 포인트 (myPoint) - 전체 누적, 프로필/설정용
  totalPoints: number;
  // 이번 달 포인트 (monthlyPoints) - 대시보드 표시용
  monthlyPoints: number;
  // 월간 목표
  monthlyGoal: number;
  // 진행률 (0-100)
  progressValue: number;
  // 완료된 활동 수
  entriesCount: number;
  // 계획된 활동 수
  plannedCount: number;
  // 총 아이템 수
  totalItems: number;
  // 카테고리 수
  categoryCount: number;
  // 최근 활동 목록 (인증 시 API, 미인증 시 로컬)
  recentActivity: RecyclingEntry[];
  // 로딩 상태
  isLoading: boolean;
  // 에러 상태
  error: Error | null;
  // 데이터 소스 (api 또는 local)
  source: "api" | "local";
}

export function useDashboardData(): DashboardData {
  // 인증 상태 확인
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // API 요약 데이터 (인증된 경우에만 활성화)
  const {
    data: apiSummary,
    isLoading: summaryLoading,
    error: summaryError,
  } = useDashboardSummary({
    enabled: isAuthenticated,
  });

  // API Plans 데이터 (최근 활동용, 인증된 경우에만 활성화)
  const { data: apiPlans, isLoading: plansLoading } = usePlans({
    enabled: isAuthenticated,
  });

  // 로컬 스토어 데이터
  const entries = useActivityStore((state) => state.entries);
  const localMonthlyGoal = useSettingsStore((state) => state.monthlyGoal);

  // 로컬 데이터 계산
  const localData = useMemo(() => {
    const now = new Date();

    // 기록/계획 분리
    const recordedEntries = entries.filter((e) => (e.mode ?? "record") === "record");
    const plannedEntries = entries.filter((e) => e.mode === "plan");

    // 오늘 통계 계산
    const todayStats = calculateTodayStats(entries);

    // 전체 통계 계산
    const totalStats = calculateTotalStats(entries);

    // 이번 달 포인트 계산
    const monthlyEntries = recordedEntries.filter((e) => {
      const entryDate = e.date instanceof Date ? e.date : new Date(e.date);
      return isSameMonth(entryDate, now);
    });
    const monthlyPoints = monthlyEntries.reduce((sum, e) => sum + e.points, 0);

    // 진행률 계산 (이번 달 포인트 기준)
    const progressValue = localMonthlyGoal > 0 ? (monthlyPoints / localMonthlyGoal) * 100 : 0;

    return {
      todayStats,
      totalPoints: totalStats.totalPoints,
      monthlyPoints,
      monthlyGoal: localMonthlyGoal,
      progressValue: Math.min(progressValue, 100),
      entriesCount: recordedEntries.length,
      plannedCount: plannedEntries.length,
      totalItems: totalStats.itemsRecycled,
      categoryCount: totalStats.categoryCount,
    };
  }, [entries, localMonthlyGoal]);

  // API Plans를 RecyclingEntry로 변환 (최근 활동용)
  const apiEntries = useMemo(() => {
    if (!Array.isArray(apiPlans)) return [];
    return apiPlans.flatMap(planToEntry);
  }, [apiPlans]);

  // 최근 활동 계산 (인증 시 API, 미인증 시 로컬)
  const recentActivity = useMemo((): RecyclingEntry[] => {
    const sourceEntries = isAuthenticated && apiPlans ? apiEntries : entries;

    return [...sourceEntries]
      .sort((a, b) => {
        const dateA = a.date instanceof Date ? a.date : new Date(a.date);
        const dateB = b.date instanceof Date ? b.date : new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, RECENT_ACTIVITY_LIMIT);
  }, [isAuthenticated, apiPlans, apiEntries, entries]);

  // API 데이터가 있으면 API 데이터 사용
  if (isAuthenticated && apiSummary) {
    return {
      todayStats: {
        itemsRecycled: apiSummary.todayItems,
        pointsEarned: apiSummary.todayPoints,
        streakDays: apiSummary.streakDays,
      },
      totalPoints: apiSummary.myPoint,
      monthlyPoints: apiSummary.monthlyPoints,
      monthlyGoal: apiSummary.monthlyGoal,
      progressValue: apiSummary.monthlyAchievementRate,
      entriesCount: apiSummary.activityCount,
      plannedCount: apiSummary.planCount,
      totalItems: apiSummary.totalItems,
      categoryCount: apiSummary.totalCategories,
      recentActivity,
      isLoading: false,
      error: null,
      source: "api",
    };
  }

  // 인증되었지만 API 로딩 중
  if (isAuthenticated && (summaryLoading || plansLoading)) {
    return {
      ...localData,
      recentActivity: entries.slice(0, RECENT_ACTIVITY_LIMIT),
      isLoading: true,
      error: null,
      source: "local",
    };
  }

  // 인증되었지만 API 에러 발생 시 로컬 폴백
  if (isAuthenticated && summaryError) {
    return {
      ...localData,
      recentActivity: entries.slice(0, RECENT_ACTIVITY_LIMIT),
      isLoading: false,
      error: summaryError,
      source: "local",
    };
  }

  // 미인증 시 로컬 데이터 사용
  return {
    ...localData,
    recentActivity,
    isLoading: false,
    error: null,
    source: "local",
  };
}
