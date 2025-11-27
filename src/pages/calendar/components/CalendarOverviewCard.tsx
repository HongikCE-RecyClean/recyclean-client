import { DayPicker, type Formatters } from "react-day-picker";
import "react-day-picker/dist/style.css";
import type { DayPickerProps } from "react-day-picker";
import { useTranslation } from "react-i18next";
import type { Locale } from "date-fns";
import { Card, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import * as S from "../CalendarPage.styles";
import type { CalendarMonthlyStats } from "./types";
import { useNumberFormatter } from "shared/utils/numberFormat";

type CalendarOverviewCardProps = {
  currentMonth: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onChangeMonth: (month: Date) => void;
  modifiers: DayPickerProps["modifiers"];
  monthlyStats: CalendarMonthlyStats;
  locale: Locale;
  formatCaption: Formatters["formatCaption"];
};

export function CalendarOverviewCard({
  currentMonth,
  selectedDate,
  onSelectDate,
  onChangeMonth,
  modifiers,
  monthlyStats,
  locale,
  formatCaption,
}: CalendarOverviewCardProps) {
  const { t } = useTranslation();
  const formatNumber = useNumberFormatter({ maximumFractionDigits: 1 });
  // 카드 전체 구조를 캡슐화하여 상위 페이지 단순화
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("calendar.overviewTitle")}</CardTitle>
      </CardHeader>
      <S.CalendarContent>
        {/* 달력과 통계 묶음을 유지하여 시각적 맥락 보존 */}
        <S.DayPickerWrapper>
          <DayPicker
            mode="single"
            weekStartsOn={1}
            month={currentMonth}
            selected={selectedDate}
            locale={locale}
            onSelect={(date) => {
              // 사용자 입력(date)가 존재할 때만 상위 콜백 호출
              if (date) {
                onSelectDate(date);
              }
            }}
            onMonthChange={(month) => onChangeMonth(month)}
            modifiers={modifiers}
            modifiersClassNames={{
              selected: "calendar-selected",
              hasRecord: "calendar-has-record",
              hasPlan: "calendar-has-plan",
            }}
            formatters={{
              formatCaption,
            }}
            captionLayout="label"
            // 이전 버튼 배치를 유지하기 위해 네비게이션을 양옆으로 정렬
            navLayout="around"
            showOutsideDays
          />
        </S.DayPickerWrapper>

        {/* 월간 통계 수치를 별도 영역으로 렌더링 */}
        <S.StatsGrid>
          <S.StatBlock>
            <S.StatValue>{formatNumber(monthlyStats.totalRecords)}</S.StatValue>
            <S.StatLabel>{t("calendar.stats.records")}</S.StatLabel>
            <S.StatHelperText>
              {t("calendar.stats.planned", {
                count: monthlyStats.plannedCount,
                formatParams: { count: "number" },
              })}
            </S.StatHelperText>
          </S.StatBlock>
          <S.StatBlock>
            <S.StatValue>{formatNumber(monthlyStats.totalItems)}</S.StatValue>
            <S.StatLabel>{t("calendar.stats.items")}</S.StatLabel>
          </S.StatBlock>
          <S.StatBlock>
            <S.StatValue>{`${formatNumber(monthlyStats.totalPoints)} pts`}</S.StatValue>
            <S.StatLabel>{t("calendar.stats.points")}</S.StatLabel>
          </S.StatBlock>
        </S.StatsGrid>
      </S.CalendarContent>
    </Card>
  );
}
