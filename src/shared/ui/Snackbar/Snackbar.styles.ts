import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import type { AppTheme } from "../../styles/theme";
import type { NotificationType } from "../../state/notificationStore";

// 슬라이드업 애니메이션
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 타입별 색상 매핑
const typeColors: Record<
  NotificationType,
  { background: (theme: AppTheme) => string; icon: (theme: AppTheme) => string }
> = {
  success: {
    background: (theme) => theme.colors.successSurface,
    icon: (theme) => theme.colors.success,
  },
  error: {
    background: (theme) => theme.colors.dangerSurface,
    icon: (theme) => theme.colors.danger,
  },
  warning: {
    background: (theme) => theme.colors.warningSurface,
    icon: (theme) => theme.colors.warning,
  },
  info: {
    background: (theme) => theme.colors.infoSurface,
    icon: (theme) => theme.colors.info,
  },
};

// 스낵바 컨테이너
export const SnackbarContainer = styled.div<{ $type: NotificationType }>(({ theme, $type }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  minHeight: theme.spacing(14),
  padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
  backgroundColor: typeColors[$type].background(theme),
  borderRadius: theme.radii.md,
  boxShadow: theme.shadows.medium,
  animation: `${slideUp} 0.3s ease-out`,
  marginBottom: theme.spacing(2),
  maxWidth: "500px",
  width: "calc(100vw - 32px)", // 양쪽 16px 여백

  // 다크모드 대응 - 배경 불투명도 증가
  backdropFilter: "blur(8px)",
}));

// 아이콘 래퍼
export const IconWrapper = styled.div<{ $type: NotificationType }>(({ theme, $type }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: typeColors[$type].icon(theme),
}));

// 메시지 텍스트
export const Message = styled.div(({ theme }) => ({
  flex: 1,
  fontSize: "0.95rem",
  fontWeight: theme.typography.weights.medium,
  color: theme.colors.text,
  lineHeight: 1.5,
}));

// 액션 버튼
export const ActionButton = styled.button(({ theme }) => ({
  flexShrink: 0,
  padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
  fontSize: "0.875rem",
  fontWeight: theme.typography.weights.semibold,
  color: theme.colors.primary,
  backgroundColor: "transparent",
  border: "none",
  borderRadius: theme.radii.sm,
  cursor: "pointer",
  transition: "background-color 0.2s ease",

  "&:hover": {
    backgroundColor: theme.colors.surfaceMuted,
  },

  "&:active": {
    transform: "scale(0.95)",
  },
}));

// 닫기 버튼
export const CloseButton = styled.button(({ theme }) => ({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  padding: 0,
  backgroundColor: "transparent",
  border: "none",
  borderRadius: theme.radii.sm,
  color: theme.colors.textMuted,
  cursor: "pointer",
  transition: "background-color 0.2s ease, color 0.2s ease",

  "&:hover": {
    backgroundColor: theme.colors.surfaceMuted,
    color: theme.colors.text,
  },

  "&:active": {
    transform: "scale(0.9)",
  },
}));
