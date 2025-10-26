import { forwardRef } from "react";
import * as S from "./SelectField.styles";

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

export interface SelectFieldProps<T extends string>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: SelectOption<T>[];
  placeholder?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps<string>>(
  function SelectField({ options, placeholder, value, defaultValue, ...rest }, ref) {
    // 셀렉트 필드 옵션 렌더링
    return (
      <S.SelectWrapper>
        <S.StyledSelect ref={ref} value={value} defaultValue={defaultValue} {...rest}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </S.StyledSelect>
        <S.Chevron>▾</S.Chevron>
      </S.SelectWrapper>
    );
  },
);
