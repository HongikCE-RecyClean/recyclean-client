import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "./client";
import { queryKeys } from "./queryKeys";
import type { AuthResponse, TokenReissueRequest } from "./types";
import { useAuthStore } from "../state/authStore";

// ============================================================
// 인증 API 모듈
// ============================================================

// 카카오 로그인 URL 생성 헬퍼
const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize";

export function getKakaoLoginUrl(redirectUri: string, clientId: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
  });
  return `${KAKAO_AUTH_URL}?${params.toString()}`;
}

// 카카오 인가코드로 로그인 (인증 헤더 불필요)
export async function loginWithKakao(code: string): Promise<AuthResponse> {
  const response = await apiClient.get<AuthResponse>("/api/auth/login", {
    query: { code },
    skipAuth: true, // 로그인 시 인증 헤더 생략
  });
  return response.data;
}

// 토큰 재발급 (인증 헤더 불필요, 401 재시도 금지)
export async function reissueToken(refreshToken: string): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse, TokenReissueRequest>(
    "/api/auth/token_reissue",
    {
      body: { refreshToken },
      skipAuth: true, // 토큰 재발급 시 인증 헤더 생략
      skipRetry: true, // 401 발생 시 재시도 금지 (무한 루프 방지)
    },
  );
  return response.data;
}

// ============================================================
// React Query 훅
// ============================================================

// 카카오 로그인 mutation
export function useKakaoLogin() {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: loginWithKakao,
    onSuccess: (data) => {
      // authStore에 인증 정보 저장
      setAuth({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: {
          memberId: data.memberId,
          socialType: data.socialType,
          socialId: data.socialId,
          nickname: data.nickname,
          profileImageUrl: data.profileImageUrl,
        },
      });
      // React Query 캐시 갱신
      queryClient.setQueryData(queryKeys.auth.session(), data);
    },
  });
}

// 토큰 재발급 mutation
export function useTokenReissue() {
  const queryClient = useQueryClient();
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: reissueToken,
    onSuccess: (data) => {
      // authStore에 새 토큰 저장
      setTokens(data.accessToken, data.refreshToken);
      // React Query 캐시 갱신
      queryClient.setQueryData(queryKeys.auth.session(), data);
    },
  });
}
