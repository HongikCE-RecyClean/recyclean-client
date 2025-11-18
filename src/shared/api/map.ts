import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { mapSeedData } from "shared/data/mapData";
import type { MapData } from "shared/types/map";
import { ApiError } from "./errors";
import { apiClient } from "./client";
import { queryKeys } from "./queryKeys";

// 시드 데이터 사용 여부 플래그 (VITE_MAP_SEED_FALLBACK=false면 비활성)
const isSeedFallbackDisabled = import.meta.env?.VITE_MAP_SEED_FALLBACK === "false";
const isDevMode = Boolean(import.meta.env?.DEV);

// 오류 상황에 따라 로컬 시드로 대체할지 판단
function shouldFallbackToSeed(error: unknown): boolean {
  if (isSeedFallbackDisabled) {
    return false;
  }

  if (isDevMode) {
    return true;
  }

  if (
    error instanceof ApiError &&
    (error.status === 404 || error.status === 503 || error.status === 0)
  ) {
    return true;
  }

  if (error instanceof TypeError) {
    return true;
  }

  return false;
}

// 지도 데이터 조회 함수
export async function fetchMapData(client = apiClient): Promise<MapData> {
  try {
    const response = await client.get<MapData>("/map");
    return response.data;
  } catch (error) {
    if (shouldFallbackToSeed(error)) {
      console.warn("[map] Falling back to local seed data because the API request failed", error);
      return mapSeedData;
    }
    throw error;
  }
}

// 지도 데이터 쿼리 훅
export function useMapData(
  options?: Omit<UseQueryOptions<MapData, Error>, "queryKey" | "queryFn">,
) {
  return useQuery<MapData>({
    queryKey: queryKeys.map.data(),
    queryFn: () => fetchMapData(),
    staleTime: 1000 * 60,
    ...options,
  });
}
