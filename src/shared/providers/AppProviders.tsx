import type { PropsWithChildren } from "react";
import { ThemeProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { appTheme } from "../styles/theme";
import { AppGlobalStyles } from "../styles/GlobalStyles";
import { queryClient } from "./queryClient";

// 앱 전역 프로바이더 래퍼
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={appTheme}>
      <QueryClientProvider client={queryClient}>
        <AppGlobalStyles />
        {children}
        {import.meta.env.DEV && (
          // 개발 디버그 버튼 위치를 명시적으로 유지
          <ReactQueryDevtools buttonPosition="bottom-right" initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
