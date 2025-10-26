import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "../../../shared/ui/Badge/Badge";
import { Button } from "../../../shared/ui/Button/Button";
import { Card, CardContent, CardHeader } from "../../../shared/ui/Card/Card";
import type { RecognitionResult } from "../types";
import * as S from "../AnalyzePage.styles";

// 분석 결과 카드 정의
interface AnalyzeResultCardProps {
  result: RecognitionResult;
  onReset: () => void;
}

export function AnalyzeResultCard({ result, onReset }: AnalyzeResultCardProps) {
  // 재활용 가능 여부 배지 계산
  const statusBadge = result.recyclable ? (
    <Badge tone="success">재활용 가능 ♻️</Badge>
  ) : (
    <Badge tone="danger">재활용 불가 ❌</Badge>
  );

  return (
    <Card>
      <CardHeader>
        <S.ResultHeader>
          <S.ResultTitle>
            {/* 재활용 여부 아이콘 */}
            {result.recyclable ? (
              <CheckCircle size={20} color="#16a34a" />
            ) : (
              <XCircle size={20} color="#dc2626" />
            )}
            <span>분류 결과</span>
          </S.ResultTitle>
          <Badge variant="outline">{result.confidence}% 확신</Badge>
        </S.ResultHeader>
      </CardHeader>
      <CardContent>
        <S.ResultBody>
          {/* 항목 요약 영역 */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: 0 }}>{result.item}</h3>
              <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#475569" }}>
                재질: {result.category}
              </p>
            </div>
            {statusBadge}
          </div>

          {/* 처리 방법 설명 */}
          <div>
            <h4 style={{ margin: "0 0 4px", fontSize: "0.9rem" }}>처리 방법</h4>
            <p style={{ margin: 0, color: "#1f2933", fontSize: "0.9rem" }}>{result.instructions}</p>
          </div>

          {result.tips && (
            <S.Callout>
              <AlertCircle size={18} />
              <span style={{ fontSize: "0.85rem" }}>{result.tips}</span>
            </S.Callout>
          )}

          {/* 후속 액션 버튼 */}
          <div style={{ display: "flex", gap: "12px" }}>
            <Button variant="outline" style={{ flex: 1 }} onClick={onReset}>
              다시 촬영
            </Button>
            <Button style={{ flex: 1 }}>재활용 처리 기록</Button>
          </div>
        </S.ResultBody>
      </CardContent>
    </Card>
  );
}
