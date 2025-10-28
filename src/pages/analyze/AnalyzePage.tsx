import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
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
import * as S from "./AnalyzePage.styles";

// 모의 분석 결과 리스트 정의
const mockResults: RecognitionResult[] = [
  {
    item: "Plastic Water Bottle",
    confidence: 95,
    recyclable: true,
    category: "Plastic #1 (PET)",
    instructions: "라벨과 뚜껑을 제거하고 깨끗이 헹군 뒤 배출해요.",
    tips: "바닥의 재활용 기호 #1을 확인해요.",
  },
  {
    item: "Pizza Box",
    confidence: 88,
    recyclable: false,
    category: "Contaminated Paper",
    instructions: "기름과 음식물이 묻어 재활용이 어려워요.",
    tips: "깨끗한 부분만 분리 배출하고 나머지는 일반쓰레기로 버려요.",
  },
  {
    item: "Aluminum Can",
    confidence: 92,
    recyclable: true,
    category: "Aluminum",
    instructions: "물을 헹군 뒤 눌러서 부피를 줄여요.",
    tips: "금속류 중에서도 재활용 가치가 높아요.",
  },
];

// 분석 시뮬레이션 지연 시간 상수 정의
const ANALYSIS_DELAY_MS = 2200;

export function AnalyzePage() {
  // 분석 화면 표시와 결과 상태 정의
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  // 카메라 활성화 및 준비 상태 정의
  const [interactionError, setInteractionError] = useState<string | null>(null);

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
  }, [clearAnalysisTimeout]);

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
      setInteractionError("이미지(image) 파일만 업로드할 수 있어요.");
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

  // 분석 상태 초기화 처리 정의
  const reset = () => {
    clearAnalysisTimeout();
    revokeObjectUrl();
    setResult(null);
    setCapturedImage(null);
    setIsScanning(false);
    setInteractionError(null);
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
                {!isVideoReady && <S.VideoOverlay>카메라를 준비하고 있어요...</S.VideoOverlay>}
              </S.VideoWrapper>
              <S.CameraControls>
                <Button onClick={handleCaptureFromCamera} disabled={!isVideoReady} size="lg">
                  사진 촬영하기
                </Button>
                <Button onClick={stopCamera} variant="ghost" size="lg">
                  취소하기
                </Button>
              </S.CameraControls>
            </S.CameraContainer>
          </CardContent>
        </Card>
      )}

      {capturedImage && <AnalyzeCapturedImageCard imageSrc={capturedImage} onReset={reset} />}

      {isScanning && <AnalyzeScanningCard />}

      {result && !isScanning && <AnalyzeResultCard result={result} onReset={reset} />}

      <AnalyzeTipsCard />
    </S.PageContainer>
  );
}
