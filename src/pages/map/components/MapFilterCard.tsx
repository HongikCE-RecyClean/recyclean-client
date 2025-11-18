import type { ChangeEvent } from "react";
import { MapPin, Navigation, Filter } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const localizedOptions = useMemo(
    () =>
      options.map((option) => ({
        ...option,
        label: t(`map.filter.options.${option.value}`, { defaultValue: option.label }),
      })),
    [options, t],
  );
  // 지도 필터 카드 렌더링
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <MapPin size={18} />
          {t("map.filter.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <S.FullWidthButton variant="outline" onClick={onUseLocationClick}>
          <Navigation size={18} />
          {t("map.filter.useLocation")}
        </S.FullWidthButton>
        <S.FilterRow>
          <Filter size={16} color="#64748b" />
          <SelectField options={localizedOptions} value={selectedType} onChange={onTypeChange} />
        </S.FilterRow>
      </CardContent>
    </Card>
  );
}
