import { Camera, Upload } from "lucide-react";
import { Card, CardContent } from "../../../shared/ui/Card/Card";
import { Button } from "../../../shared/ui/Button/Button";
import * as S from "../AnalyzePage.styles";

// 촬영 및 업로드 버튼 카드 정의
interface AnalyzeActionsCardProps {
  onCapture: () => void;
  onUpload: () => void;
}

export function AnalyzeActionsCard({ onCapture, onUpload }: AnalyzeActionsCardProps) {
  return (
    <Card>
      <CardContent>
        {/* 행동 버튼 배열 구성 */}
        <S.ActionsContainer>
          {/* 촬영 버튼 */}
          <Button onClick={onCapture} size="lg">
            <Camera size={18} />
            사진 촬영하기
          </Button>
          {/* 업로드 버튼 */}
          <Button onClick={onUpload} variant="outline" size="lg">
            <Upload size={18} />
            이미지 업로드
          </Button>
        </S.ActionsContainer>
      </CardContent>
    </Card>
  );
}
