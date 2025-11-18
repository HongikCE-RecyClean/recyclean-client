import { RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../shared/ui/Card/Card";
import { ImageWithFallback } from "../../../shared/media/ImageWithFallback/ImageWithFallback";
import * as S from "../AnalyzePage.styles";

// 촬영된 이미지 카드 정의
interface AnalyzeCapturedImageCardProps {
  imageSrc: string;
  onReset: () => void;
}

export function AnalyzeCapturedImageCard({ imageSrc, onReset }: AnalyzeCapturedImageCardProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <CardContent>
        {/* 촬영 이미지 프리뷰 영역 */}
        {/* 촬영 이미지 프레임 클래스 적용 */}
        <S.ImageWrapper css={S.capturedImageFrame}>
          <ImageWithFallback src={imageSrc} alt={t("analyze.captured.alt")} />
          {/* 초기화 버튼 오버레이 */}
          <S.ResetButton
            variant="secondary"
            size="icon"
            onClick={onReset}
            aria-label={t("analyze.captured.resetAria")}
          >
            <RotateCcw size={16} />
          </S.ResetButton>
        </S.ImageWrapper>
      </CardContent>
    </Card>
  );
}
