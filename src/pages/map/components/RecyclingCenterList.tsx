import { useMemo, type ChangeEvent } from "react";
import { formatDistanceToNow } from "date-fns";
import { Clock, Navigation, Phone, Recycle, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CardTitle } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import { Button } from "../../../shared/ui/Button/Button";
import { ImageWithFallback } from "../../../shared/media/ImageWithFallback/ImageWithFallback";
import { SelectField } from "shared/ui/SelectField/SelectField";
import { mapAvailabilityTone, resolveMaterialBadgeTone } from "shared/constants/mapVisuals";
import type { RecyclingCenter, TrashBin, FilterOption } from "shared/types/map";
import { resolveDateFnsLocale } from "shared/utils/dateLocales";
import { SectionCard, SectionCardContent, SectionCardHeader } from "../MapPage.styles";
import * as S from "./RecyclingCenterList.styles";

interface RecyclingCenterListProps {
  centers: RecyclingCenter[];
  bins: TrashBin[];
  options: FilterOption[];
  selectedType: string;
  onTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export function RecyclingCenterList({
  centers,
  bins,
  options,
  selectedType,
  onTypeChange,
}: RecyclingCenterListProps) {
  const { t, i18n } = useTranslation();
  const dateLocale = resolveDateFnsLocale(i18n.language);
  const localizedOptions = useMemo(
    () =>
      options.map((option) => ({
        ...option,
        label: t(`map.filter.options.${option.value}`, { defaultValue: option.label }),
      })),
    [options, t],
  );

  const formatBinUpdatedTime = (timestamp: string) => {
    // ISO 문자열을 사용자 친화적인 상대 시간으로 변환해요
    const parsedDate = new Date(timestamp);
    if (Number.isNaN(parsedDate.getTime())) {
      return timestamp;
    }
    const relativeTime = formatDistanceToNow(parsedDate, {
      addSuffix: true,
      locale: dateLocale,
    });
    return t("map.bins.updatedAt", { time: relativeTime });
  };

  return (
    <SectionCard>
      <SectionCardHeader>
        <CardTitle>{t("map.centers.title")}</CardTitle>
      </SectionCardHeader>
      <SectionCardContent>
        <S.SectionHeader>
          <S.SectionLabel>{t("map.filter.title")}</S.SectionLabel>
          <SelectField options={localizedOptions} value={selectedType} onChange={onTypeChange} />
        </S.SectionHeader>

        <S.BinSection>
          {bins.length === 0 ? (
            <S.EmptyState>{t("map.bins.empty")}</S.EmptyState>
          ) : (
            <S.BinList>
              {bins.map((bin) => (
                <S.BinItem key={bin.id}>
                  <S.BinHeader>
                    <S.BinInfo>
                      {bin.type === "recycling" ? <Recycle size={18} /> : <Trash2 size={18} />}
                      <S.BinTexts>
                        <S.BinName>{bin.name}</S.BinName>
                        <S.BinLocation>{bin.location}</S.BinLocation>
                        <S.BinUpdated>
                          <Clock size={12} />
                          {formatBinUpdatedTime(bin.lastUpdated)}
                        </S.BinUpdated>
                      </S.BinTexts>
                    </S.BinInfo>
                    <S.BinStatus>
                      <Badge variant="outline">{bin.distance}</Badge>
                      <Badge tone={mapAvailabilityTone[bin.availability]}>
                        {t(`map.availability.${bin.availability}`)}
                      </Badge>
                    </S.BinStatus>
                  </S.BinHeader>

                  <S.ItemsSection>
                    <S.SectionHint>{t("map.bins.sectionLabel")}</S.SectionHint>
                    <S.ItemsChips>
                      {bin.acceptedItems.map((item) => (
                        <Badge key={item} variant="soft" tone={resolveMaterialBadgeTone(item)}>
                          {item}
                        </Badge>
                      ))}
                    </S.ItemsChips>
                  </S.ItemsSection>

                  <S.BinActions>
                    <Button variant="outline" size="sm" css={S.binActionButton}>
                      <Navigation size={14} />
                      {t("map.bins.directions")}
                    </Button>
                    <Button variant="outline" size="sm" css={S.binActionButton}>
                      {t("map.bins.report")}
                    </Button>
                  </S.BinActions>
                </S.BinItem>
              ))}
            </S.BinList>
          )}
        </S.BinSection>

        <S.SectionDivider />

        <S.SectionLabel>
          {t("map.centers.sectionTitle", { defaultValue: t("map.centers.title") })}
        </S.SectionLabel>

        <S.CenterGrid>
          {centers.map((center) => (
            <S.CenterCard key={center.id}>
              <S.CenterMedia>
                <ImageWithFallback src={center.image} alt={center.name} />
                <div css={S.centerBadgeContainer}>
                  <Badge variant="outline">{center.distance}</Badge>
                </div>
              </S.CenterMedia>
              <S.CenterContent>
                <div>
                  <h3 css={S.centerNameText}>{center.name}</h3>
                  <div css={S.centerAddressText}>{center.address}</div>
                </div>

                <S.MaterialChips>
                  {center.acceptedMaterials.map((material) => (
                    <Badge key={material} tone={resolveMaterialBadgeTone(material)}>
                      {material}
                    </Badge>
                  ))}
                </S.MaterialChips>

                <S.InfoStack>
                  <S.InfoRow>
                    <Clock size={12} />
                    {center.hours}
                  </S.InfoRow>
                  {center.phone && (
                    <S.InfoRow>
                      <Phone size={12} />
                      {center.phone}
                    </S.InfoRow>
                  )}
                </S.InfoStack>

                <S.ActionButtons>
                  <Button variant="outline" size="sm" css={S.centerActionButton}>
                    <Navigation size={14} />
                    {t("map.centers.directions")}
                  </Button>
                  {center.phone && (
                    <Button variant="outline" size="sm" css={S.centerActionButton}>
                      <Phone size={14} />
                      {t("map.centers.call")}
                    </Button>
                  )}
                </S.ActionButtons>
              </S.CenterContent>
            </S.CenterCard>
          ))}
        </S.CenterGrid>
      </SectionCardContent>
    </SectionCard>
  );
}
