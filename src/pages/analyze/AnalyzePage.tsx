import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  AnalyzeActionsCard,
  AnalyzeCapturedImageCard,
  AnalyzeIntroCard,
  AnalyzeResultCard,
  AnalyzeScanningCard,
  AnalyzeTipsCard,
} from "./components";
import type { RecognitionResult } from "./types";
import { Card, CardContent } from "../../shared/ui/Card/Card";
import { Button } from "../../shared/ui/Button/Button";
import { useCamera } from "./hooks/useCamera";
import { useActivityStore } from "../../shared/state/activityStore";
import {
  matchMaterialType,
  calculatePoints,
  translateCategory,
} from "../../shared/utils/recyclingPoints";
import { requestAiLabeling, type AiPrediction } from "../../shared/api/analyze";
import * as S from "./AnalyzePage.styles";

type GuideKey = "plastic" | "paper" | "metal" | "glass" | "textile" | "electronic" | "other";

// 번역된 카테고리명을 가이드 키로 매핑
const CATEGORY_GUIDE_BY_LABEL: Record<string, GuideKey> = {
  플라스틱: "plastic",
  종이: "paper",
  금속: "metal",
  유리: "glass",
  "의류/섬유": "textile",
  전자제품: "electronic",
  기타: "other",
};

// 재활용 가능 여부 판별용 가이드 집합
const RECYCLABLE_GUIDE_KEYS = new Set<GuideKey>([
  "plastic",
  "paper",
  "metal",
  "glass",
  "textile",
  "electronic",
]);

function resolveGuideKey(categoryLabel: string): GuideKey {
  // 매핑 테이블에 없으면 기타 처리
  return CATEGORY_GUIDE_BY_LABEL[categoryLabel] ?? "other";
}

function formatConfidence(confidence: number): number {
  // API가 0-1 범위 혹은 0-100 범위를 모두 반환할 수 있어 보정
  const normalized = confidence <= 1 ? confidence * 100 : confidence;
  return Math.max(0, Math.min(100, Math.round(normalized)));
}

function dataUrlToFile(dataUrl: string): File | null {
  // dataURL을 Blob으로 변환해 FormData 업로드에 사용
  const [metadata, base64] = dataUrl.split(",");
  if (!metadata || !base64) {
    return null;
  }
  const mimeMatch = metadata.match(/data:(.*?);/);
  const mime = mimeMatch?.[1] ?? "image/jpeg";
  const binary = atob(base64);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    buffer[i] = binary.charCodeAt(i);
  }
  return new File([buffer], `capture-${Date.now()}.jpg`, { type: mime });
}

export function AnalyzePage() {
  const { t } = useTranslation();
  const { addEntry } = useActivityStore();
  // 분석 화면 표시와 결과 상태 정의
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  // 카메라 활성화 및 준비 상태 정의
  const [interactionError, setInteractionError] = useState<string | null>(null);
  // 기록 저장 성공 메시지 상태
  const [saveSuccess, setSaveSuccess] = useState(false);

  // 업로드 입력 및 타이머 관리를 위한 ref 정의
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const analysisAbortRef = useRef<AbortController | null>(null);

  const {
    videoRef,
    isActive: isCameraActive,
    isReady: isVideoReady,
    openCamera,
    stopCamera,
    handleVideoReady,
    capturePhoto,
  } = useCamera({ onError: setInteractionError });

  // 진행 중인 분석 요청을 취소하는 헬퍼
  const cancelActiveAnalysis = useCallback(() => {
    if (analysisAbortRef.current) {
      analysisAbortRef.current.abort();
      analysisAbortRef.current = null;
    }
    setIsScanning(false);
  }, []);

  // 백엔드 예측값을 화면 표시용 구조로 변환
  const buildRecognitionResult = useCallback(
    (prediction: AiPrediction): RecognitionResult => {
      const translatedCategory = translateCategory(prediction.category);
      const guideKey = resolveGuideKey(translatedCategory);
      const item = t(`analyze.guides.${guideKey}.item`, { defaultValue: translatedCategory });
      const instructions = t(`analyze.guides.${guideKey}.instructions`, {
        defaultValue: t("analyze.result.defaultInstructions"),
      });
      const rawTips = t(`analyze.guides.${guideKey}.tips`, { defaultValue: "" });

      return {
        item,
        category: translatedCategory,
        confidence: formatConfidence(prediction.confidence),
        recyclable: RECYCLABLE_GUIDE_KEYS.has(guideKey),
        instructions,
        tips: rawTips || undefined,
      };
    },
    [t],
  );

  // AI 라벨링 API 호출 및 결과 수신
  const runAiRecognition = useCallback(
    async (source: Blob) => {
      const controller = new AbortController();
      analysisAbortRef.current = controller;

      try {
        const predictions = await requestAiLabeling(source, controller.signal);
        if (!predictions.length) {
          setInteractionError(t("analyze.errors.noPrediction"));
          setResult(null);
          return;
        }

        const sorted = [...predictions].sort((a, b) => b.confidence - a.confidence);
        const bestPrediction = sorted[0];
        setResult(buildRecognitionResult(bestPrediction));
        setInteractionError(null);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        console.error(error);
        setInteractionError(t("analyze.errors.analysisFailed"));
        setResult(null);
      } finally {
        if (!controller.signal.aborted) {
          setIsScanning(false);
        }
        analysisAbortRef.current = null;
      }
    },
    [buildRecognitionResult, t],
  );

  // 프리뷰와 함께 분석을 시작
  const beginAnalysis = useCallback(
    (previewSrc: string, sourceFile: Blob) => {
      cancelActiveAnalysis();
      setCapturedImage(previewSrc);
      setResult(null);
      setSaveSuccess(false);
      setInteractionError(null);
      setIsScanning(true);
      void runAiRecognition(sourceFile);
    },
    [cancelActiveAnalysis, runAiRecognition],
  );

  // 카메라 스트림 자원 정리 함수 정의
  const revokeObjectUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  // 업로드 버튼 클릭 처리 정의
  const handleUploadButtonClick = () => {
    setInteractionError(null);
    fileInputRef.current?.click();
  };

  // 파일 업로드 변경 이벤트 처리 정의
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInteractionError(null);
    const [file] = event.target.files ?? [];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setInteractionError(t("analyze.errors.onlyImages"));
      event.target.value = "";
      return;
    }

    revokeObjectUrl();
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    beginAnalysis(objectUrl, file);
    event.target.value = "";
  };

  // 카메라 프레임 캡처 처리 정의
  const handleCaptureFromCamera = () => {
    const dataUrl = capturePhoto();
    if (!dataUrl) {
      return;
    }

    const capturedFile = dataUrlToFile(dataUrl);
    if (!capturedFile) {
      setInteractionError(t("analyze.errors.analysisFailed"));
      return;
    }

    stopCamera();
    revokeObjectUrl();
    beginAnalysis(dataUrl, capturedFile);
  };

  // 카메라 열기 처리 정의
  const handleOpenCamera = () => {
    setInteractionError(null);
    void openCamera();
  };

  // 분석 결과를 활동 기록으로 저장
  const handleSaveEntry = useCallback(() => {
    if (!result || !result.recyclable) {
      return;
    }

    // 분석 결과를 RecyclingEntry 형식으로 변환
    const materialType = matchMaterialType(result.item, result.category);
    const amount = 1; // 기본 수량 1개
    const points = calculatePoints(materialType, amount);

    // activityStore에 추가
    addEntry({
      type: materialType,
      amount,
      date: new Date(),
      points,
    });

    // 성공 메시지 표시
    setSaveSuccess(true);

    // 3초 후 성공 메시지 숨김
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  }, [result, addEntry]);

  // 분석 상태 초기화 처리 정의
  const reset = () => {
    cancelActiveAnalysis();
    revokeObjectUrl();
    setResult(null);
    setCapturedImage(null);
    setInteractionError(null);
    setSaveSuccess(false);
    stopCamera();
  };

  useEffect(() => {
    return () => {
      cancelActiveAnalysis();
      revokeObjectUrl();
      stopCamera();
    };
  }, [cancelActiveAnalysis, revokeObjectUrl, stopCamera]);

  const isBusy = isScanning || isCameraActive;

  // 분석 페이지 UI 렌더링 시작
  return (
    <S.PageContainer>
      {/* 파일 업로드 입력 요소를 숨김으로 렌더링 */}
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
      <AnalyzeIntroCard />

      {!capturedImage && !result && (
        <AnalyzeActionsCard
          onCapture={handleOpenCamera}
          onUpload={handleUploadButtonClick}
          disabled={isBusy}
        />
      )}

      {interactionError && <S.ErrorMessage role="alert">{interactionError}</S.ErrorMessage>}

      {/* 카메라 촬영 카드를 조건부 렌더링 */}
      {isCameraActive && (
        <Card>
          <CardContent>
            <S.CameraContainer>
              <S.VideoWrapper>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  onLoadedMetadata={handleVideoReady}
                  onCanPlay={handleVideoReady}
                />
                {!isVideoReady && <S.VideoOverlay>{t("analyze.camera.overlay")}</S.VideoOverlay>}
              </S.VideoWrapper>
              <S.CameraControls>
                <Button onClick={handleCaptureFromCamera} disabled={!isVideoReady} size="lg">
                  {t("analyze.actions.capture")}
                </Button>
                <Button onClick={stopCamera} variant="ghost" size="lg">
                  {t("analyze.actions.cancel")}
                </Button>
              </S.CameraControls>
            </S.CameraContainer>
          </CardContent>
        </Card>
      )}

      {capturedImage && <AnalyzeCapturedImageCard imageSrc={capturedImage} onReset={reset} />}

      {isScanning && <AnalyzeScanningCard />}

      {result && !isScanning && (
        <AnalyzeResultCard result={result} onReset={reset} onSave={handleSaveEntry} />
      )}

      {saveSuccess && (
        <S.SuccessMessage role="alert">{t("analyze.result.saveSuccess")}</S.SuccessMessage>
      )}

      <AnalyzeTipsCard />
    </S.PageContainer>
  );
}
