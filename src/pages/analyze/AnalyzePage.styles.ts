import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "../../shared/ui/Button/Button";
import { CardContent } from "../../shared/ui/Card/Card";

// 분석 페이지 전체 레이아웃 컨테이너 정의
export const PageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
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

// 촬영 이미지 프레임 높이 지정 클래스
export const capturedImageFrame = css`
  height: 220px;
`;

// 분석 소개 문단 스타일
export const introDescriptionText = css`
  margin: 0;
  color: #475569;
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
  border: 3px solid rgba(99, 102, 241, 0.2);
  border-top-color: rgba(99, 102, 241, 0.65);
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
export const ScanningContent = styled(CardContent)`
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
export const resultCategoryText = css`
  margin: 4px 0 0;
  font-size: 0.85rem;
  color: #475569;
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
  transition:
    transform 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
  }
`;

// 처리 방법 섹션 제목 스타일
export const resultSectionHeading = css`
  margin: 0 0 4px;
  font-size: 0.9rem;
`;

// 처리 방법 본문 텍스트 스타일
export const resultInstructionText = css`
  margin: 0;
  color: #1f2933;
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

// 성공 메시지 영역 정의
export const SuccessMessage = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.successSurface};
  color: ${({ theme }) => theme.colors.success};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-align: center;
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
