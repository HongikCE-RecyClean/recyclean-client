import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import type { NotificationType, SnackbarAction } from "../../types/notifications";
import * as S from "./Snackbar.styles";

export interface SnackbarProps {
  type: NotificationType;
  message: string;
  duration?: number;
  action?: SnackbarAction;
  onClose: () => void;
}

// 타입별 아이콘 매핑
const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export function Snackbar({ type, message, duration = 4000, action, onClose }: SnackbarProps) {
  const Icon = iconMap[type];

  // 자동 닫기 타이머
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose, message, type]);

  return (
    <S.SnackbarContainer $type={type}>
      <S.IconWrapper $type={type}>
        <Icon size={20} />
      </S.IconWrapper>

      <S.Message>{message}</S.Message>

      {action && (
        <S.ActionButton
          onClick={() => {
            action.onClick();
            onClose();
          }}
        >
          {action.label}
        </S.ActionButton>
      )}

      <S.CloseButton onClick={onClose} aria-label="닫기">
        <X size={18} />
      </S.CloseButton>
    </S.SnackbarContainer>
  );
}
