const KAKAO_AUTHORIZE_URL = "https://kauth.kakao.com/oauth/authorize";

// Kakao REST API 키 조회
export function getKakaoClientId(): string {
  const value = import.meta.env?.VITE_KAKAO_REST_API_KEY;
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }
  return "";
}

// Kakao Redirect URI 조회(ENV 없으면 /login 사용)
export function getKakaoRedirectUri(): string {
  const envValue = import.meta.env?.VITE_KAKAO_REDIRECT_URI;
  if (typeof envValue === "string" && envValue.trim().length > 0) {
    return envValue.trim();
  }
  if (typeof window !== "undefined" && window.location) {
    return `${window.location.origin}/login`;
  }
  return "/login";
}

// Kakao OAuth authorize URL 생성
export function buildKakaoAuthorizeUrl(state?: string): string {
  const clientId = getKakaoClientId();
  const redirectUri = getKakaoRedirectUri();
  const url = new URL(KAKAO_AUTHORIZE_URL);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  if (state) {
    url.searchParams.set("state", state);
  }
  return url.toString();
}

// Kakao OAuth 구성값 존재 여부 확인
export function isKakaoConfigReady(): boolean {
  return getKakaoClientId().length > 0 && getKakaoRedirectUri().length > 0;
}
