import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// 등장 애니메이션 정의
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

// 전체 페이지 래퍼
export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  background-image:
    radial-gradient(circle at 20% 20%, ${({ theme }) => theme.colors.primary}20, transparent 50%),
    radial-gradient(circle at 80% 80%, ${({ theme }) => theme.colors.accent}15, transparent 50%);
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.typography.family};
`;

// 헤더 컨테이너
export const HeaderBar = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  position: sticky;
  top: 0;
  z-index: 1;
`;

// 중앙 콘텐츠 래퍼
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

// 텍스트 그룹
export const TextGroup = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  align-items: stretch;
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
  text-align: left;
  padding-left: 32px;
  align-self: flex-start;
  width: 100%;
`;

// 태그라인
export const Tagline = styled.p`
  margin: 0;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  letter-spacing: -0.01em;
  line-height: 1.4;
  text-align: left;
  padding-left: 32px;
  align-self: flex-start;
  width: 100%;
`;

// 설명 문단
export const Description = styled.p`
  margin: 0;
  margin-top: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: clamp(0.95rem, 2.5vw, 1.05rem);
  line-height: 1.8;
  max-width: 26rem;
  margin-left: auto;
  margin-right: 0;
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  text-align: right;
  padding-right: 32px;
  align-self: flex-end;
  width: 100%;
`;

// 하단 버튼 영역
export const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: auto;
  align-items: center;
  animation: ${fadeInDelayed} 0.6s ease-out 0.3s both;
`;

// 버튼 힌트 텍스트
export const ButtonHint = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  text-align: center;
  line-height: 1.6;
  max-width: 28rem;
`;

// 시작하기 버튼 스타일
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
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition:
    transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    filter 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(0.9);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &:active {
    transform: translateY(0);
    filter: brightness(0.85);
    box-shadow: ${({ theme }) => theme.shadows.soft};
  }
`;
