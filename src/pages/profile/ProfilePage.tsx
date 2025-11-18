import { useMemo } from "react";
import { useUserStore } from "shared/state/userStore";
import { useActivityStore } from "shared/state/activityStore";
import { calculateUserStats, calculateCategoryStats } from "shared/utils/userStats";
import { ProfileCard, ImpactCard, LevelProgressCard, CategoryStatsCard } from "./components";
import recycleanLogo from "../../assets/recycleanLogo.svg";
import * as S from "./ProfilePage.styles";

export function ProfilePage() {
  // 사용자 정보 및 활동 기록 로드
  const { joinedAt } = useUserStore();
  const { entries } = useActivityStore();

  // 실시간 통계 계산 (메모이제이션)
  const userStats = useMemo(() => {
    return calculateUserStats(entries, joinedAt);
  }, [entries, joinedAt]);

  // 카테고리별 통계 계산 (메모이제이션)
  const categoryStats = useMemo(() => {
    return calculateCategoryStats(entries);
  }, [entries]);

  return (
    <S.PageContainer>
      {/* 프로필 카드: 아바타, 가입 날짜, 포인트, 연속 일수 */}
      <ProfileCard userStats={userStats} avatarSrc={recycleanLogo} />

      {/* 영향력 카드: 재활용 아이템 수, 총 포인트 */}
      <ImpactCard userStats={userStats} />

      {/* 레벨 진행도 카드: 현재 레벨, 다음 레벨까지 진행률 */}
      <LevelProgressCard userStats={userStats} />

      {/* 카테고리별 통계 카드: 가장 많이 재활용한 품목 순위 */}
      <CategoryStatsCard categoryStats={categoryStats} />
    </S.PageContainer>
  );
}
