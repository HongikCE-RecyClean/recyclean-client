export interface AppTheme {
  colors: {
    background: string;
    surface: string;
    surfaceMuted: string;
    primary: string;
    primaryContrast: string;
    secondary: string;
    accent: string;
    text: string;
    textMuted: string;
    border: string;
    success: string;
    successSurface: string;
    warning: string;
    warningSurface: string;
    danger: string;
    dangerSurface: string;
    info: string;
    infoSurface: string;
    highlight: string;
  };
  spacing: (step: number) => string;
  radii: {
    sm: string;
    md: string;
    lg: string;
    // 완전한 원형 코너 정의
    full: string;
    pill: string;
  };
  shadows: {
    soft: string;
    medium: string;
    inner: string;
  };
  typography: {
    family: string;
    weights: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
}

// 공통 테마 속성 (라이트/다크 모두 동일)
const commonTheme = {
  spacing: (step: number) => `${step * 4}px`,
  radii: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    full: "999px",
    pill: "999px",
  },
  typography: {
    family: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};

// 라이트 모드 테마
export const lightTheme: AppTheme = {
  ...commonTheme,
  colors: {
    background: "#f5f7fa",
    surface: "#ffffff",
    surfaceMuted: "#f0f4f8",
    primary: "#2f855a",
    primaryContrast: "#ffffff",
    secondary: "#0c4a6e",
    accent: "#14b8a6",
    text: "#1f2933",
    textMuted: "#4a5568",
    border: "#d1d9e0",
    success: "#15803d",
    successSurface: "#dcfce7",
    warning: "#b45309",
    warningSurface: "#fef3c7",
    danger: "#dc2626",
    dangerSurface: "#fee2e2",
    info: "#2563eb",
    infoSurface: "#dbeafe",
    highlight: "#22c55e",
  },
  shadows: {
    soft: "0 4px 16px rgba(15, 23, 42, 0.08)",
    medium: "0 12px 32px rgba(15, 23, 42, 0.12)",
    inner: "inset 0 1px 2px rgba(15, 23, 42, 0.08)",
  },
};

// 다크 모드 테마
export const darkTheme: AppTheme = {
  ...commonTheme,
  colors: {
    background: "#0f172a",
    surface: "#1e293b",
    surfaceMuted: "#334155",
    primary: "#34d399",
    primaryContrast: "#0f172a",
    secondary: "#38bdf8",
    accent: "#2dd4bf",
    text: "#f1f5f9",
    textMuted: "#94a3b8",
    border: "#334155",
    success: "#22c55e",
    successSurface: "#065f46",
    warning: "#f59e0b",
    warningSurface: "#78350f",
    danger: "#ef4444",
    dangerSurface: "#7f1d1d",
    info: "#60a5fa",
    infoSurface: "#1e3a8a",
    highlight: "#4ade80",
  },
  shadows: {
    soft: "0 4px 16px rgba(0, 0, 0, 0.3)",
    medium: "0 12px 32px rgba(0, 0, 0, 0.5)",
    inner: "inset 0 1px 2px rgba(0, 0, 0, 0.3)",
  },
};

// 기본 테마 (라이트 모드)
export const appTheme = lightTheme;

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Theme extends AppTheme {}
}
