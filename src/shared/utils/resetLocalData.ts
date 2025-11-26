import { queryClient } from "shared/providers/queryClient";
import { useActivityStore } from "shared/state/activityStore";
import { useAuthStore } from "shared/state/authStore";
import { useSettingsStore } from "shared/state/settingsStore";
import { useUserStore } from "shared/state/userStore";

const STORAGE_KEYS = [
  // 신규 네임스페이스
  "recyclean:v2:auth",
  "recyclean:v2:user",
  "recyclean:v2:settings",
  "recyclean:v2:activities",
  // 기존 키들도 함께 정리
  "recyclean-auth",
  "recyclean-user",
  "recyclean-settings",
  "recyclean-activities",
];

// 로컬 데이터 초기화 유틸
export function resetLocalData() {
  if (typeof window !== "undefined") {
    const ls = window.localStorage;
    STORAGE_KEYS.forEach((key) => ls.removeItem(key));
  }

  // zustand 스토어 초기화
  useAuthStore.getState().logout();
  useUserStore.getState().clearUserData();
  useActivityStore.getState().clearAllEntries();
  useSettingsStore.getState().resetSettings();

  // React Query 캐시 초기화
  queryClient.removeQueries();
}
