import { QueryClient } from "@tanstack/react-query";

// 전역 쿼리 클라이언트 옵션 설정
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});
