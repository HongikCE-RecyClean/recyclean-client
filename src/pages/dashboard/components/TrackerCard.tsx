import { RotateCcw, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Progress } from "../../../shared/ui/Progress/Progress";
import { Button } from "../../../shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import * as S from "../DashboardPage.styles";

interface TrackerCardProps {
  totalPoints: number;
  monthlyGoal: number;
  progressValue: number;
  entriesCount: number;
  totalItems: number;
  categoryCount: number;
}

export function TrackerCard({
  totalPoints,
  monthlyGoal,
  progressValue,
  entriesCount,
  totalItems,
  categoryCount,
}: TrackerCardProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <TrendingUp size={18} />
          {t("dashboard.tracker.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 통계 요약 표시 */}
        {/* 요약 박스 컴포넌트 적용 */}
        <S.TrackerSummaryBox>
          <S.TrackerPointsValue>{totalPoints}</S.TrackerPointsValue>
          <S.TrackerPointsLabel>{t("dashboard.tracker.monthlyPoints")}</S.TrackerPointsLabel>
          <Progress value={progressValue} />
          <div css={S.trackerProgressRow}>
            <S.TrackerGoalText>
              {t("dashboard.tracker.goal", { goal: monthlyGoal })}
            </S.TrackerGoalText>
            <S.TrackerPercentText>
              {t("dashboard.tracker.percent", { percent: Math.round(progressValue) })}
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
        <Button variant="outline">
          <RotateCcw size={16} />
          {t("dashboard.tracker.logAction")}
        </Button>
        {/* 세부 지표 그리드 */}
        <S.TrackerGrid>
          <S.TrackerStat>
            <S.TrackerValue>{entriesCount}</S.TrackerValue>
            <S.TrackerLabel>{t("dashboard.tracker.stats.entries")}</S.TrackerLabel>
          </S.TrackerStat>
          <S.TrackerStat>
            <S.TrackerValue>{totalItems}</S.TrackerValue>
            <S.TrackerLabel>{t("dashboard.tracker.stats.items")}</S.TrackerLabel>
          </S.TrackerStat>
          <S.TrackerStat>
            <S.TrackerValue>{categoryCount}</S.TrackerValue>
            <S.TrackerLabel>{t("dashboard.tracker.stats.categories")}</S.TrackerLabel>
          </S.TrackerStat>
        </S.TrackerGrid>
      </CardContent>
    </Card>
  );
}
