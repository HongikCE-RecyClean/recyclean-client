import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import * as S from "../SettingsPage.styles";
import type { UserStats } from "../types";

// 사용자 영향력 카드 컴포넌트 정의
interface SettingsImpactCardProps {
  userStats: UserStats;
}

export function SettingsImpactCard({ userStats }: SettingsImpactCardProps) {
  // 통계 값을 시각적으로 배치
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <MapPin size={18} />
          나의 영향력
        </CardTitle>
      </CardHeader>
      <CardContent>
        <S.StatGrid>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#16a34a" }}>
              {userStats.itemsRecycled}
            </div>
            <div style={{ fontSize: "0.8rem", color: "#64748b" }}>처리한 아이템</div>
          </div>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2563eb" }}>
              {userStats.totalPoints}
            </div>
            <div style={{ fontSize: "0.8rem", color: "#64748b" }}>누적 포인트</div>
          </div>
        </S.StatGrid>
      </CardContent>
    </Card>
  );
}
