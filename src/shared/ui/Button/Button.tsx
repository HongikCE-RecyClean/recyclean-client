import { forwardRef } from "react";
import { StyledButton } from "./Button.styles";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "text"; // 텍스트 버튼 전용 변형 정의
export type ButtonSize = "md" | "sm" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", ...rest },
  ref,
) {
  // 버튼 스타일 컴포넌트에 프롭 전달
  return <StyledButton ref={ref} $variant={variant} $size={size} {...rest} />;
});
