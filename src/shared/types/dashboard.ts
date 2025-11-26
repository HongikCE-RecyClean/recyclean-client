import type { BadgeTone } from "shared/ui/Badge/Badge";
import type { MaterialId } from "shared/utils/recyclingPoints";

// 대시보드 활동 항목 타입
export interface RecentActivityItem {
  // 항목 고유 식별자
  id: string;
  type: MaterialId;
  count: number;
  points: number;
  time: string;
  mode?: EntryMode;
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
export type EntryMode = "record" | "plan";

export interface RecyclingEntry {
  id: string;
  type: MaterialId;
  amount: number;
  date: Date;
  points: number;
  mode?: EntryMode;
  // 서버 Plan ID (API 연동 시 사용)
  planId?: number;
  // 계획 완료 여부
  completed?: boolean;
  // AI 감지 여부 (분석 페이지에서 생성된 항목)
  detectedByAi?: boolean;
  // 메모 (계획에 첨부된 메모)
  memo?: string;
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
