import { PieChart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import * as S from "../CalendarPage.styles";
import type { CalendarLegendItem } from "./types";

type CalendarLegendCardProps = {
  items: CalendarLegendItem[];
};

export function CalendarLegendCard({ items }: CalendarLegendCardProps) {
  const { t } = useTranslation();
  // 품목 범례 표시를 독립 컴포넌트로 구성
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <PieChart size={18} />
          {t("calendar.legend.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <S.LegendList>
            {items.map((item) => (
              <S.LegendItem key={item.type}>
                {/* 품목 배지를 좌측 정렬 */}
                <S.LegendLabel>
                  <Badge tone={item.tone}>{item.type}</Badge>
                </S.LegendLabel>
                {/* 수량과 포인트를 우측 정렬 */}
                <div css={S.legendStatsColumn}>
                  {/* 범례 수량 텍스트 컴포넌트 적용 */}
                  <S.LegendCountText>
                    {t("calendar.legend.count", { count: item.count })}
                  </S.LegendCountText>
                  <div css={S.legendPointsText}>
                    {t("calendar.legend.points", { points: item.points })}
                  </div>
                </div>
              </S.LegendItem>
            ))}
          </S.LegendList>
        ) : (
          <S.EmptyState>{t("calendar.legend.empty")}</S.EmptyState>
        )}
      </CardContent>
    </Card>
  );
}
