import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";

import { apiClient } from "./client";
import { queryKeys } from "./queryKeys";
import type { Category, CategoryDeleteResponse, CategoryRequest } from "./types";

// ============================================================
// 카테고리 API 모듈
// ============================================================

// 전체 카테고리 조회
export async function fetchCategories(signal?: AbortSignal): Promise<Category[]> {
  const response = await apiClient.get<Category[]>("/api/categories", { signal });
  return response.data;
}

// 단건 카테고리 조회
export async function fetchCategory(id: number, signal?: AbortSignal): Promise<Category> {
  const response = await apiClient.get<Category>(`/api/categories/${id}`, { signal });
  return response.data;
}

// 카테고리 생성
export async function createCategory(data: CategoryRequest): Promise<Category> {
  const response = await apiClient.post<Category, CategoryRequest>("/api/categories", {
    body: data,
  });
  return response.data;
}

// 카테고리 수정
export async function updateCategory(
  id: number,
  data: Partial<CategoryRequest>,
): Promise<Category> {
  const response = await apiClient.put<Category, Partial<CategoryRequest>>(
    `/api/categories/${id}`,
    { body: data },
  );
  return response.data;
}

// 카테고리 삭제
export async function deleteCategory(id: number): Promise<CategoryDeleteResponse> {
  const response = await apiClient.delete<CategoryDeleteResponse>(`/api/categories/${id}`);
  return response.data;
}

// ============================================================
// React Query 훅
// ============================================================

type UseCategoriesOptions = Omit<UseQueryOptions<Category[], Error>, "queryKey" | "queryFn">;
type UseCategoryOptions = Omit<UseQueryOptions<Category, Error>, "queryKey" | "queryFn">;

// 전체 카테고리 조회 훅
export function useCategories(options?: UseCategoriesOptions) {
  return useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: ({ signal }) => fetchCategories(signal),
    staleTime: 5 * 60_000, // 5분 (카테고리는 자주 변경되지 않음)
    ...options,
  });
}

// 단건 카테고리 조회 훅
export function useCategory(id: number, options?: UseCategoryOptions) {
  return useQuery({
    queryKey: queryKeys.categories.detail(id),
    queryFn: ({ signal }) => fetchCategory(id, signal),
    staleTime: 5 * 60_000,
    enabled: id > 0,
    ...options,
  });
}

// 카테고리 생성 mutation
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}

// 카테고리 수정 mutation
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CategoryRequest> }) =>
      updateCategory(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.list() });
    },
  });
}

// 카테고리 삭제 mutation
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}
