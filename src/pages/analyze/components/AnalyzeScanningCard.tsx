import { Card, CardContent } from "../../../shared/ui/Card/Card";
import * as S from "../AnalyzePage.styles";

// 분석 진행 중 카드 정의
export function AnalyzeScanningCard() {
  return (
    <Card>
      <CardContent style={{ textAlign: "center", gap: "16px" }}>
        {/* 대기 스피너 표시 */}
        <S.Spinner />
        {/* 안내 문구 영역 */}
        <div style={{ fontWeight: 600 }}>이미지를 분석 중이에요...</div>
        <div style={{ color: "#64748b", fontSize: "0.85rem" }}>잠시만 기다려 주세요.</div>
      </CardContent>
    </Card>
  );
}
