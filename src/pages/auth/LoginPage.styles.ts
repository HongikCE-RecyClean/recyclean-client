import styled from "@emotion/styled";

// 전체 페이지를 헤더 + 콘텐츠로 구성하는 래퍼 정의
export const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(47, 133, 90, 0.06), rgba(245, 247, 250, 1));
  display: flex;
  flex-direction: column;
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

// 로고와 텍스트를 담는 히어로 섹션 정의
export const Hero = styled.section`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const Logo = styled.div`
  font-size: 3rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.08em;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 5vw, 2.75rem);
  color: ${({ theme }) => theme.colors.text};
`;

export const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
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
