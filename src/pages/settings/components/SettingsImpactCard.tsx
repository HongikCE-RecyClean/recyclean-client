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
            {/* 영향력 통계 수치 컴포넌트 적용 */}
            <S.ImpactStatValueSuccess>{userStats.itemsRecycled}</S.ImpactStatValueSuccess>
            <div css={S.impactStatLabel}>처리한 아이템</div>
          </div>
          <div>
            <S.ImpactStatValueInfo>{userStats.totalPoints}</S.ImpactStatValueInfo>
            <div css={S.impactStatLabel}>누적 포인트</div>
          </div>
        </S.StatGrid>
      </CardContent>
    </Card>
  );
}
