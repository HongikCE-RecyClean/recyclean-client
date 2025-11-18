import { useCallback, useEffect, useMemo, useState } from "react";
import { format, isSameMonth, startOfMonth, type Locale } from "date-fns";
import { enUS, es, fr, ko as koLocale } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import type { BadgeTone } from "../../shared/ui/Badge/Badge";
import { useActivityStore } from "../../shared/state/activityStore";
import { useNotificationStore } from "../../shared/state/notificationStore";
import type { RecyclingEntry } from "../../shared/types/dashboard";
import * as S from "./CalendarPage.styles";
import {
  CalendarEntriesCard,
  CalendarLegendCard,
  CalendarOverviewCard,
  type CalendarLegendItem,
  type CalendarMonthlyStats,
} from "./components";
import { normalizeLanguage, type SupportedLanguage } from "shared/i18n/supportedLanguages";

// 범례 배지 색상 순서를 정의
const tonePalette: BadgeTone[] = ["primary", "success", "info", "warning", "danger"];

// 날짜를 월-일 문자열로 정규화하는 함수 정의
function formatDateKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}

// 월과 연도를 현지화 문자열로 변환하는 함수 정의
function formatMonthLabel(month: Date, localeTag: string) {
  return new Intl.DateTimeFormat(localeTag, {
    year: "numeric",
    month: "long",
  }).format(month);
}

// 선택 일자를 전체 형식 문자열로 변환하는 함수 정의
function formatSelectedDateLabel(date: Date, localeTag: string) {
  return new Intl.DateTimeFormat(localeTag, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

export function CalendarPage() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const localeTagMap: Record<SupportedLanguage, string> = {
    en: "en-US",
    ko: "ko-KR",
    es: "es-ES",
    fr: "fr-FR",
  };
  const dateLocaleMap: Record<SupportedLanguage, Locale> = {
    en: enUS,
    ko: koLocale,
    es,
    fr,
  };
  const intlLocale = localeTagMap[language];
  const dateLocale = dateLocaleMap[language];

  // 활동 기록 스토어에서 entries와 deleteEntry 로드
  const { entries, deleteEntry, addEntry } = useActivityStore();
  const { showSnackbar, showBanner, closeBanner } = useNotificationStore();
  const [currentMonth, setCurrentMonth] = useState<Date>(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

  useEffect(() => {
    // 달력 가이드 문구를 상단 배너로 노출
    const guideItems = t("calendar.guide.items", { returnObjects: true }) as string[];
    const guideMessage = [t("calendar.guide.title"), ...guideItems].join(" · ");
    const bannerId = showBanner({
      type: "info",
      message: guideMessage,
    });

    return () => {
      closeBanner(bannerId);
    };
  }, [t, showBanner, closeBanner, language]);

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

  const selectedDateLabel = formatSelectedDateLabel(selectedDate, intlLocale);
  const currentMonthLabel = formatMonthLabel(currentMonth, intlLocale);

  // 날짜 선택에 따른 상태 갱신 처리
  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setCurrentMonth(startOfMonth(date));
  }, []);

  // 월 변경 이벤트 처리를 별도 콜백으로 추출
  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(startOfMonth(month));
  }, []);

  // 삭제 처리 with 실행취소 스낵바
  const handleDelete = useCallback(
    (id: string) => {
      // 삭제 전 백업
      const backup = entries.find((e) => e.id === id);
      if (!backup) return;

      // 삭제 실행
      deleteEntry(id);

      // 실행취소 스낵바 표시
      showSnackbar(t("notifications.snackbar.entryDeleted"), {
        type: "success",
        duration: 5000,
        action: {
          label: t("notifications.actions.undo"),
          onClick: () => {
            addEntry(backup);
            showSnackbar(t("notifications.snackbar.entryRestored"), {
              type: "info",
              duration: 2000,
            });
          },
        },
      });
    },
    [entries, deleteEntry, addEntry, showSnackbar, t],
  );

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
      <CalendarEntriesCard
        selectedDateLabel={selectedDateLabel}
        entries={selectedEntries}
        timeLocale={dateLocale}
        onDelete={handleDelete}
      />
    </S.PageContainer>
  );
}
