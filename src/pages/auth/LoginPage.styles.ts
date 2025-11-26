import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { hexToRgba } from "../../shared/styles/colorUtils";

// 애니메이션 키프레임 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInDelayed = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// 전체 페이지를 헤더 + 콘텐츠로 구성하는 래퍼 정의
export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => `
      radial-gradient(circle at 20% 20%, ${hexToRgba(theme.colors.primary, 0.08)}, transparent 50%),
      radial-gradient(circle at 80% 80%, ${hexToRgba(theme.colors.accent, 0.06)}, transparent 50%),
      linear-gradient(180deg, ${hexToRgba(theme.colors.primary, 0.04)}, ${theme.colors.background})
    `};
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.typography.family};
`;

// 헤더 영역 컨테이너 정의
export const HeaderBar = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  position: sticky;
  top: 0;
  z-index: 1;
`;

// 중앙 콘텐츠 래퍼 정의
export const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing(12)} ${theme.spacing(5)}`};
  gap: ${({ theme }) => theme.spacing(12)};
`;

// 텍스트 그룹 (카드 배경 없이 텍스트만)
export const TextGroup = styled.section`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  animation: ${fadeIn} 0.6s ease-out;
`;

// 브랜드명 스타일
export const BrandName = styled.h1`
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: -0.03em;
  line-height: 1.1;
  text-shadow: 0 2px 16px rgba(255, 255, 255, 0.9);
`;

// 태그라인 스타일 (서브타이틀)
export const Tagline = styled.p`
  margin: 0;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  letter-spacing: -0.01em;
  line-height: 1.4;
  text-shadow: 0 1px 8px rgba(255, 255, 255, 0.6);
`;

// 상세 설명 문단을 슬림하게 보이도록 설정
export const Description = styled.p`
  margin: 0;
  margin-top: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: clamp(0.95rem, 2.5vw, 1.05rem);
  line-height: 1.8;
  max-width: 26rem;
  margin-left: auto;
  margin-right: auto;
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  text-shadow: 0 1px 8px rgba(255, 255, 255, 0.6);
`;

// 버튼을 하단에 배치하는 영역 정의
export const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: auto;
  align-items: center;
  animation: ${fadeInDelayed} 0.6s ease-out 0.3s both;
`;

export const ButtonHint = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  text-align: center;
  line-height: 1.6;
  max-width: 28rem;
`;

// 시작하기 버튼 스타일 (테마 primary 색상 사용)
export const StartButton = styled.button`
  width: 100%;
  max-width: 400px;
  border: none;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryContrast};
  padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(5)}`};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-size: 1.05rem;
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// ============================================================
// OAuth 콜백 페이지 스타일
// ============================================================

// 스피너 회전 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 상태 컨테이너
export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(8)};
  animation: ${fadeIn} 0.4s ease-out;
`;

// 로딩 스피너
export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// 상태 텍스트
export const StatusText = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-align: center;
`;

// 보조 텍스트
export const SubText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

// 에러 메시지
export const ErrorMessage = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.danger};
  text-align: center;
  max-width: 300px;
  line-height: 1.5;
`;

// 성공 아이콘
export const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.successSurface};
  color: ${({ theme }) => theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
`;

// 에러 아이콘
export const ErrorIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.dangerSurface};
  color: ${({ theme }) => theme.colors.danger};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
`;

// 재시도 버튼
export const RetryButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(6)}`};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryContrast};
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  cursor: pointer;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(0.9);
  }
`;
