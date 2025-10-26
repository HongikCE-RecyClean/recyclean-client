import styled from "@emotion/styled";
import type { BadgeTone, BadgeVariant } from "./Badge";

// 배지 색상 토큰 정의
const toneColors: Record<BadgeTone, { bg: string; fg: string; border: string }> = {
  neutral: {
    bg: "#f1f5f9",
    fg: "#475569",
    border: "rgba(148, 163, 184, 0.4)",
  },
  primary: {
    bg: "#d1fae5",
    fg: "#047857",
    border: "rgba(16, 185, 129, 0.5)",
  },
  success: {
    bg: "#dcfce7",
    fg: "#166534",
    border: "rgba(74, 222, 128, 0.5)",
  },
  warning: {
    bg: "#fef3c7",
    fg: "#92400e",
    border: "rgba(251, 191, 36, 0.5)",
  },
  danger: {
    bg: "#fee2e2",
    fg: "#b91c1c",
    border: "rgba(248, 113, 113, 0.5)",
  },
  info: {
    bg: "#dbeafe",
    fg: "#1d4ed8",
    border: "rgba(147, 197, 253, 0.5)",
  },
};

// 배지 스타일 정의
export const StyledBadge = styled.span<{ $variant: BadgeVariant; $tone: BadgeTone }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  letter-spacing: 0.02em;
  text-transform: none;
  border: ${({ $variant, $tone }) =>
    $variant === "outline" ? `1px solid ${toneColors[$tone].border}` : "none"};
  background-color: ${({ $variant, $tone }) => {
    if ($variant === "solid") {
      return toneColors[$tone].fg;
    }
    if ($variant === "outline") {
      return "transparent";
    }
    return toneColors[$tone].bg;
  }};
  color: ${({ $variant, $tone }) => ($variant === "solid" ? "#ffffff" : toneColors[$tone].fg)};
`;
