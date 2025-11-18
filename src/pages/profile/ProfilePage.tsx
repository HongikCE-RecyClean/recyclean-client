import { useMemo } from "react";
import { useUserStore } from "shared/state/userStore";
import { useActivityStore } from "shared/state/activityStore";
import { calculateUserStats } from "shared/utils/userStats";
import { ProfileCard, ImpactCard } from "./components";
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

  return (
    <S.PageContainer>
      {/* 프로필 카드: 아바타, 가입 날짜, 포인트, 연속 일수 */}
      <ProfileCard userStats={userStats} avatarSrc={recycleanLogo} />

      {/* 영향력 카드: 재활용 아이템 수, 총 포인트 */}
      <ImpactCard userStats={userStats} />
    </S.PageContainer>
  );
}
