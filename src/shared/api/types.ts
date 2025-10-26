// API 응답 공통 타입
export interface ApiResponse<TData> {
  data: TData;
  status: number;
  headers: Headers;
}

// 페이지네이션 응답 템플릿
export interface PaginatedResponse<TItem> {
  items: TItem[];
  total: number;
  page: number;
  pageSize: number;
}

// API 요청 파라미터 기본 형태
export type ApiQueryParams = Record<string, string | number | boolean | undefined>;
