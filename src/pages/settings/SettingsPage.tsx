import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import recycleanLogo from "../../assets/recycleanLogo.svg";
import { useSettingsStore } from "shared/state/settingsStore";
import {
  SettingsAppPreferencesCard,
  SettingsImpactCard,
  SettingsLocaleCard,
  SettingsProfileCard,
  SettingsSupportActionsCard,
} from "./components";
import * as S from "./SettingsPage.styles";
import type { LocaleOption, UserStats } from "./types";
import { usePermissionRequests } from "./hooks/usePermissionRequests";

// 지원 언어 목록 정의
const languageOptions: LocaleOption[] = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
];

export function SettingsPage() {
  const { t } = useTranslation();
  // 사용자 설정 스토어 바인딩
  const {
    notifications,
    setNotifications,
    location,
    setLocation,
    darkMode,
    setDarkMode,
    // sounds,
    // setSounds,
    language,
    setLanguage,
    region,
    setRegion,
  } = useSettingsStore();
  const {
    supportsNotifications,
    supportsGeolocation,
    notificationStatus,
    locationStatus,
    requestNotificationPermission,
    requestLocationPermission,
    resetNotificationStatus,
    resetLocationStatus,
  } = usePermissionRequests();

  useEffect(() => {
    if (!supportsNotifications && notifications) {
      setNotifications(false);
    }
  }, [notifications, setNotifications, supportsNotifications]);

  useEffect(() => {
    if (!supportsGeolocation && location) {
      setLocation(false);
    }
  }, [location, setLocation, supportsGeolocation]);

  const handleNotificationsChange = useCallback(
    async (checked: boolean) => {
      if (!checked) {
        setNotifications(false);
        resetNotificationStatus();
        return;
      }

      const granted = await requestNotificationPermission();
      setNotifications(granted);
    },
    [requestNotificationPermission, resetNotificationStatus, setNotifications],
  );

  const handleLocationChange = useCallback(
    async (checked: boolean) => {
      if (!checked) {
        setLocation(false);
        resetLocationStatus();
        return;
      }

      const granted = await requestLocationPermission();
      setLocation(granted);
    },
    [requestLocationPermission, resetLocationStatus, setLocation],
  );

  // 지역 옵션 (현재는 대한민국만 지원)
  const regions: LocaleOption[] = useMemo(
    () => [{ value: "kr", label: t("settings.locale.regions.kr") }],
    [t],
  );

  const userStats: UserStats = {
    totalPoints: 287,
    itemsRecycled: 156,
    joinDate: "2024-01-01",
    streakDays: 12,
  };

  // 설정 페이지 섹션 컴포넌트 조합
  return (
    <S.PageContainer>
      <SettingsProfileCard userStats={userStats} avatarSrc={recycleanLogo} />
      <SettingsImpactCard userStats={userStats} />
      <SettingsAppPreferencesCard
        notifications={notifications}
        onNotificationsChange={handleNotificationsChange}
        location={location}
        onLocationChange={handleLocationChange}
        darkMode={darkMode}
        onDarkModeChange={setDarkMode}
        notificationsSupported={supportsNotifications}
        notificationStatus={notificationStatus}
        locationSupported={supportsGeolocation}
        locationStatus={locationStatus}
      />
      <SettingsLocaleCard
        languages={languageOptions}
        regions={regions}
        language={language}
        region={region}
        onLanguageChange={setLanguage}
        onRegionChange={setRegion}
      />
      <SettingsSupportActionsCard />
    </S.PageContainer>
  );
}
