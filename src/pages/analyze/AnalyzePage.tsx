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
import { Button } from "../../shared/ui/Button/Button";
import { useCamera } from "./hooks/useCamera";
import { useActivityStore } from "../../shared/state/activityStore";
import { useNotificationStore } from "../../shared/state/notificationStore";
import { useAuthStore } from "../../shared/state/authStore";
import {
  matchMaterialType,
  calculatePoints,
  translateCategory,
  type MaterialCategoryId,
} from "../../shared/utils/recyclingPoints";
import { useAiLabeling, type AiPrediction } from "../../shared/api/analyze";
import { useCreatePlan } from "../../shared/api/plans";
import type { CategoryType } from "../../shared/api/types";
import * as S from "./AnalyzePage.styles";

type GuideKey = "plastic" | "paper" | "metal" | "glass" | "textile" | "electronic" | "other";

const CATEGORY_GUIDE_BY_ID: Record<MaterialCategoryId, GuideKey> = {
  plastic: "plastic",
  paper: "paper",
  metal: "metal",
  glass: "glass",
  textile: "textile",
  electronic: "electronic",
  other: "other",
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

function resolveGuideKey(categoryId: MaterialCategoryId): GuideKey {
  return CATEGORY_GUIDE_BY_ID[categoryId] ?? "other";
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

// 신뢰도 임계값 (0~1 스케일, 60% = 0.6)
const LOW_CONFIDENCE_THRESHOLD = 0.6;

export function AnalyzePage() {
  const { t } = useTranslation();
  const { addEntry } = useActivityStore();
  const { showSnackbar } = useNotificationStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const createPlanMutation = useCreatePlan();
  const aiLabelingMutation = useAiLabeling();
  // 분석 화면 표시와 결과 상태 정의
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  // 다중 예측 후보 상태 (상위 3개까지)
  const [predictions, setPredictions] = useState<AiPrediction[]>([]);
  const [selectedPredictionIndex, setSelectedPredictionIndex] = useState(0);

  // 업로드 입력 및 타이머 관리를 위한 ref 정의
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const analysisAbortRef = useRef<AbortController | null>(null);

  // 경고 메시지를 스낵바로 통일해 노출
  const showWarning = useCallback(
    (message: string | null) => {
      if (!message) return;
      showSnackbar(message, {
        type: "warning",
        duration: 3000,
      });
    },
    [showSnackbar],
  );

  const {
    videoRef,
    isActive: isCameraActive,
    isReady: isVideoReady,
    openCamera,
    stopCamera,
    handleVideoReady,
    capturePhoto,
  } = useCamera({ onError: showWarning });

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
      const categoryId = translateCategory(prediction.category);
      const guideKey = resolveGuideKey(categoryId);
      const categoryLabel = t(`materials.categories.${categoryId}`);
      const item = t(`analyze.guides.${guideKey}.item`, { defaultValue: categoryLabel });
      const instructions = t(`analyze.guides.${guideKey}.instructions`, {
        defaultValue: t("analyze.result.defaultInstructions"),
      });
      const rawTips = t(`analyze.guides.${guideKey}.tips`, { defaultValue: "" });
      const materialId = matchMaterialType(prediction.category, categoryId);

      return {
        item,
        materialId,
        categoryId,
        category: categoryLabel,
        confidence: formatConfidence(prediction.confidence),
        recyclable: RECYCLABLE_GUIDE_KEYS.has(guideKey),
        instructions,
        tips: rawTips || undefined,
        // 서버 카테고리 직접 저장 (Plan 생성 시 사용)
        serverCategory: prediction.category.toUpperCase(),
        // 바운딩 박스 좌표
        bbox: prediction.bbox,
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
        const rawPredictions = await aiLabelingMutation.mutateAsync({
          file: source,
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        // 예측 결과가 비어있는 경우
        if (!rawPredictions.length) {
          showSnackbar(t("notifications.snackbar.emptyPredictions"), {
            type: "warning",
            duration: 3000,
          });
          setResult(null);
          setPredictions([]);
          return;
        }

        // 신뢰도 내림차순 정렬 후 상위 3개만 유지
        const sorted = [...rawPredictions].sort((a, b) => b.confidence - a.confidence);
        const topPredictions = sorted.slice(0, 3);
        const bestPrediction = topPredictions[0];

        // 0~1 스케일 기준으로 신뢰도 확인 (LOW_CONFIDENCE_THRESHOLD = 0.6)
        if (bestPrediction.confidence <= LOW_CONFIDENCE_THRESHOLD) {
          showSnackbar(t("notifications.snackbar.analysisLowConfidence"), {
            type: "warning",
            duration: 3000,
          });
          setResult(null);
          setPredictions([]);
          return;
        }

        // 다중 예측 후보 저장
        setPredictions(topPredictions);
        setSelectedPredictionIndex(0);
        setResult(buildRecognitionResult(bestPrediction));
      } catch (error) {
        if (controller.signal.aborted) return;
        // API 에러 바디 추출 시도
        const errorMessage =
          error instanceof Error && "body" in error
            ? (error as { body?: { message?: string } }).body?.message
            : undefined;
        console.error(error);
        showSnackbar(errorMessage || t("notifications.snackbar.analysisFailedRetry"), {
          type: "warning",
          duration: 3000,
        });
        setResult(null);
        setPredictions([]);
      } finally {
        if (!controller.signal.aborted) {
          setIsScanning(false);
        }
        analysisAbortRef.current = null;
      }
    },
    [buildRecognitionResult, showSnackbar, t],
  );

  // 프리뷰와 함께 분석을 시작
  const beginAnalysis = useCallback(
    (previewSrc: string, sourceFile: Blob) => {
      cancelActiveAnalysis();
      setCapturedImage(previewSrc);
      setResult(null);
      setPredictions([]);
      setSelectedPredictionIndex(0);
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
    fileInputRef.current?.click();
  };

  // 파일 업로드 변경 이벤트 처리 정의
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? [];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      showWarning(t("analyze.errors.onlyImages"));
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
      showWarning(t("analyze.errors.analysisFailed"));
      return;
    }

    stopCamera();
    revokeObjectUrl();
    beginAnalysis(dataUrl, capturedFile);
  };

  // 카메라 열기 처리 정의
  const handleOpenCamera = () => {
    void openCamera();
  };

  // 분석 결과를 활동 기록으로 저장
  const handleSaveEntry = useCallback(() => {
    if (!result || !result.recyclable) {
      return;
    }

    // 분석 결과를 RecyclingEntry 형식으로 변환
    const amount = 1; // 기본 수량 1개
    const points = calculatePoints(result.materialId, amount);

    // 인증된 경우 API로 Plan 생성
    if (isAuthenticated) {
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
      const timeStr = now.toTimeString().split(" ")[0]; // HH:mm:ss
      // 서버가 반환한 카테고리를 직접 사용 (변환 없이)
      const apiCategory = (result.serverCategory as CategoryType) || "GENERAL";

      createPlanMutation.mutate(
        {
          date: dateStr,
          time: timeStr,
          memo: t("analyze.result.autoMemo", { item: result.item }),
          items: [
            {
              category: apiCategory,
              quantity: amount,
              detectedByAi: true,
            },
          ],
        },
        {
          onSuccess: () => {
            showSnackbar(t("notifications.snackbar.entrySaved", { points }), {
              type: "success",
              duration: 3000,
            });
          },
          onError: () => {
            // API 실패 시 로컬에 저장
            addEntry({
              type: result.materialId,
              amount,
              date: new Date(),
              points,
            });
            showSnackbar(t("notifications.snackbar.entrySavedLocally", { points }), {
              type: "warning",
              duration: 3000,
            });
          },
        },
      );
    } else {
      // 미인증 시 로컬에 저장
      addEntry({
        type: result.materialId,
        amount,
        date: new Date(),
        points,
      });

      showSnackbar(t("notifications.snackbar.entrySaved", { points }), {
        type: "success",
        duration: 3000,
      });
    }
  }, [result, isAuthenticated, createPlanMutation, addEntry, showSnackbar, t]);

  // 분석 상태 초기화 처리 정의
  const reset = () => {
    cancelActiveAnalysis();
    revokeObjectUrl();
    setResult(null);
    setCapturedImage(null);
    setPredictions([]);
    setSelectedPredictionIndex(0);
    stopCamera();
  };

  // 다른 예측 후보 선택 핸들러
  const handleSelectPrediction = useCallback(
    (index: number) => {
      if (index < 0 || index >= predictions.length) return;
      setSelectedPredictionIndex(index);
      setResult(buildRecognitionResult(predictions[index]));
    },
    [predictions, buildRecognitionResult],
  );

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
      {/* 촬영 팁을 상단 배너로 표시 */}
      <AnalyzeTipsCard />

      {!capturedImage && !result && (
        <AnalyzeActionsCard
          onCapture={handleOpenCamera}
          onUpload={handleUploadButtonClick}
          disabled={isBusy}
        />
      )}

      {/* 카메라 촬영 카드를 조건부 렌더링 */}
      {isCameraActive && (
        <S.SectionCard>
          <S.SectionCardContent>
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
          </S.SectionCardContent>
        </S.SectionCard>
      )}

      {capturedImage && (
        <AnalyzeCapturedImageCard imageSrc={capturedImage} onReset={reset} bbox={result?.bbox} />
      )}

      {isScanning && <AnalyzeScanningCard />}

      {result && !isScanning && (
        <AnalyzeResultCard result={result} onReset={reset} onSave={handleSaveEntry} />
      )}

      {/* 다중 예측 후보 리스트 (2개 이상일 때만 표시) */}
      {result && !isScanning && predictions.length > 1 && (
        <S.SectionCard>
          <S.SectionCardContent>
            <S.PredictionListContainer>
              <S.PredictionListHeader>
                <S.PredictionListTitle>{t("analyze.predictions.title")}</S.PredictionListTitle>
              </S.PredictionListHeader>
              {predictions.map((pred, index) => {
                const confidencePct = formatConfidence(pred.confidence);
                const categoryLabel = t(`materials.categories.${translateCategory(pred.category)}`);
                return (
                  <S.PredictionItem
                    key={`${pred.category}-${index}`}
                    $selected={index === selectedPredictionIndex}
                    onClick={() => handleSelectPrediction(index)}
                    type="button"
                  >
                    <S.PredictionItemCategory>{categoryLabel}</S.PredictionItemCategory>
                    <S.PredictionItemConfidence $low={confidencePct < 70}>
                      {confidencePct}%
                    </S.PredictionItemConfidence>
                  </S.PredictionItem>
                );
              })}
            </S.PredictionListContainer>
          </S.SectionCardContent>
        </S.SectionCard>
      )}
    </S.PageContainer>
  );
}
