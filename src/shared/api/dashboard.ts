import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { DashboardData } from "shared/types/dashboard";
import { apiClient } from "./client";
import { queryKeys } from "./queryKeys";

// 대시보드 데이터 조회 함수
export async function fetchDashboardData(client = apiClient): Promise<DashboardData> {
  const response = await client.get<DashboardData>("/dashboard");
  return response.data;
}

// 대시보드 데이터 쿼리 훅
export function useDashboardData(
  options?: Omit<UseQueryOptions<DashboardData, Error>, "queryKey" | "queryFn">,
) {
  return useQuery<DashboardData>({
    queryKey: queryKeys.dashboard.data(),
    queryFn: () => fetchDashboardData(),
    staleTime: 1000 * 30,
    ...options,
  });
}
