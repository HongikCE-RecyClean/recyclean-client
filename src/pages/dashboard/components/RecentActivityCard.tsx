import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import * as S from "../DashboardPage.styles";
import type { RecentActivityItem } from "../../../shared/types/dashboard";

interface RecentActivityCardProps {
  recentActivity: RecentActivityItem[];
}

export function RecentActivityCard({ recentActivity }: RecentActivityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Calendar size={18} />
          최근 활동
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 최근 활동 리스트 */}
        <S.RecentActivityList>
          {recentActivity.map((activity) => (
            <S.ActivityRow key={activity.type}>
              <div>
                {/* 최근 활동 제목 컴포넌트 적용 */}
                <S.RecentActivityTitle>{activity.type}</S.RecentActivityTitle>
                <S.RecentActivityMeta>
                  {activity.count}개 · {activity.time}
                </S.RecentActivityMeta>
              </div>
              <Badge tone="primary">+{activity.points} pts</Badge>
            </S.ActivityRow>
          ))}
        </S.RecentActivityList>
      </CardContent>
    </Card>
  );
}
