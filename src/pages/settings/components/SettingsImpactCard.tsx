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
            {/* 영향력 통계 수치 클래스 적용 */}
            <div className={S.impactStatValueSuccess}>{userStats.itemsRecycled}</div>
            <div className={S.impactStatLabel}>처리한 아이템</div>
          </div>
          <div>
            <div className={S.impactStatValueInfo}>{userStats.totalPoints}</div>
            <div className={S.impactStatLabel}>누적 포인트</div>
          </div>
        </S.StatGrid>
      </CardContent>
    </Card>
  );
}
