// 쿼리 키 묶음
export const queryKeys = {
  dashboard: {
    all: ["dashboard"] as const,
    data: () => [...queryKeys.dashboard.all, "data"] as const,
  },
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
};
