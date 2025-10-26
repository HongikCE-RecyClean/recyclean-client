import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import { Button } from "../../../shared/ui/Button/Button";
import { ImageWithFallback } from "../../../shared/media/ImageWithFallback/ImageWithFallback";
import { mapMaterialColors } from "shared/api/map";
import type { RecyclingCenter } from "shared/types/map";
import * as S from "./RecyclingCenterList.styles";

interface RecyclingCenterListProps {
  centers: RecyclingCenter[];
}

export function RecyclingCenterList({ centers }: RecyclingCenterListProps) {
  // 재활용 센터 카드 목록 렌더링
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <MapPin size={18} />
          재활용 센터
        </CardTitle>
      </CardHeader>
      <CardContent>
        <S.CenterGrid>
          {centers.map((center) => (
            <S.CenterCard key={center.id}>
              <S.CenterMedia>
                <ImageWithFallback
                  src={center.image}
                  alt={center.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", top: 12, right: 12 }}>
                  <Badge variant="outline">{center.distance}</Badge>
                </div>
              </S.CenterMedia>
              <S.CenterContent>
                <div>
                  <h3 style={{ margin: 0 }}>{center.name}</h3>
                  <div style={{ fontSize: "0.8rem", color: "#475569" }}>{center.address}</div>
                </div>

                <S.MaterialChips>
                  {center.acceptedMaterials.map((material) => (
                    <Badge key={material} tone={mapMaterialColors[material] ?? "neutral"}>
                      {material}
                    </Badge>
                  ))}
                </S.MaterialChips>

                <S.InfoStack>
                  <span>
                    <Clock size={12} /> {center.hours}
                  </span>
                  {center.phone && (
                    <span>
                      <Phone size={12} /> {center.phone}
                    </span>
                  )}
                </S.InfoStack>

                <S.ActionButtons>
                  <Button variant="outline" size="sm" style={{ flex: 1 }}>
                    <Navigation size={14} />길 찾기
                  </Button>
                  {center.phone && (
                    <Button variant="outline" size="sm" style={{ flex: 1 }}>
                      <Phone size={14} />
                      전화하기
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
