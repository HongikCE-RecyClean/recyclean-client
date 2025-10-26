import { useState } from "react";
import type { ReactNode } from "react";
import * as S from "./Avatar.styles";

interface AvatarProps {
  size?: number;
  children: ReactNode;
}

export function Avatar({ size = 48, children }: AvatarProps) {
  // 아바타 루트 요소 렌더링
  return <S.AvatarRoot style={{ width: size, height: size }}>{children}</S.AvatarRoot>;
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
