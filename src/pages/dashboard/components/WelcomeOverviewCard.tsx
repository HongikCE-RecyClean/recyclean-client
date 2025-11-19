import { useTranslation } from "react-i18next";
import { Recycle, TrendingUp, Flame } from "lucide-react";
import { useTheme } from "@emotion/react";
import * as S from "../DashboardPage.styles";
import type { TodayStats } from "shared/utils/userStats";

// 환경 카드 환영 메시지에 필요한 속성 정의
interface WelcomeOverviewCardProps {
  todayStats: TodayStats;
  userName: string;
}

export function WelcomeOverviewCard({ todayStats, userName }: WelcomeOverviewCardProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const trimmedName = userName?.trim();
  const displayName =
    trimmedName && trimmedName.length > 0 ? trimmedName : t("dashboard.welcome.defaultName");
  return (
    <S.WelcomeCard>
      <S.WelcomeContent>
        {/* 환영 메시지 영역 */}
        <S.WelcomeText>
          <h2>{t("dashboard.welcome.greeting", { name: displayName })}</h2>
          <p>{t("dashboard.welcome.helper")}</p>
        </S.WelcomeText>
        {/* 핵심 통계 그리드 */}
        <S.StatsGrid>
          <S.StatCell>
            {/* 재활용 아이템 아이콘 */}
            <S.StatIconWrapper>
              <Recycle size={20} color={theme.colors.primary} strokeWidth={2.5} />
            </S.StatIconWrapper>
            <S.StatValue>{todayStats.itemsRecycled}</S.StatValue>
            <S.StatLabel>{t("dashboard.welcome.stats.items")}</S.StatLabel>
          </S.StatCell>
          <S.StatCell>
            {/* 포인트 획득 아이콘 */}
            <S.StatIconWrapper>
              <TrendingUp size={20} color={theme.colors.success} strokeWidth={2.5} />
            </S.StatIconWrapper>
            <S.StatValue>{todayStats.pointsEarned}</S.StatValue>
            <S.StatLabel>{t("dashboard.welcome.stats.points")}</S.StatLabel>
          </S.StatCell>
          <S.StatCell>
            {/* 연속 달성 아이콘 */}
            <S.StatIconWrapper>
              <Flame size={20} color={theme.colors.warning} strokeWidth={2.5} />
            </S.StatIconWrapper>
            <S.StatValue>{todayStats.streakDays}</S.StatValue>
            <S.StatLabel>{t("dashboard.welcome.stats.streak")}</S.StatLabel>
          </S.StatCell>
        </S.StatsGrid>
      </S.WelcomeContent>
    </S.WelcomeCard>
  );
}
