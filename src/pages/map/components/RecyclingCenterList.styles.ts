import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { AppTheme } from "../../../shared/styles/theme";
import { Card, CardContent } from "../../../shared/ui/Card/Card";

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const SectionLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

export const BinSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const EmptyState = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.9rem;
`;

export const BinList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const BinItem = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const BinHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
`;

export const BinInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const BinTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  line-height: 1.5;
`;

export const BinName = styled.span`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  line-height: 1.45;
`;

export const BinLocation = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
`;

export const BinUpdated = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;
`;

export const BinStatus = styled.div`
  min-width: 90px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
`;

export const ItemsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SectionHint = styled.span`
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;
`;

export const ItemsChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
`;

// 내 주변 배출함 버튼 영역을 1:1 그리드로 구성
export const BinActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

// 각 버튼 폭을 동일하게 맞추는 스타일
export const binActionButton = css`
  width: 100%;
`;

export const SectionDivider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing(4)} 0;
`;

// 센터 리스트 전체 래퍼 스타일 정의
export const CenterGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

// 센터 더보기 버튼 정렬 래퍼
export const CenterMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

// 센터 카드 컴포넌트 스타일 정의
export const CenterCard = styled(Card)`
  overflow: hidden;
`;

// 이미지 영역 스타일 정의
export const CenterMedia = styled.div`
  position: relative;
  height: 140px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

// 로고 기본 이미지를 감싸는 컨테이너 정의
export const CenterLogoPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing(4)};
`;

// 로고 SVG 크기를 제어하는 이미지 스타일 정의
export const CenterLogoMark = styled.img`
  width: 96px;
  max-width: 60%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 24px rgba(15, 23, 42, 0.25));
`;

// 센터 거리 배지 위치 클래스
export const centerBadgeContainer = css`
  position: absolute;
  top: 12px;
  right: 12px;
`;

// 카드 본문 레이아웃 정의
export const CenterContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

// 센터 명칭 텍스트 스타일
export const centerNameText = css`
  margin: 0;
  line-height: 1.45;
  margin-bottom: 4px;
`;

// 센터 주소 텍스트 스타일
export const centerAddressText = (theme: AppTheme) => css`
  font-size: 0.8rem;
  color: ${theme.colors.textMuted};
  line-height: 1.5;
`;

// 재활용 품목 칩 묶음 스타일 정의
export const MaterialChips = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

// 정보 스택 텍스트 정렬 정의
export const InfoStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: 0.8rem;
  line-height: 1.5;
`;

// 정보 행 정렬 정의
export const InfoRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;
`;

// 액션 버튼 행 정렬 정의
export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

// 센터 액션 버튼 폭 스타일
export const centerActionButton = css`
  flex: 1;
`;
