import { MapPin } from "lucide-react";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "shared/ui/Card/Card";
import type { UserStats } from "shared/utils/userStats";
import * as S from "../ProfilePage.styles";

// 사용자 영향력 카드 컴포넌트 정의
interface ImpactCardProps {
  userStats: UserStats;
}

export function ImpactCard({ userStats }: ImpactCardProps) {
  // 테마 객체 가져오기
  const theme = useTheme();
  const { t } = useTranslation();

  // 통계 값을 시각적으로 배치
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <MapPin size={18} />
          {t("profile.impact.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <S.StatGrid>
          <div>
            {/* 영향력 통계 수치 - 재활용 아이템 수 */}
            <S.ImpactStatValueSuccess>{userStats.itemsRecycled}</S.ImpactStatValueSuccess>
            <div css={S.impactStatLabel(theme)}>{t("profile.impact.items")}</div>
          </div>
          <div>
            {/* 영향력 통계 수치 - 총 포인트 */}
            <S.ImpactStatValueInfo>{userStats.totalPoints}</S.ImpactStatValueInfo>
            <div css={S.impactStatLabel(theme)}>{t("profile.impact.points")}</div>
          </div>
        </S.StatGrid>
      </CardContent>
    </Card>
  );
}
