import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "shared/ui/Card/Card";
import { useNaverMapsLoader } from "shared/hooks/useNaverMapsLoader";
import type { MapCoordinates } from "shared/state/mapStore";
import * as S from "./MapViewCard.styles";

interface MapViewCardProps {
  binCount: number;
  onUseLocationClick?: () => void;
  userLocation?: MapCoordinates | null;
}

const DEFAULT_CENTER = { lat: 37.5666103, lng: 126.9783882 };
const DEFAULT_ZOOM = 12;
// 사용자 현재 위치를 표현하는 단색 마커 HTML
const USER_MARKER_HTML = `
  <div
    style="
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 3px solid #ffffff;
      background: #34d399;
      box-shadow: 0 0 0 10px rgba(52, 211, 153, 0.25);
    "
  />
`;

export function MapViewCard({ binCount, onUseLocationClick, userLocation }: MapViewCardProps) {
  const { t } = useTranslation();
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const userMarkerRef = useRef<naver.maps.Marker | null>(null);
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
      console.error("Failed to initialize NAVER Maps", initializationError);
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
        // 사용자 마커 제거 후 지도 해제
        if (userMarkerRef.current) {
          userMarkerRef.current.setMap(null);
          userMarkerRef.current = null;
        }
        activeMap.destroy();
      } catch (cleanupError) {
        console.warn("Failed to dispose NAVER Maps instance", cleanupError);
      } finally {
        mapInstanceRef.current = null;
      }
    };
  }, [status, maps]);

  // 사용자 위치가 바뀔 때마다 마커를 반영
  useEffect(() => {
    if (status !== "success" || !maps) return;
    const mapInstance = mapInstanceRef.current;
    if (!mapInstance) return;

    if (!userLocation) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
        userMarkerRef.current = null;
      }
      return;
    }

    const userLatLng = new maps.LatLng(userLocation.lat, userLocation.lng);
    if (!userMarkerRef.current) {
      // 사용자 위치를 강조하는 마커 생성
      userMarkerRef.current = new maps.Marker({
        position: userLatLng,
        map: mapInstance,
        icon: {
          content: USER_MARKER_HTML,
        },
      });
    } else {
      userMarkerRef.current.setPosition(userLatLng);
      if (!userMarkerRef.current.getMap()) {
        userMarkerRef.current.setMap(mapInstance);
      }
    }

    mapInstance.panTo(userLatLng);
    if (mapInstance.getZoom() < 14) {
      mapInstance.setZoom(14);
    }
  }, [maps, status, userLocation]);

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
