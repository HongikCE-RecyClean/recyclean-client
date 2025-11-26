import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "shared/state/userStore";
import { useActivityStore } from "shared/state/activityStore";
import { useAuthStore } from "shared/state/authStore";
import { useMyProfile } from "shared/api/members";
import { useDashboardSummary } from "shared/api/dashboard";
import { usePlans } from "shared/api/plans";
import { calculateUserStats, calculateCategoryStats, calculateLevel } from "shared/utils/userStats";
import { planToEntry } from "shared/utils/planUtils";
import { ProfileCard, ImpactCard, LevelProgressCard, CategoryStatsCard } from "./components";
import recycleanLogo from "../../assets/recycleanLogo.svg";
import * as S from "./ProfilePage.styles";

export function ProfilePage() {
  // 사용자 정보 및 활동 기록 로드
  const { name, joinedAt } = useUserStore(
    useShallow((state) => ({
      name: state.name,
      joinedAt: state.joinedAt,
    })),
  ); // zustand selector 안정화로 무한 렌더링 방지 목적
  const entries = useActivityStore((state) => state.entries); // 필요한 조각만 구독
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data: profileData, isLoading: isProfileLoading } = useMyProfile({
    enabled: isAuthenticated,
  });
  const { data: dashboardData } = useDashboardSummary({
    enabled: isAuthenticated,
  });
  const { data: plansData } = usePlans({
    enabled: isAuthenticated,
  });

  // 실시간 통계 계산 (메모이제이션)
  const userStats = useMemo(() => {
    const baseStats = calculateUserStats(entries, joinedAt);

    if (!isAuthenticated || !dashboardData) {
      return baseStats;
    }

    const totalPoints = dashboardData.myPoint ?? baseStats.totalPoints;
    const levelInfo = calculateLevel(totalPoints);

    return {
      ...baseStats,
      totalPoints,
      itemsRecycled: dashboardData.totalItems ?? baseStats.itemsRecycled,
      streakDays: dashboardData.streakDays ?? baseStats.streakDays,
      level: levelInfo.level,
      nextLevelPoints: levelInfo.nextLevelPoints,
      levelProgress: levelInfo.levelProgress,
    };
  }, [dashboardData, isAuthenticated, entries, joinedAt]);

  // 카테고리별 통계 계산 (메모이제이션)
  const categoryStats = useMemo(() => {
    if (isAuthenticated && plansData?.length) {
      // 완료된 서버 계획을 활동 기록으로 환산 후 집계
      const completedEntries = plansData
        .flatMap(planToEntry)
        .filter((entry) => (entry.mode ?? "record") === "record");

      if (completedEntries.length > 0) {
        return calculateCategoryStats(completedEntries);
      }
    }

    return calculateCategoryStats(entries);
  }, [isAuthenticated, plansData, entries]);

  // 프로필 편집 클릭 핸들러
  const displayName = profileData?.nickname ?? name;
  const avatarSrc = profileData?.profileImageUrl ?? recycleanLogo;

  return (
    <>
      <S.PageContainer>
        {/* 프로필 카드: 닉네임, 아바타, 가입 날짜, 포인트, 연속 일수 */}
        <ProfileCard
          userStats={userStats}
          avatarSrc={avatarSrc}
          userName={isProfileLoading ? "..." : displayName || name || "Guest"}
        />

        {/* 영향력 카드: 재활용 아이템 수, 총 포인트 */}
        <ImpactCard userStats={userStats} />

        {/* 레벨 진행도 카드: 현재 레벨, 다음 레벨까지 진행률 */}
        <LevelProgressCard userStats={userStats} />

        {/* 카테고리별 통계 카드: 가장 많이 재활용한 품목 순위 */}
        <CategoryStatsCard categoryStats={categoryStats} />
      </S.PageContainer>
    </>
  );
}
