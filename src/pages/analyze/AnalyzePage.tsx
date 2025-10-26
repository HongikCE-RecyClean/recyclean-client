import { useState } from "react";
import {
  AnalyzeActionsCard,
  AnalyzeCapturedImageCard,
  AnalyzeIntroCard,
  AnalyzeResultCard,
  AnalyzeScanningCard,
  AnalyzeTipsCard,
} from "./components";
import { RecognitionResult } from "./types";
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

export function AnalyzePage() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleMockCapture = () => {
    setIsScanning(true);
    setCapturedImage(
      "https://images.unsplash.com/photo-1579756423478-02bc82a97679?auto=format&fit=crop&w=1080&q=80",
    );
    window.setTimeout(() => {
      const random = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(random);
      setIsScanning(false);
    }, 2500);
  };

  const handleMockUpload = () => {
    setIsScanning(true);
    setCapturedImage(
      "https://images.unsplash.com/photo-1679046410011-b6bf7ce71f22?auto=format&fit=crop&w=1080&q=80",
    );
    window.setTimeout(() => {
      const random = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(random);
      setIsScanning(false);
    }, 2000);
  };

  const reset = () => {
    setResult(null);
    setCapturedImage(null);
    setIsScanning(false);
  };

  // 분석 페이지 UI 렌더링 시작
  return (
    <S.PageContainer>
      <AnalyzeIntroCard />

      {!capturedImage && !result && (
        <AnalyzeActionsCard onCapture={handleMockCapture} onUpload={handleMockUpload} />
      )}

      {capturedImage && <AnalyzeCapturedImageCard imageSrc={capturedImage} onReset={reset} />}

      {isScanning && <AnalyzeScanningCard />}

      {result && !isScanning && <AnalyzeResultCard result={result} onReset={reset} />}

      <AnalyzeTipsCard />
    </S.PageContainer>
  );
}
