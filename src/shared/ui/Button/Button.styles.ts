import styled from "@emotion/styled";
import type { CSSObject } from "@emotion/react";
import type { AppTheme } from "../../styles/theme";
import type { ButtonSize, ButtonVariant } from "./Button";

type VariantStyle = (theme: AppTheme) => CSSObject;
type SizeStyle = (theme: AppTheme) => CSSObject;

// 버튼 색상 변형 정의
const variantStyles: Record<ButtonVariant, VariantStyle> = {
  primary: (theme) => ({
    backgroundColor: theme.colors.primary,
    color: theme.colors.primaryContrast,
    "&:hover": {
      backgroundColor: theme.colors.primaryHover,
    },
  }),
  secondary: (theme) => ({
    backgroundColor: theme.colors.secondary,
    color: theme.colors.primaryContrast,
    "&:hover": {
      backgroundColor: theme.colors.secondaryHover,
    },
  }),
  outline: (theme) => ({
    backgroundColor: "transparent",
    border: `1px solid ${theme.colors.border}`,
    color: theme.colors.text,
    "&:hover": {
      backgroundColor: theme.colors.surfaceMuted,
    },
  }),
  ghost: (theme) => ({
    backgroundColor: "transparent",
    color: theme.colors.textMuted,
    "&:hover": {
      backgroundColor: theme.colors.surfaceMuted,
      color: theme.colors.text,
    },
  }),
  destructive: (theme) => ({
    backgroundColor: theme.colors.danger,
    color: theme.colors.primaryContrast,
    "&:hover": {
      backgroundColor: theme.colors.dangerHover,
    },
  }),
  text: (theme) => ({
    backgroundColor: "transparent",
    color: theme.colors.primary,
    boxShadow: "none",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.colors.primary,
      textDecoration: "underline",
    },
  }),
};

// 버튼 사이즈 변형 정의
const sizeStyles: Record<ButtonSize, SizeStyle> = {
  md: (theme) => ({
    height: theme.spacing(10),
    paddingInline: theme.spacing(4),
    gap: theme.spacing(2),
    fontSize: "0.95rem",
  }),
  sm: (theme) => ({
    height: theme.spacing(8),
    paddingInline: theme.spacing(3),
    gap: theme.spacing(1.5),
    fontSize: "0.85rem",
  }),
  lg: (theme) => ({
    height: theme.spacing(12),
    paddingInline: theme.spacing(5),
    gap: theme.spacing(2.5),
    fontSize: "1rem",
  }),
  icon: (theme) => ({
    height: theme.spacing(10),
    width: theme.spacing(10),
    padding: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  }),
};

// 텍스트 변형 공통 오버라이드 정의
const textVariantOverrides = (theme: AppTheme): CSSObject => ({
  height: "auto",
  minHeight: "unset",
  paddingInline: 0,
  paddingBlock: 0,
  borderRadius: 0,
  boxShadow: "none",
  gap: theme.spacing(1),
});

// 버튼 기본 스타일 정의
export const StyledButton = styled.button<{ $variant: ButtonVariant; $size: ButtonSize }>(
  ({ theme, $variant, $size }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radii.md,
    border: "none",
    fontWeight: theme.typography.weights.medium,
    transition: "background-color 0.2s ease, color 0.2s ease",
    cursor: "pointer",
    position: "relative",
    outline: "none",
    textTransform: "none",
    letterSpacing: "0.01em",
    ...variantStyles[$variant](theme),
    ...sizeStyles[$size](theme),
    ...($variant === "text" ? textVariantOverrides(theme) : {}),
    ":disabled": {
      opacity: 0.55,
      cursor: "not-allowed",
      color: $variant === "text" ? theme.colors.textMuted : undefined,
    },
    ":focus-visible": {
      outline: `2px solid ${theme.colors.focusRing}`,
      outlineOffset: "2px",
      textDecoration: $variant === "text" ? "underline" : undefined,
    },
  }),
);
