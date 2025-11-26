// ============================================================
// API 모듈 통합 export
// ============================================================

// 공통 타입
export * from "./types";

// 쿼리 키
export { queryKeys } from "./queryKeys";

// HTTP 클라이언트
export { apiClient, HttpClient } from "./client";
export type { HttpRequestOptions } from "./client";

// API 설정
export { buildApiUrl, getApiBaseUrl } from "./config";

// 에러 처리
export { ApiError } from "./errors";

// ============================================================
// 도메인별 API 모듈
// ============================================================

// 인증
export { getKakaoLoginUrl, loginWithKakao, reissueToken, useKakaoLogin } from "./auth";

// 대시보드
export { fetchDashboardSummary, useDashboardSummary } from "./dashboard";

// 재활용 계획
export {
  createPlan,
  fetchPlans,
  fetchPlan,
  updatePlan,
  deletePlan,
  completePlan,
  fetchCompletedPlans,
  updateMonthlyGoal,
  usePlans,
  usePlan,
  useCompletedPlans,
  useCreatePlan,
  useUpdatePlan,
  useDeletePlan,
  useCompletePlan,
  useUpdateMonthlyGoal,
} from "./plans";

// 카테고리
export { fetchCategories, useCategories } from "./categories";

// AI 분석
export { requestAiLabeling } from "./analyze";

// 회원
export { fetchMyProfile, updateNickname, useMyProfile, useUpdateNickname } from "./members";
