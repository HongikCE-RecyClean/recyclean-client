import { css } from "@emotion/react";
import { useState } from "react";
import type { ReactNode } from "react";
import * as S from "./Avatar.styles";

interface AvatarProps {
  size?: number;
  children: ReactNode;
}

export function Avatar({ size = 48, children }: AvatarProps) {
  // 아바타 루트 요소 렌더링
  const rootSizeClass = css`
    width: ${size}px;
    height: ${size}px;
  `;

  // 아바타 크기 클래스 적용
  return <S.AvatarRoot css={rootSizeClass}>{children}</S.AvatarRoot>;
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode;
}

export function AvatarImage({ fallback, onError, ...rest }: AvatarImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return fallback ? <>{fallback}</> : null;
  }

  return (
    <S.AvatarImg
      {...rest}
      onError={(event) => {
        setHasError(true);
        onError?.(event);
      }}
    />
  );
}

interface AvatarFallbackProps {
  children: ReactNode;
}

export function AvatarFallback({ children }: AvatarFallbackProps) {
  return <S.Fallback>{children}</S.Fallback>;
}
