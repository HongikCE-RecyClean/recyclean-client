import { create } from "zustand";

// 사용자 정보 zustand 스토어 정의
interface UserState {
  name: string;
  setName: (value: string) => void;
}

// 사용자 이름 기본값과 갱신 함수 제공
export const useUserStore = create<UserState>((set) => ({
  name: "사용자",
  setName: (value) => set({ name: value }),
}));
