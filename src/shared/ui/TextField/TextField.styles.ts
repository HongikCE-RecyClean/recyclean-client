import styled from "@emotion/styled";

// 입력 필드 래퍼 스타일 정의
export const FieldWrapper = styled.label`
  position: relative;
  display: inline-flex;
  width: 100%;
  align-items: center;
`;

// 기본 입력 필드 스타일 정의
export const StyledInput = styled.input<{ $hasIcon: boolean }>`
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme, $hasIcon }) =>
    `${theme.spacing(3)} ${theme.spacing(3)} ${theme.spacing(3)} ${
      $hasIcon ? `calc(${theme.spacing(3)} + 28px)` : theme.spacing(3)
    }`};
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

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

// 입력 아이콘 슬롯 스타일 정의
export const IconSlot = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing(3)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;
