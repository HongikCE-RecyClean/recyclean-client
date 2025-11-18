import type { PropsWithChildren } from "react";
import { ThemeProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { I18nextProvider } from "react-i18next";
import { lightTheme, darkTheme } from "../styles/theme";
import { AppGlobalStyles } from "../styles/GlobalStyles";
import { queryClient } from "./queryClient";
import { useSettingsStore } from "../state/settingsStore";
import { i18n } from "../i18n";
import { LanguageSync } from "../i18n/LanguageSync";
import { OverlayProvider } from "overlay-kit";

// 앱 전역 프로바이더 래퍼
export function AppProviders({ children }: PropsWithChildren) {
  // 설정 스토어에서 다크 모드 상태 구독
  const darkMode = useSettingsStore((state) => state.darkMode);

  // 다크 모드 상태에 따라 테마 선택
  const currentTheme = darkMode ? darkTheme : lightTheme;

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={currentTheme}>
        <OverlayProvider>
          <QueryClientProvider client={queryClient}>
            <AppGlobalStyles />
            <LanguageSync />
            {children}
            {import.meta.env.DEV && (
              // 개발 디버그 버튼 위치를 명시적으로 유지
              <ReactQueryDevtools buttonPosition="bottom-right" initialIsOpen={false} />
            )}
          </QueryClientProvider>
        </OverlayProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}
