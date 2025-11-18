import { MapPin } from "lucide-react";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import * as S from "../SettingsPage.styles";
import type { UserStats } from "../types";

// 사용자 영향력 카드 컴포넌트 정의
interface SettingsImpactCardProps {
  userStats: UserStats;
}

export function SettingsImpactCard({ userStats }: SettingsImpactCardProps) {
  // 테마 객체 가져오기
  const theme = useTheme();
  const { t } = useTranslation();

  // 통계 값을 시각적으로 배치
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <MapPin size={18} />
          {t("settings.impact.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <S.StatGrid>
          <div>
            {/* 영향력 통계 수치 컴포넌트 적용 */}
            <S.ImpactStatValueSuccess>{userStats.itemsRecycled}</S.ImpactStatValueSuccess>
            <div css={S.impactStatLabel(theme)}>{t("settings.impact.items")}</div>
          </div>
          <div>
            <S.ImpactStatValueInfo>{userStats.totalPoints}</S.ImpactStatValueInfo>
            <div css={S.impactStatLabel(theme)}>{t("settings.impact.points")}</div>
          </div>
        </S.StatGrid>
      </CardContent>
    </Card>
  );
}
