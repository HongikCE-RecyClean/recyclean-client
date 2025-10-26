import { useState } from "react";
import * as S from "./ImageWithFallback.styles";

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackIcon?: React.ReactNode;
}

export function ImageWithFallback({
  onError,
  fallbackIcon = "🖼️",
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  if (didError) {
    return (
      <S.ErrorContainer>
        <S.FallbackIcon>{fallbackIcon}</S.FallbackIcon>
      </S.ErrorContainer>
    );
  }

  // 이미지 로딩 실패 시 대체 표시 처리
  return (
    <S.StyledImage
      {...rest}
      onError={(event) => {
        setDidError(true);
        onError?.(event);
      }}
    />
  );
}
