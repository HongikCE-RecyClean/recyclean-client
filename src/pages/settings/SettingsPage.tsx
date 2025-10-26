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
import { LocaleOption, UserStats } from "./types";

// 지원 언어 목록 정의
const languages: LocaleOption[] = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
];

// 지원 지역 목록 정의
const regions: LocaleOption[] = [
  { value: "kr", label: "대한민국" },
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
];

export function SettingsPage() {
  // 사용자 설정 스토어 바인딩
  const {
    notifications,
    setNotifications,
    location,
    setLocation,
    darkMode,
    setDarkMode,
    sounds,
    setSounds,
    language,
    setLanguage,
    region,
    setRegion,
  } = useSettingsStore();

  const userStats: UserStats = {
    totalPoints: 287,
    itemsRecycled: 156,
    joinDate: "2024년 1월",
    streakDays: 12,
  };

  // 설정 페이지 섹션 컴포넌트 조합
  return (
    <S.PageContainer>
      <SettingsProfileCard userStats={userStats} avatarSrc={recycleanLogo} />
      <SettingsImpactCard userStats={userStats} />
      <SettingsAppPreferencesCard
        notifications={notifications}
        onNotificationsChange={setNotifications}
        location={location}
        onLocationChange={setLocation}
        darkMode={darkMode}
        onDarkModeChange={setDarkMode}
        sounds={sounds}
        onSoundsChange={setSounds}
      />
      <SettingsLocaleCard
        languages={languages}
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
