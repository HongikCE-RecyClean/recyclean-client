import { forwardRef } from "react";
import * as S from "./Switch.styles";

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked, onCheckedChange, disabled, ...rest },
  ref,
) {
  // 스위치 토글 동작 처리
  return (
    <S.SwitchRoot
      ref={ref}
      role="switch"
      aria-checked={checked}
      $checked={checked}
      disabled={disabled}
      onClick={(event) => {
        rest.onClick?.(event);
        if (event.defaultPrevented) return;
        onCheckedChange?.(!checked);
      }}
      {...rest}
    >
      <S.Thumb $checked={checked} />
    </S.SwitchRoot>
  );
});
