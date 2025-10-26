import styled from "@emotion/styled";

// 스위치 루트 버튼 스타일 정의
export const SwitchRoot = styled.button<{ $checked: boolean }>`
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: none;
  padding: 0;
  cursor: pointer;
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : theme.colors.border};
  transition: background-color 0.2s ease;
  display: inline-flex;
  align-items: center;
  outline: none;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.35);
  }
`;

// 스위치 썸 스타일 정의
export const Thumb = styled.span<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transform: translateX(${({ $checked }) => ($checked ? "22px" : "2px")});
  transition: transform 0.2s ease;
`;
