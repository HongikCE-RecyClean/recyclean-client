import { createElement } from "react";
import { overlay } from "overlay-kit";
import { AlertDialogContent } from "./AlertDialogContent";
import type { AlertDialogOptions, ConfirmDialogOptions } from "./AlertDialog.types";

export type { AlertDialogOptions, ConfirmDialogOptions } from "./AlertDialog.types";

export function openAlertDialog(options: AlertDialogOptions) {
  overlay.open(({ isOpen, close, unmount }) =>
    createElement(AlertDialogContent, {
      ...options,
      isOpen,
      showCancel: false,
      onConfirm: () => {
        options.onConfirm?.();
        close();
      },
      onCancel: () => close(),
      onExited: unmount,
    }),
  );
}

export function openConfirmDialog(options: ConfirmDialogOptions): Promise<boolean> {
  return overlay.openAsync<boolean>(({ isOpen, close, unmount }) =>
    createElement(AlertDialogContent, {
      ...options,
      isOpen,
      showCancel: true,
      onConfirm: () => {
        options.onConfirm?.();
        close(true);
      },
      onCancel: () => {
        options.onCancel?.();
        close(false);
      },
      onExited: unmount,
    }),
  );
}
