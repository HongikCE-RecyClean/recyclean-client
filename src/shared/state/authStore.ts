import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 브라우저 환경 여부를 확인해 스토리지 안전하게 참조
const browserStorage = typeof window !== "undefined" ? window.localStorage : undefined;

export type AuthMethod = "email" | "kakao";

// 인증 프로필(auth profile) 구조 정의
export interface AuthProfile {
  id: string;
  nickname: string;
  email?: string;
  avatarUrl?: string;
  method: AuthMethod;
}

// 인증 상태(auth state) 스토어 타입 정의
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  method?: AuthMethod;
  profile?: AuthProfile;
  beginAuth: (method: AuthMethod) => void;
  completeAuth: (profile: AuthProfile) => void;
  logout: () => void;
}

// 로그인 흐름을 제어하는 zustand 스토어 구현
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: false,
      method: undefined,
      profile: undefined,
      beginAuth: (method) =>
        set(() => ({
          isLoading: true,
          method,
        })),
      completeAuth: (profile) =>
        set(() => ({
          profile,
          isAuthenticated: true,
          isLoading: false,
          method: profile.method,
        })),
      logout: () =>
        set(() => ({
          isAuthenticated: false,
          profile: undefined,
          isLoading: false,
          method: undefined,
        })),
    }),
    {
      name: "recyclean-auth",
      // 로컬 스토리지(localStorage)에 인증 정보를 보존해 새로고침에도 유지
      storage: browserStorage ? createJSONStorage(() => browserStorage) : undefined,
      version: 1,
    },
  ),
);
