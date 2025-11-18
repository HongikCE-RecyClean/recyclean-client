import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const DEFAULT_USER_NAME = "사용자"; // 기본 닉네임 상수로 유지
const getNowIsoString = () => new Date().toISOString(); // 현재 시각 ISO 문자열 헬퍼

// 사용자 정보 zustand 스토어 정의
interface UserState {
  name: string;
  region: string;
  joinedAt: string | null; // ISO 날짜 문자열
  isOnboarded: boolean;
  setName: (value: string) => void;
  setRegion: (value: string) => void;
  completeOnboarding: () => void;
  clearUserData: () => void; // 데이터 초기화용
}

const createDefaultState = () => ({
  name: DEFAULT_USER_NAME,
  region: "kr",
  joinedAt: null,
  isOnboarded: false,
});

// 사용자 정보 zustand 스토어 (localStorage 지속성 포함)
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...createDefaultState(),
      setName: (value) =>
        set((state) => ({
          name: value,
          // 닉네임 변경 시 가입 일자 없으면 현재 시각 기록
          joinedAt: state.joinedAt || getNowIsoString(),
        })),
      setRegion: (value) => set({ region: value }),
      completeOnboarding: () =>
        set((state) => ({
          isOnboarded: true,
          joinedAt: state.joinedAt || getNowIsoString(),
        })),
      // 사용자 데이터 초기화 (기본 상태로 복귀)
      clearUserData: () => set(createDefaultState()),
    }),
    {
      name: "recyclean-user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
