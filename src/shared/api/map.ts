import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { delay } from "shared/utils/delay";
import {
  filterOptions,
  materialColors,
  recyclingCenters,
  trashBins,
  typeAccent,
  availabilityTone,
} from "shared/data/map";
import type { RecyclingCenter, TrashBin } from "shared/types/map";
import { apiClient } from "./client";
import { isMockApiEnabled } from "./config";
import { queryKeys } from "./queryKeys";

// 지도 데이터 묶음 타입
export interface MapData {
  bins: TrashBin[];
  centers: RecyclingCenter[];
  options: typeof filterOptions;
}

// 목 지연 시간 정의
const MOCK_DELAY_MS = 80;

// 지도 데이터 조회 함수
export async function fetchMapData(client = apiClient): Promise<MapData> {
  if (isMockApiEnabled()) {
    await delay(MOCK_DELAY_MS);
    return {
      bins: trashBins,
      centers: recyclingCenters,
      options: filterOptions,
    };
  }
  const response = await client.get<MapData>("/map");
  return response.data;
}

// 지도 데이터 쿼리 훅
export function useMapData(
  options?: Omit<UseQueryOptions<MapData, Error>, "queryKey" | "queryFn">,
) {
  const shouldUseMock = isMockApiEnabled();
  return useQuery<MapData>({
    queryKey: queryKeys.map.data(),
    queryFn: () => fetchMapData(),
    initialData: shouldUseMock
      ? {
          bins: trashBins,
          centers: recyclingCenters,
          options: filterOptions,
        }
      : undefined,
    staleTime: 1000 * 60,
    ...options,
  });
}

// 타입 강조색 재노출
export const mapTypeAccent = typeAccent;

// 상태 톤 재노출
export const mapAvailabilityTone = availabilityTone;

// 재료 색상 재노출
export const mapMaterialColors = materialColors;
