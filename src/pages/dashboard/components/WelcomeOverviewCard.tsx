import { Recycle } from "lucide-react";
import * as S from "../DashboardPage.styles";
import type { DashboardData } from "../../../shared/data/dashboard";

// 환경 카드 환영 메시지에 필요한 속성 정의
interface WelcomeOverviewCardProps {
  todayStats: DashboardData["todayStats"];
  userName: string;
}

export function WelcomeOverviewCard({ todayStats, userName }: WelcomeOverviewCardProps) {
  return (
    <S.WelcomeCard>
      <S.WelcomeContent>
        {/* 환영 아이콘 카드 표현 */}
        <S.WelcomeIcon>
          <Recycle size={28} color="#15803d" />
        </S.WelcomeIcon>
        {/* 환영 메시지 영역 */}
        <div>
          <h2>안녕하세요, {userName}님!</h2>
          <p>오늘의 분리수거를 도와줄게요.</p>
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
