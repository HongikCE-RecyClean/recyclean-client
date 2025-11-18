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
