import { Minus, Plus } from "lucide-react";
import type { ChangeEvent, InputHTMLAttributes } from "react";
import * as S from "./NumberInput.styles";

interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange" | "step"> {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

export function NumberInput({
  value,
  min = 1,
  max,
  step = 1,
  onChange,
  disabled,
  inputMode,
  pattern,
  ...rest
}: NumberInputProps) {
  // 경계값에 맞춰 값을 보정하는 헬퍼
  const clampValue = (nextValue: number) => {
    let result = nextValue;
    if (typeof min === "number") {
      result = Math.max(min, result);
    }
    if (typeof max === "number") {
      result = Math.min(max, result);
    }
    return result;
  };

  const handleManualChange = (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    if (raw === "") {
      onChange(typeof min === "number" ? min : 0);
      return;
    }

    const parsed = Number(raw);
    if (Number.isNaN(parsed)) {
      return;
    }
    onChange(clampValue(parsed));
  };

  const handleDecrease = () => {
    if (disabled) {
      return;
    }
    onChange(clampValue(value - step));
  };

  const handleIncrease = () => {
    if (disabled) {
      return;
    }
    onChange(clampValue(value + step));
  };

  const minusDisabled = disabled || (typeof min === "number" && value <= min);
  const plusDisabled = disabled || (typeof max === "number" && value >= max);

  return (
    <S.Wrapper>
      <S.ControlButton type="button" onClick={handleDecrease} disabled={minusDisabled}>
        <Minus size={18} strokeWidth={2.5} />
      </S.ControlButton>
      <S.Input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        inputMode={inputMode ?? "numeric"}
        pattern={pattern ?? "[0-9]*"}
        onChange={handleManualChange}
        {...rest}
      />
      <S.ControlButton type="button" onClick={handleIncrease} disabled={plusDisabled}>
        <Plus size={18} strokeWidth={2.5} />
      </S.ControlButton>
    </S.Wrapper>
  );
}
