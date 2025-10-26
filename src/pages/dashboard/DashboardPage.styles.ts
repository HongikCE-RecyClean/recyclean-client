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
