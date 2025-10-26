interface ProgressProps {
  value: number;
  label?: string;
}

import * as S from "./Progress.styles";

export function Progress({ value, label }: ProgressProps) {
  // 진행 바와 라벨 렌더링
  return (
    <div>
      {label && <S.Label>{label}</S.Label>}
      <S.Track>
        <S.Indicator $value={value} />
      </S.Track>
    </div>
  );
}
