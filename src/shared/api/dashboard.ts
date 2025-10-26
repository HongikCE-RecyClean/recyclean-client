import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { delay } from "shared/utils/delay";
import { dashboardInitialData, type DashboardData } from "shared/data/dashboard";
import { apiClient } from "./client";
import { isMockApiEnabled } from "./config";
import { queryKeys } from "./queryKeys";

// 목 지연 시간 정의
const MOCK_DELAY_MS = 80;

// 대시보드 데이터 조회 함수
export async function fetchDashboardData(client = apiClient): Promise<DashboardData> {
  if (isMockApiEnabled()) {
    await delay(MOCK_DELAY_MS);
    return dashboardInitialData;
  }
  const response = await client.get<DashboardData>("/dashboard");
  return response.data;
}

// 대시보드 데이터 쿼리 훅
export function useDashboardData(
  options?: Omit<UseQueryOptions<DashboardData, Error>, "queryKey" | "queryFn">,
) {
  const shouldUseMock = isMockApiEnabled();
  return useQuery<DashboardData>({
    queryKey: queryKeys.dashboard.data(),
    queryFn: () => fetchDashboardData(),
    initialData: shouldUseMock ? dashboardInitialData : undefined,
    staleTime: 1000 * 30,
    ...options,
  });
}
