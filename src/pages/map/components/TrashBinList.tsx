import { Clock, Navigation, Recycle, Trash2 } from "lucide-react";
import { Card, CardContent } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import { Button } from "../../../shared/ui/Button/Button";
import { mapAvailabilityTone, mapMaterialColors } from "shared/api/map";
import type { TrashBin } from "shared/types/map";
import * as S from "./TrashBinList.styles";

interface TrashBinListProps {
  bins: TrashBin[];
}

export function TrashBinList({ bins }: TrashBinListProps) {
  if (bins.length === 0) {
    return (
      <Card>
        <S.EmptyStateCard>선택한 조건에 맞는 배출함이 없어요.</S.EmptyStateCard>
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
                  <span className={S.binNameText}>{bin.name}</span>
                  <span className={S.binLocationText}>{bin.location}</span>
                  {/* 업데이트 시각과 아이콘을 한 줄로 정렬 */}
                  <S.BinUpdatedRow>
                    <Clock size={12} />
                    {bin.lastUpdated}
                  </S.BinUpdatedRow>
                </S.BinMeta>
              </S.BinInfo>
              {/* 배출함 거리 정보 박스 클래스 적용 */}
              <div className={S.binDistanceColumn}>
                <Badge variant="outline">{bin.distance}</Badge>
                <div className={S.binAvailabilitySpacer}>
                  <Badge tone={mapAvailabilityTone[bin.availability]}>
                    {bin.availability === "available"
                      ? "이용 가능"
                      : bin.availability === "full"
                        ? "가득 참"
                        : "점검 중"}
                  </Badge>
                </div>
              </div>
            </S.BinHeader>

            <div className={S.binItemsSection}>
              <S.SectionLabel>수거 품목</S.SectionLabel>
              <S.AcceptedItems>
                {bin.acceptedItems.map((item) => (
                  <Badge key={item} variant="soft" tone={mapMaterialColors[item] ?? "neutral"}>
                    {item}
                  </Badge>
                ))}
              </S.AcceptedItems>
            </div>

            <S.ActionButtons>
              <Button variant="outline" size="sm" className={S.binActionButton}>
                <Navigation size={14} />길 찾기
              </Button>
              <Button variant="outline" size="sm" className={S.binActionButton}>
                상태 신고
              </Button>
            </S.ActionButtons>
          </CardContent>
        </S.BinCard>
      ))}
    </S.BinList>
  );
}
