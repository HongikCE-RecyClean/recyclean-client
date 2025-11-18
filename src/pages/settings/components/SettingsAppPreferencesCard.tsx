import { Bell, MapPin, Moon, Settings as SettingsIcon, Sun, Volume2 } from "lucide-react";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Separator } from "../../../shared/ui/Separator/Separator";
import { Switch } from "../../../shared/ui/Switch/Switch";
import * as S from "../SettingsPage.styles";
import type { PermissionRequestStatus } from "../hooks/usePermissionRequests";

// 앱 기본 설정 토글 카드 정의
interface SettingsAppPreferencesCardProps {
  notifications: boolean;
  onNotificationsChange: (checked: boolean) => void;
  notificationsSupported: boolean;
  notificationStatus: PermissionRequestStatus;
  location: boolean;
  onLocationChange: (checked: boolean) => void;
  locationSupported: boolean;
  locationStatus: PermissionRequestStatus;
  darkMode: boolean;
  onDarkModeChange: (checked: boolean) => void;
  sounds: boolean;
  onSoundsChange: (checked: boolean) => void;
}

export function SettingsAppPreferencesCard({
  notifications,
  onNotificationsChange,
  notificationsSupported,
  notificationStatus,
  location,
  onLocationChange,
  locationSupported,
  locationStatus,
  darkMode,
  onDarkModeChange,
  sounds,
  onSoundsChange,
}: SettingsAppPreferencesCardProps) {
  // 테마 객체 가져오기
  const theme = useTheme();
  const { t } = useTranslation();

  const statusVariantMap: Record<PermissionRequestStatus, "success" | "info" | "warning"> = {
    idle: "info",
    requesting: "info",
    granted: "success",
    denied: "warning",
    unsupported: "warning",
    error: "warning",
  };

  const renderNotificationStatus = notificationStatus !== "idle";
  const renderLocationStatus = locationStatus !== "idle";
  const notificationDisabled = !notificationsSupported || notificationStatus === "requesting";
  const locationDisabled = !locationSupported || locationStatus === "requesting";

  // 개별 설정 항목을 Switch로 연결
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <SettingsIcon size={18} />
          {t("settings.preferences.title")}
        </CardTitle>
      </CardHeader>
      <S.SectionStack>
        <S.SettingsItem>
          <S.SettingsLabel>
            <Bell size={16} color={theme.colors.textMuted} />
            <S.SettingsText>
              {/* 설정 항목 텍스트 클래스 적용 */}
              <S.SettingsItemTitle>
                {t("settings.preferences.notifications.title")}
              </S.SettingsItemTitle>
              <span css={S.settingsItemDescription(theme)}>
                {t("settings.preferences.notifications.description")}
              </span>
              {renderNotificationStatus && (
                <S.PermissionStatusText $variant={statusVariantMap[notificationStatus]}>
                  {t(`settings.preferences.notifications.status.${notificationStatus}`)}
                </S.PermissionStatusText>
              )}
            </S.SettingsText>
          </S.SettingsLabel>
          <Switch
            checked={notifications}
            onCheckedChange={onNotificationsChange}
            disabled={notificationDisabled}
          />
        </S.SettingsItem>

        <Separator />

        <S.SettingsItem>
          <S.SettingsLabel>
            <MapPin size={16} color={theme.colors.textMuted} />
            <S.SettingsText>
              <S.SettingsItemTitle>{t("settings.preferences.location.title")}</S.SettingsItemTitle>
              <span css={S.settingsItemDescription(theme)}>
                {t("settings.preferences.location.description")}
              </span>
              {renderLocationStatus && (
                <S.PermissionStatusText $variant={statusVariantMap[locationStatus]}>
                  {t(`settings.preferences.location.status.${locationStatus}`)}
                </S.PermissionStatusText>
              )}
            </S.SettingsText>
          </S.SettingsLabel>
          <Switch
            checked={location}
            onCheckedChange={onLocationChange}
            disabled={locationDisabled}
          />
        </S.SettingsItem>

        <Separator />

        <S.SettingsItem>
          <S.SettingsLabel>
            {darkMode ? (
              <Moon size={16} color={theme.colors.textMuted} />
            ) : (
              <Sun size={16} color={theme.colors.textMuted} />
            )}
            <S.SettingsText>
              <S.SettingsItemTitle>{t("settings.preferences.darkMode.title")}</S.SettingsItemTitle>
              <span css={S.settingsItemDescription(theme)}>
                {t("settings.preferences.darkMode.description")}
              </span>
            </S.SettingsText>
          </S.SettingsLabel>
          <Switch checked={darkMode} onCheckedChange={onDarkModeChange} />
        </S.SettingsItem>

        <Separator />

        <S.SettingsItem>
          <S.SettingsLabel>
            <Volume2 size={16} color={theme.colors.textMuted} />
            <S.SettingsText>
              <S.SettingsItemTitle>{t("settings.preferences.sounds.title")}</S.SettingsItemTitle>
              <span css={S.settingsItemDescription(theme)}>
                {t("settings.preferences.sounds.description")}
              </span>
            </S.SettingsText>
          </S.SettingsLabel>
          <Switch checked={sounds} onCheckedChange={onSoundsChange} />
        </S.SettingsItem>
      </S.SectionStack>
    </Card>
  );
}
