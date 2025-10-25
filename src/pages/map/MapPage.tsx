import { ChangeEvent, useMemo } from "react";
import styled from "@emotion/styled";
import { MapFilterCard } from "./components/MapFilterCard";
import { MapPlaceholderCard } from "./components/MapPlaceholderCard";
import { TrashBinList } from "./components/TrashBinList";
import { RecyclingCenterList } from "./components/RecyclingCenterList";
import { useMapData } from "shared/api/map";
import { useMapStore } from "shared/state/mapStore";

const PageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export function MapPage() {
  const { selectedType, setSelectedType } = useMapStore();
  const { data } = useMapData();
  const bins = data?.bins ?? [];
  const options = data?.options ?? [];
  const centers = data?.centers ?? [];

  // 선택된 유형에 맞춰 쓰레기통 목록 필터링
  const filteredBins = useMemo(() => {
    if (selectedType === "all") return bins;
    return bins.filter((bin) => bin.type === selectedType);
  }, [bins, selectedType]);

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  return (
    <PageContainer>
      <MapFilterCard
        selectedType={selectedType}
        options={options}
        onTypeChange={handleTypeChange}
      />
      <MapPlaceholderCard binCount={filteredBins.length} />
      <TrashBinList bins={filteredBins} />
      <RecyclingCenterList centers={centers} />
    </PageContainer>
  );
}
