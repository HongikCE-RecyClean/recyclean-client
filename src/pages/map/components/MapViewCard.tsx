import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "shared/ui/Card/Card";
import { useNaverMapsLoader } from "shared/hooks/useNaverMapsLoader";
import * as S from "./MapViewCard.styles";

interface MapViewCardProps {
  binCount: number;
  onUseLocationClick?: () => void;
}

const DEFAULT_CENTER = { lat: 37.5666103, lng: 126.9783882 };
const DEFAULT_ZOOM = 12;

export function MapViewCard({ binCount, onUseLocationClick }: MapViewCardProps) {
  const { t } = useTranslation();
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const { status, error, maps } = useNaverMapsLoader();
  const [mapInitError, setMapInitError] = useState<string | null>(null); // 지도 초기화 오류 상태 보관

  useEffect(() => {
    if (status !== "success" || !maps || !mapElementRef.current) return;

    try {
      // SDK 로딩 완료 후 실제 지도를 생성
      setMapInitError(null);
      const center = new maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
      const mapInstance = new maps.Map(mapElementRef.current, {
        center,
        zoom: DEFAULT_ZOOM,
      });

      mapInstanceRef.current = mapInstance;
    } catch (initializationError) {
      console.error("NAVER 지도 초기화 실패", initializationError);
      setMapInitError("init-failed");
      return;
    }

    return () => {
      const isNaverReady = Boolean(window?.naver?.maps?.Event);
      const activeMap = mapInstanceRef.current;

      if (!activeMap || !isNaverReady) {
        mapInstanceRef.current = null;
        return;
      }

      try {
        activeMap.destroy();
      } catch (cleanupError) {
        console.warn("NAVER 지도 정리 중 오류", cleanupError);
      } finally {
        mapInstanceRef.current = null;
      }
    };
  }, [status, maps]);

  // 지도 카드 렌더링
  return (
    <Card>
      <CardContent>
        <S.HeaderSection>
          <S.HeaderRow>
            <MapPin size={20} />
            <S.HeaderTexts>
              <S.HeaderTitle>{t("map.mapView.title")}</S.HeaderTitle>
              <S.HeaderSubtitle>{t("map.mapView.subtitle", { count: binCount })}</S.HeaderSubtitle>
            </S.HeaderTexts>
          </S.HeaderRow>
          <S.LocationButton variant="outline" onClick={onUseLocationClick}>
            <Navigation size={18} />
            {t("map.filter.useLocation")}
          </S.LocationButton>
        </S.HeaderSection>

        {status === "success" && !mapInitError ? (
          <S.MapWrapper>
            <S.MapCanvas ref={mapElementRef} />
          </S.MapWrapper>
        ) : (
          <S.MapFallback>
            {status === "loading" || status === "idle" ? (
              <div>{t("map.mapView.loading")}</div>
            ) : error === "missing-key" ? (
              <>
                <div>{t("map.mapView.missingKey.title")}</div>
                <div>{t("map.mapView.missingKey.description")}</div>
              </>
            ) : mapInitError ? (
              <>
                <div>{t("map.mapView.initFailed.title")}</div>
                <div>{t("map.mapView.initFailed.description")}</div>
              </>
            ) : (
              <>
                <div>{t("map.mapView.loadFailed.title")}</div>
                <div>{t("map.mapView.loadFailed.description")}</div>
              </>
            )}
          </S.MapFallback>
        )}
      </CardContent>
    </Card>
  );
}
