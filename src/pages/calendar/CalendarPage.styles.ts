import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { AppTheme } from "../../shared/styles/theme";
import { Card, CardContent, CardHeader } from "../../shared/ui/Card/Card";

// 달력 페이지 전체 컨테이너 정의
export const PageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
  padding-bottom: ${({ theme }) => theme.spacing(6)};
`;

// 달력 외 섹션 카드 래퍼 정의
export const SectionCard = styled(Card)`
  background-color: transparent;
  border: none;
  box-shadow: none;
  transition: none;

  &:hover {
    transform: none;
    box-shadow: none;
  }
`;

export const SectionCardHeader = styled(CardHeader)`
  padding: ${({ theme }) => `${theme.spacing(4)} 0`};
`;

export const SectionCardContent = styled(CardContent)`
  padding: ${({ theme }) => `${theme.spacing(4)} 0`};
`;

// 달력 카드 컨텐츠 래퍼 정의
export const CalendarContent = styled(CardContent)`
  gap: ${({ theme }) => theme.spacing(4)};
`;

// 기록 목록 항목 제목 텍스트 스타일
export const RecordTypeText = styled.span<{ $completed?: boolean }>`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-decoration: ${({ $completed }) => ($completed ? "line-through" : "none")};
  color: ${({ theme, $completed }) => ($completed ? theme.colors.textMuted : theme.colors.text)};
`;

// 기록 목록 서브 텍스트 스타일
export const recordMetaText = (theme: AppTheme) => css`
  color: ${theme.colors.textMuted};
  font-size: 0.85rem;
`;

// 메모 텍스트 스타일
export const recordMemoText = (theme: AppTheme) => css`
  color: ${theme.colors.textMuted};
  font-size: 0.8rem;
  font-style: italic;
  margin-top: ${theme.spacing(0.5)};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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

  .calendar-has-record,
  .calendar-has-plan {
    position: relative;
  }

  /* 좌우 점 배치 공통 스타일 */
  .calendar-has-record::after,
  .calendar-has-plan::before {
    content: "";
    position: absolute;
    bottom: 6px;
    width: 6px;
    height: 6px;
    opacity: 0.8;
    border-radius: ${({ theme }) => theme.radii.full};
    transform: translateX(-50%);
  }

  /* 기록 점 좌측 정렬 */
  .calendar-has-record::after {
    left: 40%;
    background: ${({ theme }) => theme.colors.success};
  }

  /* 계획 점 우측 정렬 */
  .calendar-has-plan::before {
    left: 60%;
    background: ${({ theme }) => theme.colors.warning};
  }

  /* 단일 점 중앙 정렬 */
  .calendar-has-record:not(.calendar-has-plan)::after,
  .calendar-has-plan:not(.calendar-has-record)::before {
    left: 50%;
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
  gap: ${({ theme }) => theme.spacing(4)};
  justify-items: center;
  align-items: flex-start;
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

export const StatHelperText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

// 범례 리스트 래퍼 정의
export const LegendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
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
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

// 범례 레이블 영역 정의
export const LegendLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

// 범례 통계 열 정렬 스타일
export const legendStatsColumn = css`
  text-align: right;
`;

// 범례 수량 텍스트 스타일
export const LegendCountText = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// 범례 포인트 텍스트 스타일
export const legendPointsText = (theme: AppTheme) => css`
  color: ${theme.colors.textMuted};
  font-size: 0.8rem;
`;

// 기록 리스트 래퍼 정의
export const RecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

// 기록 아이템 행 정의
export const RecordItem = styled.div<{ $completed?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  transition:
    background 0.15s ease,
    opacity 0.15s ease;
  opacity: ${({ $completed }) => ($completed ? 0.7 : 1)};

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

// 기록 정보 영역 정의
export const RecordInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const RecordTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
`;

// 포인트 강조 텍스트 정의
export const RecordPoints = styled.span<{ $variant?: "record" | "plan"; $completed?: boolean }>`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme, $variant, $completed }) =>
    $completed
      ? theme.colors.textMuted
      : $variant === "plan"
        ? theme.colors.warning
        : theme.colors.success};
  text-decoration: ${({ $completed }) => ($completed ? "line-through" : "none")};
`;

// 기록 액션 행 스타일
export const recordActionsRow = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// 삭제 버튼 스타일
export const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing(1)};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
    background: ${({ theme }) => theme.colors.dangerSurface};
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.danger};
    outline-offset: 2px;
  }
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

// 액션 버튼 그룹 래퍼
export const ActionButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

// 액션 버튼 (완료, 편집)
export const ActionButton = styled.button<{ $variant: "complete" | "edit" }>`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing(1)};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textMuted};
  transition:
    color 0.15s ease,
    background 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.sm};

  &:hover {
    color: ${({ theme, $variant }) =>
      $variant === "complete" ? theme.colors.success : theme.colors.info};
    background: ${({ theme, $variant }) =>
      $variant === "complete" ? theme.colors.successSurface : theme.colors.infoSurface};
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme, $variant }) =>
        $variant === "complete" ? theme.colors.success : theme.colors.info};
    outline-offset: 2px;
  }
`;

// 스와이프 액션 컨테이너 - 항목을 감싸는 래퍼
export const SwipeableContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
`;

// 스와이프 가능한 콘텐츠 영역
export const SwipeableContent = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  cursor: pointer;
  user-select: none;
  // 열림 상태에 따라 좌측 슬라이드
  transform: translateX(${({ $isOpen }) => ($isOpen ? "-100px" : "0")});
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:active {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

// 완료된 항목용 스와이프 콘텐츠
export const SwipeableContentCompleted = styled(SwipeableContent)`
  opacity: 0.7;
`;

// 스와이프 액션 버튼 영역 - 우측에 숨겨진 상태
export const SwipeableActions = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: 0 ${({ theme }) => theme.spacing(2)};
  // 열림 상태에 따라 표시
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: opacity 0.2s ease;
`;

// 스와이프 액션 버튼 공통 스타일
export const SwipeActionButton = styled.button<{
  $variant: "complete" | "edit" | "delete";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background 0.15s ease;

  // variant별 색상 설정
  background: ${({ theme, $variant }) =>
    $variant === "complete"
      ? theme.colors.successSurface
      : $variant === "edit"
        ? theme.colors.infoSurface
        : theme.colors.dangerSurface};

  color: ${({ theme, $variant }) =>
    $variant === "complete"
      ? theme.colors.success
      : $variant === "edit"
        ? theme.colors.info
        : theme.colors.danger};

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme, $variant }) =>
        $variant === "complete"
          ? theme.colors.success
          : $variant === "edit"
            ? theme.colors.info
            : theme.colors.danger};
    outline-offset: 2px;
  }
`;
