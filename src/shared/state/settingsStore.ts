import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { z } from "zod";
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
  monthlyGoal: number;
  hasHydrated: boolean;
  setNotifications: (value: boolean) => void;
  setLocation: (value: boolean) => void;
  setDarkMode: (value: boolean) => void;
  setSounds: (value: boolean) => void;
  setLanguage: (value: SupportedLanguage | string) => void;
  setRegion: (value: string) => void;
  setMonthlyGoal: (value: number) => void;
  resetSettings: () => void;
  setHydrated: (value: boolean) => void;
}

const createDefaultSettings = (): Omit<
  SettingsState,
  | "setNotifications"
  | "setLocation"
  | "setDarkMode"
  | "setSounds"
  | "setLanguage"
  | "setRegion"
  | "setMonthlyGoal"
  | "resetSettings"
  | "setHydrated"
> => ({
  notifications: false,
  location: false,
  darkMode: false,
  sounds: true,
  language: DEFAULT_LANGUAGE,
  region: "kr",
  monthlyGoal: 100,
  hasHydrated: false,
});

const settingsPersistSchema = z.object({
  notifications: z.boolean().catch(false),
  location: z.boolean().catch(false),
  darkMode: z.boolean().catch(false),
  sounds: z.boolean().catch(true),
  language: z.string().catch(DEFAULT_LANGUAGE),
  region: z.string().catch("kr"),
  monthlyGoal: z.coerce.number().positive().catch(100),
});

function sanitizeSettings(state: unknown) {
  const parsed = settingsPersistSchema.safeParse(state ?? {});
  if (!parsed.success) {
    return createDefaultSettings();
  }
  const language = normalizeLanguage(parsed.data.language);
  const monthlyGoal = Number.isFinite(parsed.data.monthlyGoal)
    ? Math.max(10, Math.round(parsed.data.monthlyGoal))
    : 100;

  return {
    notifications: parsed.data.notifications,
    location: parsed.data.location,
    darkMode: parsed.data.darkMode,
    sounds: parsed.data.sounds,
    language,
    region: parsed.data.region || "kr",
    monthlyGoal,
  };
}

// 사용자 설정 zustand 스토어 (localStorage 지속성 포함)
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...createDefaultSettings(),
      setNotifications: (value) => set({ notifications: value }),
      setLocation: (value) => set({ location: value }),
      setDarkMode: (value) => set({ darkMode: value }),
      setSounds: (value) => set({ sounds: value }),
      setLanguage: (value) => set({ language: normalizeLanguage(value) }),
      setRegion: (value) => set({ region: value }),
      setMonthlyGoal: (value) =>
        set({
          monthlyGoal: Number.isFinite(value) && value > 0 ? Math.max(10, Math.round(value)) : 100,
        }),
      resetSettings: () => set(createDefaultSettings()),
      setHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "recyclean:v2:settings",
      storage: createJSONStorage(() => localStorage),
      version: 2,
      merge: (persistedState, currentState) => {
        const sanitized = sanitizeSettings(persistedState);
        return {
          ...currentState,
          ...sanitized,
        };
      },
      migrate: (persistedState) => sanitizeSettings(persistedState),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("settingsStore hydration failed", error);
        }
        state?.setHydrated(true);
      },
    },
  ),
);
