import { Target } from "lucide-react";
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Target size={18} />
          월간 목표 진행도
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 진행도 텍스트 영역 */}
        <div>
          {/* 진행 수치 텍스트 클래스 적용 */}
          <S.MonthlyProgressValue>
            {totalPoints} / {monthlyGoal} 포인트
          </S.MonthlyProgressValue>
          <S.MonthlyProgressSubtitle>2025년 1월 기준</S.MonthlyProgressSubtitle>
        </div>
        {/* 진행률 바 */}
        <Progress value={progressValue} />
        {/* 진행률 서브 정보 행 클래스 적용 */}
        <div css={S.monthlyProgressFooter}>
          <S.MonthlyProgressPercent>{Math.round(progressValue)}% 달성</S.MonthlyProgressPercent>
          {/* TODO: 진행률 메시지 클래스를 정의한 뒤 활성화 예정 */}
        </div>
      </CardContent>
    </Card>
  );
}
