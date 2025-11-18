import { useMemo } from "react";
import type { ChangeEvent } from "react";
import { MapFilterCard } from "./components/MapFilterCard";
import { MapPlaceholderCard } from "./components/MapPlaceholderCard";
import { TrashBinList } from "./components/TrashBinList";
import { RecyclingCenterList } from "./components/RecyclingCenterList";
import { useMapData } from "shared/api/map";
import { useMapStore } from "shared/state/mapStore";
import { defaultMapFilterOptions } from "shared/constants/mapVisuals";
import * as S from "./MapPage.styles";

export function MapPage() {
  const { selectedType, setSelectedType } = useMapStore();
  const { data } = useMapData();
  const options = data?.options ?? defaultMapFilterOptions;
  const centers = data?.centers ?? [];

  // 선택된 유형에 맞춰 쓰레기통 목록 필터링
  const filteredBins = useMemo(() => {
    const availableBins = data?.bins ?? [];
    if (selectedType === "all") return availableBins;
    return availableBins.filter((bin) => bin.type === selectedType);
  }, [data?.bins, selectedType]);

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  // 지도 페이지 레이아웃 구성
  return (
    <S.PageContainer>
      <MapFilterCard
        selectedType={selectedType}
        options={options}
        onTypeChange={handleTypeChange}
      />
      <MapPlaceholderCard binCount={filteredBins.length} />
      <TrashBinList bins={filteredBins} />
      <RecyclingCenterList centers={centers} />
    </S.PageContainer>
  );
}
