import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";

import { apiClient } from "./client";
import { queryKeys } from "./queryKeys";
import type { MemberProfile, NicknameUpdateRequest, NicknameUpdateResponse } from "./types";

// ============================================================
// 회원 API 모듈
// ============================================================

// 나의 프로필 조회
export async function fetchMyProfile(signal?: AbortSignal): Promise<MemberProfile> {
  const response = await apiClient.get<MemberProfile>("/api/members/me", { signal });
  return response.data;
}

// 닉네임 수정
export async function updateNickname(nickname: string): Promise<NicknameUpdateResponse> {
  const response = await apiClient.patch<NicknameUpdateResponse, NicknameUpdateRequest>(
    "/api/members/me/nickname",
    { body: { nickname } },
  );
  return response.data;
}

// ============================================================
// React Query 훅
// ============================================================

type UseMyProfileOptions = Omit<UseQueryOptions<MemberProfile, Error>, "queryKey" | "queryFn">;

// 나의 프로필 조회 훅
export function useMyProfile(options?: UseMyProfileOptions) {
  return useQuery({
    queryKey: queryKeys.members.me(),
    queryFn: ({ signal }) => fetchMyProfile(signal),
    staleTime: 5 * 60_000, // 5분 (프로필은 자주 변경되지 않음)
    ...options,
  });
}

// 닉네임 수정 mutation
export function useUpdateNickname() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      // 프로필 캐시 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.members.me() });
      // 대시보드 캐시 무효화 (닉네임이 표시될 수 있음)
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
