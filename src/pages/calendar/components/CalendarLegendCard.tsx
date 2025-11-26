import { useTranslation } from "react-i18next";
import { CardTitle } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import * as S from "../CalendarPage.styles";
import type { CalendarLegendItem } from "./types";
import { useNumberFormatter } from "shared/utils/numberFormat";

type CalendarLegendCardProps = {
  items: CalendarLegendItem[];
};

export function CalendarLegendCard({ items }: CalendarLegendCardProps) {
  const { t } = useTranslation();
  const formatNumber = useNumberFormatter();
  // 품목 범례 표시를 독립 컴포넌트로 구성
  return (
    <S.SectionCard>
      <S.SectionCardHeader>
        <CardTitle>{t("calendar.legend.title")}</CardTitle>
      </S.SectionCardHeader>
      <S.SectionCardContent>
        {items.length > 0 ? (
          <S.LegendList>
            {items.map((item) => (
              <S.LegendItem key={item.type}>
                {/* 품목 배지를 좌측 정렬 */}
                <S.LegendLabel>
                  <Badge tone={item.tone}>
                    {t(`materials.items.${item.type}`, { defaultValue: item.type })}
                  </Badge>
                </S.LegendLabel>
                {/* 수량과 포인트를 우측 정렬 */}
                <div css={S.legendStatsColumn}>
                  {/* 범례 수량 텍스트 컴포넌트 적용 */}
                  <S.LegendCountText>
                    {t("calendar.legend.count", {
                      count: formatNumber(item.count),
                    })}
                  </S.LegendCountText>
                  <div css={S.legendPointsText}>
                    {t("calendar.legend.points", {
                      points: formatNumber(item.points),
                    })}
                  </div>
                </div>
              </S.LegendItem>
            ))}
          </S.LegendList>
        ) : (
          <S.EmptyState>{t("calendar.legend.empty")}</S.EmptyState>
        )}
      </S.SectionCardContent>
    </S.SectionCard>
  );
}
