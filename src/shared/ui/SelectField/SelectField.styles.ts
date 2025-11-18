import styled from "@emotion/styled";

// 셀렉트 래퍼 스타일 정의
export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// 기본 셀렉트 박스 스타일 정의
export const StyledSelect = styled.select`
  appearance: none;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) =>
    `${theme.spacing(3)} ${theme.spacing(5)} ${theme.spacing(3)} ${theme.spacing(3)}`};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
    outline: none;
  }
`;

// 드롭다운 화살표 표시 정의
export const Chevron = styled.span`
  position: absolute;
  right: ${({ theme }) => theme.spacing(2)};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
`;
