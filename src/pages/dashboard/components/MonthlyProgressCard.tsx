import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Progress } from "../../../shared/ui/Progress/Progress";

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
          <div style={{ fontWeight: 600, fontSize: "1rem" }}>
            {totalPoints} / {monthlyGoal} 포인트
          </div>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>2025년 1월 기준</p>
        </div>
        {/* 진행률 바 */}
        <Progress value={progressValue} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
          <span style={{ color: "#64748b" }}>{Math.round(progressValue)}% 달성</span>
          <span style={{ color: "#16a34a", fontWeight: 600 }}>좋은 속도예요!</span>
        </div>
      </CardContent>
    </Card>
  );
}
