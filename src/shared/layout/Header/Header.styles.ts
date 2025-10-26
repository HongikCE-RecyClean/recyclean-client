import styled from "@emotion/styled";

// 헤더 바 래퍼 스타일 정의
export const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.9);
`;

// 헤더 내부 정렬 스타일 정의
export const HeaderInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 브랜드 영역 스타일 정의
export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.text};
`;

// 로고 이미지 스타일 정의
export const BrandLogo = styled.img`
  width: 28px;
  height: 28px;
`;

// 브랜드 타이틀 텍스트 스타일 정의
export const BrandTitle = styled.h1`
  margin: 0;
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;
