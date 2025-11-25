import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "./client";
import { queryKeys } from "./queryKeys";
import type { AuthResponse, TokenReissueRequest } from "./types";

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

// 카카오 인가코드로 로그인
export async function loginWithKakao(code: string): Promise<AuthResponse> {
  const response = await apiClient.get<AuthResponse>("/api/auth/login", {
    query: { code },
  });
  return response.data;
}

// 토큰 재발급
export async function reissueToken(refreshToken: string): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse, TokenReissueRequest>(
    "/api/auth/token_reissue",
    {
      body: { refreshToken },
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

  return useMutation({
    mutationFn: loginWithKakao,
    onSuccess: (data) => {
      // 세션 캐시 갱신
      queryClient.setQueryData(queryKeys.auth.session(), data);
    },
  });
}

// 토큰 재발급 mutation
export function useTokenReissue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reissueToken,
    onSuccess: (data) => {
      // 세션 캐시 갱신
      queryClient.setQueryData(queryKeys.auth.session(), data);
    },
  });
}
