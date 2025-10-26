import { PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import * as S from "../CalendarPage.styles";
import type { CalendarLegendItem } from "./types";

type CalendarLegendCardProps = {
  items: CalendarLegendItem[];
};

export function CalendarLegendCard({ items }: CalendarLegendCardProps) {
  // 품목 범례 표시를 독립 컴포넌트로 구성
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <PieChart size={18} />
          품목 범례
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <S.LegendList>
            {items.map((item) => (
              <S.LegendItem key={item.type}>
                {/* 품목 배지를 좌측 정렬 */}
                <S.LegendLabel>
                  <Badge tone={item.tone}>{item.type}</Badge>
                </S.LegendLabel>
                {/* 수량과 포인트를 우측 정렬 */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 600 }}>{item.count}개</div>
                  <div style={{ color: "#64748b", fontSize: "0.8rem" }}>+{item.points} pts</div>
                </div>
              </S.LegendItem>
            ))}
          </S.LegendList>
        ) : (
          <S.EmptyState>이 달에는 아직 기록이 없어요.</S.EmptyState>
        )}
      </CardContent>
    </Card>
  );
}
