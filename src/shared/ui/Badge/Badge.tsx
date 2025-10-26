import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { StyledBadge } from "./Badge.styles";

export type BadgeVariant = "solid" | "soft" | "outline";
export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  tone?: BadgeTone;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { children, variant = "soft", tone = "neutral", ...rest },
  ref,
) {
  // 배지 스타일 컴포넌트에 속성 전달
  return (
    <StyledBadge ref={ref} $variant={variant} $tone={tone} {...rest}>
      {children}
    </StyledBadge>
  );
});
