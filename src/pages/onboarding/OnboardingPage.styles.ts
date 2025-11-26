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
  position: relative;
  overflow: hidden;
`;

// 나뭇잎 컨테이너
export const LeavesContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

// 파티클 SVG (나뭇잎, 눈, 비)
export const ParticleSvg = styled.svg`
  pointer-events: none;
`;

// 헤더 컨테이너
export const HeaderBar = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  position: sticky;
  top: 0;
  z-index: 10;
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
  position: relative;
  z-index: 1;
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
  align-self: flex-start;
  width: 100%;
  padding-left: 1px;
`;

// 설명 문단
export const Description = styled.p`
  margin: 0;
  margin-top: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: clamp(0.95rem, 2.5vw, 1.05rem);
  line-height: 1.8;
  max-width: min(26rem, 66%);
  margin-left: auto;
  margin-right: 0;
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  text-align: right;
  align-self: flex-end;
  width: 66%;
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

// 카카오 로그인 버튼 스타일 (카카오 브랜드 가이드 준수)
export const KakaoLoginButton = styled.button`
  width: 100%;
  max-width: 400px;
  border: none;
  border-radius: 12px;
  background: #fee500; /* 카카오 노란색 */
  color: #000000de; /* 카카오 검정 텍스트 */
  padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(5)}`};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-size: 1.05rem;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition:
    transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    filter 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(0.95);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    filter: brightness(0.9);
    box-shadow: ${({ theme }) => theme.shadows.soft};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 카카오 아이콘 (SVG 인라인)
export const KakaoIcon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000000' d='M12 3c5.8 0 10.5 3.66 10.5 8.18 0 4.52-4.7 8.18-10.5 8.18-.88 0-1.73-.08-2.54-.24l-4.14 2.72a.5.5 0 0 1-.78-.54l.98-3.67C3.24 16.1 1.5 13.76 1.5 11.18 1.5 6.66 6.2 3 12 3'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;
