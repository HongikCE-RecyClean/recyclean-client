import type { BannerProps } from "./Banner";
import { Banner } from "./Banner";
import * as S from "./BannerOverlay.styles";

export function BannerOverlay(props: BannerProps) {
  return (
    <S.OverlayWrapper>
      <S.OverlayInner>
        <Banner {...props} />
      </S.OverlayInner>
    </S.OverlayWrapper>
  );
}
