import { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { RotateCcw, Focus, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ImageWithFallback } from "../../../shared/media/ImageWithFallback/ImageWithFallback";
import * as S from "../AnalyzePage.styles";

// 바운딩 박스 좌표 타입 [x1, y1, x2, y2]
type BBox = [number, number, number, number];

// 촬영된 이미지 카드 정의
interface AnalyzeCapturedImageCardProps {
  imageSrc: string;
  onReset: () => void;
  // 선택된 예측의 바운딩 박스 (선택적)
  bbox?: BBox;
}

export function AnalyzeCapturedImageCard({
  imageSrc,
  onReset,
  bbox,
}: AnalyzeCapturedImageCardProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [showBbox, setShowBbox] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // 이미지 로드 시 실제 크기 저장
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // bbox를 퍼센트 좌표로 변환 (이미지 크기 기준)
  const getBboxPercentage = (box: BBox) => {
    if (!imageDimensions.width || !imageDimensions.height) return null;
    const [x1, y1, x2, y2] = box;
    return {
      x: (x1 / imageDimensions.width) * 100,
      y: (y1 / imageDimensions.height) * 100,
      width: ((x2 - x1) / imageDimensions.width) * 100,
      height: ((y2 - y1) / imageDimensions.height) * 100,
    };
  };

  const bboxPercent = bbox ? getBboxPercentage(bbox) : null;

  return (
    <S.SectionCard>
      <S.SectionCardContent>
        {/* 촬영 이미지 프리뷰 영역 */}
        <S.ImageWrapper css={S.capturedImageFrame}>
          <ImageWithFallback src={imageSrc} alt={t("analyze.captured.alt")} />
          {/* bbox 오버레이 (토글 활성화 시) */}
          {showBbox && bbox && bboxPercent && (
            <S.BboxOverlay viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* SVG 필터 정의 (글로우 효과) */}
              <defs>
                <filter id="bboxGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="bboxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={theme.colors.primary} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={theme.colors.highlight} stopOpacity="0.9" />
                </linearGradient>
              </defs>
              {/* 반투명 배경 채우기 */}
              <rect
                x={bboxPercent.x}
                y={bboxPercent.y}
                width={bboxPercent.width}
                height={bboxPercent.height}
                fill={`${theme.colors.primary}15`}
                rx="1"
                ry="1"
              />
              {/* 메인 테두리 (그라데이션 + 글로우) */}
              <rect
                x={bboxPercent.x}
                y={bboxPercent.y}
                width={bboxPercent.width}
                height={bboxPercent.height}
                fill="none"
                stroke="url(#bboxGradient)"
                strokeWidth="0.6"
                rx="1"
                ry="1"
                filter="url(#bboxGlow)"
                css={S.bboxRectStyle(theme)}
              />
              {/* 코너 마커 (좌상단) */}
              <path
                d={`M ${bboxPercent.x} ${bboxPercent.y + 3} 
                    L ${bboxPercent.x} ${bboxPercent.y} 
                    L ${bboxPercent.x + 3} ${bboxPercent.y}`}
                fill="none"
                stroke={theme.colors.primary}
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              {/* 코너 마커 (우상단) */}
              <path
                d={`M ${bboxPercent.x + bboxPercent.width - 3} ${bboxPercent.y} 
                    L ${bboxPercent.x + bboxPercent.width} ${bboxPercent.y} 
                    L ${bboxPercent.x + bboxPercent.width} ${bboxPercent.y + 3}`}
                fill="none"
                stroke={theme.colors.primary}
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              {/* 코너 마커 (좌하단) */}
              <path
                d={`M ${bboxPercent.x} ${bboxPercent.y + bboxPercent.height - 3} 
                    L ${bboxPercent.x} ${bboxPercent.y + bboxPercent.height} 
                    L ${bboxPercent.x + 3} ${bboxPercent.y + bboxPercent.height}`}
                fill="none"
                stroke={theme.colors.primary}
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              {/* 코너 마커 (우하단) */}
              <path
                d={`M ${bboxPercent.x + bboxPercent.width - 3} ${bboxPercent.y + bboxPercent.height} 
                    L ${bboxPercent.x + bboxPercent.width} ${bboxPercent.y + bboxPercent.height} 
                    L ${bboxPercent.x + bboxPercent.width} ${bboxPercent.y + bboxPercent.height - 3}`}
                fill="none"
                stroke={theme.colors.primary}
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </S.BboxOverlay>
          )}
          {/* bbox 토글 버튼 (bbox가 있을 때만 표시) */}
          {bbox && (
            <S.BboxToggle
              $active={showBbox}
              onClick={() => setShowBbox((prev) => !prev)}
              type="button"
              aria-label={t("analyze.captured.bboxToggle")}
            >
              {showBbox ? <EyeOff size={14} /> : <Focus size={14} />}
              {showBbox ? t("analyze.captured.hideBbox") : t("analyze.captured.showBbox")}
            </S.BboxToggle>
          )}
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
      </S.SectionCardContent>
    </S.SectionCard>
  );
}
