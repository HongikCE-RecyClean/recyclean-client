// 쿼리 키 묶음
export const queryKeys = {
  map: {
    all: ["map"] as const,
    data: () => [...queryKeys.map.all, "data"] as const,
  },
  analyze: {
    all: ["analyze"] as const,
    result: () => [...queryKeys.analyze.all, "result"] as const,
  },
  settings: {
    all: ["settings"] as const,
    profile: () => [...queryKeys.settings.all, "profile"] as const,
    preferences: () => [...queryKeys.settings.all, "preferences"] as const,
  },
  auth: {
    all: ["auth"] as const,
    session: () => [...queryKeys.auth.all, "session"] as const,
  },
};
