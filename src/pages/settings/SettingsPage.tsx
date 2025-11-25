import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "shared/state/settingsStore";
import { useNotificationStore } from "shared/state/notificationStore";
import { useAuthStore } from "shared/state/authStore";
import { useUpdateMonthlyGoal } from "shared/api/plans";
import {
  SettingsAppPreferencesCard,
  SettingsLocaleCard,
  SettingsSupportActionsCard,
} from "./components";
import * as S from "./SettingsPage.styles";
import type { LocaleOption } from "./types";
import { usePermissionRequests } from "./hooks/usePermissionRequests";
import type { SupportedLanguage } from "shared/i18n/supportedLanguages";

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
  const { showSnackbar } = useNotificationStore();

  // 인증 상태 및 API 훅
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const updateMonthlyGoalMutation = useUpdateMonthlyGoal();

  // 월간 목표 변경 핸들러 (API 연동)
  const handleMonthlyGoalChange = useCallback(
    (newGoal: number) => {
      // 로컬 스토어 즉시 업데이트 (낙관적 업데이트)
      setMonthlyGoal(newGoal);

      // 인증된 경우 API로 동기화
      if (isAuthenticated) {
        updateMonthlyGoalMutation.mutate(newGoal, {
          onError: () => {
            // API 실패 시 스낵바 표시 (로컬은 이미 업데이트됨)
            showSnackbar(t("notifications.snackbar.monthlyGoalSyncFailed"), {
              type: "warning",
              duration: 3000,
            });
          },
        });
      }
    },
    [isAuthenticated, setMonthlyGoal, updateMonthlyGoalMutation, showSnackbar, t],
  );
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

  const findLabel = useCallback((options: LocaleOption[], value: string) => {
    return options.find((option) => option.value === value)?.label ?? value;
  }, []);

  const handleLanguageChangeWithToast = useCallback(
    (value: SupportedLanguage) => {
      setLanguage(value);
      const label = findLabel(languageOptions, value);
      showSnackbar(t("notifications.snackbar.languageChanged", { language: label }), {
        type: "info",
        duration: 2200,
      });
    },
    [findLabel, languageOptions, setLanguage, showSnackbar, t],
  );

  const handleRegionChangeWithToast = useCallback(
    (value: string) => {
      setRegion(value);
      const label = findLabel(regions, value);
      showSnackbar(t("notifications.snackbar.regionChanged", { region: label }), {
        type: "info",
        duration: 2200,
      });
    },
    [findLabel, regions, setRegion, showSnackbar, t],
  );

  const handleDarkModeChange = useCallback(
    (checked: boolean) => {
      setDarkMode(checked);
      showSnackbar(
        t(
          checked
            ? "notifications.snackbar.darkModeEnabled"
            : "notifications.snackbar.darkModeDisabled",
        ),
        {
          type: "info",
          duration: 2000,
        },
      );
    },
    [setDarkMode, showSnackbar, t],
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
        onDarkModeChange={handleDarkModeChange}
        monthlyGoal={monthlyGoal}
        onMonthlyGoalChange={handleMonthlyGoalChange}
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
        onLanguageChange={handleLanguageChangeWithToast}
        onRegionChange={handleRegionChangeWithToast}
      />
      <SettingsSupportActionsCard />
    </S.PageContainer>
  );
}
