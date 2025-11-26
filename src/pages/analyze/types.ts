import type { MaterialCategoryId, MaterialId } from "shared/utils/recyclingPoints";

// 재활용 분석 결과 타입 정의
export interface RecognitionResult {
  item: string;
  materialId: MaterialId;
  categoryId: MaterialCategoryId;
  confidence: number;
  recyclable: boolean;
  category: string;
  instructions: string;
  // 추가 안내 문구 옵션
  tips?: string;
  // 서버 API 카테고리 (Plan 생성 시 직접 사용)
  serverCategory: string;
  // 바운딩 박스 좌표 [x1, y1, x2, y2]
  bbox?: [number, number, number, number];
}
