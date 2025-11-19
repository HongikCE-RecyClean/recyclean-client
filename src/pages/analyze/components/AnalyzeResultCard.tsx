import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "../../../shared/ui/Badge/Badge";
import { Button } from "../../../shared/ui/Button/Button";
import type { RecognitionResult } from "../types";
import * as S from "../AnalyzePage.styles";

// 분석 결과 카드 정의
interface AnalyzeResultCardProps {
  result: RecognitionResult;
  onReset: () => void;
  onSave?: () => void; // 기록 저장 콜백
}

export function AnalyzeResultCard({ result, onReset, onSave }: AnalyzeResultCardProps) {
  const { t } = useTranslation();
  // 재활용 가능 여부 배지 계산
  const statusBadge = result.recyclable ? (
    <Badge tone="success">{t("analyze.status.recyclable")}</Badge>
  ) : (
    <Badge tone="danger">{t("analyze.status.notRecyclable")}</Badge>
  );

  return (
    <S.SectionCard>
      <S.SectionCardHeader>
        <S.ResultHeader>
          <S.ResultTitle>
            <span>{t("analyze.result.title")}</span>
          </S.ResultTitle>
          <Badge variant="outline">
            {t("analyze.result.confidence", { value: result.confidence })}
          </Badge>
        </S.ResultHeader>
      </S.SectionCardHeader>
      <S.SectionCardContent>
        <S.ResultBody>
          {/* 항목 요약 영역 */}
          {/* 결과 요약 행 클래스 적용 */}
          <div css={S.resultSummaryRow}>
            <div>
              <h3 css={S.resultItemTitle}>{result.item}</h3>
              <p css={S.resultCategoryText}>
                {t("analyze.result.material", { category: result.category })}
              </p>
            </div>
            {statusBadge}
          </div>

          {/* 처리 방법 설명 */}
          <div>
            <h4 css={S.resultSectionHeading}>{t("analyze.result.instructionsTitle")}</h4>
            <p css={S.resultInstructionText}>{result.instructions}</p>
          </div>

          {result.tips && (
            <S.Callout>
              <AlertCircle size={18} />
              <span css={S.resultTipText}>{result.tips}</span>
            </S.Callout>
          )}

          {/* 후속 액션 버튼 */}
          {/* 후속 액션 버튼 행 클래스 적용 */}
          <div css={S.resultActionsRow}>
            <Button variant="outline" css={S.resultActionButton} onClick={onReset}>
              {t("analyze.result.retry")}
            </Button>
            <Button
              css={S.resultActionButton}
              onClick={onSave}
              disabled={!result.recyclable || !onSave}
            >
              {t("analyze.result.logAction")}
            </Button>
          </div>
        </S.ResultBody>
      </S.SectionCardContent>
    </S.SectionCard>
  );
}
