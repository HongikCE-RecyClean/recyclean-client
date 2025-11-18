import { useMemo } from "react";
import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { MapViewCard } from "./components/MapViewCard";
import { RecyclingCenterList } from "./components/RecyclingCenterList";
import { useMapData } from "shared/api/map";
import { useMapStore } from "shared/state/mapStore";
import { defaultMapFilterOptions } from "shared/constants/mapVisuals";
import { Button } from "shared/ui/Button/Button";
import * as S from "./MapPage.styles";

export function MapPage() {
  const { t } = useTranslation();
  const { selectedType, setSelectedType } = useMapStore();
  const { data, error, isError, isFetching, refetch } = useMapData();
  const options = data?.options ?? defaultMapFilterOptions;
  const centers = data?.centers ?? [];
  const shouldShowError = Boolean(isError && error);

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

  // 지도 페이지 레이아웃 구성
  return (
    <S.PageContainer>
      <MapViewCard binCount={filteredBins.length} />
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
      />
    </S.PageContainer>
  );
}
