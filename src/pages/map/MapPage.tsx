import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { MapViewCard } from "./components/MapViewCard";
import { RecyclingCenterList } from "./components/RecyclingCenterList";
import { useMapData } from "shared/api/map";
import { useMapStore } from "shared/state/mapStore";
import { useNotificationStore } from "shared/state/notificationStore";
import { useSettingsStore } from "shared/state/settingsStore";
import { defaultMapFilterOptions } from "shared/constants/mapVisuals";
import { Button } from "shared/ui/Button/Button";
import type { RecyclingCenter, TrashBin } from "shared/types/map";
import type { MapDestination } from "./types";
import * as S from "./MapPage.styles";

export function MapPage() {
  const { t } = useTranslation();
  const { selectedType, setSelectedType, userLocation, setUserLocation } = useMapStore();
  const locationEnabled = useSettingsStore((state) => state.location); // 위치 권한 토글 값
  const { showBanner, closeBanner, showSnackbar } = useNotificationStore();
  const { data, error, isError, isFetching, refetch } = useMapData();
  const options = data?.options ?? defaultMapFilterOptions;
  const centers = data?.centers ?? [];
  const shouldShowError = Boolean(isError && error);
  const [selectedDestination, setSelectedDestination] = useState<MapDestination | null>(null);
  const canUseGeolocation =
    typeof window !== "undefined" && typeof navigator !== "undefined" && "geolocation" in navigator; // 브라우저 위치 지원 여부

  // 선택된 유형에 맞춰 쓰레기통 목록 필터링
  const filteredBins = useMemo(() => {
    const availableBins = data?.bins ?? [];
    if (selectedType === "all") return availableBins;
    return availableBins.filter((bin) => bin.type === selectedType);
  }, [data?.bins, selectedType]);

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleRetry = () => {
    void refetch();
  };

  const ensureUserLocation = () => {
    if (userLocation) {
      return true;
    }

    showSnackbar(t("map.routePanel.locationRequired"), {
      type: "warning",
      duration: 2800,
    });
    return false;
  };

  const handleRequestDirections = (
    target: TrashBin | RecyclingCenter,
    kind: MapDestination["kind"],
  ) => {
    if (!ensureUserLocation()) {
      return;
    }

    setSelectedDestination({
      id: target.id,
      name: target.name,
      address: kind === "bin" ? (target as TrashBin).location : (target as RecyclingCenter).address,
      coordinates: target.coordinates,
      kind,
    });
  };

  const handleClearRoute = () => {
    setSelectedDestination(null);
  };

  // 내 위치 사용하기 버튼 처리
  const handleUseLocation = useCallback(() => {
    if (!locationEnabled) {
      showSnackbar(t("notifications.snackbar.locationPermissionRequired"), {
        type: "warning",
        duration: 2600,
      });
      return;
    }

    if (!canUseGeolocation || typeof navigator === "undefined" || !navigator.geolocation) {
      showSnackbar(t("notifications.snackbar.locationUnsupported"), {
        type: "error",
        duration: 2600,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // 성공 시 사용자 위치 상태 갱신
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        showSnackbar(t("notifications.snackbar.locationPinned"), {
          type: "success",
          duration: 2400,
        });
      },
      (error) => {
        console.error("Failed to fetch current position", error);
        const geoError = error as GeolocationPositionError | null;
        const permissionDenied = geoError?.code === 1;
        showSnackbar(
          permissionDenied
            ? t("notifications.snackbar.locationPermissionDenied")
            : t("notifications.snackbar.locationError"),
          {
            type: permissionDenied ? "warning" : "error",
            duration: 3200,
          },
        );
        if (permissionDenied) {
          // 거부 시 위치 상태 초기화
          setUserLocation(null);
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 0,
      },
    );
  }, [locationEnabled, canUseGeolocation, setUserLocation, showSnackbar, t]);

  useEffect(() => {
    const bannerId = showBanner({
      type: "info",
      message: t("map.guide.bannerMessage"),
      sessionKey: "map-guide",
    });

    if (!bannerId) {
      return undefined;
    }

    return () => {
      closeBanner(bannerId);
    };
  }, [showBanner, closeBanner, t]);

  useEffect(() => {
    if (!userLocation) {
      setSelectedDestination(null);
    }
  }, [userLocation]);

  // 지도 페이지 레이아웃 구성
  return (
    <S.PageContainer>
      <MapViewCard
        binCount={filteredBins.length}
        bins={filteredBins}
        centers={centers}
        onUseLocationClick={handleUseLocation}
        userLocation={userLocation}
        selectedDestination={selectedDestination}
        onClearRoute={handleClearRoute}
      />
      {shouldShowError && (
        <S.ErrorInline role="alert">
          <S.ErrorMessage>{t("map.errors.title")}</S.ErrorMessage>
          <Button size="sm" variant="secondary" onClick={handleRetry} disabled={isFetching}>
            {isFetching ? t("map.errors.retrying") : t("map.errors.action")}
          </Button>
        </S.ErrorInline>
      )}
      <RecyclingCenterList
        centers={centers}
        bins={filteredBins}
        options={options}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        onRequestBinDirections={(bin) => handleRequestDirections(bin, "bin")}
        onRequestCenterDirections={(center) => handleRequestDirections(center, "center")}
      />
    </S.PageContainer>
  );
}
