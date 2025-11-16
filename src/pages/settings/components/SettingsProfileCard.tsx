import { Avatar, AvatarImage } from "../../../shared/ui/Avatar/Avatar";
import { Badge } from "../../../shared/ui/Badge/Badge";
import { Card, CardContent } from "../../../shared/ui/Card/Card";
import * as S from "../SettingsPage.styles";
import type { UserStats } from "../types";

// 사용자 프로필 카드 컴포넌트 정의
interface SettingsProfileCardProps {
  userStats: UserStats;
  avatarSrc: string;
}

export function SettingsProfileCard({ userStats, avatarSrc }: SettingsProfileCardProps) {
  // 프로필 레이아웃과 배지 영역 구성
  return (
    <Card>
      <CardContent>
        <S.ProfileRow>
          <Avatar size={64}>
            {/* 프로필 아바타 클래스 적용 */}
            <AvatarImage
              src={avatarSrc}
              alt="기본 사용자 프로필 이미지(profile image)"
              css={S.profileAvatarImage}
            />
          </Avatar>
          {/* 프로필 정보 컨테이너 클래스 적용 */}
          <div css={S.profileInfoContainer}>
            <p css={S.profileMetaText}>가입일 {userStats.joinDate}</p>
            <div css={S.profileBadgeRow}>
              <Badge tone="success">{userStats.totalPoints} pts</Badge>
              <Badge variant="outline">{userStats.streakDays}일 연속</Badge>
            </div>
          </div>
        </S.ProfileRow>
      </CardContent>
    </Card>
  );
}
