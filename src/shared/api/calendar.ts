import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";

import { apiClient } from "./client";
import { queryKeys } from "./queryKeys";
import type { CalendarEntry, Plan } from "./types";

// ============================================================
// 달력 API 모듈
// ============================================================

// 전체 달력 조회 (API 명세 미정의, Plan[] 반환 가정)
export async function fetchCalendar(signal?: AbortSignal): Promise<Plan[]> {
  const response = await apiClient.get<Plan[]>("/api/calendar", { signal });
  return response.data;
}

// 개별 달력 엔트리 조회 (API 명세 미정의)
export async function fetchCalendarEntry(id: number, signal?: AbortSignal): Promise<CalendarEntry> {
  const response = await apiClient.get<CalendarEntry>(`/api/calendar/${id}`, { signal });
  return response.data;
}

// ============================================================
// React Query 훅
// ============================================================

type UseCalendarOptions = Omit<UseQueryOptions<Plan[], Error>, "queryKey" | "queryFn">;
type UseCalendarEntryOptions = Omit<UseQueryOptions<CalendarEntry, Error>, "queryKey" | "queryFn">;

// 전체 달력 조회 훅
export function useCalendar(options?: UseCalendarOptions) {
  return useQuery({
    queryKey: queryKeys.calendar.list(),
    queryFn: ({ signal }) => fetchCalendar(signal),
    staleTime: 60_000, // 1분
    ...options,
  });
}

// 개별 달력 엔트리 조회 훅
export function useCalendarEntry(id: number, options?: UseCalendarEntryOptions) {
  return useQuery({
    queryKey: queryKeys.calendar.detail(id),
    queryFn: ({ signal }) => fetchCalendarEntry(id, signal),
    staleTime: 60_000,
    enabled: id > 0,
    ...options,
  });
}
