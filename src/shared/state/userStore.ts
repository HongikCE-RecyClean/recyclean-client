import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { z } from "zod";

const DEFAULT_USER_NAME = "사용자"; // 기본 닉네임 상수로 유지
const getNowIsoString = () => new Date().toISOString(); // 현재 시각 ISO 문자열 헬퍼

// 사용자 정보 zustand 스토어 정의
interface UserState {
  name: string;
  region: string;
  joinedAt: string | null; // ISO 날짜 문자열
  isOnboarded: boolean;
  hasHydrated: boolean;
  setName: (value: string) => void;
  setRegion: (value: string) => void;
  completeOnboarding: () => void;
  clearUserData: () => void; // 데이터 초기화용
  setHydrated: (value: boolean) => void;
}

const createDefaultState = () => ({
  name: DEFAULT_USER_NAME,
  region: "kr",
  joinedAt: null,
  isOnboarded: false,
  hasHydrated: false,
});

const userPersistSchema = z.object({
  name: z.string().trim().min(1).catch(DEFAULT_USER_NAME),
  region: z.string().trim().min(1).catch("kr"),
  joinedAt: z.string().datetime().or(z.string().trim().min(1)).or(z.null()).optional().catch(null),
  isOnboarded: z.boolean().catch(false),
});

function sanitizeUserState(state: unknown) {
  const parsed = userPersistSchema.safeParse(state ?? {});
  if (!parsed.success) {
    return createDefaultState();
  }
  const joinedAtValue = parsed.data.joinedAt;
  const joinedAt =
    typeof joinedAtValue === "string" && !Number.isNaN(Date.parse(joinedAtValue))
      ? joinedAtValue
      : null;
  return {
    name: parsed.data.name || DEFAULT_USER_NAME,
    region: parsed.data.region || "kr",
    joinedAt,
    isOnboarded: parsed.data.isOnboarded ?? false,
  };
}

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
      setHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "recyclean:v2:user",
      storage: createJSONStorage(() => localStorage),
      version: 2,
      merge: (persistedState, currentState) => {
        const sanitized = sanitizeUserState(persistedState);
        return {
          ...currentState,
          ...sanitized,
        };
      },
      migrate: (persistedState) => sanitizeUserState(persistedState),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("userStore hydration failed", error);
        }
        state?.setHydrated(true);
      },
    },
  ),
);
