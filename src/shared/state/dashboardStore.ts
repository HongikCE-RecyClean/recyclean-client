import { create } from "zustand";

// 대시보드 UI 상태 타입 (활동 데이터는 activityStore로 이동)
interface DashboardState {
  searchTerm: string;
  materialCategory: string;
  selectedTipCategory: string;
  setSearchTerm: (value: string) => void;
  setMaterialCategory: (value: string) => void;
  setSelectedTipCategory: (value: string) => void;
}

// 대시보드 UI 전용 zustand 스토어 (세션 상태만 관리, persist 없음)
export const useDashboardStore = create<DashboardState>((set) => ({
  searchTerm: "",
  materialCategory: "all",
  selectedTipCategory: "all",
  setSearchTerm: (value) => set({ searchTerm: value }),
  setMaterialCategory: (value) => set({ materialCategory: value }),
  setSelectedTipCategory: (value) => set({ selectedTipCategory: value }),
}));
