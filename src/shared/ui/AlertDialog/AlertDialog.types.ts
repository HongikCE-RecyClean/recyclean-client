import type { NotificationType } from "../../types/notifications";
import type { ButtonVariant } from "../Button/Button";

export interface BaseDialogOptions {
  title: string;
  description?: string;
  tone?: NotificationType;
  confirmLabel?: string;
  cancelLabel?: string;
  showToneIcon?: boolean;
  confirmVariant?: ButtonVariant;
}

export interface AlertDialogOptions extends BaseDialogOptions {
  onConfirm?: () => void;
}

export interface ConfirmDialogOptions extends BaseDialogOptions {
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface DialogContentProps extends BaseDialogOptions {
  isOpen: boolean;
  showCancel: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onExited: () => void;
}
