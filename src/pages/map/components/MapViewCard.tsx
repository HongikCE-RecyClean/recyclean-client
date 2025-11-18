import { MapPin } from "lucide-react";
import { Container as MapContainer, NaverMap } from "react-naver-maps";
import { Card, CardContent } from "shared/ui/Card/Card";
import * as S from "./MapViewCard.styles";

interface MapViewCardProps {
  binCount: number;
}

const DEFAULT_CENTER = { lat: 37.5666103, lng: 126.9783882 };
const DEFAULT_ZOOM = 12;

export function MapViewCard({ binCount }: MapViewCardProps) {
  const hasMapKey = Boolean(
    import.meta.env.VITE_NAVER_MAP_KEY_ID ?? import.meta.env.VITE_NAVER_MAP_CLIENT_ID,
  );

  // 지도 카드 렌더링
  return (
    <Card>
      <CardContent>
        <S.HeaderRow>
          <MapPin size={20} />
          <S.HeaderTexts>
            <S.HeaderTitle>지도에서 위치 확인</S.HeaderTitle>
            <S.HeaderSubtitle>근처 {binCount}개의 배출함을 지도에 표시해요.</S.HeaderSubtitle>
          </S.HeaderTexts>
        </S.HeaderRow>

        {hasMapKey ? (
          <S.MapWrapper>
            <MapContainer style={{ width: "100%", height: "100%" }}>
              <NaverMap defaultCenter={DEFAULT_CENTER} defaultZoom={DEFAULT_ZOOM} />
            </MapContainer>
          </S.MapWrapper>
        ) : (
          <S.MapFallback>
            <div>API 키가 설정되면 실제 지도를 표시해요.</div>
            <div>콘솔에서 Web Dynamic Map 키를 등록했는지 확인해주세요.</div>
          </S.MapFallback>
        )}
      </CardContent>
    </Card>
  );
}
