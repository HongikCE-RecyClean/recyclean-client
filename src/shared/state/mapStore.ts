import { create } from "zustand";

// 지도 선택 상태 타입
interface MapState {
  selectedType: string;
  setSelectedType: (value: string) => void;
}

// 지도 필터 zustand 스토어
export const useMapStore = create<MapState>((set) => ({
  selectedType: "all",
  setSelectedType: (value) => set({ selectedType: value }),
}));
