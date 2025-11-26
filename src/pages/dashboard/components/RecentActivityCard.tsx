import { useTranslation } from "react-i18next";
import { CardTitle } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import * as S from "../DashboardPage.styles";
import type { RecentActivityItem } from "../../../shared/types/dashboard";

interface RecentActivityCardProps {
  recentActivity: RecentActivityItem[];
}

export function RecentActivityCard({ recentActivity }: RecentActivityCardProps) {
  const { t } = useTranslation();
  return (
    <S.SectionCard>
      <S.SectionCardHeader>
        <CardTitle>{t("dashboard.recentActivity.title")}</CardTitle>
      </S.SectionCardHeader>
      <S.SectionCardContent>
        {/* 빈 상태 처리: 최근 활동이 없을 때 */}
        {recentActivity.length === 0 ? (
          <S.EmptyStateMessage>{t("dashboard.recentActivity.empty")}</S.EmptyStateMessage>
        ) : (
          // 최근 활동 리스트
          <S.RecentActivityList>
            {recentActivity.map((activity) => (
              // 항목 id로 안정적인 키(key) 보장
              <S.ActivityRow key={activity.id}>
                <S.RecentActivityInfo>
                  {/* 최근 활동 제목/상태 묶음 */}
                  <S.RecentActivityTitleRow>
                    <S.RecentActivityTitle>
                      {t(`materials.items.${activity.type}`, { defaultValue: activity.type })}
                    </S.RecentActivityTitle>
                    <Badge tone={activity.mode === "plan" ? "warning" : "success"} variant="soft">
                      {t(`dashboard.recentActivity.modes.${activity.mode ?? "record"}`)}
                    </Badge>
                  </S.RecentActivityTitleRow>
                  <S.RecentActivityMeta>
                    {t("dashboard.recentActivity.meta", {
                      count: activity.count,
                      time: activity.time,
                    })}
                  </S.RecentActivityMeta>
                </S.RecentActivityInfo>
                {activity.mode === "plan" ? (
                  <Badge tone="warning">
                    {t("dashboard.recentActivity.pointsPlanned", { points: activity.points })}
                  </Badge>
                ) : (
                  <Badge tone="primary">
                    {t("dashboard.recentActivity.points", { points: activity.points })}
                  </Badge>
                )}
              </S.ActivityRow>
            ))}
          </S.RecentActivityList>
        )}
      </S.SectionCardContent>
    </S.SectionCard>
  );
}
