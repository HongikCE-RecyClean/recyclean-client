import { Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import * as S from "../DashboardPage.styles";
import type { RecentActivityItem } from "../../../shared/types/dashboard";

interface RecentActivityCardProps {
  recentActivity: RecentActivityItem[];
}

export function RecentActivityCard({ recentActivity }: RecentActivityCardProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Calendar size={18} />
          {t("dashboard.recentActivity.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 빈 상태 처리: 최근 활동이 없을 때 */}
        {recentActivity.length === 0 ? (
          <S.EmptyStateMessage>{t("dashboard.recentActivity.empty")}</S.EmptyStateMessage>
        ) : (
          // 최근 활동 리스트
          <S.RecentActivityList>
            {recentActivity.map((activity) => (
              <S.ActivityRow key={activity.type}>
                <div>
                  {/* 최근 활동 제목 컴포넌트 적용 */}
                  <S.RecentActivityTitle>
                    {t(`materials.items.${activity.type}`, { defaultValue: activity.type })}
                  </S.RecentActivityTitle>
                  <S.RecentActivityMeta>
                    {t("dashboard.recentActivity.meta", {
                      count: activity.count,
                      time: activity.time,
                    })}
                  </S.RecentActivityMeta>
                </div>
                <Badge tone="primary">
                  {t("dashboard.recentActivity.points", { points: activity.points })}
                </Badge>
              </S.ActivityRow>
            ))}
          </S.RecentActivityList>
        )}
      </CardContent>
    </Card>
  );
}
