import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarImage } from "../../../shared/ui/Avatar/Avatar";
import { Badge } from "../../../shared/ui/Badge/Badge";
import { Card, CardContent } from "../../../shared/ui/Card/Card";
import * as S from "../SettingsPage.styles";
import type { UserStats } from "../types";
import { normalizeLanguage } from "shared/i18n/supportedLanguages";

// 사용자 프로필 카드 컴포넌트 정의
interface SettingsProfileCardProps {
  userStats: UserStats;
  avatarSrc: string;
}

export function SettingsProfileCard({ userStats, avatarSrc }: SettingsProfileCardProps) {
  // 테마 객체 가져오기
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const resolvedLanguage = normalizeLanguage(i18n.language);
  const localeMap: Record<string, string> = {
    en: "en-US",
    ko: "ko-KR",
    es: "es-ES",
    fr: "fr-FR",
  };
  const joinDate = new Date(userStats.joinDate);
  const formattedJoinDate = Number.isNaN(joinDate.getTime())
    ? userStats.joinDate
    : new Intl.DateTimeFormat(localeMap[resolvedLanguage] ?? "en-US", {
        year: "numeric",
        month: "long",
      }).format(joinDate);

  // 프로필 레이아웃과 배지 영역 구성
  return (
    <Card>
      <CardContent>
        <S.ProfileRow>
          <Avatar size={64}>
            {/* 프로필 아바타 클래스 적용 */}
            <AvatarImage
              src={avatarSrc}
              alt={t("settings.profile.avatarAlt")}
              css={S.profileAvatarImage}
            />
          </Avatar>
          {/* 프로필 정보 컨테이너 클래스 적용 */}
          <div css={S.profileInfoContainer}>
            <p css={S.profileMetaText(theme)}>
              {t("settings.profile.joined", { date: formattedJoinDate })}
            </p>
            <div css={S.profileBadgeRow}>
              <Badge tone="success">
                {t("settings.profile.points", { points: userStats.totalPoints })}
              </Badge>
              <Badge variant="outline">
                {t("settings.profile.streak", { days: userStats.streakDays })}
              </Badge>
            </div>
          </div>
        </S.ProfileRow>
      </CardContent>
    </Card>
  );
}
