import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const Icon = iconMap[type];
  const [isClosing, setIsClosing] = useState(false); // 종료 애니메이션 상태 추적
  const autoHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null); // 자동 닫기 타이머 ref
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null); // 종료 애니메이션 완료 타이머 ref
  const isClosingRef = useRef(false); // 중복 닫기 방지 ref

  // 종료 애니메이션이 끝난 뒤 실제 언마운트 요청
  const requestClose = useCallback(() => {
    if (isClosingRef.current) {
      return;
    }
    isClosingRef.current = true;
    setIsClosing(true);
    exitTimerRef.current = setTimeout(() => {
      onClose();
    }, S.SNACKBAR_EXIT_DURATION);
  }, [onClose]);

  // 자동 닫기 타이머 설정
  useEffect(() => {
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current);
    }
    autoHideTimerRef.current = setTimeout(() => {
      requestClose();
    }, duration);

    return () => {
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
        autoHideTimerRef.current = null;
      }
    };
  }, [duration, message, type, requestClose]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
      }
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  return (
    <S.SnackbarContainer $type={type} $isClosing={isClosing}>
      <S.IconWrapper $type={type}>
        <Icon size={20} />
      </S.IconWrapper>

      <S.Message>{message}</S.Message>

      {action && (
        <S.ActionButton
          onClick={() => {
            action.onClick();
            requestClose();
          }}
        >
          {action.label}
        </S.ActionButton>
      )}

      <S.CloseButton onClick={requestClose} aria-label={t("notifications.actions.close")}>
        <X size={18} />
      </S.CloseButton>
    </S.SnackbarContainer>
  );
}
