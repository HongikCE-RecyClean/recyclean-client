// ============================================================
// 카카오 OAuth 설정
// ============================================================

// 카카오 클라이언트 ID (환경변수에서 로드)
export function getKakaoClientId(): string {
  const clientId = import.meta.env?.VITE_KAKAO_CLIENT_ID as string | undefined;
  if (!clientId) {
    console.warn("VITE_KAKAO_CLIENT_ID 환경변수가 설정되지 않았어요.");
    return "";
  }
  return clientId;
}

// 카카오 리다이렉트 URI (환경변수 또는 현재 도메인 기반)
export function getKakaoRedirectUri(): string {
  const envRedirectUri = import.meta.env?.VITE_KAKAO_REDIRECT_URI as string | undefined;
  if (envRedirectUri) {
    return envRedirectUri;
  }
  // 환경변수가 없으면 현재 도메인의 /auth/callback 경로 사용
  if (typeof window !== "undefined") {
    return `${window.location.origin}/auth/callback`;
  }
  return "/auth/callback";
}

// 카카오 OAuth 설정이 완료되었는지 확인
export function isKakaoAuthConfigured(): boolean {
  const clientId = getKakaoClientId();
  return clientId.length > 0;
}
