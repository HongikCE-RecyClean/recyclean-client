import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 사용자 정보 zustand 스토어 정의
interface UserState {
  name: string;
  region: string;
  joinedAt: string | null; // ISO 날짜 문자열
  setName: (value: string) => void;
  setRegion: (value: string) => void;
  clearUserData: () => void; // 데이터 초기화용
}

// 사용자 정보 zustand 스토어 (localStorage 지속성 포함)
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: "",
      region: "kr",
      joinedAt: null,
      setName: (value) =>
        set((state) => ({
          name: value,
          // 첫 이름 설정 시 joinedAt 자동 설정
          joinedAt: state.joinedAt || new Date().toISOString(),
        })),
      setRegion: (value) => set({ region: value }),
      // 사용자 데이터 초기화 (온보딩으로 돌아가기)
      clearUserData: () =>
        set({
          name: "",
          region: "kr",
          joinedAt: null,
        }),
    }),
    {
      name: "recyclean-user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
