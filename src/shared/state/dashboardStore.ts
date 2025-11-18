import { create } from "zustand";
import type { RecyclingEntry } from "shared/types/dashboard";

// 대시보드 상태 타입
interface DashboardState {
  searchTerm: string;
  materialCategory: string;
  selectedTipCategory: string;
  entries: RecyclingEntry[];
  setSearchTerm: (value: string) => void;
  setMaterialCategory: (value: string) => void;
  setSelectedTipCategory: (value: string) => void;
  setEntries: (entries: RecyclingEntry[]) => void;
}

// 대시보드 전용 zustand 스토어
export const useDashboardStore = create<DashboardState>((set) => ({
  searchTerm: "",
  materialCategory: "all",
  selectedTipCategory: "all",
  entries: [],
  setSearchTerm: (value) => set({ searchTerm: value }),
  setMaterialCategory: (value) => set({ materialCategory: value }),
  setSelectedTipCategory: (value) => set({ selectedTipCategory: value }),
  setEntries: (entries) => set({ entries }),
}));
