import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

// 하단 네비게이션 바 컨테이너 정의
export const NavBar = styled.nav`
  position: sticky;
  bottom: 0;
  z-index: 90;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(14px);
`;

// 네비게이션 내부 정렬 정의
export const NavInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// 네비게이션 버튼 스타일 정의
export const NavButton = styled(NavLink)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;
