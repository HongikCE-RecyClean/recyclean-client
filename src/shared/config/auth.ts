import type { AuthSession } from "shared/state/authStore";

// 인증 모의(mock) 모드 활성 여부 반환
export function isAuthMockEnabled(): boolean {
  const flag = import.meta.env?.VITE_AUTH_USE_MOCK;
  if (typeof flag !== "string") {
    return false;
  }
  return flag.trim().toLowerCase() === "true";
}

// 모의 인증 세션 생성
export function buildMockAuthSession(): AuthSession {
  return {
    memberId: 0,
    socialType: "KAKAO",
    socialId: "mock-user",
    nickname: "모의 사용자",
    profileImageUrl: undefined,
    accessToken: "mock-access-token",
    refreshToken: "mock-refresh-token",
    method: "kakao",
  };
}
