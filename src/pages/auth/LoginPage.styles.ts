import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

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
  background:
    radial-gradient(circle at 20% 20%, rgba(47, 133, 90, 0.08), transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.06), transparent 50%),
    linear-gradient(180deg, rgba(47, 133, 90, 0.04), rgba(245, 247, 250, 1));
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.typography.family};
`;

// 헤더 영역 컨테이너 정의
export const HeaderBar = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.08);
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

// 설명 블록을 카드 형태로 정렬
export const Hero = styled.section`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => `${theme.spacing(10)} ${theme.spacing(6)}`};
  background: rgba(255, 255, 255, 0.75);
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow:
    0 20px 50px rgba(15, 23, 42, 0.06),
    0 1px 3px rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.8);
  align-items: center;
  backdrop-filter: blur(16px);
  animation: ${fadeIn} 0.6s ease-out;
`;

// 핵심 안내 한 줄 텍스트 스타일
export const Tagline = styled.h1`
  margin: 0;
  font-size: clamp(1.25rem, 3.5vw, 1.75rem);
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  letter-spacing: -0.02em;
  line-height: 1.3;
`;

// 상세 설명 문단을 슬림하게 보이도록 설정
export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: clamp(0.95rem, 2.5vw, 1.05rem);
  line-height: 1.8;
  max-width: 26rem;
  margin-left: auto;
  margin-right: auto;
  font-weight: ${({ theme }) => theme.typography.weights.regular};
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

export const KakaoButton = styled.button`
  width: 100%;
  max-width: 400px;
  border: none;
  border-radius: 14px;
  background: #fee500;
  color: #3a1d1d;
  padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(5)}`};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-size: 1.05rem;
  box-shadow:
    0 8px 20px rgba(254, 229, 0, 0.3),
    0 2px 8px rgba(58, 29, 29, 0.15);
  transition:
    transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    background 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow:
      0 12px 28px rgba(254, 229, 0, 0.4),
      0 4px 12px rgba(58, 29, 29, 0.2);
    background: #ffed14;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow:
      0 4px 12px rgba(254, 229, 0, 0.3),
      0 2px 6px rgba(58, 29, 29, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow:
      0 4px 12px rgba(254, 229, 0, 0.2),
      0 2px 6px rgba(58, 29, 29, 0.1);
  }
`;

export const KakaoIcon = styled.img`
  width: ${({ theme }) => theme.spacing(6)};
  height: ${({ theme }) => theme.spacing(6)};
  flex-shrink: 0;
`;
