import { Camera, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../shared/ui/Card/Card";
import { Button } from "../../../shared/ui/Button/Button";
import * as S from "../AnalyzePage.styles";

// 촬영 및 업로드 버튼 카드 정의
interface AnalyzeActionsCardProps {
  onCapture: () => void;
  onUpload: () => void;
  disabled?: boolean;
}

export function AnalyzeActionsCard({ onCapture, onUpload, disabled }: AnalyzeActionsCardProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <CardContent>
        {/* 행동 버튼 배열 구성 */}
        <S.ActionsContainer>
          {/* 촬영 버튼 */}
          <Button onClick={onCapture} size="lg" disabled={disabled}>
            <Camera size={18} />
            {t("analyze.actions.capture")}
          </Button>
          {/* 업로드 버튼 */}
          <Button onClick={onUpload} variant="outline" size="lg" disabled={disabled}>
            <Upload size={18} />
            {t("analyze.actions.upload")}
          </Button>
        </S.ActionsContainer>
      </CardContent>
    </Card>
  );
}
