import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import * as S from "../DashboardPage.styles";
import type { RecentActivityItem } from "../../../shared/data/dashboard";

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
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{activity.type}</div>
                <div style={{ color: "#64748b", fontSize: "0.8rem" }}>
                  {activity.count}개 · {activity.time}
                </div>
              </div>
              <Badge tone="primary">+{activity.points} pts</Badge>
            </S.ActivityRow>
          ))}
        </S.RecentActivityList>
      </CardContent>
    </Card>
  );
}
