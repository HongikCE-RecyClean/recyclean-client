import type { ChangeEvent } from "react";
import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import { SelectField } from "../../../shared/ui/SelectField/SelectField";
import { ImageWithFallback } from "../../../shared/media/ImageWithFallback/ImageWithFallback";
import { resolveTipTone } from "../../../shared/data/dashboard";
import * as S from "../DashboardPage.styles";
import type { TipData } from "../../../shared/data/dashboard";

interface TipCategoryOption {
  value: string;
  label: string;
}

interface TipsCardProps {
  tips: TipData[];
  selectedTipCategory: string;
  onSelectedTipCategoryChange(value: string): void;
  tipCategoryOptions: TipCategoryOption[];
}

export function TipsCard({
  tips,
  selectedTipCategory,
  onSelectedTipCategoryChange,
  tipCategoryOptions,
}: TipsCardProps) {
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelectedTipCategoryChange(event.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Lightbulb size={18} />
          친환경 실천 아이디어
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SelectField
          options={[{ value: "all", label: "전체" }, ...tipCategoryOptions]}
          value={selectedTipCategory}
          onChange={handleCategoryChange}
        />
        {/* 친환경 팁 카드 리스트 */}
        <S.TipsList>
          {tips.map((tip) => (
            <S.TipCard key={tip.id}>
              <S.TipMedia>
                <ImageWithFallback src={tip.image} alt={tip.title} />
                {/* 팁 배지 위치 클래스 적용 */}
                <div className={S.tipBadgeContainer}>
                  <Badge tone={resolveTipTone(tip.category)}>{tip.category}</Badge>
                </div>
              </S.TipMedia>
              <S.TipContent>
                <div>
                  {/* 팁 제목 텍스트 클래스 적용 */}
                  <h3 className={S.tipTitleText}>{tip.title}</h3>
                  <p className={S.tipDescriptionText}>{tip.description}</p>
                </div>
                {/* 팁 배지 행 클래스 적용 */}
                <div className={S.tipBadgeRow}>
                  <Badge tone="success">영향: {tip.impact}</Badge>
                  <Badge tone="info">난이도: {tip.difficulty}</Badge>
                </div>
              </S.TipContent>
            </S.TipCard>
          ))}
        </S.TipsList>
      </CardContent>
    </Card>
  );
}
