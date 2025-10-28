import styled from "@emotion/styled";
import { Button } from "../../shared/ui/Button/Button";

// 분석 페이지 전체 레이아웃 컨테이너 정의
export const PageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

// 분석 액션 영역 정렬 정의
export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
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
  gap: ${({ theme }) => theme.spacing(3)};
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

// 팁 리스트 목록 스타일 정의
export const TipsList = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

// 사용자 피드백 메시지 영역 정의
export const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.dangerSurface};
  color: ${({ theme }) => theme.colors.danger};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;
