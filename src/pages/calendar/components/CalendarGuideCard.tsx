import { Recycle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import * as S from "../CalendarPage.styles";

export function CalendarGuideCard() {
  const { t } = useTranslation();
  const guideItems = t("calendar.guide.items", { returnObjects: true }) as string[];
  // 달력 사용 가이드를 카드로 고립
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Recycle size={18} />
          {t("calendar.guide.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 가이드 목록 클래스 적용 */}
        <ul css={S.guideList}>
          {guideItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
