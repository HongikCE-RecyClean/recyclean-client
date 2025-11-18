import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "shared/ui/Card/Card";
import { useNaverMapsLoader } from "shared/hooks/useNaverMapsLoader";
import * as S from "./MapViewCard.styles";

interface MapViewCardProps {
  binCount: number;
}

const DEFAULT_CENTER = { lat: 37.5666103, lng: 126.9783882 };
const DEFAULT_ZOOM = 12;

export function MapViewCard({ binCount }: MapViewCardProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const { status, error, maps } = useNaverMapsLoader();

  useEffect(() => {
    if (status !== "success" || !maps || !mapElementRef.current) return;

    const center = new maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
    const mapInstance = new maps.Map(mapElementRef.current, {
      center,
      zoom: DEFAULT_ZOOM,
    });

    return () => {
      mapInstance.destroy();
    };
  }, [status, maps]);

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

        {status === "success" ? (
          <S.MapWrapper>
            <S.MapCanvas ref={mapElementRef} />
          </S.MapWrapper>
        ) : (
          <S.MapFallback>
            {status === "loading" || status === "idle" ? (
              <div>지도를 불러오는 중이에요...</div>
            ) : error === "missing-key" ? (
              <>
                <div>API 키가 설정되면 실제 지도를 표시해요.</div>
                <div>콘솔에서 Web Dynamic Map 키를 등록했는지 확인해주세요.</div>
              </>
            ) : (
              <>
                <div>지도를 불러오지 못했어요.</div>
                <div>도메인 등록과 네트워크 상태를 확인해주세요.</div>
              </>
            )}
          </S.MapFallback>
        )}
      </CardContent>
    </Card>
  );
}
