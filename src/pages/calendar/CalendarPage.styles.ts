import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { CardContent } from "../../shared/ui/Card/Card";

// 달력 페이지 전체 컨테이너 정의
export const PageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding-bottom: ${({ theme }) => theme.spacing(6)};
`;

// 달력 카드 컨텐츠 래퍼 정의
export const CalendarContent = styled(CardContent)`
  gap: ${({ theme }) => theme.spacing(4)};
`;

// 기록 목록 항목 제목 텍스트 스타일
export const recordTypeText = css`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// 기록 목록 서브 텍스트 스타일
export const recordMetaText = css`
  color: #64748b;
  font-size: 0.85rem;
`;

// DayPicker 래퍼 및 스타일 오버라이드 정의
export const DayPickerWrapper = styled.div`
  width: 100%;

  .rdp,
  .rdp-root {
    --rdp-cell-size: 44px;
    --rdp-accent-color: ${({ theme }) => theme.colors.primary};
    --rdp-accent-background-color: ${({ theme }) => theme.colors.surfaceMuted};
    --rdp-outline: 2px solid ${({ theme }) => theme.colors.border};
    --rdp-day_button-border-radius: ${({ theme }) => theme.radii.md};
    --rdp-day-width: 100%;
    --rdp-day_button-width: 100%;
    font-family: ${({ theme }) => theme.typography.family};
    width: 100%;
  }

  .rdp-caption_label {
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    color: ${({ theme }) => theme.colors.text};
  }

  .rdp-button_previous,
  .rdp-button_next {
    border-radius: ${({ theme }) => theme.radii.full};
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    transition: color 120ms ease;
    width: var(--rdp-nav_button-width);
    height: var(--rdp-nav_button-height);
    box-shadow: none;
    outline: none;
  }

  .rdp-button_previous:hover,
  .rdp-button_previous:focus-visible,
  .rdp-button_next:hover,
  .rdp-button_next:focus-visible {
    background-color: transparent;
    border-color: transparent;
    color: ${({ theme }) => theme.colors.highlight};
    outline: none;
    box-shadow: none;
  }

  .rdp-button_previous:active,
  .rdp-button_next:active {
    background-color: transparent;
  }

  .rdp-button_previous[disabled],
  .rdp-button_next[disabled],
  .rdp-button_previous[aria-disabled="true"],
  .rdp-button_next[aria-disabled="true"] {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  .rdp-chevron {
    fill: ${({ theme }) => theme.colors.primary};
  }

  .rdp-months {
    width: 100%;
    max-width: none;
  }

  .rdp-month {
    width: 100%;
  }

  .rdp-month_grid {
    width: 100%;
    table-layout: fixed;
  }

  .rdp-day {
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    color: ${({ theme }) => theme.colors.text};
    border-radius: ${({ theme }) => theme.radii.full};
    width: 100%;
  }

  .rdp-month_grid td {
    width: calc(100% / 7);
  }

  .rdp-day_today {
    border: 1px solid rgba(22, 163, 74, 0.45);
  }

  .rdp-day_disabled {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  .calendar-has-entry {
    position: relative;
  }

  .calendar-has-entry::after {
    content: "";
    position: absolute;
    bottom: 8px;
    left: 50%;
    width: 6px;
    height: 6px;
    background: rgba(22, 163, 74, 0.75);
    border-radius: ${({ theme }) => theme.radii.full};
    transform: translateX(-50%);
  }

  .calendar-selected {
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
    color: ${({ theme }) => theme.colors.text};
    border-radius: ${({ theme }) => theme.radii.lg};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border};
    transition: box-shadow 120ms ease;
  }

  .calendar-selected:focus-visible,
  .calendar-selected:hover {
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border};
  }
`;

// 통계 카드용 그리드 정의
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
  justify-items: center;
  align-items: center;
`;

// 통계 블록 스타일 정의
export const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: center;
  text-align: center;
`;

// 통계 값 텍스트 정의
export const StatValue = styled.span`
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

// 통계 라벨 텍스트 정의
export const StatLabel = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

// 범례 리스트 래퍼 정의
export const LegendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 범례 아이템 행 정의
export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

// 범례 레이블 영역 정의
export const LegendLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

// 가이드 목록 스타일
export const guideList = css`
  margin: 0;
  padding-left: 1.1rem;
  color: #475569;
  font-size: 0.9rem;
`;

// 범례 통계 열 정렬 스타일
export const legendStatsColumn = css`
  text-align: right;
`;

// 범례 수량 텍스트 스타일
export const legendCountText = css`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// 범례 포인트 텍스트 스타일
export const legendPointsText = css`
  color: #64748b;
  font-size: 0.8rem;
`;

// 기록 리스트 래퍼 정의
export const RecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 기록 아이템 행 정의
export const RecordItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

// 기록 정보 영역 정의
export const RecordInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

// 포인트 강조 텍스트 정의
export const RecordPoints = styled.span`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: #16a34a;
`;

// 빈 상태 메시지 정의
export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
`;
