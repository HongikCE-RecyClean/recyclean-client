import { MapPin } from "lucide-react";
import { Card, CardContent } from "../../../shared/ui/Card/Card";
import * as S from "./MapPlaceholderCard.styles";

interface MapPlaceholderCardProps {
  binCount: number;
}

export function MapPlaceholderCard({ binCount }: MapPlaceholderCardProps) {
  // 지도 준비 상태 안내 렌더링
  return (
    <Card>
      <CardContent>
        <S.PlaceholderContainer>
          <MapPin size={28} />
          <S.PlaceholderTitle>지도 준비 중</S.PlaceholderTitle>
          <S.PlaceholderSubtitle>
            근처 {binCount}개의 배출함을 표시할 예정이에요.
          </S.PlaceholderSubtitle>
        </S.PlaceholderContainer>
      </CardContent>
    </Card>
  );
}
