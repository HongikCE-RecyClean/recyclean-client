import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import { Clock, Navigation, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CardTitle } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import { Button } from "../../../shared/ui/Button/Button";
import recycleanLogo from "../../../assets/recycleanLogo.svg";
import { resolveMaterialBadgeTone } from "shared/constants/mapVisuals";
import type { RecyclingCenter, TrashBin, FilterOption } from "shared/types/map";
import { SectionCard, SectionCardContent, SectionCardHeader } from "../MapPage.styles";
import * as S from "./RecyclingCenterList.styles";
import { useNotificationStore } from "shared/state/notificationStore";
import { useNumberFormatter } from "shared/utils/numberFormat";

const CENTER_PREVIEW_COUNT = 2; // 기본 노출할 센터 개수 상수

interface RecyclingCenterListProps {
  centers: RecyclingCenter[];
  bins: TrashBin[];
  options: FilterOption[];
  selectedType: string;
  onTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onRequestBinDirections?: (bin: TrashBin) => void;
  onRequestCenterDirections?: (center: RecyclingCenter) => void;
}

export function RecyclingCenterList({
  centers,
  onRequestCenterDirections,
}: RecyclingCenterListProps) {
  const { t } = useTranslation();
  const { showSnackbar } = useNotificationStore();
  const formatNumber = useNumberFormatter({ maximumFractionDigits: 1 });
  const [showAllCenters, setShowAllCenters] = useState(false); // 센터 더보기 토글 상태

  const hasHiddenCenters = centers.length > CENTER_PREVIEW_COUNT; // 기준 개수 초과 여부
  const visibleCenters = useMemo(
    () => (showAllCenters ? centers : centers.slice(0, CENTER_PREVIEW_COUNT)), // 기본 2개만 노출
    [centers, showAllCenters],
  );

  useEffect(() => {
    // 새 데이터 로딩 시 기본 상태로 접기
    setShowAllCenters(false);
  }, [centers.length]);

  const formatDistanceLabel = (distance: string) => {
    const match = distance.match(/([\\d.,]+)/);
    if (!match) return distance;
    const rawNumber = Number(match[1].replace(/,/g, ""));
    if (Number.isNaN(rawNumber)) return distance;
    const unit = distance.replace(match[1], "").trim() || "km";
    return `${formatNumber(rawNumber)}${unit}`;
  };

  // 로고 기본 이미지를 만드는 헬퍼 정의
  const createLogoFallback = (centerName: string) => (
    <S.CenterLogoPlaceholder role="img" aria-label={`${centerName} 기본 이미지`}>
      <S.CenterLogoMark src={recycleanLogo} alt="" />
    </S.CenterLogoPlaceholder>
  );

  /*
    필터 옵션 로직 보류
    const localizedOptions = useMemo(() => {
      ...
    }, [options, t]);
  */

  /*
    배출함 업데이트 시간 포맷 보류
    const formatBinUpdatedTime = (timestamp: string) => { ... }
  */

  const handleCall = (_center: RecyclingCenter) => {
    showSnackbar(t("map.centers.callUnavailable"), {
      type: "info",
      duration: 2200,
    });
  };

  return (
    <SectionCard>
      <SectionCardHeader>
        <CardTitle>{t("map.centers.title")}</CardTitle>
      </SectionCardHeader>
      <SectionCardContent>
        {/**
         * 필터 메뉴와 배출함 목록을 임시로 숨기기 위한 주석 처리
         */}
        {/**
         * <S.SectionHeader>
         *   <S.SectionLabel>{t("map.filter.title")}</S.SectionLabel>
         *   <SelectField options={localizedOptions} value={selectedType} onChange={onTypeChange} />
         * </S.SectionHeader>
         *
         * <S.BinSection>
         *   {bins.length === 0 ? (
         *     <S.EmptyState>{t("map.bins.empty")}</S.EmptyState>
         *   ) : (
         *     <S.BinList>
         *       {bins.map((bin) => (
         *         <S.BinItem key={bin.id}>
         *           <S.BinHeader>
         *             <S.BinInfo>
         *               {bin.type === "recycling" ? <Recycle size={18} /> : <Trash2 size={18} />}
         *               <S.BinTexts>
         *                 <S.BinName>{bin.name}</S.BinName>
         *                 <S.BinLocation>{bin.location}</S.BinLocation>
         *                 <S.BinUpdated>
         *                   <Clock size={12} />
         *                   {formatBinUpdatedTime(bin.lastUpdated)}
         *                 </S.BinUpdated>
         *               </S.BinTexts>
         *             </S.BinInfo>
         *             <S.BinStatus>
         *               <Badge variant="outline">{bin.distance}</Badge>
         *               <Badge tone={mapAvailabilityTone[bin.availability]}>
         *                 {t(`map.availability.${bin.availability}`)}
         *               </Badge>
         *             </S.BinStatus>
         *           </S.BinHeader>
         *
         *           <S.ItemsSection>
         *             <S.SectionHint>{t("map.bins.sectionLabel")}</S.SectionHint>
         *             <S.ItemsChips>
         *               {bin.acceptedItems.map((item) => (
         *                 <Badge key={item} variant="soft" tone={resolveMaterialBadgeTone(item)}>
         *                   {item}
         *                 </Badge>
         *               ))}
         *             </S.ItemsChips>
         *           </S.ItemsSection>
         *
         *           <S.BinActions>
         *             <Button
         *               variant="outline"
         *               size="sm"
         *               css={S.binActionButton}
         *               onClick={() => onRequestBinDirections?.(bin)}
         *             >
         *               <Navigation size={14} />
         *               {t("map.bins.directions")}
         *             </Button>
         *             <Button variant="outline" size="sm" css={S.binActionButton}>
         *               {t("map.bins.report")}
         *             </Button>
         *           </S.BinActions>
         *         </S.BinItem>
         *       ))}
         *     </S.BinList>
         *   )}
         * </S.BinSection>
         *
         * <S.SectionDivider />
         */}

        {/**
         * 재활용 센터 라벨 임시 비활성
         */}
        {/**
         * <S.SectionLabel>
         *   {t("map.centers.sectionTitle", { defaultValue: t("map.centers.title") })}
         * </S.SectionLabel>
         */}

        <S.CenterGrid>
          {visibleCenters.map((center) => {
            // 고화질 로고 기본 이미지를 준비
            const logoFallback = createLogoFallback(center.name);

            return (
              <S.CenterCard key={center.id}>
                <S.CenterMedia>
                  {logoFallback}
                  <div css={S.centerBadgeContainer}>
                    <Badge variant="outline">{formatDistanceLabel(center.distance)}</Badge>
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
                    <Button
                      variant="outline"
                      size="sm"
                      css={S.centerActionButton}
                      onClick={() => onRequestCenterDirections?.(center)}
                    >
                      <Navigation size={14} />
                      {t("map.centers.directions")}
                    </Button>
                    {center.phone && (
                      <Button
                        variant="outline"
                        size="sm"
                        css={S.centerActionButton}
                        onClick={() => handleCall(center)}
                      >
                        <Phone size={14} />
                        {t("map.centers.call")}
                      </Button>
                    )}
                  </S.ActionButtons>
                </S.CenterContent>
              </S.CenterCard>
            );
          })}
        </S.CenterGrid>
        {hasHiddenCenters && (
          <S.CenterMoreWrapper>
            <Button
              variant="text"
              size="sm"
              onClick={() => setShowAllCenters((prev) => !prev)} // 토글 전환
            >
              {showAllCenters ? t("map.centers.showLess") : t("map.centers.showMore")}
            </Button>
          </S.CenterMoreWrapper>
        )}
      </SectionCardContent>
    </SectionCard>
  );
}
