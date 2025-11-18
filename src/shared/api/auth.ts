import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "./client";
import { queryKeys } from "./queryKeys";

// 카카오 로그인 응답 타입 정의
export interface KakaoLoginResponse {
  memberId: number;
  socialType: "KAKAO";
  socialId: string;
  nickname: string;
  profileImageUrl?: string;
  accessToken: string;
  refreshToken: string;
}

// 카카오 인가 코드로 로그인 API 호출
export async function loginWithKakaoCode(code: string) {
  const response = await apiClient.get<KakaoLoginResponse>("/auth/login", {
    query: { code },
    auth: {
      sendToken: false,
      retryOnAuthError: false,
    },
  });
  return response.data;
}

// 토큰 재발급 요청/응답 타입 정의
export interface TokenReissueRequest {
  refreshToken: string;
}

export type TokenReissueResponse = KakaoLoginResponse;

// 토큰 재발급 API 호출
export async function reissueTokens(body: TokenReissueRequest) {
  const response = await apiClient.post<TokenReissueResponse, TokenReissueRequest>(
    "/auth/token_reissue",
    {
      body,
      auth: {
        sendToken: false,
        retryOnAuthError: false,
      },
    },
  );
  return response.data;
}

// 카카오 로그인 뮤테이션 훅
export function useKakaoLoginMutation(
  options?: UseMutationOptions<KakaoLoginResponse, Error, string>,
) {
  return useMutation<KakaoLoginResponse, Error, string>({
    mutationKey: [...queryKeys.auth.session(), "kakao-login"] as const,
    mutationFn: (code: string) => loginWithKakaoCode(code),
    ...options,
  });
}
