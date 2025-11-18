import { Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Progress } from "../../../shared/ui/Progress/Progress";
import * as S from "../DashboardPage.styles";

interface MonthlyProgressCardProps {
  totalPoints: number;
  monthlyGoal: number;
  progressValue: number;
}

export function MonthlyProgressCard({
  totalPoints,
  monthlyGoal,
  progressValue,
}: MonthlyProgressCardProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Target size={18} />
          {t("dashboard.monthlyProgress.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 진행도 텍스트 영역 */}
        <div>
          {/* 진행 수치 텍스트 클래스 적용 */}
          <S.MonthlyProgressValue>
            {t("dashboard.monthlyProgress.value", { current: totalPoints, goal: monthlyGoal })}
          </S.MonthlyProgressValue>
          <S.MonthlyProgressSubtitle>
            {t("dashboard.monthlyProgress.subtitle")}
          </S.MonthlyProgressSubtitle>
        </div>
        {/* 진행률 바 */}
        <Progress value={progressValue} />
        {/* 진행률 서브 정보 행 클래스 적용 */}
        <div css={S.monthlyProgressFooter}>
          <S.MonthlyProgressPercent>
            {t("dashboard.monthlyProgress.percent", { percent: Math.round(progressValue) })}
          </S.MonthlyProgressPercent>
          {/* TODO: 진행률 메시지 클래스를 정의한 뒤 활성화 예정 */}
        </div>
      </CardContent>
    </Card>
  );
}
