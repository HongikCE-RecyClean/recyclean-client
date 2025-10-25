import { useQuery } from "@tanstack/react-query";
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
import { queryKeys } from "./queryKeys";

// 지도 데이터 묶음 타입
export interface MapData {
  bins: TrashBin[];
  centers: RecyclingCenter[];
  options: typeof filterOptions;
}

// 지도 데이터 조회 함수
export async function fetchMapData(): Promise<MapData> {
  await delay(80);
  return {
    bins: trashBins,
    centers: recyclingCenters,
    options: filterOptions,
  };
}

// 지도 데이터 쿼리 훅
export function useMapData() {
  return useQuery({
    queryKey: queryKeys.map.data(),
    queryFn: fetchMapData,
    initialData: {
      bins: trashBins,
      centers: recyclingCenters,
      options: filterOptions,
    },
  });
}

// 타입 강조색 재노출
export const mapTypeAccent = typeAccent;

// 상태 톤 재노출
export const mapAvailabilityTone = availabilityTone;

// 재료 색상 재노출
export const mapMaterialColors = materialColors;
