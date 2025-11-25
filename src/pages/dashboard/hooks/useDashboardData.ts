import { useMemo } from "react";
import { useAuthStore } from "shared/state/authStore";
import { useActivityStore } from "shared/state/activityStore";
import { useSettingsStore } from "shared/state/settingsStore";
import { useDashboardSummary } from "shared/api/dashboard";
import { calculateTodayStats, calculateTotalStats } from "shared/utils/userStats";
import type { TodayStats } from "shared/utils/userStats";

// ============================================================
// 대시보드 데이터 통합 훅
// - 인증 시: API 데이터 사용
// - 미인증 시: 로컬 스토어 데이터 사용
// ============================================================

export interface DashboardData {
  // 오늘 통계
  todayStats: TodayStats;
  // 총 포인트 (myPoint)
  totalPoints: number;
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

  // API 데이터 (인증된 경우에만 활성화)
  const {
    data: apiSummary,
    isLoading: apiLoading,
    error: apiError,
  } = useDashboardSummary({
    enabled: isAuthenticated, // 인증된 경우에만 API 호출
  });

  // 로컬 스토어 데이터
  const entries = useActivityStore((state) => state.entries);
  const localMonthlyGoal = useSettingsStore((state) => state.monthlyGoal);

  // 로컬 데이터 계산
  const localData = useMemo(() => {
    // 기록/계획 분리
    const recordedEntries = entries.filter((e) => (e.mode ?? "record") === "record");
    const plannedEntries = entries.filter((e) => e.mode === "plan");

    // 오늘 통계 계산
    const todayStats = calculateTodayStats(entries);

    // 전체 통계 계산
    const totalStats = calculateTotalStats(entries);

    // 진행률 계산
    const progressValue =
      localMonthlyGoal > 0 ? (totalStats.totalPoints / localMonthlyGoal) * 100 : 0;

    return {
      todayStats,
      totalPoints: totalStats.totalPoints,
      monthlyGoal: localMonthlyGoal,
      progressValue: Math.min(progressValue, 100), // 최대 100%
      entriesCount: recordedEntries.length,
      plannedCount: plannedEntries.length,
      totalItems: totalStats.itemsRecycled,
      categoryCount: totalStats.categoryCount,
    };
  }, [entries, localMonthlyGoal]);

  // API 데이터가 있으면 API 데이터 사용, 없으면 로컬 데이터 사용
  if (isAuthenticated && apiSummary) {
    return {
      todayStats: {
        itemsRecycled: apiSummary.todayItems,
        pointsEarned: apiSummary.todayPoints,
        streakDays: apiSummary.streakDays,
      },
      totalPoints: apiSummary.myPoint,
      monthlyGoal: apiSummary.monthlyGoal,
      progressValue: apiSummary.monthlyAchievementRate,
      entriesCount: apiSummary.activityCount,
      plannedCount: apiSummary.planCount,
      totalItems: apiSummary.totalItems,
      categoryCount: apiSummary.totalCategories,
      isLoading: false,
      error: null,
      source: "api",
    };
  }

  // 인증되었지만 API 로딩 중
  if (isAuthenticated && apiLoading) {
    return {
      ...localData,
      isLoading: true,
      error: null,
      source: "local", // 로딩 중에는 로컬 데이터 표시
    };
  }

  // 인증되었지만 API 에러 발생 시 로컬 폴백
  if (isAuthenticated && apiError) {
    return {
      ...localData,
      isLoading: false,
      error: apiError,
      source: "local", // 에러 시 로컬 폴백
    };
  }

  // 미인증 시 로컬 데이터 사용
  return {
    ...localData,
    isLoading: false,
    error: null,
    source: "local",
  };
}
