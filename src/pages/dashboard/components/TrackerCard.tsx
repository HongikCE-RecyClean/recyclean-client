import { RotateCcw, Award, ListChecks, Package, Grid3x3 } from "lucide-react";
import { useTheme } from "@emotion/react";
import { CardTitle } from "../../../shared/ui/Card/Card";
import { Progress } from "../../../shared/ui/Progress/Progress";
import { Button } from "../../../shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { useNumberFormatter } from "shared/utils/numberFormat";
import * as S from "../DashboardPage.styles";

interface TrackerCardProps {
  monthlyPoints: number;
  monthlyGoal: number;
  progressValue: number;
  entriesCount: number;
  totalItems: number;
  categoryCount: number;
  onLogAction?: () => void; // 활동 기록 버튼 클릭 핸들러
}

export function TrackerCard({
  monthlyPoints,
  monthlyGoal,
  progressValue,
  entriesCount,
  totalItems,
  categoryCount,
  onLogAction,
}: TrackerCardProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const formatNumber = useNumberFormatter();
  const formattedMonthlyPoints = formatNumber(monthlyPoints);
  const formattedEntriesCount = formatNumber(entriesCount);
  const formattedTotalItems = formatNumber(totalItems);
  const formattedCategoryCount = formatNumber(categoryCount);
  return (
    <S.SectionCard>
      <S.SectionCardHeader>
        <CardTitle>{t("dashboard.tracker.title")}</CardTitle>
      </S.SectionCardHeader>
      <S.SectionCardContent>
        {/* 통계 요약 표시 */}
        {/* 요약 박스 컴포넌트 적용 */}
        <S.TrackerSummaryBox>
          <S.TrackerPointsValue>{formattedMonthlyPoints}</S.TrackerPointsValue>
          <S.TrackerPointsLabel>{t("dashboard.tracker.monthlyPoints")}</S.TrackerPointsLabel>
          <Progress value={progressValue} />
          <div css={S.trackerProgressRow}>
            <S.TrackerGoalText>
              {t("dashboard.tracker.goal", {
                goal: monthlyGoal,
                formatParams: { goal: "number" },
              })}
            </S.TrackerGoalText>
            <S.TrackerPercentText>
              {t("dashboard.tracker.percent", {
                percent: progressValue,
                formatParams: { percent: "number0" },
              })}
            </S.TrackerPercentText>
          </div>
        </S.TrackerSummaryBox>
        {progressValue >= 100 && (
          <S.HighlightBox>
            <Award size={18} />
            {/* 하이라이트 텍스트 클래스 적용 */}
            <S.TrackerHighlightText>{t("dashboard.tracker.highlight")}</S.TrackerHighlightText>
          </S.HighlightBox>
        )}
        {/* 홈 CTA 버튼을 브랜드 초록색(primary)·대형 높이로 표시 */}
        <Button variant="primary" size="lg" onClick={onLogAction}>
          <RotateCcw size={16} />
          {t("dashboard.tracker.logAction")}
        </Button>
        {/* 세부 지표 그리드 */}
        <S.TrackerGrid>
          <S.TrackerStat>
            {/* 기록 수 아이콘 */}
            <S.TrackerIconWrapper>
              <ListChecks size={18} color={theme.colors.secondary} strokeWidth={2} />
            </S.TrackerIconWrapper>
            <S.TrackerValue>{formattedEntriesCount}</S.TrackerValue>
            <S.TrackerLabel>{t("dashboard.tracker.stats.entries")}</S.TrackerLabel>
          </S.TrackerStat>
          <S.TrackerStat>
            {/* 아이템 수 아이콘 */}
            <S.TrackerIconWrapper>
              <Package size={18} color={theme.colors.primary} strokeWidth={2} />
            </S.TrackerIconWrapper>
            <S.TrackerValue>{formattedTotalItems}</S.TrackerValue>
            <S.TrackerLabel>{t("dashboard.tracker.stats.items")}</S.TrackerLabel>
          </S.TrackerStat>
          <S.TrackerStat>
            {/* 카테고리 수 아이콘 */}
            <S.TrackerIconWrapper>
              <Grid3x3 size={18} color={theme.colors.accent} strokeWidth={2} />
            </S.TrackerIconWrapper>
            <S.TrackerValue>{formattedCategoryCount}</S.TrackerValue>
            <S.TrackerLabel>{t("dashboard.tracker.stats.categories")}</S.TrackerLabel>
          </S.TrackerStat>
        </S.TrackerGrid>
      </S.SectionCardContent>
    </S.SectionCard>
  );
}
