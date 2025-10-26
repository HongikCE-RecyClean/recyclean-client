import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isSameMonth, startOfMonth } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar, ListTodo, PieChart, Recycle } from "lucide-react";
import type { BadgeTone } from "../../shared/ui/Badge/Badge";
import { Badge } from "../../shared/ui/Badge/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/Card/Card";
import { useDashboardStore } from "../../shared/state/dashboardStore";
import type { RecyclingEntry } from "../../shared/data/dashboard";
import * as S from "./CalendarPage.styles";

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
  const monthlyStats = useMemo(() => {
    const totalRecords = monthlyEntries.length;
    const totalItems = monthlyEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const totalPoints = monthlyEntries.reduce((sum, entry) => sum + entry.points, 0);
    const activeDays = new Set(monthlyEntries.map((entry) => formatDateKey(entry.date))).size;
    return { totalRecords, totalItems, totalPoints, activeDays };
  }, [monthlyEntries]);

  // 현재 월 기준 품목 범례 생성
  const materialLegend = useMemo(() => {
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

  return (
    <S.PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>
            <Calendar size={18} />
            {currentMonthLabel} 기록 달력
          </CardTitle>
        </CardHeader>
        <S.CalendarContent>
          <S.DayPickerWrapper>
            <DayPicker
              mode="single"
              weekStartsOn={1}
              month={currentMonth}
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  setSelectedDate(date);
                  setCurrentMonth(startOfMonth(date));
                }
              }}
              onMonthChange={(month) => setCurrentMonth(startOfMonth(month))}
              modifiers={modifiers}
              modifiersClassNames={{ hasEntry: "calendar-has-entry" }}
              captionLayout="buttons"
              showOutsideDays
            />
          </S.DayPickerWrapper>

          <S.StatsGrid>
            <S.StatBlock>
              <S.StatValue>{monthlyStats.totalRecords}</S.StatValue>
              <S.StatLabel>총 기록 수</S.StatLabel>
            </S.StatBlock>
            <S.StatBlock>
              <S.StatValue>{monthlyStats.totalItems}</S.StatValue>
              <S.StatLabel>총 수거량</S.StatLabel>
            </S.StatBlock>
            <S.StatBlock>
              <S.StatValue>{monthlyStats.totalPoints} pts</S.StatValue>
              <S.StatLabel>획득 포인트</S.StatLabel>
            </S.StatBlock>
          </S.StatsGrid>
        </S.CalendarContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <PieChart size={18} />
            품목 범례
          </CardTitle>
        </CardHeader>
        <CardContent>
          {materialLegend.length > 0 ? (
            <S.LegendList>
              {materialLegend.map((item) => (
                <S.LegendItem key={item.type}>
                  <S.LegendLabel>
                    <Badge tone={item.tone}>{item.type}</Badge>
                  </S.LegendLabel>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 600 }}>{item.count}개</div>
                    <div style={{ color: "#64748b", fontSize: "0.8rem" }}>+{item.points} pts</div>
                  </div>
                </S.LegendItem>
              ))}
            </S.LegendList>
          ) : (
            <S.EmptyState>이 달에는 아직 기록이 없어요.</S.EmptyState>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <ListTodo size={18} />
            {selectedDateLabel} 기록
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedEntries.length > 0 ? (
            <S.RecordList>
              {selectedEntries.map((entry) => (
                <S.RecordItem key={entry.id}>
                  <S.RecordInfo>
                    <span style={{ fontWeight: 600 }}>{entry.type}</span>
                    <span style={{ color: "#64748b", fontSize: "0.85rem" }}>
                      {entry.amount}개 · {format(entry.date, "a h시 mm분", { locale: ko })}
                    </span>
                  </S.RecordInfo>
                  <S.RecordPoints>+{entry.points} pts</S.RecordPoints>
                </S.RecordItem>
              ))}
            </S.RecordList>
          ) : (
            <S.EmptyState>선택한 날짜에는 기록이 없어요.</S.EmptyState>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Recycle size={18} />
            기록 관리 가이드
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "#475569", fontSize: "0.9rem" }}>
            <li>기록은 월별 통계에 자동 반영돼요.</li>
            <li>분석 화면에서 새 기록을 추가하면 달력에 표시돼요.</li>
            <li>기록이 많은 날은 달력 점 표시로 확인할 수 있어요.</li>
          </ul>
        </CardContent>
      </Card>
    </S.PageContainer>
  );
}
