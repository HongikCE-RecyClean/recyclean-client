import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Card, CardContent, CardHeader } from "../../shared/ui/Card/Card";
import type { AppTheme } from "../../shared/styles/theme";

// 대시보드 페이지 컨테이너 정의
export const PageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
`;

// 히어로 외 섹션 카드 배경 제거 래퍼
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

// 히어로 외 섹션 헤더 좌우 패딩 제거
export const SectionCardHeader = styled(CardHeader)`
  padding: ${({ theme }) => `${theme.spacing(4)} 0`};
`;

// 히어로 외 섹션 콘텐츠 좌우 패딩 제거
export const SectionCardContent = styled(CardContent)`
  padding: ${({ theme }) => `${theme.spacing(4)} 0`};
`;

// 환영 카드 스타일 정의
export const WelcomeCard = styled(Card)`
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(56, 189, 248, 0.1));
  border-color: rgba(74, 222, 128, 0.3);
  animation: fadeInUp 0.6s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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
  gap: ${({ theme }) => theme.spacing(4)};
`;

// 통계 셀 정렬 정의
export const StatCell = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: center;
`;

// 통계 아이콘 래퍼 정의
export const StatIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.surface};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

// 통계 값 스타일 정의
export const StatValue = styled.span`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text};
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
  gap: ${({ theme }) => theme.spacing(3)};
`;

// 활동 행 스타일 정의
export const ActivityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const RecentActivityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

// 최근 활동 제목 텍스트 스타일
export const RecentActivityTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-size: 0.9rem;
`;

export const RecentActivityTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
`;

// 최근 활동 서브 텍스트 스타일
export const RecentActivityMeta = styled.div`
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
export const AchievementsContent = styled(CardContent)`
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
  gap: ${({ theme }) => theme.spacing(4)};
`;

// 재질 더보기 버튼 래퍼 정의
export const MaterialMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

// 재질 카드 아이템 정의
export const MaterialItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
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
export const MaterialNameText = styled.span`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// 재질 설명 문단 스타일
export const materialDescriptionText = (theme: AppTheme) => css`
  margin: 0;
  color: ${theme.colors.textMuted};
  font-size: 0.85rem;
  line-height: 1.55;
`;

// 재질 팁 박스 스타일
export const materialTipBox = (theme: AppTheme) => css`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  background: ${theme.colors.infoSurface};
  border-radius: 12px;
  padding: 8px 10px;
  color: ${theme.colors.info};
  font-size: 0.8rem;
  margin-top: ${theme.spacing(2)};
  line-height: 1.5;
`;

// 재질 검색 결과 없음 안내 스타일
export const MaterialEmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;

// 최근 활동 빈 상태 메시지 스타일
export const EmptyStateMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  padding: ${({ theme }) => theme.spacing(4)} 0;
  font-size: 0.9rem;
  white-space: pre-line; /* 번역 줄바꿈 유지 */
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
  gap: ${({ theme }) => theme.spacing(4)};
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
export const tipDescriptionText = (theme: AppTheme) => css`
  margin: 4px 0 0;
  font-size: 0.85rem;
  color: ${theme.colors.textMuted};
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
  gap: ${({ theme }) => theme.spacing(3)};
`;

// 목표 카드 스타일 정의
export const GoalCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceMuted};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

// 목표 카드 헤더 레이아웃 정의
export const goalCardHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

// 목표 제목 텍스트 강조 스타일
export const GoalCardTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// 목표 설명 문단 스타일
export const GoalCardDescription = styled.p`
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
export const MonthlyProgressValue = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-size: 1rem;
`;

// 월간 진행 부가 설명 스타일
export const MonthlyProgressSubtitle = styled.p`
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
export const MonthlyProgressPercent = styled.span`
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
  gap: ${({ theme }) => theme.spacing(4)};
  text-align: center;
`;

// 추적 지표 셀 정의
export const TrackerStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: center;
`;

// 추적 지표 아이콘 래퍼 정의
export const TrackerIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

// 추적 지표 값 정의
export const TrackerValue = styled.span`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

// 추적 지표 라벨 정의
export const TrackerLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

// 활동 추적 요약 박스 스타일
export const TrackerSummaryBox = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 활동 추적 포인트 값 스타일
export const TrackerPointsValue = styled.span`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

// 활동 추적 포인트 라벨 스타일
export const TrackerPointsLabel = styled.span`
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
export const TrackerGoalText = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;

// 활동 추적 퍼센트 텍스트 스타일
export const TrackerPercentText = styled.span`
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
export const TrackerHighlightText = styled.span`
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// 업적 제목 텍스트 스타일
export const AchievementTitleText = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-size: 0.9rem;
`;

// 업적 설명 텍스트 스타일
export const AchievementDescriptionText = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

// ============================================
// 통합 히어로 카드 스타일
// ============================================

// 히어로 카드 기본 스타일
export const HeroCard = styled(Card)`
  background: linear-gradient(135deg, rgba(47, 133, 90, 0.05), rgba(20, 184, 166, 0.08));
  border: 1px solid ${({ theme }) => theme.colors.primary}33;
  overflow: hidden;
`;

// 히어로 카드 컨텐츠
export const HeroCardContent = styled(CardContent)`
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
`;

// 상단 헤더 영역
export const HeroHeader = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: flex-start;
  width: 100%;
`;

// 인사말 텍스트
export const HeroGreeting = styled.h1`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

// 부제목
export const HeroSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;

// 중앙 메인 섹션
export const HeroMainSection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(4)} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border}22;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}22;
`;

// 메인 통계 (큰 숫자)
export const HeroMainStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

// 메인 값 (포인트)
export const HeroMainValue = styled.div`
  font-size: 3.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

// 메인 라벨
export const HeroMainLabel = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

// 목표 텍스트
export const HeroGoalText = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

// 진행률 래퍼
export const HeroProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 진행률 라벨
export const HeroProgressLabel = styled.div`
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text};
  text-align: right;
`;

// 오늘/전체 통계 그리드
export const HeroStatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing(4)};
`;

// 통계 섹션 (오늘 or 전체)
export const StatSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

// 섹션 제목
export const StatSectionTitle = styled.h3`
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// 섹션 콘텐츠
export const StatSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 통계 행
export const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 통계 라벨
export const StatRowLabel = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

// 통계 값
export const StatRowValue = styled.span`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

export const StatRowValueStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

export const StatRowHelper = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;
