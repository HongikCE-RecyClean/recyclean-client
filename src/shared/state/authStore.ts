import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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
}

// 초기 상태 생성 함수
const createInitialState = () => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  isLoading: false,
  isAuthenticated: false,
});

// 인증 스토어 생성 (localStorage 지속성 포함)
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...createInitialState(),

      // 토큰만 설정 (갱신 시 사용)
      setTokens: (accessToken, refreshToken) =>
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      // 사용자 정보 설정
      setUser: (user) => set({ user }),

      // 전체 인증 정보 설정 (로그인 성공 시)
      setAuth: ({ accessToken, refreshToken, user }) =>
        set({
          accessToken,
          refreshToken,
          user,
          isAuthenticated: true,
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
    }),
    {
      name: "recyclean-auth",
      storage: createJSONStorage(() => localStorage),
      // 민감한 토큰도 localStorage에 저장 (PWA 오프라인 지원)
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
      merge: (persistedState, currentState) => {
        if (!persistedState) {
          return currentState;
        }
        const state = persistedState as AuthState;
        const accessToken = state.accessToken ?? null;
        const refreshToken = state.refreshToken ?? null;
        return {
          ...currentState,
          ...state,
          accessToken,
          refreshToken,
          isAuthenticated: Boolean(accessToken),
        } satisfies AuthState;
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
