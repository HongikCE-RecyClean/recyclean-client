import { Clock, Navigation, Recycle, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import { Button } from "../../../shared/ui/Button/Button";
import { mapAvailabilityTone, mapMaterialColors } from "shared/constants/mapVisuals";
import type { TrashBin } from "shared/types/map";
import * as S from "./TrashBinList.styles";

interface TrashBinListProps {
  bins: TrashBin[];
}

export function TrashBinList({ bins }: TrashBinListProps) {
  const { t } = useTranslation();
  if (bins.length === 0) {
    return (
      <Card>
        <S.EmptyStateCard>{t("map.bins.empty")}</S.EmptyStateCard>
      </Card>
    );
  }

  // 쓰레기통 결과 목록 렌더링
  return (
    <S.BinList>
      {bins.map((bin) => (
        <S.BinCard key={bin.id}>
          <CardContent>
            <S.BinHeader>
              <S.BinInfo>
                {bin.type === "recycling" ? <Recycle size={18} /> : <Trash2 size={18} />}
                <S.BinMeta>
                  {/* 배출함 기본 정보 텍스트 클래스 적용 */}
                  <S.BinNameText>{bin.name}</S.BinNameText>
                  <span css={S.binLocationText}>{bin.location}</span>
                  {/* 업데이트 시각과 아이콘을 한 줄로 정렬 */}
                  <S.BinUpdatedRow>
                    <Clock size={12} />
                    {bin.lastUpdated}
                  </S.BinUpdatedRow>
                </S.BinMeta>
              </S.BinInfo>
              {/* 배출함 거리 정보 박스 클래스 적용 */}
              <div css={S.binDistanceColumn}>
                <Badge variant="outline">{bin.distance}</Badge>
                <div css={S.binAvailabilitySpacer}>
                  <Badge tone={mapAvailabilityTone[bin.availability]}>
                    {t(`map.availability.${bin.availability}`)}
                  </Badge>
                </div>
              </div>
            </S.BinHeader>

            <div css={S.binItemsSection}>
              <S.SectionLabel>{t("map.bins.sectionLabel")}</S.SectionLabel>
              <S.AcceptedItems>
                {bin.acceptedItems.map((item) => (
                  <Badge key={item} variant="soft" tone={mapMaterialColors[item] ?? "neutral"}>
                    {item}
                  </Badge>
                ))}
              </S.AcceptedItems>
            </div>

            <S.ActionButtons>
              <Button variant="outline" size="sm" css={S.binActionButton}>
                <Navigation size={14} />
                {t("map.bins.directions")}
              </Button>
              <Button variant="outline" size="sm" css={S.binActionButton}>
                {t("map.bins.report")}
              </Button>
            </S.ActionButtons>
          </CardContent>
        </S.BinCard>
      ))}
    </S.BinList>
  );
}
