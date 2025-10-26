import { RotateCcw, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Progress } from "../../../shared/ui/Progress/Progress";
import { Button } from "../../../shared/ui/Button/Button";
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <TrendingUp size={18} />
          재활용 활동 추적
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 통계 요약 표시 */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "2rem", fontWeight: 700 }}>{totalPoints}</span>
          <span style={{ color: "#64748b", fontSize: "0.85rem" }}>이번 달 획득 포인트</span>
          <Progress value={progressValue} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
            <span style={{ color: "#64748b" }}>목표 {monthlyGoal}pt</span>
            <span style={{ fontWeight: 600 }}>{Math.round(progressValue)}%</span>
          </div>
        </div>
        {progressValue >= 100 && (
          <S.HighlightBox>
            <Award size={18} />
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>목표를 달성했어요!</span>
          </S.HighlightBox>
        )}
        <Button variant="outline">
          <RotateCcw size={16} />
          활동 기록하기
        </Button>
        {/* 세부 지표 그리드 */}
        <S.TrackerGrid>
          <S.TrackerStat>
            <S.TrackerValue>{entriesCount}</S.TrackerValue>
            <S.TrackerLabel>활동 건수</S.TrackerLabel>
          </S.TrackerStat>
          <S.TrackerStat>
            <S.TrackerValue>{totalItems}</S.TrackerValue>
            <S.TrackerLabel>처리 아이템</S.TrackerLabel>
          </S.TrackerStat>
          <S.TrackerStat>
            <S.TrackerValue>{categoryCount}</S.TrackerValue>
            <S.TrackerLabel>카테고리</S.TrackerLabel>
          </S.TrackerStat>
        </S.TrackerGrid>
      </CardContent>
    </Card>
  );
}
