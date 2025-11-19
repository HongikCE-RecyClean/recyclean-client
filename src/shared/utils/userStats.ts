import { isSameDay } from "date-fns";
import type { MaterialId } from "shared/utils/recyclingPoints";
import type { RecyclingEntry } from "shared/types/dashboard";

function filterRecordedEntries(entries: RecyclingEntry[]): RecyclingEntry[] {
  return entries.filter((entry) => (entry.mode ?? "record") === "record");
}

/**
 * 사용자 전체 통계 인터페이스
 */
export interface UserStats {
  totalPoints: number; // 총 획득 포인트
  itemsRecycled: number; // 재활용한 아이템 수
  joinDate: string; // 가입 날짜 (ISO 문자열)
  streakDays: number; // 연속 기록 일수
  level: number; // 현재 레벨
  nextLevelPoints: number; // 다음 레벨까지 필요한 포인트
  levelProgress: number; // 현재 레벨 내 진행률 (0-100)
}

/**
 * 오늘의 통계 인터페이스
 */
export interface TodayStats {
  itemsRecycled: number; // 오늘 재활용한 아이템 수
  pointsEarned: number; // 오늘 획득한 포인트
  streakDays: number; // 연속 기록 일수
}

/**
 * 전체 통계 계산
 * entries 배열로부터 총 포인트와 아이템 수를 계산
 */
export function calculateTotalStats(entries: RecyclingEntry[]): {
  totalPoints: number;
  itemsRecycled: number;
  categoryCount: number;
} {
  const recordedEntries = filterRecordedEntries(entries);
  // 총 포인트 계산
  const totalPoints = recordedEntries.reduce((sum, entry) => sum + entry.points, 0);

  // 총 아이템 수 계산
  const itemsRecycled = recordedEntries.reduce((sum, entry) => sum + entry.amount, 0);

  // 재활용한 카테고리 종류 수 계산
  const categoryCount = new Set(recordedEntries.map((entry) => entry.type)).size;

  return { totalPoints, itemsRecycled, categoryCount };
}

/**
 * 연속 기록 일수 계산
 * 오늘부터 거슬러 올라가며 연속으로 기록이 있는 날 수를 계산
 */
export function calculateStreakDays(entries: RecyclingEntry[]): number {
  const recordedEntries = filterRecordedEntries(entries);
  if (recordedEntries.length === 0) return 0;

  // 날짜별로 그룹화 (Date 객체를 정렬 가능한 형태로 변환)
  const datesWithEntries = new Set(
    recordedEntries.map((entry) => {
      const date = entry.date instanceof Date ? entry.date : new Date(entry.date);
      return date.toISOString().split("T")[0]; // YYYY-MM-DD 형식
    }),
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  const currentDate = new Date(today);

  // 오늘부터 거슬러 올라가며 연속 일수 확인
  while (true) {
    const dateStr = currentDate.toISOString().split("T")[0];

    if (datesWithEntries.has(dateStr)) {
      streak++;
      // 하루 전으로 이동
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

/**
 * 오늘의 통계 계산
 * 오늘 기록된 활동만 필터링하여 통계 계산
 */
export function calculateTodayStats(entries: RecyclingEntry[]): TodayStats {
  const today = new Date();
  const recordedEntries = filterRecordedEntries(entries);

  // 오늘 기록된 활동만 필터링
  const todayEntries = recordedEntries.filter((entry) => {
    const entryDate = entry.date instanceof Date ? entry.date : new Date(entry.date);
    return isSameDay(entryDate, today);
  });

  // 오늘의 아이템 수 계산
  const itemsRecycled = todayEntries.reduce((sum, entry) => sum + entry.amount, 0);

  // 오늘의 포인트 계산
  const pointsEarned = todayEntries.reduce((sum, entry) => sum + entry.points, 0);

  // 연속 일수 계산
  const streakDays = calculateStreakDays(recordedEntries);

  return { itemsRecycled, pointsEarned, streakDays };
}

/**
 * 레벨 정보 인터페이스
 */
export interface LevelInfo {
  level: number; // 현재 레벨
  nextLevelPoints: number; // 다음 레벨까지 필요한 포인트
  levelProgress: number; // 현재 레벨 내 진행률 (0-100)
}

/**
 * 포인트 기반 레벨 계산
 * 100pt = 1레벨 기준으로 계산
 */
export function calculateLevel(totalPoints: number): LevelInfo {
  const POINTS_PER_LEVEL = 100;

  // 현재 레벨 계산 (정수 부분)
  const level = Math.floor(totalPoints / POINTS_PER_LEVEL);

  // 현재 레벨에서의 포인트 (나머지)
  const pointsInCurrentLevel = totalPoints % POINTS_PER_LEVEL;

  // 다음 레벨까지 필요한 포인트
  const nextLevelPoints = POINTS_PER_LEVEL - pointsInCurrentLevel;

  // 현재 레벨 내 진행률 (0-100)
  const levelProgress = (pointsInCurrentLevel / POINTS_PER_LEVEL) * 100;

  return {
    level,
    nextLevelPoints,
    levelProgress,
  };
}

/**
 * 카테고리별 통계 인터페이스
 */
export interface CategoryStats {
  type: MaterialId; // 재활용 품목 종류
  count: number; // 재활용한 개수
  points: number; // 획득한 포인트
}

/**
 * 카테고리별 통계 계산
 * entries를 카테고리별로 그룹화하여 개수와 포인트 집계
 */
export function calculateCategoryStats(entries: RecyclingEntry[]): CategoryStats[] {
  const recordedEntries = filterRecordedEntries(entries);
  // 카테고리별로 그룹화
  const categoryMap = new Map<MaterialId, { count: number; points: number }>();

  recordedEntries.forEach((entry) => {
    const existing = categoryMap.get(entry.type) || { count: 0, points: 0 };
    categoryMap.set(entry.type, {
      count: existing.count + entry.amount,
      points: existing.points + entry.points,
    });
  });

  // Map을 배열로 변환하고 포인트 기준 내림차순 정렬
  return Array.from(categoryMap.entries())
    .map(([type, stats]) => ({
      type,
      count: stats.count,
      points: stats.points,
    }))
    .sort((a, b) => b.points - a.points);
}

/**
 * 사용자 전체 통계 계산
 * entries와 가입 날짜를 기반으로 UserStats 객체 생성
 */
export function calculateUserStats(entries: RecyclingEntry[], joinDate: string | null): UserStats {
  const { totalPoints, itemsRecycled } = calculateTotalStats(entries);
  const streakDays = calculateStreakDays(entries);
  const { level, nextLevelPoints, levelProgress } = calculateLevel(totalPoints);

  return {
    totalPoints,
    itemsRecycled,
    joinDate: joinDate || new Date().toISOString(),
    streakDays,
    level,
    nextLevelPoints,
    levelProgress,
  };
}
