import { useCallback, useMemo, useState } from "react";
import { format, isSameMonth, startOfMonth } from "date-fns";
import type { BadgeTone } from "../../shared/ui/Badge/Badge";
import { useDashboardStore } from "../../shared/state/dashboardStore";
import type { RecyclingEntry } from "../../shared/data/dashboard";
import * as S from "./CalendarPage.styles";
import {
  CalendarEntriesCard,
  CalendarGuideCard,
  CalendarLegendCard,
  CalendarOverviewCard,
  type CalendarLegendItem,
  type CalendarMonthlyStats,
} from "./components";

// 범례 배지 색상 순서를 정의
const tonePalette: BadgeTone[] = ["primary", "success", "info", "warning", "danger"];

// 날짜를 월-일 문자열로 정규화하는 함수 정의
function formatDateKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}

// 월과 연도를 한국어 문자열로 변환하는 함수 정의
function formatMonthLabel(month: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
  }).format(month);
}

// 선택 일자를 전체 형식 문자열로 변환하는 함수 정의
function formatSelectedDateLabel(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

export function CalendarPage() {
  const entries = useDashboardStore((state) => state.entries);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

  // 날짜별 레코드 맵 생성
  const entriesByDate = useMemo(() => {
    const map = new Map<string, RecyclingEntry[]>();
    entries.forEach((entry) => {
      const key = formatDateKey(entry.date);
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(entry);
    });
    return map;
  }, [entries]);

  // 레코드가 존재하는 날짜 목록 생성
  const daysWithEntries = useMemo(() => {
    const unique = new Map<string, Date>();
    entries.forEach((entry) => {
      const key = formatDateKey(entry.date);
      if (!unique.has(key)) {
        unique.set(key, entry.date);
      }
    });
    return Array.from(unique.values());
  }, [entries]);

  // 현재 월에 속한 레코드 목록 계산
  const monthlyEntries = useMemo(() => {
    return entries.filter((entry) => isSameMonth(entry.date, currentMonth));
  }, [entries, currentMonth]);

  // 현재 월 기준 통계 계산
  const monthlyStats: CalendarMonthlyStats = useMemo(() => {
    const totalRecords = monthlyEntries.length;
    const totalItems = monthlyEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const totalPoints = monthlyEntries.reduce((sum, entry) => sum + entry.points, 0);
    const activeDays = new Set(monthlyEntries.map((entry) => formatDateKey(entry.date))).size;
    return { totalRecords, totalItems, totalPoints, activeDays };
  }, [monthlyEntries]);

  // 현재 월 기준 품목 범례 생성
  const materialLegend: CalendarLegendItem[] = useMemo(() => {
    const counts = new Map<string, { count: number; points: number }>();
    monthlyEntries.forEach((entry) => {
      const key = entry.type;
      const prev = counts.get(key) ?? { count: 0, points: 0 };
      counts.set(key, { count: prev.count + entry.amount, points: prev.points + entry.points });
    });

    const uniqueTypes = Array.from(counts.keys()).sort((a, b) => a.localeCompare(b));
    const legendRows = uniqueTypes.map((type, index) => {
      const tone = tonePalette[index % tonePalette.length];
      const stats = counts.get(type)!;
      return { type, tone, ...stats };
    });

    return legendRows;
  }, [monthlyEntries]);

  const selectedEntries = useMemo(() => {
    const key = formatDateKey(selectedDate);
    return entriesByDate.get(key) ?? [];
  }, [entriesByDate, selectedDate]);

  const modifiers = useMemo(
    () => ({
      hasEntry: daysWithEntries,
    }),
    [daysWithEntries],
  );

  const selectedDateLabel = formatSelectedDateLabel(selectedDate);
  const currentMonthLabel = formatMonthLabel(currentMonth);

  // 날짜 선택에 따른 상태 갱신 처리
  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setCurrentMonth(startOfMonth(date));
  }, []);

  // 월 변경 이벤트 처리를 별도 콜백으로 추출
  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(startOfMonth(month));
  }, []);

  return (
    <S.PageContainer>
      {/* 달력과 월간 요약을 전담 카드로 분리 */}
      <CalendarOverviewCard
        currentMonth={currentMonth}
        currentMonthLabel={currentMonthLabel}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
        onChangeMonth={handleMonthChange}
        modifiers={modifiers}
        monthlyStats={monthlyStats}
      />

      {/* 월별 범례 정보를 하위 컴포넌트로 전달 */}
      <CalendarLegendCard items={materialLegend} />

      {/* 선택 날짜의 기록 상세를 독립 카드로 표현 */}
      <CalendarEntriesCard selectedDateLabel={selectedDateLabel} entries={selectedEntries} />

      {/* 안내 문구를 전용 카드로 유지 */}
      <CalendarGuideCard />
    </S.PageContainer>
  );
}
