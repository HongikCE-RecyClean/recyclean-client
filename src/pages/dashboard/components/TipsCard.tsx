import type { ChangeEvent } from "react";
import { useTheme } from "@emotion/react";
import { Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { Badge } from "../../../shared/ui/Badge/Badge";
import { SelectField } from "../../../shared/ui/SelectField/SelectField";
import { ImageWithFallback } from "../../../shared/media/ImageWithFallback/ImageWithFallback";
import { resolveTipTone } from "../../../shared/types/dashboard";
import * as S from "../DashboardPage.styles";
import type { TipData } from "../../../shared/types/dashboard";

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
  // 테마 객체 가져오기
  const theme = useTheme();
  const { t } = useTranslation();

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelectedTipCategoryChange(event.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Lightbulb size={18} />
          {t("dashboard.tips.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SelectField
          options={[{ value: "all", label: t("dashboard.tips.all") }, ...tipCategoryOptions]}
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
                <div css={S.tipBadgeContainer}>
                  <Badge tone={resolveTipTone(tip.category)}>
                    {t(`dashboard.tips.categories.${tip.category}`)}
                  </Badge>
                </div>
              </S.TipMedia>
              <S.TipContent>
                <div>
                  {/* 팁 제목 텍스트 클래스 적용 */}
                  <h3 css={S.tipTitleText}>{tip.title}</h3>
                  <p css={S.tipDescriptionText(theme)}>{tip.description}</p>
                </div>
                {/* 팁 배지 행 클래스 적용 */}
                <div css={S.tipBadgeRow}>
                  <Badge tone="success">
                    {t("dashboard.tips.impactLabel", {
                      value: t(`dashboard.tips.impact.${tip.impact}`),
                    })}
                  </Badge>
                  <Badge tone="info">
                    {t("dashboard.tips.difficultyLabel", {
                      value: t(`dashboard.tips.difficulty.${tip.difficulty}`),
                    })}
                  </Badge>
                </div>
              </S.TipContent>
            </S.TipCard>
          ))}
        </S.TipsList>
      </CardContent>
    </Card>
  );
}
