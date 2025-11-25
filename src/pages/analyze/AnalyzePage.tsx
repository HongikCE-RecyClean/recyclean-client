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
import { requestAiLabeling, type AiPrediction } from "../../shared/api/analyze";
import { useCreatePlan } from "../../shared/api/plans";
import type { CategoryType } from "../../shared/api/types";
import { isMockApiEnabled } from "../../shared/api/config";
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

function getRandomHighConfidence(): number {
  // 임시 Mock 결과를 위한 80% 이상 랜덤 정확도 생성
  return Math.floor(80 + Math.random() * 20);
}

function buildMockAiPrediction(): AiPrediction {
  // 임시 Mock 결과를 PET병으로 고정
  return {
    category: "pet bottle",
    confidence: getRandomHighConfidence(),
    bbox: [0, 0, 0, 0],
  };
}

// MaterialCategoryId를 API CategoryType으로 매핑
const CATEGORY_TO_API: Record<MaterialCategoryId, CategoryType> = {
  plastic: "PLASTIC",
  paper: "PAPER",
  metal: "METAL",
  glass: "GLASS",
  textile: "CLOTHING",
  electronic: "ELECTRONICS",
  other: "GENERAL",
};

export function AnalyzePage() {
  const { t } = useTranslation();
  const { addEntry } = useActivityStore();
  const { showSnackbar } = useNotificationStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const createPlanMutation = useCreatePlan();
  // 분석 화면 표시와 결과 상태 정의
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  // 카메라 활성화 및 준비 상태 정의
  const [interactionError, setInteractionError] = useState<string | null>(null);

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
        let predictions: AiPrediction[];

        // Mock 모드 여부에 따라 분기
        if (isMockApiEnabled()) {
          // Mock 모드: 지연 후 가짜 결과 반환
          await new Promise<void>((resolve) => {
            let finished = false;
            const finish = () => {
              if (finished) return;
              finished = true;
              resolve();
            };
            const timeoutId = window.setTimeout(finish, 1200);
            controller.signal.addEventListener("abort", () => {
              window.clearTimeout(timeoutId);
              finish();
            });
          });

          if (controller.signal.aborted) return;
          predictions = [buildMockAiPrediction()];
        } else {
          // 실제 API 호출
          predictions = await requestAiLabeling(source, controller.signal);
        }

        if (controller.signal.aborted) return;

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
        if (controller.signal.aborted) return;
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
    const amount = 1; // 기본 수량 1개
    const points = calculatePoints(result.materialId, amount);

    // 인증된 경우 API로 Plan 생성
    if (isAuthenticated) {
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
      const timeStr = now.toTimeString().split(" ")[0]; // HH:mm:ss
      const apiCategory = CATEGORY_TO_API[result.categoryId] || "GENERAL";

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
    setInteractionError(null);
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

      {capturedImage && <AnalyzeCapturedImageCard imageSrc={capturedImage} onReset={reset} />}

      {isScanning && <AnalyzeScanningCard />}

      {result && !isScanning && (
        <AnalyzeResultCard result={result} onReset={reset} onSave={handleSaveEntry} />
      )}

      {/* 오류 알림을 페이지 하단에 고정 */}
      {interactionError && <S.ErrorMessage role="alert">{interactionError}</S.ErrorMessage>}
    </S.PageContainer>
  );
}
