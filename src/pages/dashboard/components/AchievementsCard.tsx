import { Award } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import * as S from "../DashboardPage.styles";
import { Badge } from "../../../shared/ui/Badge/Badge";
import type { AchievementItem } from "../../../shared/data/dashboard";

interface AchievementsCardProps {
  achievements: AchievementItem[];
}

export function AchievementsCard({ achievements }: AchievementsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Award size={18} />
          업적 모음
        </CardTitle>
      </CardHeader>
      {/* 업적 카드 컨텐츠 간격 컴포넌트 적용 */}
      <S.AchievementsContent>
        {/* 업적 항목 리스트 */}
        {achievements.map((achievement) => (
          <S.AchievementRow key={achievement.title} $earned={achievement.earned}>
            <Award size={20} color={achievement.earned ? "#15803d" : "#94a3b8"} />
            <div>
              {/* 업적 제목 클래스 적용 */}
              <S.AchievementTitleText>{achievement.title}</S.AchievementTitleText>
              <S.AchievementDescriptionText>{achievement.description}</S.AchievementDescriptionText>
            </div>
            {achievement.earned && <Badge tone="success">달성</Badge>}
          </S.AchievementRow>
        ))}
      </S.AchievementsContent>
    </Card>
  );
}
