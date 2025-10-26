import type { BadgeTone } from "../../../shared/ui/Badge/Badge";

// 월간 통계 값을 표현하는 타입 정의
export type CalendarMonthlyStats = {
  totalRecords: number;
  totalItems: number;
  totalPoints: number;
  activeDays: number;
};

// 범례 행 구성을 위한 타입 정의
export type CalendarLegendItem = {
  type: string;
  tone: BadgeTone;
  count: number;
  points: number;
};
