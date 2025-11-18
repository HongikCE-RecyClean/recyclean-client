import styled from "@emotion/styled";

// 전체 페이지를 헤더 + 콘텐츠로 구성하는 래퍼 정의
export const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(47, 133, 90, 0.06), rgba(245, 247, 250, 1));
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
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing(10)} ${theme.spacing(4)}`};
  gap: ${({ theme }) => theme.spacing(10)};
`;

// 설명 블록을 카드 형태로 정렬
export const Hero = styled.section`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => `${theme.spacing(6)} ${theme.spacing(4)}`};
  background: rgba(255, 255, 255, 0.92);
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.08);
  align-items: center;
  backdrop-filter: blur(6px);
`;

// 핵심 안내 한 줄 텍스트 스타일
export const Tagline = styled.h1`
  margin: 0;
  font-size: clamp(1.25rem, 3vw, 1.85rem);
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  letter-spacing: -0.01em;
`;

// 상세 설명 문단을 슬림하게 보이도록 설정
export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  line-height: 1.7;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
`;

// 버튼을 하단에 배치하는 영역 정의
export const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: auto;
  align-items: center;
`;

export const ButtonHint = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

export const KakaoButton = styled.button`
  width: 100%;
  max-width: 420px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: #fee500;
  color: #3a1d1d;
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(4)}`};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3)};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-size: 1.05rem;
  box-shadow: 0 12px 28px rgba(58, 29, 29, 0.18);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(58, 29, 29, 0.25);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const KakaoIcon = styled.img`
  width: ${({ theme }) => theme.spacing(7)};
  height: ${({ theme }) => theme.spacing(7)};
`;
