import { RotateCcw } from "lucide-react";
import { Card, CardContent } from "../../../shared/ui/Card/Card";
import { ImageWithFallback } from "../../../shared/media/ImageWithFallback/ImageWithFallback";
import * as S from "../AnalyzePage.styles";

// 촬영된 이미지 카드 정의
interface AnalyzeCapturedImageCardProps {
  imageSrc: string;
  onReset: () => void;
}

export function AnalyzeCapturedImageCard({ imageSrc, onReset }: AnalyzeCapturedImageCardProps) {
  return (
    <Card>
      <CardContent>
        {/* 촬영 이미지 프리뷰 영역 */}
        <S.ImageWrapper>
          <ImageWithFallback
            src={imageSrc}
            alt="Captured"
            style={{ width: "100%", height: 220, objectFit: "cover" }}
          />
          {/* 초기화 버튼 오버레이 */}
          <S.ResetButton
            variant="secondary"
            size="icon"
            onClick={onReset}
            aria-label="사진 다시 촬영"
          >
            <RotateCcw size={16} />
          </S.ResetButton>
        </S.ImageWrapper>
      </CardContent>
    </Card>
  );
}
