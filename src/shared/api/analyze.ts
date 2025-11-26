import { useMutation } from "@tanstack/react-query";

import { buildApiUrl } from "./config";
import type { AiLabelingResponse, AiPrediction } from "./types";
import { apiClient } from "./client";
import { queryKeys } from "./queryKeys";

// re-export 타입 (하위 호환성)
export type { AiLabelingResponse, AiPrediction } from "./types";

// 기본 엔드포인트 경로 (base URL과 결합)
const DEFAULT_AI_LABELING_PATH = "/api/ai/labeling";

// AI 라벨링 엔드포인트 결정
function getAiLabelingEndpoint(): string {
  const envEndpoint = import.meta.env?.VITE_AI_LABELING_ENDPOINT as string | undefined;
  if (envEndpoint) {
    const trimmed = envEndpoint.trim();
    if (trimmed) {
      return buildApiUrl(trimmed);
    }
  }

  // 기본값: base URL + 표준 경로
  return buildApiUrl(DEFAULT_AI_LABELING_PATH);
}

// AI 라벨링 API 호출 (FormData 업로드)
export async function requestAiLabeling(file: Blob, signal?: AbortSignal): Promise<AiPrediction[]> {
  const formData = new FormData();
  formData.append("trash_img", file);

  const response = await apiClient.post<AiLabelingResponse>(getAiLabelingEndpoint(), {
    body: formData,
    signal,
    // AI 서버는 인증 없이 호출 (명세상)
    skipAuth: true,
  });

  return response.data.predictions ?? [];
}

// React Query mutation 훅 (수동 트리거)
export function useAiLabeling() {
  return useMutation({
    mutationKey: queryKeys.analyze.result(),
    mutationFn: ({ file, signal }: { file: Blob; signal?: AbortSignal }) =>
      requestAiLabeling(file, signal),
    retry: false, // 업로드 재시도는 사용자가 명시적으로 시도
  });
}
