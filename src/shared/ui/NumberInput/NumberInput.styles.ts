import styled from "@emotion/styled";

// 숫자 입력 전체 래퍼
export const Wrapper = styled.div`
  display: inline-flex;
  align-items: stretch;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.surface};
  min-height: ${({ theme }) => theme.spacing(12)};
`;

// 증감 버튼 스타일
export const ControlButton = styled.button`
  width: ${({ theme }) => theme.spacing(10)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
    border-radius: ${({ theme }) => theme.radii.md};
  }
`;

// 실제 숫자 입력 필드
export const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  text-align: center;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(2)}`};
  height: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  /* 브라우저 기본 스핀 버튼 제거 */
  &[type="number"] {
    appearance: textfield;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`;
