import styled from "@emotion/styled";
import type { AppTheme } from "shared/styles/theme";
import type { ProgressTone } from "./Progress";

// 진행 바 톤별 그래디언트 매핑
const toneGradientMap: Record<ProgressTone, (theme: AppTheme) => string> = {
  primary: (theme) =>
    `linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
  success: (theme) =>
    `linear-gradient(90deg, ${theme.colors.success} 0%, ${theme.colors.highlight} 100%)`,
  info: (theme) =>
    `linear-gradient(90deg, ${theme.colors.info} 0%, ${theme.colors.secondary} 100%)`,
  warning: (theme) =>
    `linear-gradient(90deg, ${theme.colors.warning} 0%, ${theme.colors.primary} 100%)`,
  danger: (theme) =>
    `linear-gradient(90deg, ${theme.colors.danger} 0%, ${theme.colors.warning} 100%)`,
  neutral: (theme) =>
    `linear-gradient(90deg, ${theme.colors.textMuted} 0%, ${theme.colors.text} 100%)`,
};

// 톤이 누락된 경우 기본 그래디언트 반환
const resolveToneGradient = (theme: AppTheme, tone: ProgressTone) => {
  const gradient = toneGradientMap[tone];
  return gradient?.(theme) ?? toneGradientMap.primary(theme);
};

// 진행 바 트랙 스타일 정의
export const Track = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  border-radius: ${({ theme }) => theme.radii.pill};
  overflow: hidden;
`;

// 진행 바 내부 인디케이터 정의
export const Indicator = styled.div<{ $value: number; $tone: ProgressTone }>`
  height: 100%;
  width: ${({ $value }) => Math.min(Math.max($value, 0), 100)}%;
  background: ${({ theme, $tone }) => resolveToneGradient(theme, $tone)};
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: width 0.3s ease;
`;

// 진행 바 라벨 텍스트 정의
export const Label = styled.span`
  display: block;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;
