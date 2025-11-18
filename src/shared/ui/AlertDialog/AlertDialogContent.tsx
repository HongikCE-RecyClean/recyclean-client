import { useEffect } from "react";
import styled from "@emotion/styled";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { NotificationType } from "../../types/notifications";
import { Button } from "../Button/Button";
import type { DialogContentProps } from "./AlertDialog.types";

const EXIT_DURATION = 220;

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const Overlay = styled.div<{ $isOpen: boolean }>(({ theme, $isOpen }) => ({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15, 23, 42, 0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  opacity: $isOpen ? 1 : 0,
  pointerEvents: $isOpen ? "auto" : "none",
  transition: "opacity 0.2s ease",
  zIndex: 1400,
}));

const DialogCard = styled.div<{ $isOpen: boolean }>(({ theme, $isOpen }) => ({
  width: "min(420px, 100%)",
  borderRadius: theme.radii.lg,
  backgroundColor: theme.colors.surface,
  boxShadow: theme.shadows.medium,
  padding: theme.spacing(6),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  transform: $isOpen ? "translateY(0) scale(1)" : "translateY(16px) scale(0.98)",
  opacity: $isOpen ? 1 : 0.9,
  transition: "transform 0.2s ease, opacity 0.2s ease",
  position: "relative",
}));

const IconWrapper = styled.div<{ $tone: NotificationType }>(({ theme, $tone }) => {
  const toneColors = {
    success: { fg: theme.colors.success, bg: theme.colors.successSurface },
    error: { fg: theme.colors.danger, bg: theme.colors.dangerSurface },
    warning: { fg: theme.colors.warning, bg: theme.colors.warningSurface },
    info: { fg: theme.colors.info, bg: theme.colors.infoSurface },
  } as const;

  return {
    width: 48,
    height: 48,
    borderRadius: theme.radii.full,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: toneColors[$tone].fg,
    backgroundColor: toneColors[$tone].bg,
  };
});

const Title = styled.h3(({ theme }) => ({
  margin: 0,
  fontSize: "1.1rem",
  fontWeight: theme.typography.weights.semibold,
  color: theme.colors.text,
}));

const Description = styled.p(({ theme }) => ({
  margin: 0,
  color: theme.colors.textMuted,
  lineHeight: 1.5,
}));

const Actions = styled.div(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "flex-end",
  flexWrap: "wrap",
}));

const CloseButton = styled.button(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(3),
  right: theme.spacing(3),
  border: "none",
  background: "transparent",
  padding: theme.spacing(1),
  borderRadius: theme.radii.full,
  color: theme.colors.textMuted,
  cursor: "pointer",
  transition: "background-color 0.2s ease, color 0.2s ease",

  ":hover": {
    backgroundColor: theme.colors.surfaceMuted,
    color: theme.colors.text,
  },
}));

export function AlertDialogContent({
  isOpen,
  title,
  description,
  tone = "info",
  confirmLabel,
  cancelLabel,
  showCancel,
  showToneIcon = true,
  confirmVariant = "primary",
  onConfirm,
  onCancel,
  onExited,
}: DialogContentProps) {
  const { t } = useTranslation();
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(onExited, EXIT_DURATION);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, onExited]);

  const Icon = iconMap[tone];

  return (
    <Overlay $isOpen={isOpen} onClick={onCancel} role="presentation">
      <DialogCard
        $isOpen={isOpen}
        role="alertdialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onCancel} aria-label={t("notifications.actions.close")}>
          <X size={18} />
        </CloseButton>
        {showToneIcon && (
          <IconWrapper $tone={tone}>
            <Icon size={24} />
          </IconWrapper>
        )}
        <div>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
        </div>
        <Actions>
          {showCancel && (
            <Button variant="outline" onClick={onCancel} type="button">
              {cancelLabel ?? t("common.cancel")}
            </Button>
          )}
          <Button variant={confirmVariant} onClick={onConfirm} type="button">
            {confirmLabel ?? t("common.confirm")}
          </Button>
        </Actions>
      </DialogCard>
    </Overlay>
  );
}
