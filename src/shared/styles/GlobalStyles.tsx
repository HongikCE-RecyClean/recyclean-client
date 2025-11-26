import { Global, css, useTheme } from "@emotion/react";

// 테마 기반 전역 스타일 정의
export function AppGlobalStyles() {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        :root {
          --app-background: ${theme.colors.background};
          --app-surface: ${theme.colors.surface};
          --app-text: ${theme.colors.text};
          --app-accent: ${theme.colors.accent};
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        body {
          background-color: var(--app-background);
          color: var(--app-text);
        }
      `}
    />
  );
}
