// 진행 바 톤 타입 정의
export type ProgressTone = "primary" | "success" | "info" | "warning" | "danger" | "neutral";

interface ProgressProps {
  value: number;
  label?: string;
  tone?: ProgressTone;
}

import * as S from "./Progress.styles";

// 진행 바 컴포넌트 정의
export function Progress({ value, label, tone = "primary" }: ProgressProps) {
  // 진행 바와 라벨 렌더링
  return (
    <div>
      {label && <S.Label>{label}</S.Label>}
      <S.Track>
        {/* 톤별 색상으로 채워지는 인디케이터 */}
        <S.Indicator $value={value} $tone={tone} />
      </S.Track>
    </div>
  );
}
