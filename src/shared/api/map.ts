import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { mapSeedData } from "shared/data/mapData";
import type { MapData } from "shared/types/map";
import { queryKeys } from "./queryKeys";

// 지도 데이터는 백엔드 호출 없이 시드 데이터를 그대로 반환
export async function fetchMapData(): Promise<MapData> {
  return mapSeedData;
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
