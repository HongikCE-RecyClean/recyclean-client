import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  DEFAULT_LANGUAGE,
  normalizeLanguage,
  type SupportedLanguage,
} from "../i18n/supportedLanguages";

// 설정 페이지 상태 타입
interface SettingsState {
  notifications: boolean;
  location: boolean;
  darkMode: boolean;
  sounds: boolean;
  language: SupportedLanguage;
  region: string;
  setNotifications: (value: boolean) => void;
  setLocation: (value: boolean) => void;
  setDarkMode: (value: boolean) => void;
  setSounds: (value: boolean) => void;
  setLanguage: (value: SupportedLanguage | string) => void;
  setRegion: (value: string) => void;
}

// 사용자 설정 zustand 스토어 (localStorage 지속성 포함)
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notifications: true,
      location: true,
      darkMode: false,
      sounds: true,
      language: DEFAULT_LANGUAGE,
      region: "kr",
      setNotifications: (value) => set({ notifications: value }),
      setLocation: (value) => set({ location: value }),
      setDarkMode: (value) => set({ darkMode: value }),
      setSounds: (value) => set({ sounds: value }),
      setLanguage: (value) => set({ language: normalizeLanguage(value) }),
      setRegion: (value) => set({ region: value }),
    }),
    {
      name: "recyclean-settings",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
