import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import * as S from "../DashboardPage.styles";
import type { GoalData } from "../../../shared/data/dashboard";

interface GoalsCardProps {
  goals: GoalData[];
}

export function GoalsCard({ goals }: GoalsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Target size={18} />
          지속가능성 목표
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 목표 카드 리스트 */}
        <S.GoalsList>
          {goals.map((goal) => {
            const percentage = Math.round((goal.current / goal.target) * 100);
            return (
              <S.GoalCard key={goal.id}>
                {/* 목표 헤더 배치 클래스 적용 */}
                <div className={S.goalCardHeader}>
                  <div>
                    <div className={S.goalCardTitle}>{goal.title}</div>
                    <p className={S.goalCardDescription}>{goal.description}</p>
                  </div>
                  <Badge variant="outline">{goal.deadline}</Badge>
                </div>
                {/* 목표 수치 요약 행 클래스 적용 */}
                <div className={S.goalCardStats}>
                  <span>
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                  <span>{percentage}%</span>
                </div>
                <S.GoalProgress>
                  <S.GoalProgressBar $value={percentage} />
                </S.GoalProgress>
              </S.GoalCard>
            );
          })}
        </S.GoalsList>
      </CardContent>
    </Card>
  );
}
