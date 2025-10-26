import { Scan } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";

// 분석 소개 카드 모듈 정의
export function AnalyzeIntroCard() {
  return (
    <Card>
      <CardHeader>
        {/* 제목과 안내 문구 레이아웃 구성 */}
        <CardTitle>
          <Scan size={18} />
          AI 재활용 분류
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 소개 문구 출력 */}
        <p style={{ margin: 0, color: "#475569", fontSize: "0.9rem" }}>
          사진을 찍거나 이미지를 업로드하면 재활용 가능 여부와 처리 방법을 안내해요.
        </p>
      </CardContent>
    </Card>
  );
}
