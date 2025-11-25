import { buildApiUrl } from "./config";
import type { AiLabelingResponse, AiPrediction } from "./types";

// re-export 타입 (하위 호환성)
export type { AiLabelingResponse, AiPrediction } from "./types";

// 기본 프록시 경로에 /api prefix 적용
const DEFAULT_AI_LABELING_PATH = "/api/ai/labeling";

// AI 라벨링 엔드포인트 결정
function getAiLabelingEndpoint(): string {
  const envEndpoint = import.meta.env?.VITE_AI_LABELING_ENDPOINT as string | undefined;
  if (envEndpoint) {
    const trimmed = envEndpoint.trim();
    if (trimmed.length > 0) {
      if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        return trimmed;
      }
      return buildApiUrl(trimmed);
    }
  }
  return buildApiUrl(DEFAULT_AI_LABELING_PATH);
}

export async function requestAiLabeling(file: Blob, signal?: AbortSignal): Promise<AiPrediction[]> {
  // FormData 구성 시 trash_img 키 고정
  const formData = new FormData();
  formData.append("trash_img", file);

  const response = await fetch(getAiLabelingEndpoint(), {
    method: "POST",
    body: formData,
    signal,
  });

  if (!response.ok) {
    throw new Error(`AI labeling request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as AiLabelingResponse;
  return payload.predictions ?? [];
}
