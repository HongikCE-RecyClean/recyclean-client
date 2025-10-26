import { forwardRef } from "react";
import type { ReactNode } from "react";
import * as S from "./TextField.styles";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { startIcon, ...rest },
  ref,
) {
  // 텍스트 필드 렌더링 및 아이콘 처리
  return (
    <S.FieldWrapper>
      {startIcon && <S.IconSlot>{startIcon}</S.IconSlot>}
      <S.StyledInput ref={ref} $hasIcon={Boolean(startIcon)} {...rest} />
    </S.FieldWrapper>
  );
});
