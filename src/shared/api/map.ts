import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { RecyclingCenter, TrashBin, FilterOption } from "shared/types/map";
import { apiClient } from "./client";
import { queryKeys } from "./queryKeys";

// 지도 데이터 묶음 타입
export interface MapData {
  bins: TrashBin[];
  centers: RecyclingCenter[];
  options?: FilterOption[];
}

// 지도 데이터 조회 함수
export async function fetchMapData(client = apiClient): Promise<MapData> {
  const response = await client.get<MapData>("/map");
  return response.data;
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
