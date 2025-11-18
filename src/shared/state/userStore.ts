import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const DEFAULT_USER_NAME = "사용자"; // 기본 닉네임 상수로 유지
const getNowIsoString = () => new Date().toISOString(); // 현재 시각 ISO 문자열 헬퍼

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
      name: DEFAULT_USER_NAME,
      region: "kr",
      joinedAt: getNowIsoString(),
      setName: (value) =>
        set((state) => ({
          name: value,
          // 첫 이름 설정 시 joinedAt 자동 설정
          joinedAt: state.joinedAt || new Date().toISOString(),
        })),
      setRegion: (value) => set({ region: value }),
      // 사용자 데이터 초기화 (기본 상태로 복귀)
      clearUserData: () =>
        set({
          name: DEFAULT_USER_NAME,
          region: "kr",
          joinedAt: getNowIsoString(),
        }),
    }),
    {
      name: "recyclean-user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
