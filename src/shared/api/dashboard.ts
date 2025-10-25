import { useQuery } from "@tanstack/react-query";
import { delay } from "shared/utils/delay";
import { dashboardInitialData, type DashboardData } from "shared/data/dashboard";
import { queryKeys } from "./queryKeys";

// 대시보드 데이터 조회 함수
export async function fetchDashboardData(): Promise<DashboardData> {
  await delay(80);
  return dashboardInitialData;
}

// 대시보드 데이터 쿼리 훅
export function useDashboardData() {
  return useQuery({
    queryKey: queryKeys.dashboard.data(),
    queryFn: fetchDashboardData,
    initialData: dashboardInitialData,
  });
}
