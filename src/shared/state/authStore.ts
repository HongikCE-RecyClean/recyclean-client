import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 브라우저 환경 여부를 확인해 스토리지 안전하게 참조
const browserStorage = typeof window !== "undefined" ? window.localStorage : undefined;

export type AuthMethod = "email" | "kakao";
export type SocialType = "KAKAO";

// 인증 세션(auth session) 구조 정의
export interface AuthSession {
  memberId: number;
  socialType: SocialType;
  socialId: string;
  nickname: string;
  profileImageUrl?: string;
  accessToken: string;
  refreshToken: string;
  method: AuthMethod;
}

// 인증 상태(auth state) 스토어 타입 정의
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  method?: AuthMethod;
  session?: AuthSession;
  beginAuth: (method: AuthMethod) => void;
  completeAuth: (session: AuthSession) => void;
  failAuth: () => void;
  updateTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
}

// 로그인 흐름을 제어하는 zustand 스토어 구현
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: false,
      method: undefined,
      session: undefined,
      beginAuth: (method) =>
        set(() => ({
          isLoading: true,
          method,
        })),
      completeAuth: (session) =>
        set(() => ({
          session,
          isAuthenticated: true,
          isLoading: false,
          method: session.method,
        })),
      failAuth: () =>
        set(() => ({
          isLoading: false,
        })),
      updateTokens: ({ accessToken, refreshToken }) =>
        set((state) => ({
          session: state.session
            ? {
                ...state.session,
                accessToken,
                refreshToken,
              }
            : state.session,
        })),
      logout: () =>
        set(() => ({
          isAuthenticated: false,
          session: undefined,
          isLoading: false,
          method: undefined,
        })),
    }),
    {
      name: "recyclean-auth",
      // 로컬 스토리지(localStorage)에 인증 정보를 보존해 새로고침에도 유지
      storage: browserStorage ? createJSONStorage(() => browserStorage) : undefined,
      version: 2,
    },
  ),
);
