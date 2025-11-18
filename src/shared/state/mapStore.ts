import { create } from "zustand";

// 지도 좌표 타입 정의
export interface MapCoordinates {
  lat: number;
  lng: number;
}

// 지도 상태 타입 (필터 + 사용자 위치)
interface MapState {
  selectedType: string;
  userLocation: MapCoordinates | null;
  setSelectedType: (value: string) => void;
  setUserLocation: (location: MapCoordinates | null) => void;
}

// 지도 필터 및 위치 zustand 스토어
export const useMapStore = create<MapState>((set) => ({
  selectedType: "all", // 선택된 배출함 유형
  userLocation: null, // 사용자 현재 위치
  setSelectedType: (value) => set({ selectedType: value }),
  setUserLocation: (location) => set({ userLocation: location }),
}));
