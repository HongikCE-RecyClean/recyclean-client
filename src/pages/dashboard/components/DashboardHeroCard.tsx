import { useTranslation } from "react-i18next";
import { Progress } from "shared/ui/Progress/Progress";
import type { TodayStats } from "shared/utils/userStats";
import { useNumberFormatter } from "shared/utils/numberFormat";
import * as S from "../DashboardPage.styles";

interface DashboardHeroCardProps {
  userName: string;
  todayStats: TodayStats;
  monthlyPoints: number;
  monthlyGoal: number;
  progressValue: number;
  entriesCount: number;
  plannedCount: number;
  totalItems: number;
  categoryCount: number;
}

export function DashboardHeroCard({
  userName,
  todayStats,
  monthlyPoints,
  monthlyGoal,
  progressValue,
  entriesCount,
  plannedCount,
  totalItems,
  categoryCount,
}: DashboardHeroCardProps) {
  const { t } = useTranslation();
  const formatNumber = useNumberFormatter();
  const trimmedName = userName?.trim();
  const displayName =
    trimmedName && trimmedName.length > 0 ? trimmedName : t("dashboard.welcome.defaultName");
  const goalText = `${t("dashboard.tracker.goal", {
    goal: monthlyGoal,
    formatParams: { goal: "number" },
  })} (${t("dashboard.tracker.percent", {
    percent: progressValue,
    formatParams: { percent: "number0" },
  })})`;
  const formattedMonthlyPoints = formatNumber(monthlyPoints);
  const formattedTodayItems = formatNumber(todayStats.itemsRecycled);
  const formattedTodayPoints = formatNumber(todayStats.pointsEarned);
  const formattedTotalItems = formatNumber(totalItems);
  const formattedCategoryCount = formatNumber(categoryCount);
  const formattedEntriesCount = formatNumber(entriesCount);

  return (
    <S.HeroCard>
      <S.HeroCardContent>
        {/* 상단 인사말 영역 */}
        <S.HeroHeader>
          <S.HeroGreeting>{t("dashboard.welcome.greeting", { name: displayName })}</S.HeroGreeting>
          <S.HeroSubtitle>{t("dashboard.hero.subtitle")}</S.HeroSubtitle>
        </S.HeroHeader>

        {/* 중앙 주요 통계: 월간 포인트 */}
        <S.HeroMainSection>
          <S.HeroMainStat>
            <S.HeroMainValue>{formattedMonthlyPoints}</S.HeroMainValue>
            <S.HeroMainLabel>{t("dashboard.hero.currentPoints")}</S.HeroMainLabel>
          </S.HeroMainStat>
          <S.HeroGoalText>{goalText}</S.HeroGoalText>

          {/* 진행률 바 */}
          <S.HeroProgressWrapper>
            <Progress value={progressValue} />
          </S.HeroProgressWrapper>
        </S.HeroMainSection>

        {/* 오늘 vs 전체 통계 그리드 */}
        <S.HeroStatsGrid>
          {/* 왼쪽: 오늘의 통계 */}
          <S.StatSection>
            <S.StatSectionTitle>{t("dashboard.hero.today")}</S.StatSectionTitle>
            <S.StatSectionContent>
              <S.StatRow>
                <S.StatRowLabel>{t("dashboard.welcome.stats.items")}</S.StatRowLabel>
                <S.StatRowValue>{formattedTodayItems}</S.StatRowValue>
              </S.StatRow>
              <S.StatRow>
                <S.StatRowLabel>{t("dashboard.welcome.stats.points")}</S.StatRowLabel>
                <S.StatRowValue>{formattedTodayPoints}</S.StatRowValue>
              </S.StatRow>
              <S.StatRow>
                <S.StatRowLabel>{t("dashboard.welcome.stats.streak")}</S.StatRowLabel>
                <S.StatRowValue>{todayStats.streakDays}</S.StatRowValue>
              </S.StatRow>
            </S.StatSectionContent>
          </S.StatSection>

          {/* 오른쪽: 전체 통계 */}
          <S.StatSection>
            <S.StatSectionTitle>{t("dashboard.hero.total")}</S.StatSectionTitle>
            <S.StatSectionContent>
              <S.StatRow>
                <S.StatRowLabel>{t("dashboard.tracker.stats.items")}</S.StatRowLabel>
                <S.StatRowValue>{formattedTotalItems}</S.StatRowValue>
              </S.StatRow>
              <S.StatRow>
                <S.StatRowLabel>{t("dashboard.tracker.stats.categories")}</S.StatRowLabel>
                <S.StatRowValue>{formattedCategoryCount}</S.StatRowValue>
              </S.StatRow>
              <S.StatRow>
                <S.StatRowGroup>
                  <S.StatRowLabelInline>
                    <S.StatRowLabel>{t("dashboard.tracker.stats.entries")}</S.StatRowLabel>
                    <S.StatRowValue>{formattedEntriesCount}</S.StatRowValue>
                  </S.StatRowLabelInline>
                  <S.StatRowHelper>
                    {t("dashboard.tracker.stats.planned", {
                      count: plannedCount,
                      formatParams: { count: "number" },
                    })}
                  </S.StatRowHelper>
                </S.StatRowGroup>
              </S.StatRow>
            </S.StatSectionContent>
          </S.StatSection>
        </S.HeroStatsGrid>
      </S.HeroCardContent>
    </S.HeroCard>
  );
}
