// API 기본 설정 관련 유틸
const DEFAULT_BASE_URL = "/api";

// API 기본 URL 반환
export function getApiBaseUrl(): string {
  const baseUrl = import.meta.env?.VITE_API_BASE_URL;
  if (typeof baseUrl === "string" && baseUrl.trim().length > 0) {
    return baseUrl;
  }
  return DEFAULT_BASE_URL;
}

// 목 데이터 사용 여부 판단
export function isMockApiEnabled(): boolean {
  const flag = import.meta.env?.VITE_API_USE_MOCKS;
  if (typeof flag !== "string") {
    return true;
  }
  const normalized = flag.trim().toLowerCase();
  if (normalized === "false" || normalized === "0") {
    return false;
  }
  if (normalized === "true" || normalized === "1") {
    return true;
  }
  return true;
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
