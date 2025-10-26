import { Recycle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";

export function CalendarGuideCard() {
  // 달력 사용 가이드를 카드로 고립
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Recycle size={18} />
          기록 관리 가이드
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "#475569", fontSize: "0.9rem" }}>
          <li>기록은 월별 통계에 자동 반영돼요.</li>
          <li>분석 화면에서 새 기록을 추가하면 달력에 표시돼요.</li>
          <li>기록이 많은 날은 달력 점 표시로 확인할 수 있어요.</li>
        </ul>
      </CardContent>
    </Card>
  );
}
