import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";

import { apiClient } from "./client";
import { queryKeys } from "./queryKeys";
import type { DashboardSummary } from "./types";

// ============================================================
// 대시보드 API 모듈
// ============================================================

// 대시보드 요약 조회
export async function fetchDashboardSummary(signal?: AbortSignal): Promise<DashboardSummary> {
  const response = await apiClient.get<DashboardSummary>("/api/plans/summary", {
    signal,
  });
  return response.data;
}

// ============================================================
// React Query 훅
// ============================================================

type UseDashboardSummaryOptions = Omit<
  UseQueryOptions<DashboardSummary, Error>,
  "queryKey" | "queryFn"
>;

// 대시보드 요약 조회 훅
export function useDashboardSummary(options?: UseDashboardSummaryOptions) {
  return useQuery({
    queryKey: queryKeys.dashboard.summary(),
    queryFn: ({ signal }) => fetchDashboardSummary(signal),
    staleTime: 30_000, // 30초
    ...options,
  });
}
