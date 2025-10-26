import type { ChangeEvent } from "react";
import { MapPin, Navigation, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { SelectField } from "../../../shared/ui/SelectField/SelectField";
import type { FilterOption } from "shared/types/map";
import * as S from "./MapFilterCard.styles";

interface MapFilterCardProps {
  selectedType: string;
  options: FilterOption[];
  onTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onUseLocationClick?: () => void;
}

export function MapFilterCard({
  selectedType,
  options,
  onTypeChange,
  onUseLocationClick,
}: MapFilterCardProps) {
  // 지도 필터 카드 렌더링
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <MapPin size={18} />내 주변 배출함
        </CardTitle>
      </CardHeader>
      <CardContent>
        <S.FullWidthButton variant="outline" onClick={onUseLocationClick}>
          <Navigation size={18} />내 위치 사용하기
        </S.FullWidthButton>
        <S.FilterRow>
          <Filter size={16} color="#64748b" />
          <SelectField options={options} value={selectedType} onChange={onTypeChange} />
        </S.FilterRow>
      </CardContent>
    </Card>
  );
}
