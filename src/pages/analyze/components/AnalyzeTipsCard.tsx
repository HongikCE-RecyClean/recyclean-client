import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import * as S from "../AnalyzePage.styles";

// 촬영 팁 카드 정의
export function AnalyzeTipsCard() {
  const { t } = useTranslation();
  const tips = t("analyze.tips.items", { returnObjects: true }) as string[];
  return (
    <Card>
      <CardHeader>
        {/* 팁 카드 타이틀 구성 */}
        <CardTitle>
          <AlertCircle size={18} />
          {t("analyze.tips.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 촬영 팁 목록 */}
        <S.TipsList>
          {tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </S.TipsList>
      </CardContent>
    </Card>
  );
}
