import styled from "@emotion/styled";
import type { AppTheme } from "shared/styles/theme";
import type { BadgeTone, BadgeVariant } from "./Badge";

// 알파 값 추가 헬퍼
const withAlpha = (hexColor: string, alpha: string) => `${hexColor}${alpha}`;

// 배지 색상 토큰을 테마 기반으로 결정
const resolveToneColors = (theme: AppTheme, tone: BadgeTone) => {
  switch (tone) {
    case "primary":
      return {
        bg: withAlpha(theme.colors.primary, "1a"), // 10% 투명도
        fg: theme.colors.primary,
        border: withAlpha(theme.colors.primary, "4d"), // 30% 투명도
      };
    case "success":
      return {
        bg: theme.colors.successSurface,
        fg: theme.colors.success,
        border: withAlpha(theme.colors.success, "4d"),
      };
    case "warning":
      return {
        bg: theme.colors.warningSurface,
        fg: theme.colors.warning,
        border: withAlpha(theme.colors.warning, "4d"),
      };
    case "danger":
      return {
        bg: theme.colors.dangerSurface,
        fg: theme.colors.danger,
        border: withAlpha(theme.colors.danger, "4d"),
      };
    case "info":
      return {
        bg: theme.colors.infoSurface,
        fg: theme.colors.info,
        border: withAlpha(theme.colors.info, "4d"),
      };
    case "neutral":
    default:
      return {
        bg: theme.colors.surfaceMuted,
        fg: theme.colors.textMuted,
        border: theme.colors.border,
      };
  }
};

// 배지 스타일 정의
export const StyledBadge = styled.span<{ $variant: BadgeVariant; $tone: BadgeTone }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap; /* 칩 텍스트 단일 행 유지 */
  flex-shrink: 0; /* 칩 폭 축소 방지 */
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  letter-spacing: 0.02em;
  text-transform: none;
  border: ${({ $variant, $tone, theme }) =>
    $variant === "outline" ? `1px solid ${resolveToneColors(theme, $tone).border}` : "none"};
  background-color: ${({ $variant, $tone, theme }) => {
    const tone = resolveToneColors(theme, $tone);
    if ($variant === "solid") {
      return tone.fg;
    }
    if ($variant === "outline") {
      return "transparent";
    }
    return tone.bg;
  }};
  color: ${({ $variant, $tone, theme }) =>
    $variant === "solid" ? theme.colors.primaryContrast : resolveToneColors(theme, $tone).fg};
`;
