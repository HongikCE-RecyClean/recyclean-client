import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// 슬라이드다운 애니메이션
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 배너 컨테이너 (Card 스타일 적용)
export const BannerContainer = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(3),
  width: "100%",
  minHeight: theme.spacing(16),
  padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
  backgroundColor: theme.colors.surface,
  borderRadius: theme.radii.lg,
  border: `1px solid ${theme.colors.border}`,
  boxShadow: `
      0 2px 8px rgba(15, 23, 42, 0.06),
      0 1px 3px rgba(15, 23, 42, 0.04)
    `,
  animation: `${slideDown} 0.4s cubic-bezier(0.4, 0, 0.2, 1)`,
  "@media (max-width: 768px)": {
    padding: `${theme.spacing(3)} ${theme.spacing(3)}`,
    gap: theme.spacing(2),
  },
}));

// 컨텐츠 영역 (아이콘 + 메시지 + 액션)
export const Content = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  flex: 1,
  minWidth: 0, // flexbox 텍스트 오버플로우 방지

  "@media (max-width: 768px)": {
    gap: theme.spacing(2),
  },
}));

// 이모지 스타일
export const Emoji = styled.span({
  fontSize: "1.5rem",
  marginRight: "0.75rem",
  flexShrink: 0,
  lineHeight: 1,
});

// 메시지 텍스트
export const Message = styled.div(({ theme }) => ({
  flex: 1,
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  fontSize: "0.95rem",
  fontWeight: theme.typography.weights.medium,
  color: theme.colors.text,
  lineHeight: 1.6,
  minWidth: 0,
  letterSpacing: "-0.01em",

  // 긴 텍스트 처리
  wordBreak: "break-word",

  "@media (max-width: 768px)": {
    fontSize: "0.875rem",
  },
}));

// 줄바꿈된 문장을 세로로 정렬할 텍스트 래퍼
export const MessageText = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  minWidth: 0,
  span: {
    display: "block",
  },
}));

// 액션 버튼 (기존 Button 스타일과 조화)
export const ActionButton = styled.button(({ theme }) => ({
  flexShrink: 0,
  height: theme.spacing(9),
  padding: `0 ${theme.spacing(4)}`,
  fontSize: "0.875rem",
  fontWeight: theme.typography.weights.semibold,
  color: theme.colors.primaryContrast,
  backgroundColor: theme.colors.primary,
  border: "none",
  borderRadius: theme.radii.md,
  cursor: "pointer",
  transition: "all 0.2s ease",
  whiteSpace: "nowrap",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  letterSpacing: "-0.01em",

  "&:hover": {
    backgroundColor: theme.colors.primaryHover,
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
    transform: "translateY(-1px)",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: `0 0 0 4px ${theme.colors.focusRing}`,
  },

  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  },

  "@media (max-width: 768px)": {
    height: theme.spacing(8),
    padding: `0 ${theme.spacing(3)}`,
    fontSize: "0.8125rem",
  },
}));

// 닫기 버튼 (세련된 디자인)
export const CloseButton = styled.button(({ theme }) => ({
  flexShrink: 0,
  alignSelf: "flex-start",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  padding: 0,
  backgroundColor: "transparent",
  border: "none",
  borderRadius: theme.radii.md,
  color: theme.colors.textMuted,
  cursor: "pointer",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: theme.colors.surfaceMuted,
    color: theme.colors.text,
    transform: "rotate(90deg)",
  },

  "&:active": {
    transform: "rotate(90deg) scale(0.9)",
  },
}));
