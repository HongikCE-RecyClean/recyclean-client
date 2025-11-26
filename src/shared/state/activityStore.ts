import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { z } from "zod";
import type { RecyclingEntry } from "shared/types/dashboard";
import { normalizeMaterialId } from "shared/utils/recyclingPoints";

// 활동 기록 상태 타입
interface ActivityState {
  entries: RecyclingEntry[];
  hasHydrated: boolean;
  addEntry: (entry: Omit<RecyclingEntry, "id">) => void;
  updateEntry: (id: string, updates: Partial<RecyclingEntry>) => void;
  deleteEntry: (id: string) => void;
  setEntries: (entries: RecyclingEntry[]) => void;
  clearAllEntries: () => void;
  setHydrated: (value: boolean) => void;
}

// UUID 생성 함수 (간단한 버전)
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

type PersistedRecyclingEntry = Omit<RecyclingEntry, "date"> & { date: Date | string };

function normalizeDate(value: Date | string): Date {
  return value instanceof Date ? value : new Date(value);
}

const MAX_ACTIVITY_ENTRIES = 10000;

const activityEntrySchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  amount: z.coerce.number().nonnegative().default(0),
  points: z.coerce.number().default(0),
  date: z.union([z.string(), z.date()]),
  mode: z.enum(["record", "plan"]).optional(),
  planId: z.number().optional(),
  completed: z.boolean().optional(),
  detectedByAi: z.boolean().optional(),
  memo: z.string().optional(),
});

const persistedActivitySchema = z.object({
  entries: z.array(activityEntrySchema).default([]),
});

function normalizeEntries(entries: PersistedRecyclingEntry[] = []): RecyclingEntry[] {
  const seen = new Set<string>();

  return entries
    .map((entry) => {
      const id = entry.id ?? generateId();
      const date = normalizeDate(entry.date);
      return {
        ...entry,
        id,
        type: normalizeMaterialId(entry.type),
        mode: entry.mode ?? "record",
        date,
      };
    })
    .filter((entry) => {
      if (!Number.isFinite(entry.date.getTime())) {
        return false;
      }
      if (seen.has(entry.id)) {
        return false;
      }
      seen.add(entry.id);
      return true;
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, MAX_ACTIVITY_ENTRIES);
}

// 활동 기록 zustand 스토어 (localStorage 지속성 포함)
export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      entries: [],
      hasHydrated: false,

      // 새 활동 추가
      addEntry: (entry) =>
        set((state) => ({
          entries: [
            {
              ...entry,
              type: normalizeMaterialId(entry.type),
              mode: entry.mode ?? "record",
              date: normalizeDate(entry.date),
              id: generateId(),
            },
            ...state.entries,
          ],
        })),

      // 활동 수정
      updateEntry: (id, updates) =>
        set((state) => ({
          entries: state.entries.map((entry) => {
            if (entry.id !== id) {
              return entry;
            }
            const nextEntry = {
              ...entry,
              ...updates,
              type: updates.type ? normalizeMaterialId(updates.type) : entry.type,
            };
            if (updates.date) {
              nextEntry.date = normalizeDate(updates.date);
            }
            if (!nextEntry.mode) {
              nextEntry.mode = "record";
            }
            return nextEntry;
          }),
        })),

      // 활동 삭제
      deleteEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        })),

      // 전체 활동 교체 (초기 데이터 로드 등에 사용)
      setEntries: (entries) =>
        set({
          entries: entries.map((entry) => ({
            ...entry,
            type: normalizeMaterialId(entry.type),
            mode: entry.mode ?? "record",
            date: normalizeDate(entry.date),
          })),
        }),

      // 모든 활동 삭제 (데이터 초기화)
      clearAllEntries: () => set({ entries: [] }),

      // 하이드레이션 완료 플래그
      setHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "recyclean:v2:activities",
      storage: createJSONStorage(() => localStorage),
      version: 4,
      merge: (persistedState, currentState) => {
        const parsed = persistedActivitySchema.safeParse(persistedState ?? {});
        if (!parsed.success) {
          console.warn("activityStore: persisted state invalid, falling back to defaults");
          return currentState;
        }
        const entries = normalizeEntries(parsed.data.entries as PersistedRecyclingEntry[]);
        return {
          ...currentState,
          entries,
        };
      },
      migrate: (persistedState) => {
        if (!persistedState) {
          return persistedState;
        }
        const parsed = persistedActivitySchema.safeParse(persistedState);
        if (!parsed.success) {
          return undefined;
        }
        const state = parsed.data;
        return {
          entries: normalizeEntries(state.entries as PersistedRecyclingEntry[]),
        } satisfies Partial<ActivityState>;
      },
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("activityStore hydration failed", error);
        }
        state?.setHydrated(true);
      },
    },
  ),
);
