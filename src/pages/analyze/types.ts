// 재활용 분석 결과 타입 정의
export interface RecognitionResult {
  item: string;
  confidence: number;
  recyclable: boolean;
  category: string;
  instructions: string;
  // 추가 안내 문구 옵션
  tips?: string;
}
