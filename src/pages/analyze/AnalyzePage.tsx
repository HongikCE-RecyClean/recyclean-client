import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { matchMaterialType, calculatePoints } from "../../shared/utils/recyclingPoints";
import * as S from "./AnalyzePage.styles";

// 모의 분석 결과 리스트 정의
const mockResultPresets = [
  { key: "plasticBottle", confidence: 95, recyclable: true },
  { key: "pizzaBox", confidence: 88, recyclable: false },
  { key: "aluminumCan", confidence: 92, recyclable: true },
] as const;

// 분석 시뮬레이션 지연 시간 상수 정의
const ANALYSIS_DELAY_MS = 2200;

export function AnalyzePage() {
  const { t } = useTranslation();
  const { addEntry } = useActivityStore();
  const mockResults = useMemo(
    () =>
      mockResultPresets.map((preset) => ({
        confidence: preset.confidence,
        recyclable: preset.recyclable,
        item: t(`analyze.mockResults.${preset.key}.item`),
        category: t(`analyze.mockResults.${preset.key}.category`),
        instructions: t(`analyze.mockResults.${preset.key}.instructions`),
        tips: t(`analyze.mockResults.${preset.key}.tips`),
      })) as RecognitionResult[],
    [t],
  );
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
  const analysisTimeoutRef = useRef<number | null>(null);

  const {
    videoRef,
    isActive: isCameraActive,
    isReady: isVideoReady,
    openCamera,
    stopCamera,
    handleVideoReady,
    capturePhoto,
  } = useCamera({ onError: setInteractionError });

  // 분석 타이머 정리 함수 정의
  const clearAnalysisTimeout = useCallback(() => {
    if (analysisTimeoutRef.current) {
      window.clearTimeout(analysisTimeoutRef.current);
      analysisTimeoutRef.current = null;
    }
  }, []);

  // 카메라 스트림 자원 정리 함수 정의
  const revokeObjectUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  // 모의 분석 실행 함수 정의
  const runMockRecognition = useCallback(() => {
    clearAnalysisTimeout();
    analysisTimeoutRef.current = window.setTimeout(() => {
      const random = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(random);
      setIsScanning(false);
    }, ANALYSIS_DELAY_MS);
  }, [clearAnalysisTimeout, mockResults]);

  const startAnalysis = useCallback(
    (imageSrc: string) => {
      // 새로운 이미지 분석 시뮬레이션 시작 처리
      setCapturedImage(imageSrc);
      setResult(null);
      setIsScanning(true);
      runMockRecognition();
    },
    [runMockRecognition],
  );

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
    startAnalysis(objectUrl);
    event.target.value = "";
  };

  // 카메라 프레임 캡처 처리 정의
  const handleCaptureFromCamera = () => {
    const dataUrl = capturePhoto();
    if (!dataUrl) {
      return;
    }

    stopCamera();
    revokeObjectUrl();
    startAnalysis(dataUrl);
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
    clearAnalysisTimeout();
    revokeObjectUrl();
    setResult(null);
    setCapturedImage(null);
    setIsScanning(false);
    setInteractionError(null);
    setSaveSuccess(false);
    stopCamera();
  };

  useEffect(() => {
    return () => {
      clearAnalysisTimeout();
      revokeObjectUrl();
      stopCamera();
    };
  }, [clearAnalysisTimeout, revokeObjectUrl, stopCamera]);

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
