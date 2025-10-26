import { Recycle } from "lucide-react";
import * as S from "../DashboardPage.styles";
import type { DashboardData } from "../../../shared/data/dashboard";

interface WelcomeOverviewCardProps {
  todayStats: DashboardData["todayStats"];
}

export function WelcomeOverviewCard({ todayStats }: WelcomeOverviewCardProps) {
  return (
    <S.WelcomeCard>
      <S.WelcomeContent>
        {/* 환영 아이콘 카드 표현 */}
        <S.WelcomeIcon>
          <Recycle size={28} color="#15803d" />
        </S.WelcomeIcon>
        {/* 환영 메시지 영역 */}
        <div>
          <h2>오늘도 환경을 지켜요!</h2>
          <p>꾸준한 실천으로 녹색 행성을 만드는 중이에요.</p>
        </div>
        {/* 핵심 통계 그리드 */}
        <S.StatsGrid>
          <S.StatCell>
            <S.StatValue $tone="success">{todayStats.itemsRecycled}</S.StatValue>
            <S.StatLabel>오늘 처리한 아이템</S.StatLabel>
          </S.StatCell>
          <S.StatCell>
            <S.StatValue $tone="info">{todayStats.pointsEarned}</S.StatValue>
            <S.StatLabel>획득 포인트</S.StatLabel>
          </S.StatCell>
          <S.StatCell>
            <S.StatValue $tone="warning">{todayStats.streakDays}</S.StatValue>
            <S.StatLabel>연속 참여 일수</S.StatLabel>
          </S.StatCell>
        </S.StatsGrid>
      </S.WelcomeContent>
    </S.WelcomeCard>
  );
}
