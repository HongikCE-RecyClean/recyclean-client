import type { BadgeTone } from "shared/ui/Badge/Badge";

// 대시보드 활동 항목 타입
export interface RecentActivityItem {
  type: string;
  count: number;
  points: number;
  time: string;
}

// 대시보드 업적 항목 타입
export interface AchievementItem {
  title: string;
  description: string;
  earned: boolean;
}

// 재활용 재료 항목 타입
export interface MaterialItemData {
  name: string;
  recyclable: boolean;
  category: string;
  instructions: string;
  tips?: string;
}

// 친환경 팁 항목 타입
export interface TipData {
  id: string;
  title: string;
  description: string;
  category: "reduce" | "reuse" | "recycle" | "energy";
  impact: "high" | "medium" | "low";
  difficulty: "easy" | "moderate" | "hard";
  image: string;
}

// 지속가능성 목표 타입
export interface GoalData {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
}

// 재활용 기록 타입
export interface RecyclingEntry {
  id: string;
  type: string;
  amount: number;
  date: Date;
  points: number;
}

// 대시보드 데이터 묶음 타입
export interface DashboardData {
  todayStats: {
    itemsRecycled: number;
    pointsEarned: number;
    streakDays: number;
  };
  recentActivity: RecentActivityItem[];
  achievements: AchievementItem[];
  materials: MaterialItemData[];
  tips: TipData[];
  goals: GoalData[];
  entries: RecyclingEntry[];
}

// 팁 배지 톤 계산 함수
export function resolveTipTone(category: string): BadgeTone {
  switch (category) {
    case "reduce":
      return "danger";
    case "reuse":
      return "info";
    case "recycle":
      return "success";
    case "energy":
      return "warning";
    default:
      return "neutral";
  }
}
