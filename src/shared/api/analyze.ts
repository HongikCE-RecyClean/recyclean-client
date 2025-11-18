const DEFAULT_AI_LABELING_ENDPOINT =
  "https://ec2-3-37-55-37.ap-northeast-2.compute.amazonaws.com:8080/api/ai/labeling";

// AI 라벨링 API 응답 타입 정의
export interface AiPrediction {
  category: string;
  confidence: number;
  bbox: number[];
}

export interface AiLabelingResponse {
  predictions?: AiPrediction[];
}

function getAiLabelingEndpoint(): string {
  // 환경 변수 우선 적용 후 기본값 사용
  const envEndpoint = import.meta.env?.VITE_AI_LABELING_ENDPOINT as string | undefined;
  if (envEndpoint && envEndpoint.trim().length > 0) {
    return envEndpoint;
  }
  return DEFAULT_AI_LABELING_ENDPOINT;
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
    throw new Error(`AI 분석 요청 실패: ${response.status}`);
  }

  const payload = (await response.json()) as AiLabelingResponse;
  return payload.predictions ?? [];
}
