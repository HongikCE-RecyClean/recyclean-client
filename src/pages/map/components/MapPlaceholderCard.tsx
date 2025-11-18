import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../shared/ui/Card/Card";
import * as S from "./MapPlaceholderCard.styles";

interface MapPlaceholderCardProps {
  binCount: number;
}

export function MapPlaceholderCard({ binCount }: MapPlaceholderCardProps) {
  const { t } = useTranslation();
  // 지도 준비 상태 안내 렌더링
  return (
    <Card>
      <CardContent>
        <S.PlaceholderContainer>
          <MapPin size={28} />
          <S.PlaceholderTitle>{t("map.placeholder.title")}</S.PlaceholderTitle>
          <S.PlaceholderSubtitle>
            {t("map.placeholder.subtitle", { count: binCount })}
          </S.PlaceholderSubtitle>
        </S.PlaceholderContainer>
      </CardContent>
    </Card>
  );
}
