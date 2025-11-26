// ============================================================
// 공통 API 타입
// ============================================================

// API 응답 공통 타입
export interface ApiResponse<TData> {
  data: TData;
  status: number;
  headers: Headers;
}

// 페이지네이션 응답 템플릿
export interface PaginatedResponse<TItem> {
  items: TItem[];
  total: number;
  page: number;
  pageSize: number;
}

// API 요청 파라미터 기본 형태
export type ApiQueryParams = Record<string, string | number | boolean | undefined>;

// 공통 에러 응답 형태
export interface ApiErrorResponse {
  code?: number;
  status?: number;
  message?: string;
  detail?: string;
  data?: null;
}

// ============================================================
// 인증 (Auth) 타입
// ============================================================

// 소셜 로그인 타입
export type SocialType = "KAKAO";

// 인증 응답 (로그인/토큰 재발급)
export interface AuthResponse {
  memberId: number;
  socialType: SocialType;
  socialId: string;
  nickname: string;
  profileImageUrl: string;
  accessToken: string;
  refreshToken: string;
}

// 토큰 재발급 요청
export interface TokenReissueRequest {
  refreshToken: string;
}

// ============================================================
// 대시보드 (Dashboard) 타입
// ============================================================

// 대시보드 요약 응답
export interface DashboardSummary {
  todayItems: number;
  todayPoints: number;
  streakDays: number;
  totalItems: number;
  totalCategories: number;
  activityCount: number;
  planCount: number;
  myPoint: number;
  monthlyGoal: number;
  monthlyPoints: number;
  monthlyAchievementRate: number;
}

// ============================================================
// 카테고리 (Category) 타입
// ============================================================

// 카테고리 타입 enum
export type CategoryType =
  | "CAN"
  | "PAPER"
  | "PLASTIC"
  | "GLASS"
  | "GENERAL"
  | "ELECTRONICS"
  | "METAL"
  | "CLOTHING";

// 카테고리 응답
export interface Category {
  id: number;
  name: CategoryType | string;
  point: number;
}

// 카테고리 생성/수정 요청
export interface CategoryRequest {
  name: string;
  point?: string | number;
}

// 카테고리 삭제 응답
export interface CategoryDeleteResponse {
  message: string;
  id: number;
}

// ============================================================
// 재활용 계획 (Plan) 타입
// ============================================================

// 계획 아이템
export interface PlanItem {
  category: CategoryType;
  quantity: number;
  detectedByAi: boolean;
}

// 재활용 계획 응답
export interface Plan {
  id: number;
  date: string;
  time: string;
  memo: string;
  completed: boolean;
  createdAt: string;
  items: PlanItem[];
  planPoint?: number;
}

// 재활용 계획 생성 요청
export interface PlanCreateRequest {
  date: string;
  time: string;
  memo: string;
  items: PlanItem[];
}

// 재활용 계획 수정 요청
export interface PlanUpdateRequest {
  id: number;
  date: string;
  time: string;
  memo: string;
  completed: boolean;
  createdAt: string;
  items: PlanItem[];
}

// 재활용 완료 응답
export interface PlanCompleteResponse {
  plan: Plan;
  addedPoint: number;
  myPoint: number;
}

// 월간 목표 수정 요청
export interface MonthlyGoalRequest {
  monthlyGoal: number;
}

// 월간 목표 수정 응답
export interface MonthlyGoalResponse {
  memberId: number;
  monthlyGoal: number;
}

// ============================================================
// AI 분석 (Labeling) 타입
// ============================================================

// AI 예측 결과 (바운딩 박스 포함)
export interface AiPrediction {
  category: string;
  confidence: number;
  bbox: [number, number, number, number];
}

// AI 라벨링 응답
export interface AiLabelingResponse {
  predictions: AiPrediction[];
}

// ============================================================
// 달력 (Calendar) 타입
// ============================================================

// 달력 엔트리 (API 미정의, 기본 구조)
export interface CalendarEntry {
  id: number;
  date: string;
  plans: Plan[];
}

// ============================================================
// 회원 (Member) 타입
// ============================================================

// 회원 프로필 응답
export interface MemberProfile {
  memberId: number;
  socialType: SocialType;
  socialId: string;
  nickname: string;
  profileImageUrl: string;
}

// 닉네임 수정 요청
export interface NicknameUpdateRequest {
  nickname: string;
}

// 닉네임 수정 응답
export interface NicknameUpdateResponse {
  memberId: number;
  nickname: string;
}
