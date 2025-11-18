import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import { Button } from "../../../shared/ui/Button/Button";
import { ImageWithFallback } from "../../../shared/media/ImageWithFallback/ImageWithFallback";
import { mapMaterialColors } from "shared/constants/mapVisuals";
import type { RecyclingCenter } from "shared/types/map";
import * as S from "./RecyclingCenterList.styles";

interface RecyclingCenterListProps {
  centers: RecyclingCenter[];
}

export function RecyclingCenterList({ centers }: RecyclingCenterListProps) {
  const { t } = useTranslation();
  // 재활용 센터 카드 목록 렌더링
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <MapPin size={18} />
          {t("map.centers.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <S.CenterGrid>
          {centers.map((center) => (
            <S.CenterCard key={center.id}>
              <S.CenterMedia>
                <ImageWithFallback src={center.image} alt={center.name} />
                {/* 거리 배지 위치 클래스 적용 */}
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
                    <Badge key={material} tone={mapMaterialColors[material] ?? "neutral"}>
                      {material}
                    </Badge>
                  ))}
                </S.MaterialChips>

                <S.InfoStack>
                  {/* 운영 시간 텍스트와 아이콘을 한 줄로 정렬 */}
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
      </CardContent>
    </Card>
  );
}
