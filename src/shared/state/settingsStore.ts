import { create } from "zustand";

// 설정 페이지 상태 타입
interface SettingsState {
  notifications: boolean;
  location: boolean;
  darkMode: boolean;
  sounds: boolean;
  language: string;
  region: string;
  setNotifications: (value: boolean) => void;
  setLocation: (value: boolean) => void;
  setDarkMode: (value: boolean) => void;
  setSounds: (value: boolean) => void;
  setLanguage: (value: string) => void;
  setRegion: (value: string) => void;
}

// 사용자 설정 zustand 스토어
export const useSettingsStore = create<SettingsState>((set) => ({
  notifications: true,
  location: true,
  darkMode: false,
  sounds: true,
  language: "ko",
  region: "kr",
  setNotifications: (value) => set({ notifications: value }),
  setLocation: (value) => set({ location: value }),
  setDarkMode: (value) => set({ darkMode: value }),
  setSounds: (value) => set({ sounds: value }),
  setLanguage: (value) => set({ language: value }),
  setRegion: (value) => set({ region: value }),
}));
