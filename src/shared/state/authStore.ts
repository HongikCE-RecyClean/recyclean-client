import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { z } from "zod";
import { useUserStore } from "./userStore";
import { useActivityStore } from "./activityStore";
import { queryClient } from "../providers/queryClient";

// ============================================================
// 인증 상태 관리 스토어
// ============================================================

// 인증된 사용자 정보 타입
export interface AuthUser {
  memberId: number;
  socialType: "KAKAO";
  socialId: string;
  nickname: string;
  profileImageUrl: string;
}

// 인증 스토어 상태 타입
interface AuthState {
  // 토큰
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiresAt: number | null; // ms 단위 만료 시각
  // 사용자 정보
  user: AuthUser | null;
  // 로딩 상태
  isLoading: boolean;
  // 파생 상태: 인증 여부
  isAuthenticated: boolean;

  // 액션: 토큰 설정
  setTokens: (accessToken: string, refreshToken: string) => void;
  // 액션: 사용자 정보 설정
  setUser: (user: AuthUser) => void;
  // 액션: 전체 인증 정보 설정 (로그인 성공 시)
  setAuth: (params: { accessToken: string; refreshToken: string; user: AuthUser }) => void;
  // 액션: 로딩 상태 설정
  setIsLoading: (isLoading: boolean) => void;
  // 액션: 로그아웃 (전체 초기화)
  logout: () => void;
  // 헬퍼: 현재 액세스 토큰 반환
  getAccessToken: () => string | null;
  // 헬퍼: 현재 리프레시 토큰 반환
  getRefreshToken: () => string | null;
  // 하이드레이션 플래그
  hasHydrated: boolean;
  setHydrated: (value: boolean) => void;
}

// 로컬스토리지에 저장·마이그레이션되는 슬라이스 타입
type AuthPersistedState = {
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiresAt: number | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// 초기 상태 생성 함수
const createInitialState = () => ({
  accessToken: null,
  refreshToken: null,
  tokenExpiresAt: null,
  user: null,
  isLoading: false,
  isAuthenticated: false,
  hasHydrated: false,
});

const authUserSchema = z.object({
  memberId: z.number(),
  socialType: z.literal("KAKAO"),
  socialId: z.string(),
  nickname: z.string(),
  profileImageUrl: z.string().optional().nullable(),
});

const authPersistSchema = z.object({
  accessToken: z.string().min(1).optional().nullable(),
  refreshToken: z.string().min(1).optional().nullable(),
  user: authUserSchema.optional().nullable(),
  tokenExpiresAt: z.number().optional().nullable(),
});

const JWT_CLOCK_SKEW_MS = 60_000;

function decodeJwtExpMs(token: string | null): number | null {
  if (!token || !token.includes(".")) {
    return null;
  }
  try {
    const payload = token.split(".")[1];
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    const expSeconds = typeof json.exp === "number" ? json.exp : null;
    return expSeconds ? expSeconds * 1000 : null;
  } catch {
    return null;
  }
}

function isAccessTokenExpired(token: string | null, tokenExpiresAt?: number | null): boolean {
  if (!token) {
    return true;
  }
  const expMs = tokenExpiresAt ?? decodeJwtExpMs(token);
  if (!expMs) {
    return false;
  }
  return Date.now() >= expMs - JWT_CLOCK_SKEW_MS;
}

function sanitizeAuthState(state: unknown): AuthPersistedState {
  const parsed = authPersistSchema.safeParse(state ?? {});
  if (!parsed.success) {
    return {
      ...createInitialState(),
      isAuthenticated: false,
      isLoading: false,
    };
  }

  const accessToken = parsed.data.accessToken ?? null;
  const refreshToken = parsed.data.refreshToken ?? null;
  const tokenExpiresAt = parsed.data.tokenExpiresAt ?? decodeJwtExpMs(accessToken);

  const expired = isAccessTokenExpired(accessToken, tokenExpiresAt);
  if (expired) {
    return createInitialState();
  }

  const user = parsed.data.user ?? null;
  return {
    accessToken,
    refreshToken,
    tokenExpiresAt: tokenExpiresAt ?? null,
    user,
    isAuthenticated: Boolean(accessToken && user),
    isLoading: false,
  };
}

// 인증 스토어 생성 (localStorage 지속성 포함)
export const useAuthStore = create<AuthState>()(
  persist<AuthState, AuthPersistedState>(
    (set, get) => ({
      ...createInitialState(),

      // 토큰만 설정 (갱신 시 사용)
      setTokens: (accessToken, refreshToken) =>
        set({
          accessToken,
          refreshToken,
          tokenExpiresAt: decodeJwtExpMs(accessToken),
          isAuthenticated: !isAccessTokenExpired(accessToken, decodeJwtExpMs(accessToken)),
        }),

      // 사용자 정보 설정
      setUser: (user) => set({ user }),

      // 전체 인증 정보 설정 (로그인 성공 시)
      setAuth: ({ accessToken, refreshToken, user }) =>
        set({
          accessToken,
          refreshToken,
          user,
          tokenExpiresAt: decodeJwtExpMs(accessToken),
          isAuthenticated:
            !isAccessTokenExpired(accessToken, decodeJwtExpMs(accessToken)) && Boolean(user),
          isLoading: false,
        }),

      // 로딩 상태 설정
      setIsLoading: (isLoading) => set({ isLoading }),

      // 로그아웃 처리 (전체 초기화)
      logout: () => set(createInitialState()),

      // 현재 액세스 토큰 반환
      getAccessToken: () => get().accessToken,

      // 현재 리프레시 토큰 반환
      getRefreshToken: () => get().refreshToken,

      setHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "recyclean:v2:auth",
      storage: createJSONStorage(() => localStorage),
      version: 2,
      // 민감한 토큰도 localStorage에 저장 (PWA 오프라인 지원)
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        tokenExpiresAt: state.tokenExpiresAt,
        isAuthenticated: state.isAuthenticated,
        isLoading: false,
      }),
      merge: (persistedState, currentState) => {
        const sanitized = sanitizeAuthState(persistedState);
        const merged: AuthState = {
          ...currentState,
          ...sanitized,
          hasHydrated: currentState.hasHydrated,
        };
        return merged;
      },
      migrate: (persistedState) => sanitizeAuthState(persistedState),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("authStore hydration failed", error);
        }
        state?.setHydrated(true);
      },
    },
  ),
);

// ============================================================
// 스토어 외부 접근 헬퍼 (HttpClient에서 사용)
// ============================================================

// 현재 액세스 토큰 가져오기 (컴포넌트 외부에서 사용)
export function getAccessToken(): string | null {
  return useAuthStore.getState().accessToken;
}

// 현재 리프레시 토큰 가져오기
export function getRefreshToken(): string | null {
  return useAuthStore.getState().refreshToken;
}

// 토큰 갱신 (HttpClient 인터셉터에서 사용)
export function updateTokens(accessToken: string, refreshToken: string): void {
  useAuthStore.getState().setTokens(accessToken, refreshToken);
}

// 강제 로그아웃 유틸 (401/만료 등 모든 경로에서 공통 사용)
export function forceLogout(options: { clearQueryCache?: boolean } = {}): void {
  useAuthStore.getState().logout();
  useUserStore.getState().clearUserData();
  useActivityStore.getState().clearAllEntries();
  if (options.clearQueryCache !== false) {
    queryClient.removeQueries();
  }
}

// 기존 clearAuth 호환 API (토큰만 초기화하던 경로 대체)
export function clearAuth(): void {
  forceLogout();
}
