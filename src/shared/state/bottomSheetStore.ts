import { create } from "zustand";

interface BottomSheetStore {
  activeSheetIds: string[];
  registerSheet: (id: string) => void;
  unregisterSheet: (id: string) => void;
}

export const useBottomSheetStore = create<BottomSheetStore>((set) => ({
  activeSheetIds: [],
  registerSheet: (id) =>
    set((state) =>
      state.activeSheetIds.includes(id) ? state : { activeSheetIds: [...state.activeSheetIds, id] },
    ),
  unregisterSheet: (id) =>
    set((state) => ({
      activeSheetIds: state.activeSheetIds.filter((sheetId) => sheetId !== id),
    })),
}));

export const selectIsAnySheetOpen = (state: BottomSheetStore) => state.activeSheetIds.length > 0;
