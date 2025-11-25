// ============================================================
// React Query 쿼리 키 정의
// ============================================================

export const queryKeys = {
  // 인증 관련
  auth: {
    all: ["auth"] as const,
    session: () => [...queryKeys.auth.all, "session"] as const,
  },

  // 대시보드 (메인)
  dashboard: {
    all: ["dashboard"] as const,
    summary: () => [...queryKeys.dashboard.all, "summary"] as const,
  },

  // 재활용 계획
  plans: {
    all: ["plans"] as const,
    list: () => [...queryKeys.plans.all, "list"] as const,
    detail: (id: number) => [...queryKeys.plans.all, "detail", id] as const,
    completed: () => [...queryKeys.plans.all, "completed"] as const,
  },

  // 달력
  calendar: {
    all: ["calendar"] as const,
    list: () => [...queryKeys.calendar.all, "list"] as const,
    detail: (id: number) => [...queryKeys.calendar.all, "detail", id] as const,
  },

  // 카테고리
  categories: {
    all: ["categories"] as const,
    list: () => [...queryKeys.categories.all, "list"] as const,
    detail: (id: number) => [...queryKeys.categories.all, "detail", id] as const,
  },

  // AI 분석
  analyze: {
    all: ["analyze"] as const,
    result: () => [...queryKeys.analyze.all, "result"] as const,
  },

  // 지도
  map: {
    all: ["map"] as const,
    data: () => [...queryKeys.map.all, "data"] as const,
  },

  // 설정
  settings: {
    all: ["settings"] as const,
    profile: () => [...queryKeys.settings.all, "profile"] as const,
    preferences: () => [...queryKeys.settings.all, "preferences"] as const,
  },
};
