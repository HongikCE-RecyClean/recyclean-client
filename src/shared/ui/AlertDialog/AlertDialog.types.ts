import type { NotificationType } from "../../types/notifications";

export interface BaseDialogOptions {
  title: string;
  description?: string;
  tone?: NotificationType;
  confirmLabel?: string;
  cancelLabel?: string;
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
