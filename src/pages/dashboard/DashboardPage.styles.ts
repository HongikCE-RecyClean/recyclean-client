import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Card, CardContent } from "../../shared/ui/Card/Card";

// 대시보드 페이지 컨테이너 정의
export const PageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

// 환영 카드 스타일 정의
export const WelcomeCard = styled(Card)`
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.14), rgba(56, 189, 248, 0.16));
  border-color: rgba(74, 222, 128, 0.45);
`;

// 환영 카드 컨텐츠 정렬 정의
export const WelcomeContent = styled(CardContent)`
  padding: ${({ theme }) => theme.spacing(5)};
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

// 환영 텍스트 영역 좌측 정렬 정의
export const WelcomeText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  text-align: left;
  width: 100%;
`;

// 환영 아이콘 컨테이너 정의
export const WelcomeIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(34, 197, 94, 0.15);
`;

// 통계 그리드 정의
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
`;

// 통계 셀 정렬 정의
export const StatCell = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

// 통계 값 스타일 정의
export const StatValue = styled.span<{ $tone: "success" | "info" | "warning" }>`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ $tone }) =>
    ({
      success: "#16a34a",
      info: "#0284c7",
      warning: "#ea580c",
    })[$tone]};
`;

// 통계 라벨 텍스트 정의
export const StatLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

// 최근 활동 리스트 정의
export const RecentActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 활동 행 스타일 정의
export const ActivityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

// 최근 활동 제목 텍스트 스타일
export const recentActivityTitle = css`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-size: 0.9rem;
`;

// 최근 활동 서브 텍스트 스타일
export const recentActivityMeta = css`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8rem;
`;

// 업적 행 스타일 정의
export const AchievementRow = styled.div<{ $earned: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme, $earned }) =>
    $earned ? theme.colors.successSurface : theme.colors.surfaceMuted};
  border: 1px solid
    ${({ theme, $earned }) => ($earned ? "rgba(34, 197, 94, 0.35)" : theme.colors.border)};
`;

// 업적 카드 컨텐츠 간격 조정 스타일
export const achievementsContent = css`
  gap: ${({ theme }) => theme.spacing(4)};
`;

// 빠른 작업 버튼 그리드 정의
export const QuickActionGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 재질 리스트 래퍼 정의
export const MaterialList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 재질 카드 아이템 정의
export const MaterialItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

// 재질 카드 헤더 행 스타일
export const materialHeaderRow = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 재질 상태 배지 행 스타일
export const materialHeaderLeft = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 재질 이름 텍스트 강조 스타일
export const materialNameText = css`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// 재질 설명 문단 스타일
export const materialDescriptionText = css`
  margin: 0;
  color: #475569;
  font-size: 0.85rem;
`;

// 재질 팁 박스 스타일
export const materialTipBox = css`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  background: #eff6ff;
  border-radius: 12px;
  padding: 8px 10px;
  color: #1d4ed8;
  font-size: 0.8rem;
`;

// 재질 검색 결과 없음 안내 스타일
export const materialEmptyMessage = css`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;

// 팁 카드 스타일 정의
export const TipCard = styled(Card)`
  overflow: hidden;
`;

// 팁 이미지 영역 정의
export const TipMedia = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
`;

// 팁 컨텐츠 정렬 정의
export const TipContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 팁 리스트 래퍼 정의
export const TipsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

// 팁 배지 포지셔닝 클래스
export const tipBadgeContainer = css`
  position: absolute;
  top: 12px;
  left: 12px;
`;

// 팁 제목 텍스트 스타일
export const tipTitleText = css`
  margin: 0;
  font-size: 1rem;
`;

// 팁 설명 문단 스타일
export const tipDescriptionText = css`
  margin: 4px 0 0;
  font-size: 0.85rem;
  color: #475569;
`;

// 팁 배지 행 배치 스타일
export const tipBadgeRow = css`
  display: flex;
  gap: 8px;
`;

// 목표 리스트 래퍼 정의
export const GoalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
`;

// 목표 카드 스타일 정의
export const GoalCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceMuted};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 목표 카드 헤더 레이아웃 정의
export const goalCardHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

// 목표 제목 텍스트 강조 스타일
export const goalCardTitle = css`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// 목표 설명 문단 스타일
export const goalCardDescription = css`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8rem;
`;

// 목표 수치 행 정렬 스타일
export const goalCardStats = css`
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
`;

// 월간 진행 수치 텍스트 스타일
export const monthlyProgressValue = css`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-size: 1rem;
`;

// 월간 진행 부가 설명 스타일
export const monthlyProgressSubtitle = css`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
`;

// 월간 진행 하단 행 정렬 스타일
export const monthlyProgressFooter = css`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
`;

// 월간 진행 퍼센트 텍스트 색상 스타일
export const monthlyProgressPercent = css`
  color: ${({ theme }) => theme.colors.textMuted};
`;

// 목표 진행 바 컨테이너 정의
export const GoalProgress = styled.div`
  height: 6px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
`;

// 목표 진행 바 채우기 정의
export const GoalProgressBar = styled.div<{ $value: number }>`
  height: 100%;
  width: ${({ $value }) => Math.min(Math.max($value, 0), 100)}%;
  background: linear-gradient(90deg, #22c55e, #16a34a);
  transition: width 0.3s ease;
`;

// 활동 추적 그리드 정의
export const TrackerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
  text-align: center;
`;

// 추적 지표 셀 정의
export const TrackerStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

// 추적 지표 값 정의
export const TrackerValue = styled.span`
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// 추적 지표 라벨 정의
export const TrackerLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

// 활동 추적 요약 박스 스타일
export const trackerSummaryBox = css`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 활동 추적 포인트 값 스타일
export const trackerPointsValue = css`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

// 활동 추적 포인트 라벨 스타일
export const trackerPointsLabel = css`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
`;

// 활동 추적 진행 행 스타일
export const trackerProgressRow = css`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
`;

// 활동 추적 목표 텍스트 스타일
export const trackerGoalText = css`
  color: ${({ theme }) => theme.colors.textMuted};
`;

// 활동 추적 퍼센트 텍스트 스타일
export const trackerPercentText = css`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// 하이라이트 박스 스타일 정의
export const HighlightBox = styled.div`
  background: ${({ theme }) => theme.colors.successSurface};
  color: ${({ theme }) => theme.colors.success};
  padding: ${({ theme }) => theme.spacing(2.5)};
  border-radius: ${({ theme }) => theme.radii.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 하이라이트 텍스트 강조 스타일
export const trackerHighlightText = css`
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// 업적 제목 텍스트 스타일
export const achievementTitleText = css`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-size: 0.9rem;
`;

// 업적 설명 텍스트 스타일
export const achievementDescriptionText = css`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;
