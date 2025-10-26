import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Calendar } from "lucide-react";
import type { DayPickerProps } from "react-day-picker";
import { Card, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import * as S from "../CalendarPage.styles";
import type { CalendarMonthlyStats } from "./types";

type CalendarOverviewCardProps = {
  currentMonth: Date;
  currentMonthLabel: string;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onChangeMonth: (month: Date) => void;
  modifiers: DayPickerProps["modifiers"];
  monthlyStats: CalendarMonthlyStats;
};

export function CalendarOverviewCard({
  currentMonth,
  currentMonthLabel,
  selectedDate,
  onSelectDate,
  onChangeMonth,
  modifiers,
  monthlyStats,
}: CalendarOverviewCardProps) {
  // 카드 전체 구조를 캡슐화하여 상위 페이지 단순화
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Calendar size={18} />
          {currentMonthLabel} 기록 달력
        </CardTitle>
      </CardHeader>
      <S.CalendarContent>
        {/* 달력과 통계 묶음을 유지하여 시각적 맥락 보존 */}
        <S.DayPickerWrapper>
          <DayPicker
            mode="single"
            weekStartsOn={1}
            month={currentMonth}
            selected={selectedDate}
            onSelect={(date) => {
              // 사용자 입력(date)가 존재할 때만 상위 콜백 호출
              if (date) {
                onSelectDate(date);
              }
            }}
            onMonthChange={(month) => onChangeMonth(month)}
            modifiers={modifiers}
            modifiersClassNames={{ hasEntry: "calendar-has-entry" }}
            captionLayout="label"
            // 이전 버튼 배치를 유지하기 위해 네비게이션을 양옆으로 정렬
            navLayout="around"
            showOutsideDays
          />
        </S.DayPickerWrapper>

        {/* 월간 통계 수치를 별도 영역으로 렌더링 */}
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
  );
}
