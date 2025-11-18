import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { Edit } from "lucide-react";
import { Avatar, AvatarImage } from "shared/ui/Avatar/Avatar";
import { Badge } from "shared/ui/Badge/Badge";
import { Card, CardContent } from "shared/ui/Card/Card";
import { normalizeLanguage } from "shared/i18n/supportedLanguages";
import type { UserStats } from "shared/utils/userStats";
import * as S from "../ProfilePage.styles";

// 사용자 프로필 카드 컴포넌트 정의
interface ProfileCardProps {
  userStats: UserStats;
  avatarSrc: string;
  userName: string;
  onEditClick: () => void;
}

export function ProfileCard({ userStats, avatarSrc, userName, onEditClick }: ProfileCardProps) {
  // 테마 객체 가져오기
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  // 로케일별 날짜 포맷팅
  const resolvedLanguage = normalizeLanguage(i18n.language);
  const localeMap: Record<string, string> = {
    en: "en-US",
    ko: "ko-KR",
    es: "es-ES",
    fr: "fr-FR",
  };

  // 가입 날짜 포맷팅
  const joinDate = new Date(userStats.joinDate);
  const formattedJoinDate = Number.isNaN(joinDate.getTime())
    ? userStats.joinDate
    : new Intl.DateTimeFormat(localeMap[resolvedLanguage] ?? "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(joinDate);

  // 프로필 레이아웃과 배지 영역 구성
  return (
    <Card>
      <CardContent>
        <S.ProfileRow>
          <Avatar size={64}>
            {/* 프로필 아바타 */}
            <AvatarImage
              src={avatarSrc}
              alt={t("profile.card.avatarAlt")}
              css={S.profileAvatarImage}
            />
          </Avatar>
          {/* 프로필 정보 컨테이너 */}
          <div css={S.profileInfoContainer}>
            {/* 닉네임과 편집 버튼 */}
            <div css={S.profileNameRow}>
              <S.ProfileName>{userName}</S.ProfileName>
              <S.EditButton onClick={onEditClick} aria-label={t("common.edit", "편집")}>
                <Edit size={16} />
              </S.EditButton>
            </div>
            <p css={S.profileMetaText(theme)}>
              {t("profile.card.joined", { date: formattedJoinDate })}
            </p>
            <div css={S.profileBadgeRow}>
              <Badge tone="success">
                {t("profile.card.points", { points: userStats.totalPoints })}
              </Badge>
              <Badge variant="outline">
                {t("profile.card.streak", { days: userStats.streakDays })}
              </Badge>
            </div>
          </div>
        </S.ProfileRow>
      </CardContent>
    </Card>
  );
}
