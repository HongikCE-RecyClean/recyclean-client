import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { RecyclingEntry } from "shared/types/dashboard";

// 활동 기록 상태 타입
interface ActivityState {
  entries: RecyclingEntry[];
  addEntry: (entry: Omit<RecyclingEntry, "id">) => void;
  updateEntry: (id: string, updates: Partial<RecyclingEntry>) => void;
  deleteEntry: (id: string) => void;
  setEntries: (entries: RecyclingEntry[]) => void;
  clearAllEntries: () => void;
}

// UUID 생성 함수 (간단한 버전)
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// 활동 기록 zustand 스토어 (localStorage 지속성 포함)
export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      entries: [],

      // 새 활동 추가
      addEntry: (entry) =>
        set((state) => ({
          entries: [
            {
              ...entry,
              id: generateId(),
            },
            ...state.entries,
          ],
        })),

      // 활동 수정
      updateEntry: (id, updates) =>
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.id === id ? { ...entry, ...updates } : entry,
          ),
        })),

      // 활동 삭제
      deleteEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        })),

      // 전체 활동 교체 (초기 데이터 로드 등에 사용)
      setEntries: (entries) => set({ entries }),

      // 모든 활동 삭제 (데이터 초기화)
      clearAllEntries: () => set({ entries: [] }),
    }),
    {
      name: "recyclean-activities",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
