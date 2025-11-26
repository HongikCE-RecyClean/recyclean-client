import { buildApiUrl } from "./config";
import { ApiError } from "./errors";
import type { ApiQueryParams, ApiResponse, AuthResponse } from "./types";
import { getAccessToken, getRefreshToken, updateTokens, forceLogout } from "../state/authStore";

// ============================================================
// HTTP 클라이언트 (인증 토큰 자동 주입 + 401 갱신 인터셉터)
// ============================================================

// API 기본 헤더 정의
const DEFAULT_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// HTTP 요청 옵션 타입 정의
export interface HttpRequestOptions<TBody = unknown> {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TBody;
  headers?: HeadersInit;
  query?: ApiQueryParams;
  signal?: AbortSignal;
  // 인증 헤더 생략 여부 (로그인/토큰 재발급 등 공개 API용)
  skipAuth?: boolean;
  // 401 재시도 생략 여부 (토큰 재발급 요청 자체에서 사용)
  skipRetry?: boolean;
}

// 쿼리 파라미터 직렬화 헬퍼
function serializeQuery(query?: ApiQueryParams): string {
  if (!query) {
    return "";
  }
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }
    params.append(key, String(value));
  });
  const serialized = params.toString();
  return serialized.length > 0 ? `?${serialized}` : "";
}

// 요청 URL 조합 헬퍼
function resolveUrl(path: string, query?: ApiQueryParams): string {
  const url = buildApiUrl(path);
  return `${url}${serializeQuery(query)}`;
}

// 응답 본문 파싱 헬퍼
async function parseBody<TData>(response: Response): Promise<TData | null> {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return (await response.json()) as TData;
  }
  if (contentType && contentType.includes("text/")) {
    return (await response.text()) as unknown as TData;
  }
  return null;
}

// 토큰 갱신 진행 중 플래그 (중복 갱신 방지)
let isRefreshing = false;
// 토큰 갱신 대기 큐 (동시 요청 처리)
let refreshSubscribers: Array<(token: string | null) => void> = [];

// 갱신 완료 후 대기 중인 요청들에 새 토큰 전달
function onRefreshed(token: string | null) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

// 토큰 갱신 대기 프로미스 추가
function subscribeTokenRefresh(): Promise<string | null> {
  return new Promise((resolve) => {
    refreshSubscribers.push(resolve);
  });
}

// 토큰 재발급 요청 실행
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const url = buildApiUrl("/api/auth/token_reissue");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ refreshToken }),
      credentials: "include",
    });

    if (!response.ok) {
      // 갱신 실패 시 로그아웃 처리
      forceLogout();
      return null;
    }

    const data = (await response.json()) as AuthResponse;
    // 새 토큰 저장
    updateTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
  } catch {
    // 네트워크 오류 시 로그아웃 처리
    forceLogout();
    return null;
  }
}

// HTTP 클라이언트 구현
export class HttpClient {
  // 기본 요청 옵션 저장
  private readonly defaultHeaders: HeadersInit;

  constructor(defaultHeaders: HeadersInit = DEFAULT_HEADERS) {
    // 인스턴스 기본 헤더 초기화
    this.defaultHeaders = defaultHeaders;
  }

  // 공통 요청 처리 (인증 + 401 인터셉터 포함)
  async request<TResponse, TBody = unknown>(
    path: string,
    options: HttpRequestOptions<TBody> = {},
  ): Promise<ApiResponse<TResponse>> {
    const method = options.method ?? "GET";
    const url = resolveUrl(path, options.query);
    const headers = new Headers({
      ...this.defaultHeaders,
      ...(options.headers ?? {}),
    });

    // FormData 전송 시 브라우저가 boundary를 설정할 수 있도록 Content-Type 제거
    const isFormDataBody = options.body instanceof FormData;
    if (isFormDataBody) {
      headers.delete("Content-Type");
    }

    // 인증 토큰 자동 주입 (skipAuth가 아닐 때)
    if (!options.skipAuth) {
      const accessToken = getAccessToken();
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
    }

    // 요청 본문 직렬화
    let body: BodyInit | undefined;
    if (options.body !== undefined && options.body !== null) {
      if (!isFormDataBody && headers.get("Content-Type")?.includes("application/json")) {
        body = JSON.stringify(options.body);
      } else {
        body = options.body as BodyInit;
      }
    }

    // fetch 실행
    const response = await fetch(url, {
      method,
      headers,
      body,
      signal: options.signal,
      credentials: "include",
    });

    // 401 Unauthorized 처리 (토큰 갱신 시도)
    if (response.status === 401 && !options.skipAuth && !options.skipRetry) {
      // 갱신 진행 중이면 대기
      if (isRefreshing) {
        const newToken = await subscribeTokenRefresh();
        if (newToken) {
          // 새 토큰으로 재시도
          return this.request<TResponse, TBody>(path, {
            ...options,
            skipRetry: true, // 무한 루프 방지
          });
        }
        // 갱신 실패 시 원래 에러 반환
      } else {
        // 토큰 갱신 시작
        isRefreshing = true;
        const newToken = await refreshAccessToken();
        isRefreshing = false;
        onRefreshed(newToken);

        if (newToken) {
          // 새 토큰으로 재시도
          return this.request<TResponse, TBody>(path, {
            ...options,
            skipRetry: true, // 무한 루프 방지
          });
        }
      }

      // 토큰 갱신 실패 시 401 에러 throw
      const data = await parseBody<TResponse>(response);
      throw new ApiError({
        message: "Authentication failed. Please login again.",
        status: 401,
        body: data,
        url,
        method,
      });
    }

    // 응답 본문 파싱
    const data = await parseBody<TResponse>(response);

    // 기타 에러 처리
    if (!response.ok) {
      throw new ApiError({
        message: `API request failed with status ${response.status}`,
        status: response.status,
        body: data,
        url,
        method,
      });
    }

    return {
      data: data as TResponse,
      status: response.status,
      headers: response.headers,
    };
  }

  // GET 요청 헬퍼
  get<TResponse>(path: string, options?: Omit<HttpRequestOptions<unknown>, "method" | "body">) {
    return this.request<TResponse>(path, { ...options, method: "GET" });
  }

  // POST 요청 헬퍼
  post<TResponse, TBody = unknown>(
    path: string,
    options?: Omit<HttpRequestOptions<TBody>, "method">,
  ) {
    return this.request<TResponse, TBody>(path, { ...options, method: "POST" });
  }

  // PUT 요청 헬퍼
  put<TResponse, TBody = unknown>(
    path: string,
    options?: Omit<HttpRequestOptions<TBody>, "method">,
  ) {
    return this.request<TResponse, TBody>(path, { ...options, method: "PUT" });
  }

  // PATCH 요청 헬퍼
  patch<TResponse, TBody = unknown>(
    path: string,
    options?: Omit<HttpRequestOptions<TBody>, "method">,
  ) {
    return this.request<TResponse, TBody>(path, { ...options, method: "PATCH" });
  }

  // DELETE 요청 헬퍼
  delete<TResponse>(path: string, options?: Omit<HttpRequestOptions<unknown>, "method" | "body">) {
    return this.request<TResponse>(path, { ...options, method: "DELETE" });
  }
}

// 기본 클라이언트 단일 인스턴스
export const apiClient = new HttpClient();
