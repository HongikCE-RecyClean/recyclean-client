// API 기본 설정 관련 유틸

// Mock API 사용 여부 확인
export function isMockApiEnabled(): boolean {
  const useMocks = import.meta.env?.VITE_API_USE_MOCKS;
  // 명시적으로 "false"가 아닌 경우 mock 사용 (기본값: true)
  return useMocks !== "false" && useMocks !== false;
}

// API 기본 URL 반환
export function getApiBaseUrl(): string {
  // 개발 모드에서는 빈 문자열 반환 (Vite 프록시 사용)
  // 프로덕션에서는 환경 변수 또는 동일 출처 사용
  if (import.meta.env?.DEV) {
    // 개발 모드: 상대 경로로 요청 → Vite 프록시가 백엔드로 전달
    return "";
  }

  // 프로덕션: 환경 변수에서 백엔드 주소 참조
  const baseUrl = import.meta.env?.VITE_API_BASE_URL;
  if (typeof baseUrl === "string") {
    const trimmed = baseUrl.trim();
    if (trimmed.length > 0) {
      return trimmed;
    }
  }

  // 환경 변수가 없을 때는 동일 출처 사용 (Nginx 프록시 등)
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
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
