import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";
import { Progress } from "shared/ui/Progress/Progress";
import { Button } from "shared/ui/Button/Button";
import type { TodayStats } from "shared/utils/userStats";
import * as S from "../DashboardPage.styles";

interface DashboardHeroCardProps {
  userName: string;
  todayStats: TodayStats;
  totalPoints: number;
  monthlyGoal: number;
  progressValue: number;
  entriesCount: number;
  totalItems: number;
  categoryCount: number;
  onLogAction?: () => void;
}

export function DashboardHeroCard({
  userName,
  todayStats,
  totalPoints,
  monthlyGoal,
  progressValue,
  entriesCount,
  totalItems,
  categoryCount,
  onLogAction,
}: DashboardHeroCardProps) {
  const { t } = useTranslation();
  const trimmedName = userName?.trim();
  const displayName =
    trimmedName && trimmedName.length > 0 ? trimmedName : t("dashboard.welcome.defaultName");

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
            <S.HeroMainValue>{totalPoints}</S.HeroMainValue>
            <S.HeroMainLabel>{t("dashboard.hero.currentPoints")}</S.HeroMainLabel>
          </S.HeroMainStat>
          <S.HeroGoalText>{t("dashboard.tracker.goal", { goal: monthlyGoal })}</S.HeroGoalText>

          {/* 진행률 바 */}
          <S.HeroProgressWrapper>
            <Progress value={progressValue} />
            <S.HeroProgressLabel>
              {t("dashboard.tracker.percent", { percent: Math.round(progressValue) })}
            </S.HeroProgressLabel>
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
                <S.StatRowValue>{todayStats.itemsRecycled}</S.StatRowValue>
              </S.StatRow>
              <S.StatRow>
                <S.StatRowLabel>{t("dashboard.welcome.stats.points")}</S.StatRowLabel>
                <S.StatRowValue>{todayStats.pointsEarned}</S.StatRowValue>
              </S.StatRow>
              <S.StatRow>
                <S.StatRowLabel>{t("dashboard.welcome.stats.streak")}</S.StatRowLabel>
                <S.StatRowValue>{todayStats.streakDays}일</S.StatRowValue>
              </S.StatRow>
            </S.StatSectionContent>
          </S.StatSection>

          {/* 오른쪽: 전체 통계 */}
          <S.StatSection>
            <S.StatSectionTitle>{t("dashboard.hero.total")}</S.StatSectionTitle>
            <S.StatSectionContent>
              <S.StatRow>
                <S.StatRowLabel>{t("dashboard.tracker.stats.items")}</S.StatRowLabel>
                <S.StatRowValue>{totalItems}</S.StatRowValue>
              </S.StatRow>
              <S.StatRow>
                <S.StatRowLabel>{t("dashboard.tracker.stats.categories")}</S.StatRowLabel>
                <S.StatRowValue>{categoryCount}</S.StatRowValue>
              </S.StatRow>
              <S.StatRow>
                <S.StatRowLabel>{t("dashboard.tracker.stats.entries")}</S.StatRowLabel>
                <S.StatRowValue>{entriesCount}</S.StatRowValue>
              </S.StatRow>
            </S.StatSectionContent>
          </S.StatSection>
        </S.HeroStatsGrid>

        {/* CTA 버튼 */}
        <Button variant="primary" onClick={onLogAction} css={{ width: "100%" }}>
          <Sparkles size={18} />
          {t("dashboard.tracker.logAction")}
        </Button>
      </S.HeroCardContent>
    </S.HeroCard>
  );
}
