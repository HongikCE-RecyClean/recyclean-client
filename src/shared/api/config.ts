// API 기본 설정 관련 유틸
const DEFAULT_BASE_URL = "/";

// API 기본 URL 반환
export function getApiBaseUrl(): string {
  // 환경 변수에서 백엔드 주소를 우선적으로 참조
  const baseUrl = import.meta.env?.VITE_API_BASE_URL;
  if (typeof baseUrl === "string") {
    const trimmed = baseUrl.trim();
    if (trimmed.length > 0) {
      return trimmed;
    }
  }

  // 환경 변수가 없을 때는 동일 출처 혹은 기본값 사용
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return DEFAULT_BASE_URL;
}

// API 경로와 기본 URL 결합
export function buildApiUrl(path: string): string {
  const baseUrl = getApiBaseUrl();
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const sanitized = path.startsWith("/") ? path.slice(1) : path;
  const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  return `${normalizedBaseUrl}/${sanitized}`;
}
