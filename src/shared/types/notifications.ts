export type NotificationType = "success" | "error" | "warning" | "info";

export interface SnackbarAction {
  label: string;
  onClick: () => void;
}

export interface SnackbarOptions {
  type?: NotificationType;
  duration?: number;
  action?: SnackbarAction;
}
