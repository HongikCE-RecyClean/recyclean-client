import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { Edit2 } from "lucide-react";
import { Avatar, AvatarImage } from "../../../shared/ui/Avatar/Avatar";
import { Badge } from "../../../shared/ui/Badge/Badge";
import { Card, CardContent } from "../../../shared/ui/Card/Card";
import { Button } from "../../../shared/ui/Button/Button";
import * as S from "../SettingsPage.styles";
import type { UserStats } from "../types";
import { normalizeLanguage } from "shared/i18n/supportedLanguages";

// 사용자 프로필 카드 컴포넌트 정의
interface SettingsProfileCardProps {
  userStats: UserStats;
  avatarSrc: string;
  nickname?: string;
  onEditNickname?: () => void;
  isLoading?: boolean;
}

export function SettingsProfileCard({
  userStats,
  avatarSrc,
  nickname,
  onEditNickname,
  isLoading,
}: SettingsProfileCardProps) {
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
            {/* 닉네임 표시 */}
            {nickname && (
              <div css={S.profileNameRow}>
                <span css={S.profileNameText(theme)}>{isLoading ? "..." : nickname}</span>
                {onEditNickname && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onEditNickname}
                    aria-label={t("settings.profile.editNickname")}
                  >
                    <Edit2 size={16} />
                  </Button>
                )}
              </div>
            )}
            <p css={S.profileMetaText(theme)}>
              {t("settings.profile.joined", { date: formattedJoinDate })}
            </p>
            <div css={S.profileBadgeRow}>
              <Badge tone="success">
                {t("settings.profile.points", {
                  points: userStats.totalPoints,
                  formatParams: { points: "number" },
                })}
              </Badge>
              <Badge variant="outline">
                {t("settings.profile.streak", {
                  days: userStats.streakDays,
                  formatParams: { days: "number" },
                })}
              </Badge>
            </div>
          </div>
        </S.ProfileRow>
      </CardContent>
    </Card>
  );
}
