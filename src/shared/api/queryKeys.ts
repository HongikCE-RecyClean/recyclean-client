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
};
