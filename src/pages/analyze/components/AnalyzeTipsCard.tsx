import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import * as S from "../AnalyzePage.styles";

// 촬영 팁 카드 정의
export function AnalyzeTipsCard() {
  return (
    <Card>
      <CardHeader>
        {/* 팁 카드 타이틀 구성 */}
        <CardTitle>
          <AlertCircle size={18} />
          촬영 팁
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 촬영 팁 목록 */}
        <S.TipsList>
          <li>빛이 충분한 곳에서 촬영해요.</li>
          <li>깨끗한 배경에서 촬영하면 인식률이 올라가요.</li>
          <li>재활용 기호가 보이도록 찍어주세요.</li>
          <li>가능하면 물체 정면에서 촬영해요.</li>
        </S.TipsList>
      </CardContent>
    </Card>
  );
}
