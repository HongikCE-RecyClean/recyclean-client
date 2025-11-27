import { useCallback, useEffect, useMemo, useState } from "react";
import { format, isSameMonth, startOfMonth, type Locale } from "date-fns";
import { enUS, es, fr, ko as koLocale } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import type { Formatters } from "react-day-picker";
import type { BadgeTone } from "../../shared/ui/Badge/Badge";
import { useNotificationStore } from "../../shared/state/notificationStore";
import type { RecyclingEntry } from "../../shared/types/dashboard";
import * as S from "./CalendarPage.styles";
import {
  CalendarEntriesCard,
  CalendarLegendCard,
  CalendarOverviewCard,
  EditPlanBottomSheet,
  type CalendarLegendItem,
  type CalendarMonthlyStats,
} from "./components";
import { normalizeLanguage, type SupportedLanguage } from "shared/i18n/supportedLanguages";
import type { MaterialId } from "shared/utils/recyclingPoints";
import { formatPlanDateTime } from "shared/utils/planUtils";
import { useCalendarData } from "./hooks";

// 범례 배지 색상 순서를 정의
const tonePalette: BadgeTone[] = ["primary", "success", "info", "warning", "danger"];

const MONTH_KEYS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

// 날짜를 월-일 문자열로 정규화하는 함수 정의
function formatDateKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}

// 월과 연도를 현지화 문자열로 변환하는 함수 정의
function formatMonthLabel(month: Date, t: TFunction) {
  const monthKey = MONTH_KEYS[month.getMonth()];
  const monthName = t(`calendar.monthNames.${monthKey}`);
  const year = format(month, "yyyy");
  return t("calendar.monthLabel", { month: monthName, year });
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

  // 달력 데이터 (API/로컬 하이브리드)
  const { entries, deleteEntry, addEntry, undoDelete, completePlan, updatePlan, source } =
    useCalendarData();
  const { recordedEntries, plannedEntries } = useMemo(() => {
    const completed: RecyclingEntry[] = [];
    const plannedList: RecyclingEntry[] = [];
    entries.forEach((entry) => {
      if ((entry.mode ?? "record") === "plan") {
        plannedList.push(entry);
      } else {
        completed.push(entry);
      }
    });
    return { recordedEntries: completed, plannedEntries: plannedList };
  }, [entries]);
  const { showSnackbar, showBanner, closeBanner } = useNotificationStore();
  const [currentMonth, setCurrentMonth] = useState<Date>(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

  // 편집 바텀시트 상태
  const [editingEntry, setEditingEntry] = useState<RecyclingEntry | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  useEffect(() => {
    // 달력 가이드 요약 배너
    const bannerId = showBanner({
      type: "info",
      message: t("calendar.guide.bannerMessage"),
      sessionKey: "calendar-guide",
    });

    if (!bannerId) {
      return undefined;
    }

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

  // 기록/계획이 존재하는 날짜 목록 생성
  const recordDays = useMemo(() => {
    const unique = new Map<string, Date>();
    recordedEntries.forEach((entry) => {
      const key = formatDateKey(entry.date);
      if (!unique.has(key)) {
        unique.set(key, entry.date);
      }
    });
    return Array.from(unique.values());
  }, [recordedEntries]);

  const planDays = useMemo(() => {
    const unique = new Map<string, Date>();
    plannedEntries.forEach((entry) => {
      const key = formatDateKey(entry.date);
      if (!unique.has(key)) {
        unique.set(key, entry.date);
      }
    });
    return Array.from(unique.values());
  }, [plannedEntries]);

  // 현재 월에 속한 기록/계획 목록 계산
  const monthlyRecordedEntries = useMemo(() => {
    return recordedEntries.filter((entry) => isSameMonth(entry.date, currentMonth));
  }, [recordedEntries, currentMonth]);

  const monthlyPlannedEntries = useMemo(() => {
    return plannedEntries.filter((entry) => isSameMonth(entry.date, currentMonth));
  }, [plannedEntries, currentMonth]);

  // 현재 월 기준 통계 계산
  const monthlyStats: CalendarMonthlyStats = useMemo(() => {
    const totalRecords = monthlyRecordedEntries.length;
    const totalItems = monthlyRecordedEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const totalPoints = monthlyRecordedEntries.reduce((sum, entry) => sum + entry.points, 0);
    const activeDays = new Set(monthlyRecordedEntries.map((entry) => formatDateKey(entry.date)))
      .size;
    const plannedCount = monthlyPlannedEntries.length;
    return { totalRecords, totalItems, totalPoints, activeDays, plannedCount };
  }, [monthlyRecordedEntries, monthlyPlannedEntries]);

  // 현재 월 기준 품목 범례 생성
  const materialLegend: CalendarLegendItem[] = useMemo(() => {
    const counts = new Map<MaterialId, { count: number; points: number }>();
    monthlyRecordedEntries.forEach((entry) => {
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
  }, [monthlyRecordedEntries]);

  const selectedEntries = useMemo(() => {
    const key = formatDateKey(selectedDate);
    return entriesByDate.get(key) ?? [];
  }, [entriesByDate, selectedDate]);

  const modifiers = useMemo(
    () => ({
      hasRecord: recordDays,
      hasPlan: planDays,
    }),
    [recordDays, planDays],
  );

  const selectedDateLabel = formatSelectedDateLabel(selectedDate, intlLocale);
  const formatCaption = useCallback<Formatters["formatCaption"]>(
    (month) => formatMonthLabel(month, t),
    [t],
  );

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

      // 실행취소 스낵바 표시 (API 또는 로컬 기반 복원)
      showSnackbar(t("notifications.snackbar.entryDeleted"), {
        type: "success",
        duration: 5000,
        action: {
          label: t("notifications.actions.undo"),
          onClick: () => {
            // undoDelete: API 모드에서는 createPlan, 로컬 모드에서는 addEntry 호출
            undoDelete(backup);
            showSnackbar(t("notifications.snackbar.entryRestored"), {
              type: "info",
              duration: 2000,
            });
          },
        },
      });
    },
    [entries, deleteEntry, undoDelete, showSnackbar, t],
  );

  // 계획 완료 처리
  const handleComplete = useCallback(
    (id: string) => {
      // API 연동인 경우만 완료 처리
      if (source === "api") {
        completePlan(id);
        showSnackbar(t("calendar.entries.completeSuccess"), {
          type: "success",
          duration: 3000,
        });
      } else {
        // 로컬 모드에서는 mode를 record로 변경
        const entry = entries.find((e) => e.id === id);
        if (entry) {
          deleteEntry(id);
          addEntry({
            ...entry,
            mode: "record",
            completed: true,
          });
          showSnackbar(t("calendar.entries.completeSuccess"), {
            type: "success",
            duration: 3000,
          });
        }
      }
    },
    [source, completePlan, entries, deleteEntry, addEntry, showSnackbar, t],
  );

  // 편집 시작
  const handleEdit = useCallback((entry: RecyclingEntry) => {
    setEditingEntry(entry);
    setIsEditSheetOpen(true);
  }, []);

  // 편집 저장
  const handleEditSave = useCallback(
    (entry: RecyclingEntry, updates: { amount: number; date: Date; memo?: string }) => {
      if (source === "api") {
        // API 연동 시 updatePlan 호출
        const { date: dateStr, time: timeStr } = formatPlanDateTime(updates.date);
        updatePlan(entry.id, {
          date: dateStr,
          time: timeStr,
          memo: updates.memo,
        });
      } else {
        // 로컬 모드에서는 삭제 후 재추가
        deleteEntry(entry.id);
        addEntry({
          ...entry,
          amount: updates.amount,
          date: updates.date,
          memo: updates.memo,
        });
      }
    },
    [source, updatePlan, deleteEntry, addEntry],
  );

  // 편집 닫기
  const handleEditClose = useCallback(() => {
    setIsEditSheetOpen(false);
    setEditingEntry(null);
  }, []);

  return (
    <S.PageContainer>
      {/* 달력과 월간 요약을 전담 카드로 분리 */}
      <CalendarOverviewCard
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
        onChangeMonth={handleMonthChange}
        modifiers={modifiers}
        monthlyStats={monthlyStats}
        locale={dateLocale}
        formatCaption={formatCaption}
      />

      {/* 선택 날짜의 기록 상세를 독립 카드로 표현 */}
      <CalendarEntriesCard
        selectedDateLabel={selectedDateLabel}
        entries={selectedEntries}
        timeLocale={dateLocale}
        onDelete={handleDelete}
        onComplete={handleComplete}
        onEdit={handleEdit}
      />

      {/* 월별 범례 정보를 페이지 하단에 배치 */}
      <CalendarLegendCard items={materialLegend} />

      {/* 계획 편집 바텀시트 */}
      <EditPlanBottomSheet
        isOpen={isEditSheetOpen}
        entry={editingEntry}
        onClose={handleEditClose}
        onSave={handleEditSave}
      />
    </S.PageContainer>
  );
}
