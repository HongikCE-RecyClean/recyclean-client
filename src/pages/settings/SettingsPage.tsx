import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "shared/state/settingsStore";
import {
  SettingsAppPreferencesCard,
  SettingsLocaleCard,
  SettingsSupportActionsCard,
} from "./components";
import * as S from "./SettingsPage.styles";
import type { LocaleOption } from "./types";
import { usePermissionRequests } from "./hooks/usePermissionRequests";

export function SettingsPage() {
  const { t } = useTranslation();
  const languageOptions = useMemo<LocaleOption[]>(
    () => [
      { value: "ko", label: t("settings.locale.languages.ko") },
      { value: "en", label: t("settings.locale.languages.en") },
      { value: "es", label: t("settings.locale.languages.es") },
      { value: "fr", label: t("settings.locale.languages.fr") },
    ],
    [t],
  );
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
    monthlyGoal,
    setMonthlyGoal,
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

  // 설정 페이지 섹션 컴포넌트 조합
  return (
    <S.PageContainer>
      <SettingsAppPreferencesCard
        notifications={notifications}
        onNotificationsChange={handleNotificationsChange}
        location={location}
        onLocationChange={handleLocationChange}
        darkMode={darkMode}
        onDarkModeChange={setDarkMode}
        monthlyGoal={monthlyGoal}
        onMonthlyGoalChange={setMonthlyGoal}
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
