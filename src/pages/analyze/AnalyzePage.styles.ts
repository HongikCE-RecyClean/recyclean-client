import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { AppTheme } from "../../shared/styles/theme";
import { Button } from "../../shared/ui/Button/Button";
import { Card, CardContent, CardHeader } from "../../shared/ui/Card/Card";

// 분석 페이지 전체 레이아웃 컨테이너 정의
export const PageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
`;

// 분석 카드 공용 래퍼 정의
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

// 카드 헤더 좌우 패딩 제거
export const SectionCardHeader = styled(CardHeader)`
  padding: ${({ theme }) => `${theme.spacing(4)} 0`};
`;

// 카드 콘텐츠 좌우 패딩 제거
export const SectionCardContent = styled(CardContent)`
  padding: ${({ theme }) => `${theme.spacing(4)} 0`};
`;

// 분석 액션 영역 정렬 정의
export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

// 카메라 카드 내부 레이아웃 정의
export const CameraContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

// 카메라 미리보기 비디오 영역 정의
export const VideoWrapper = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  background: #000000;

  video {
    width: 100%;
    display: block;
    aspect-ratio: 3 / 4;
    object-fit: cover;
  }
`;

// 카메라 준비 상태 오버레이 정의
export const VideoOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.55);
  color: ${({ theme }) => theme.colors.surface};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

// 카메라 제어 버튼 그룹 정의
export const CameraControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 이미지 영역 래퍼 스타일 정의
export const ImageWrapper = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
`;

// 촬영 이미지 프레임 비율/최대크기 지정
export const capturedImageFrame = css`
  width: 100%;
  aspect-ratio: 3 / 4;
  max-height: 80vh;
  height: auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

// 분석 소개 문단 스타일
export const introDescriptionText = (theme: AppTheme) => css`
  margin: 0;
  color: ${theme.colors.textMuted};
  font-size: 0.9rem;
`;

// 초기화 버튼 위치 지정
export const ResetButton = styled(Button)`
  position: absolute;
  top: ${({ theme }) => theme.spacing(2)};
  right: ${({ theme }) => theme.spacing(2)};
`;

// 스피너 애니메이션 스타일 정의
export const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.spinnerTrack};
  border-top-color: ${({ theme }) => theme.colors.spinnerPrimary};
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// 결과 헤더 정렬 정의
export const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 결과 제목 레이아웃 정의
export const ResultTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 결과 본문 레이아웃 정의
export const ResultBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

// 스캔 진행 카드 컨텐츠 정렬 스타일
export const ScanningContent = styled(SectionCardContent)`
  text-align: center;
  gap: ${({ theme }) => theme.spacing(4)};
`;

// 스캔 진행 안내 제목 스타일
export const ScanningHeadline = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// 스캔 진행 안내 보조 텍스트 스타일
export const ScanningSubtext = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
`;

// 결과 요약 행 정렬 스타일
export const resultSummaryRow = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 결과 항목 제목 스타일
export const resultItemTitle = css`
  margin: 0;
`;

// 결과 카테고리 설명 스타일
export const resultCategoryText = (theme: AppTheme) => css`
  margin: 4px 0 0;
  font-size: 0.85rem;
  color: ${theme.colors.textMuted};
`;

// 안내 콜아웃 스타일 정의
export const Callout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.infoSurface};
  color: ${({ theme }) => theme.colors.info};
`;

// 처리 방법 섹션 제목 스타일
export const resultSectionHeading = css`
  margin: 0 0 4px;
  font-size: 0.9rem;
`;

// 처리 방법 본문 텍스트 스타일
export const resultInstructionText = (theme: AppTheme) => css`
  margin: 0;
  color: ${theme.colors.text};
  font-size: 0.9rem;
`;

// 사용자 피드백 메시지 영역 정의
export const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.dangerSurface};
  color: ${({ theme }) => theme.colors.danger};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

// 결과 팁 텍스트 스타일
export const resultTipText = css`
  font-size: 0.85rem;
`;

// 결과 액션 버튼 행 스타일
export const resultActionsRow = css`
  display: flex;
  gap: 12px;
`;

// 결과 액션 버튼 폭 스타일
export const resultActionButton = css`
  flex: 1;
`;

// 다중 예측 후보 리스트 컨테이너
export const PredictionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

// 다중 예측 후보 리스트 헤더
export const PredictionListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

// 다중 예측 후보 리스트 제목
export const PredictionListTitle = styled.span`
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
`;

// 다중 예측 후보 아이템
export const PredictionItem = styled.button<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3)};
  border: none;
  outline: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.successSurface : theme.colors.surface};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }

  &:focus-visible {
    outline: none;
  }
`;

// 예측 아이템 카테고리 정보
export const PredictionItemCategory = styled.span`
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

// 예측 아이템 신뢰도
export const PredictionItemConfidence = styled.span<{ $low?: boolean }>`
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme, $low }) => ($low ? theme.colors.warning : theme.colors.success)};
`;

// Bbox 오버레이 컨테이너 (애니메이션 포함)
export const BboxOverlay = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;

  /* 페이드인 애니메이션 */
  animation: bboxFadeIn 0.3s ease-out;

  @keyframes bboxFadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

// Bbox 사각형 스타일 (SVG rect에 적용할 CSS)
export const bboxRectStyle = (_theme: AppTheme) => css`
  /* 밝은 초록색 영역 표시 */
  stroke: none;

  /* 부드러운 펄스 애니메이션 */
  animation: bboxPulse 2s ease-in-out infinite;

  @keyframes bboxPulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
`;

// Bbox 토글 버튼 (글래스모피즘 스타일)
export const BboxToggle = styled.button<{ $active?: boolean }>`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing(2)};
  left: ${({ theme }) => theme.spacing(2)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(2.5)}`};
  border: 1px solid
    ${({ theme, $active }) => ($active ? `${theme.colors.primary}80` : "rgba(255, 255, 255, 0.2)")};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $active }) =>
    $active
      ? `linear-gradient(135deg, ${theme.colors.primary}dd, ${theme.colors.primary})`
      : "rgba(15, 23, 42, 0.6)"};
  backdrop-filter: blur(8px);
  color: ${({ theme }) => theme.colors.surface};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary : "rgba(15, 23, 42, 0.75)"};
    border-color: ${({ theme, $active }) =>
      $active ? theme.colors.primary : "rgba(255, 255, 255, 0.3)"};
  }
`;

// Bbox 코너 마커 스타일 (선택적 장식용)
export const BboxCornerMarker = styled.div<{ $position: "tl" | "tr" | "bl" | "br" }>`
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: ${({ theme }) => theme.colors.primary};
  border-style: solid;
  border-width: 0;

  ${({ $position }) => {
    switch ($position) {
      case "tl":
        return css`
          top: 0;
          left: 0;
          border-top-width: 3px;
          border-left-width: 3px;
          border-top-left-radius: 4px;
        `;
      case "tr":
        return css`
          top: 0;
          right: 0;
          border-top-width: 3px;
          border-right-width: 3px;
          border-top-right-radius: 4px;
        `;
      case "bl":
        return css`
          bottom: 0;
          left: 0;
          border-bottom-width: 3px;
          border-left-width: 3px;
          border-bottom-left-radius: 4px;
        `;
      case "br":
        return css`
          bottom: 0;
          right: 0;
          border-bottom-width: 3px;
          border-right-width: 3px;
          border-bottom-right-radius: 4px;
        `;
    }
  }}
`;
