import { TrendingUp } from "lucide-react";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "shared/ui/Card/Card";
import { Badge } from "shared/ui/Badge/Badge";
import { Progress } from "shared/ui/Progress/Progress";
import type { UserStats } from "shared/utils/userStats";
import * as S from "../ProfilePage.styles";

// 레벨 진행도 카드 컴포넌트 정의
interface LevelProgressCardProps {
  userStats: UserStats;
}

export function LevelProgressCard({ userStats }: LevelProgressCardProps) {
  // 테마 객체 가져오기
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <TrendingUp size={18} />
          {t("profile.level.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 레벨 정보 행 */}
        <div css={S.levelHeaderRow}>
          <Badge tone="info" variant="solid">
            {t("profile.level.currentLevel", { level: userStats.level })}
          </Badge>
          <div css={S.levelProgressMeta(theme)}>
            {t("profile.level.pointsNeeded", { points: userStats.nextLevelPoints })}
          </div>
        </div>

        {/* 진행률 영역 */}
        <div css={S.levelProgressSection(theme)}>
          <Progress value={userStats.levelProgress} tone="info" />
        </div>
      </CardContent>
    </Card>
  );
}
