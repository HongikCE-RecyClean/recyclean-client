import { useMemo, useState } from "react";
import { AlertCircle, Camera, CheckCircle, RotateCcw, Scan, Upload, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/Card/Card";
import { Button } from "../../shared/ui/Button/Button";
import { Badge } from "../../shared/ui/Badge/Badge";
import { ImageWithFallback } from "../../shared/media/ImageWithFallback/ImageWithFallback";
import * as S from "./AnalyzePage.styles";

interface RecognitionResult {
  item: string;
  confidence: number;
  recyclable: boolean;
  category: string;
  instructions: string;
  tips?: string;
}

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

  // 결과 상태에 따른 배지 노출 로직 정의
  const statusBadge = useMemo(() => {
    if (!result) return null;

    if (result.recyclable) {
      return <Badge tone="success">재활용 가능 ♻️</Badge>;
    }
    return <Badge tone="danger">재활용 불가 ❌</Badge>;
  }, [result]);

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
      <Card>
        <CardHeader>
          <CardTitle>
            <Scan size={18} />
            AI 재활용 분류
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ margin: 0, color: "#475569", fontSize: "0.9rem" }}>
            사진을 찍거나 이미지를 업로드하면 재활용 가능 여부와 처리 방법을 안내해요.
          </p>
        </CardContent>
      </Card>

      {!capturedImage && !result && (
        <Card>
          <CardContent>
            <S.ActionsContainer>
              <Button onClick={handleMockCapture} size="lg">
                <Camera size={18} />
                사진 촬영하기
              </Button>
              <Button onClick={handleMockUpload} variant="outline" size="lg">
                <Upload size={18} />
                이미지 업로드
              </Button>
            </S.ActionsContainer>
          </CardContent>
        </Card>
      )}

      {capturedImage && (
        <Card>
          <CardContent>
            <S.ImageWrapper>
              <ImageWithFallback
                src={capturedImage}
                alt="Captured"
                style={{ width: "100%", height: 220, objectFit: "cover" }}
              />
              <S.ResetButton
                variant="secondary"
                size="icon"
                onClick={reset}
                aria-label="사진 다시 촬영"
              >
                <RotateCcw size={16} />
              </S.ResetButton>
            </S.ImageWrapper>
          </CardContent>
        </Card>
      )}

      {isScanning && (
        <Card>
          <CardContent style={{ textAlign: "center", gap: "16px" }}>
            <S.Spinner />
            <div style={{ fontWeight: 600 }}>이미지를 분석 중이에요...</div>
            <div style={{ color: "#64748b", fontSize: "0.85rem" }}>잠시만 기다려 주세요.</div>
          </CardContent>
        </Card>
      )}

      {result && !isScanning && (
        <Card style={{ borderLeft: "4px solid #22c55e" }}>
          <CardHeader>
            <S.ResultHeader>
              <S.ResultTitle>
                {result.recyclable ? (
                  <CheckCircle size={20} color="#16a34a" />
                ) : (
                  <XCircle size={20} color="#dc2626" />
                )}
                <span>분류 결과</span>
              </S.ResultTitle>
              <Badge variant="outline">{result.confidence}% 확신</Badge>
            </S.ResultHeader>
          </CardHeader>
          <CardContent>
            <S.ResultBody>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <div>
                  <h3 style={{ margin: 0 }}>{result.item}</h3>
                  <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#475569" }}>
                    재질: {result.category}
                  </p>
                </div>
                {statusBadge}
              </div>

              <div>
                <h4 style={{ margin: "0 0 4px", fontSize: "0.9rem" }}>처리 방법</h4>
                <p style={{ margin: 0, color: "#1f2933", fontSize: "0.9rem" }}>
                  {result.instructions}
                </p>
              </div>

              {result.tips && (
                <S.Callout>
                  <AlertCircle size={18} />
                  <span style={{ fontSize: "0.85rem" }}>{result.tips}</span>
                </S.Callout>
              )}

              <div style={{ display: "flex", gap: "12px" }}>
                <Button variant="outline" style={{ flex: 1 }} onClick={reset}>
                  다시 촬영
                </Button>
                <Button style={{ flex: 1 }}>재활용 처리 기록</Button>
              </div>
            </S.ResultBody>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            <AlertCircle size={18} />
            촬영 팁
          </CardTitle>
        </CardHeader>
        <CardContent>
          <S.TipsList>
            <li>빛이 충분한 곳에서 촬영해요.</li>
            <li>깨끗한 배경에서 촬영하면 인식률이 올라가요.</li>
            <li>재활용 기호가 보이도록 찍어주세요.</li>
            <li>가능하면 물체 정면에서 촬영해요.</li>
          </S.TipsList>
        </CardContent>
      </Card>
    </S.PageContainer>
  );
}
