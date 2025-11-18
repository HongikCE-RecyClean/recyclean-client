import { isSameDay } from "date-fns";
import type { RecyclingEntry } from "shared/types/dashboard";

/**
 * 사용자 전체 통계 인터페이스
 */
export interface UserStats {
  totalPoints: number; // 총 획득 포인트
  itemsRecycled: number; // 재활용한 아이템 수
  joinDate: string; // 가입 날짜 (ISO 문자열)
  streakDays: number; // 연속 기록 일수
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
  // 총 포인트 계산
  const totalPoints = entries.reduce((sum, entry) => sum + entry.points, 0);

  // 총 아이템 수 계산
  const itemsRecycled = entries.reduce((sum, entry) => sum + entry.amount, 0);

  // 재활용한 카테고리 종류 수 계산
  const categoryCount = new Set(entries.map((entry) => entry.type)).size;

  return { totalPoints, itemsRecycled, categoryCount };
}

/**
 * 연속 기록 일수 계산
 * 오늘부터 거슬러 올라가며 연속으로 기록이 있는 날 수를 계산
 */
export function calculateStreakDays(entries: RecyclingEntry[]): number {
  if (entries.length === 0) return 0;

  // 날짜별로 그룹화 (Date 객체를 정렬 가능한 형태로 변환)
  const datesWithEntries = new Set(
    entries.map((entry) => {
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

  // 오늘 기록된 활동만 필터링
  const todayEntries = entries.filter((entry) => {
    const entryDate = entry.date instanceof Date ? entry.date : new Date(entry.date);
    return isSameDay(entryDate, today);
  });

  // 오늘의 아이템 수 계산
  const itemsRecycled = todayEntries.reduce((sum, entry) => sum + entry.amount, 0);

  // 오늘의 포인트 계산
  const pointsEarned = todayEntries.reduce((sum, entry) => sum + entry.points, 0);

  // 연속 일수 계산
  const streakDays = calculateStreakDays(entries);

  return { itemsRecycled, pointsEarned, streakDays };
}

/**
 * 사용자 전체 통계 계산
 * entries와 가입 날짜를 기반으로 UserStats 객체 생성
 */
export function calculateUserStats(entries: RecyclingEntry[], joinDate: string | null): UserStats {
  const { totalPoints, itemsRecycled } = calculateTotalStats(entries);
  const streakDays = calculateStreakDays(entries);

  return {
    totalPoints,
    itemsRecycled,
    joinDate: joinDate || new Date().toISOString(),
    streakDays,
  };
}
