import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";

import { apiClient } from "./client";
import { queryKeys } from "./queryKeys";
import type {
  MonthlyGoalRequest,
  MonthlyGoalResponse,
  Plan,
  PlanCompleteResponse,
  PlanCreateRequest,
  PlanUpdateRequest,
} from "./types";

// ============================================================
// 재활용 계획 API 모듈
// ============================================================

// 계획 생성
export async function createPlan(data: PlanCreateRequest): Promise<Plan> {
  const response = await apiClient.post<Plan, PlanCreateRequest>("/api/plans", {
    body: data,
  });
  return response.data;
}

// 전체 계획 조회
export async function fetchPlans(signal?: AbortSignal): Promise<Plan[]> {
  const response = await apiClient.get<Plan[] | Record<string, unknown>>("/api/plans", {
    signal,
  });
  const data = response.data;

  // API가 배열을 바로 반환하는 경우
  if (Array.isArray(data)) {
    return data;
  }

  // API가 페이지네이션 객체나 래핑 객체를 반환하는 경우(content/plans 키 선호)
  const maybeContent = (data as { content?: unknown }).content;
  if (Array.isArray(maybeContent)) {
    return maybeContent;
  }
  const maybePlans = (data as { plans?: unknown }).plans;
  if (Array.isArray(maybePlans)) {
    return maybePlans;
  }

  // 예외 상황에서는 빈 배열로 폴백해 런타임 오류를 방지
  return [];
}

// 계획 수정
export async function updatePlan(id: number, data: PlanUpdateRequest): Promise<Plan> {
  const response = await apiClient.put<Plan, PlanUpdateRequest>(`/api/plans/${id}`, {
    body: data,
  });
  return response.data;
}

// 계획 삭제
export async function deletePlan(id: number): Promise<void> {
  await apiClient.delete(`/api/plans/${id}`);
}

// 재활용 완료 처리
export async function completePlan(id: number): Promise<PlanCompleteResponse> {
  const response = await apiClient.post<PlanCompleteResponse>(`/api/plans/${id}/complete`);
  return response.data;
}

// 월간 목표 수정
export async function updateMonthlyGoal(monthlyGoal: number): Promise<MonthlyGoalResponse> {
  const response = await apiClient.post<MonthlyGoalResponse, MonthlyGoalRequest>(
    "/api/plans/monthly-goal",
    { body: { monthlyGoal } },
  );
  return response.data;
}

// ============================================================
// React Query 훅
// ============================================================

type UsePlansOptions = Omit<UseQueryOptions<Plan[], Error>, "queryKey" | "queryFn">;

// 전체 계획 조회 훅
export function usePlans(options?: UsePlansOptions) {
  return useQuery({
    queryKey: queryKeys.plans.list(),
    queryFn: ({ signal }) => fetchPlans(signal),
    staleTime: 30_000,
    ...options,
  });
}

/* 미사용 API: 계획 단건/완료 조회는 현재 UI에서 호출하지 않아 주석 처리
// 개별 계획 조회
export async function fetchPlan(id: number, signal?: AbortSignal): Promise<Plan> {
  const response = await apiClient.get<Plan>(`/api/plans/${id}`, { signal });
  return response.data;
}

// 완료된 계획 목록 조회
export async function fetchCompletedPlans(signal?: AbortSignal): Promise<Plan[]> {
  const response = await apiClient.get<Plan[]>("/api/plans/completed", { signal });
  return response.data;
}

type UsePlanOptions = Omit<UseQueryOptions<Plan, Error>, "queryKey" | "queryFn">;

// 개별 계획 조회 훅
export function usePlan(id: number, options?: UsePlanOptions) {
  return useQuery({
    queryKey: queryKeys.plans.detail(id),
    queryFn: ({ signal }) => fetchPlan(id, signal),
    staleTime: 30_000,
    enabled: id > 0,
    ...options,
  });
}

// 완료된 계획 목록 조회 훅
export function useCompletedPlans(options?: UsePlansOptions) {
  return useQuery({
    queryKey: queryKeys.plans.completed(),
    queryFn: ({ signal }) => fetchCompletedPlans(signal),
    staleTime: 30_000,
    ...options,
  });
}
*/

// 계획 생성 mutation
export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlan,
    onSuccess: () => {
      // 계획 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.plans.all });
      // 대시보드 캐시 무효화 (통계 갱신)
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}

// 계획 수정 mutation
export function useUpdatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PlanUpdateRequest }) => updatePlan(id, data),
    onSuccess: (_, { id }) => {
      // 해당 계획 캐시 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.plans.detail(id) });
      // 계획 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.plans.list() });
    },
  });
}

// 계획 삭제 mutation
export function useDeletePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlan,
    onSuccess: () => {
      // 계획 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.plans.all });
      // 대시보드 캐시 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}

// 재활용 완료 mutation
export function useCompletePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completePlan,
    onSuccess: (_, id) => {
      // 해당 계획 캐시 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.plans.detail(id) });
      // 계획 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.plans.all });
      // 대시보드 캐시 무효화 (포인트 갱신)
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}

// 월간 목표 수정 mutation
export function useUpdateMonthlyGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMonthlyGoal,
    onSuccess: () => {
      // 대시보드 캐시 무효화 (목표 갱신)
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
