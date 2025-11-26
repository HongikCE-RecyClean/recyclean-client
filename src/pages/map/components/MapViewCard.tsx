import { useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import { Navigation } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNaverMapsLoader } from "shared/hooks/useNaverMapsLoader";
import type { MapCoordinates } from "shared/state/mapStore";
import type { RecyclingCenter, TrashBin } from "shared/types/map";
import type { MapDestination } from "../types";
import { SectionCard, SectionCardContent } from "../MapPage.styles";
import * as S from "./MapViewCard.styles";

interface MapViewCardProps {
  binCount: number;
  bins: TrashBin[];
  centers: RecyclingCenter[];
  onUseLocationClick?: () => void;
  userLocation?: MapCoordinates | null;
  selectedDestination: MapDestination | null;
  onClearRoute?: () => void;
}

const DEFAULT_CENTER = { lat: 37.5666103, lng: 126.9783882 };
const DEFAULT_ZOOM = 12;
const ROUTE_PADDING = { top: 48, right: 32, bottom: 48, left: 32 };
const UNIFIED_MARKER_COLOR = "#22c55e"; // 모든 핀 색상 통일
const ROUTE_STROKE_COLOR = "#22c55e";
const WALKING_ROUTE_API = "https://router.project-osrm.org/route/v1/foot";

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

interface RouteSummary {
  distance: number;
  duration: number;
}

interface OsrmRouteResponse {
  code: string;
  routes?: Array<{
    distance: number;
    duration: number;
    geometry: {
      coordinates: Array<[number, number]>;
    };
  }>;
}

function createCircularMarker(color: string) {
  return `
    <div
      style="
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 3px solid #ffffff;
        box-shadow: 0 2px 6px rgba(15, 23, 42, 0.25);
        background: ${color};
      "
    />
  `;
}

function formatDistance(distanceInMeters: number) {
  if (distanceInMeters >= 1000) {
    return `${(distanceInMeters / 1000).toFixed(1)}km`;
  }
  return `${Math.round(distanceInMeters)}m`;
}

function formatDuration(durationSeconds: number) {
  if (durationSeconds < 60) {
    const seconds = Math.max(1, Math.round(durationSeconds));
    return `${seconds}초`;
  }
  const minutes = Math.max(1, Math.round(durationSeconds / 60));
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const restMinutes = minutes % 60;
    if (restMinutes === 0) {
      return `${hours}시간`;
    }
    return `${hours}시간 ${restMinutes}분`;
  }
  return `${minutes}분`;
}

// OSRM 공개 foot 라우팅 엔드포인트를 호출해요
async function requestWalkingRoute(
  start: MapCoordinates,
  end: MapCoordinates,
  signal?: AbortSignal,
) {
  const query = `${start.lng},${start.lat};${end.lng},${end.lat}`;
  const url = `${WALKING_ROUTE_API}/${query}?overview=full&geometries=geojson`;
  const response = await fetch(url, {
    signal,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load walking route: ${response.status}`);
  }

  const payload = (await response.json()) as OsrmRouteResponse;
  if (payload.code !== "Ok" || !payload.routes?.length) {
    throw new Error(`No walking route: ${payload.code}`);
  }

  const [route] = payload.routes;
  const path = route.geometry.coordinates.map(([lng, lat]) => ({ lat, lng }));

  return {
    path,
    distance: route.distance,
    duration: route.duration,
  };
}

export function MapViewCard({
  binCount,
  bins,
  centers,
  onUseLocationClick,
  userLocation,
  selectedDestination,
  onClearRoute,
}: MapViewCardProps) {
  const { t } = useTranslation();
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const userMarkerRef = useRef<naver.maps.Marker | null>(null);
  const binMarkersRef = useRef<naver.maps.Marker[]>([]);
  const centerMarkersRef = useRef<naver.maps.Marker[]>([]);
  const routePolylineRef = useRef<naver.maps.Polyline | null>(null);
  const routeAbortControllerRef = useRef<AbortController | null>(null);
  const { status, error, maps } = useNaverMapsLoader();
  const [mapInitError, setMapInitError] = useState<string | null>(null);
  const [isRouting, setIsRouting] = useState(false);
  const [routeSummary, setRouteSummary] = useState<RouteSummary | null>(null);
  const [routeError, setRouteError] = useState(false);

  const routeSummaryText = useMemo(() => {
    if (!routeSummary) return null;
    return `${formatDistance(routeSummary.distance)} · ${formatDuration(routeSummary.duration)}`;
  }, [routeSummary]);

  const disposeMarkers = (markersRef: MutableRefObject<naver.maps.Marker[]>) => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  const removeRoutePolyline = () => {
    if (routePolylineRef.current) {
      routePolylineRef.current.setMap(null);
      routePolylineRef.current = null;
    }
  };

  const resetRouteState = () => {
    removeRoutePolyline();
    setRouteSummary(null);
    setRouteError(false);
  };

  const cancelRouteRequest = () => {
    if (routeAbortControllerRef.current) {
      routeAbortControllerRef.current.abort();
      routeAbortControllerRef.current = null;
    }
    setIsRouting(false);
  };

  useEffect(() => {
    if (status !== "success" || !maps || !mapElementRef.current) {
      return;
    }

    try {
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
      cancelRouteRequest();
      disposeMarkers(binMarkersRef);
      disposeMarkers(centerMarkersRef);
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
        userMarkerRef.current = null;
      }
      removeRoutePolyline();
      const activeMap = mapInstanceRef.current;
      if (activeMap) {
        try {
          activeMap.destroy();
        } catch (cleanupError) {
          console.warn("Failed to dispose NAVER Maps instance", cleanupError);
        } finally {
          mapInstanceRef.current = null;
        }
      }
    };
  }, [status, maps]);

  useEffect(() => {
    if (status !== "success" || !maps) return;
    const mapInstance = mapInstanceRef.current;
    if (!mapInstance) return;

    disposeMarkers(binMarkersRef);
    binMarkersRef.current = bins.map(
      (bin) =>
        new maps.Marker({
          map: mapInstance,
          position: new maps.LatLng(bin.coordinates.lat, bin.coordinates.lng),
          icon: { content: createCircularMarker(UNIFIED_MARKER_COLOR) },
          title: bin.name,
        }),
    );

    disposeMarkers(centerMarkersRef);
    centerMarkersRef.current = centers.map(
      (center) =>
        new maps.Marker({
          map: mapInstance,
          position: new maps.LatLng(center.coordinates.lat, center.coordinates.lng),
          icon: { content: createCircularMarker(UNIFIED_MARKER_COLOR) },
          title: center.name,
          zIndex: 50,
        }),
    );
  }, [bins, centers, status, maps]);

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
      userMarkerRef.current = new maps.Marker({
        position: userLatLng,
        map: mapInstance,
        icon: { content: USER_MARKER_HTML },
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

  useEffect(() => {
    if (status !== "success" || !maps) return;
    const mapInstance = mapInstanceRef.current;
    if (!mapInstance) return;

    if (!userLocation || !selectedDestination) {
      cancelRouteRequest();
      resetRouteState();
      return;
    }

    cancelRouteRequest();
    resetRouteState();
    const controller = new AbortController();
    routeAbortControllerRef.current = controller;
    setIsRouting(true);
    setRouteError(false);

    requestWalkingRoute(userLocation, selectedDestination.coordinates, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) {
          return;
        }
        const latLngPath = result.path.map((point) => new maps.LatLng(point.lat, point.lng));
        if (latLngPath.length === 0) {
          throw new Error("Empty walking route path");
        }

        if (!routePolylineRef.current) {
          routePolylineRef.current = new maps.Polyline({
            map: mapInstance,
            path: latLngPath,
            strokeColor: ROUTE_STROKE_COLOR,
            strokeWeight: 5,
            strokeOpacity: 0.85,
            strokeStyle: "solid",
          });
        } else {
          routePolylineRef.current.setPath(latLngPath);
          if (!routePolylineRef.current.getMap()) {
            routePolylineRef.current.setMap(mapInstance);
          }
        }

        const bounds = new maps.LatLngBounds(latLngPath[0], latLngPath[0]);
        // 경로 전체가 보이도록 bounds를 순차적으로 확장
        latLngPath.forEach((latLng) => bounds.extend(latLng));
        mapInstance.fitBounds(bounds, ROUTE_PADDING as naver.maps.BoundsPadding);
        setRouteSummary({ distance: result.distance, duration: result.duration });
      })
      .catch((routingError) => {
        if (controller.signal.aborted) {
          return;
        }
        console.error("Failed to fetch walking route", routingError);
        removeRoutePolyline();
        setRouteSummary(null);
        setRouteError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsRouting(false);
          routeAbortControllerRef.current = null;
        }
      });

    return () => {
      controller.abort();
    };
  }, [maps, status, selectedDestination, userLocation]);

  const handleClearRoute = () => {
    cancelRouteRequest();
    resetRouteState();
    onClearRoute?.();
  };

  const renderRoutePanelBody = () => {
    if (!selectedDestination) {
      return <S.RouteStatus>{t("map.routePanel.idle")}</S.RouteStatus>;
    }

    return (
      <>
        <S.RouteDestinationName>{selectedDestination.name}</S.RouteDestinationName>
        <S.RouteDestinationAddress>{selectedDestination.address}</S.RouteDestinationAddress>
        {routeError && <S.RouteError>{t("map.routePanel.failed")}</S.RouteError>}
        {!routeError && isRouting && <S.RouteStatus>{t("map.routePanel.measuring")}</S.RouteStatus>}
        <S.RouteActions>
          <S.RouteClearButton
            variant="ghost"
            size="sm"
            onClick={handleClearRoute}
            disabled={isRouting}
          >
            {t("map.routePanel.clear")}
          </S.RouteClearButton>
        </S.RouteActions>
      </>
    );
  };

  return (
    <SectionCard>
      <SectionCardContent>
        <S.HeaderSection>
          <S.HeaderRow>
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
          <>
            <S.MapWrapper>
              <S.MapCanvas ref={mapElementRef} />
            </S.MapWrapper>
            <S.RoutePanel>
              <S.RoutePanelHeader>
                <span>{t("map.routePanel.title")}</span>
                {routeSummaryText && <S.RouteSummaryPill>{routeSummaryText}</S.RouteSummaryPill>}
              </S.RoutePanelHeader>
              {renderRoutePanelBody()}
            </S.RoutePanel>
          </>
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
      </SectionCardContent>
    </SectionCard>
  );
}
