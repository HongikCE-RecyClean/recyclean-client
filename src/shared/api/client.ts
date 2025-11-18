import { buildApiUrl } from "./config";
import { ApiError } from "./errors";
import type { ApiQueryParams, ApiResponse } from "./types";

// API 기본 헤더 정의
const DEFAULT_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// 인증 옵션(auth options) 타입 정의
interface AuthOptions {
  sendToken?: boolean;
  retryOnAuthError?: boolean;
}

// 인증 핸들러(auth handlers) 타입 정의
interface AuthHandlers {
  getAccessToken?: () => string | null | undefined;
  refreshAccessToken?: () => Promise<string | null>;
  handleAuthFailure?: () => void;
}

// 인증 옵션 기본값 정의
const DEFAULT_AUTH_OPTIONS: Required<AuthOptions> = {
  sendToken: true,
  retryOnAuthError: true,
};

// HTTP 요청 옵션 타입 정의
export interface HttpRequestOptions<TBody = unknown> {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TBody;
  headers?: HeadersInit;
  query?: ApiQueryParams;
  signal?: AbortSignal;
  auth?: AuthOptions;
}

// 쿼리 파라미터 직렬화
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

// 요청 URL 조합
function resolveUrl(path: string, query?: ApiQueryParams): string {
  const url = buildApiUrl(path);
  return `${url}${serializeQuery(query)}`;
}

// 응답 본문 파싱
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

// HTTP 클라이언트 구현
export class HttpClient {
  // 기본 요청 옵션 저장
  private readonly defaultHeaders: HeadersInit;
  private authHandlers?: AuthHandlers;

  constructor(defaultHeaders: HeadersInit = DEFAULT_HEADERS) {
    // 인스턴스 기본 헤더 초기화
    this.defaultHeaders = defaultHeaders;
  }

  // 인증 핸들러 주입
  setAuthHandlers(handlers?: AuthHandlers) {
    this.authHandlers = handlers;
  }

  // 공통 요청 처리
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
    const authOptions: Required<AuthOptions> = {
      ...DEFAULT_AUTH_OPTIONS,
      ...(options.auth ?? {}),
    };

    if (authOptions.sendToken && this.authHandlers?.getAccessToken) {
      // 인증 토큰을 Authorization 헤더에 주입
      const token = this.authHandlers.getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    let body: BodyInit | undefined;
    if (options.body !== undefined && options.body !== null) {
      if (headers.get("Content-Type")?.includes("application/json")) {
        body = JSON.stringify(options.body);
      } else {
        body = options.body as BodyInit;
      }
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
      signal: options.signal,
      credentials: "include",
    });

    if (
      response.status === 401 &&
      authOptions.retryOnAuthError &&
      this.authHandlers?.refreshAccessToken
    ) {
      // 401 발생 시 토큰 재발급 이후 단 한 번 재시도
      const renewedToken = await this.authHandlers.refreshAccessToken();
      if (renewedToken) {
        return this.request(path, {
          ...options,
          auth: {
            ...authOptions,
            retryOnAuthError: false,
          },
        });
      }
      this.authHandlers?.handleAuthFailure?.();
    }

    const data = await parseBody<TResponse>(response);
    if (!response.ok) {
      throw new ApiError({
        message: `API 요청 실패: ${response.status}`,
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
