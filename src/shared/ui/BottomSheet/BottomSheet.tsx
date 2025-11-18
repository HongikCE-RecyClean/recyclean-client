import { useEffect, useId, useRef, useState, type ReactNode, type TransitionEvent } from "react";
import { useTheme } from "@emotion/react";
import * as S from "./BottomSheet.styles";
import { useBottomSheetStore } from "../../state/bottomSheetStore";

export interface BottomSheetProps {
  // 바텀시트 열림/닫힘 상태
  isOpen: boolean;
  // 바텀시트 닫기 핸들러
  onClose: () => void;
  // 바텀시트 닫힌 뒤 콜백
  onAfterClose?: () => void;
  // 바텀시트 제목
  title: string;
  // 바텀시트 내용
  children: ReactNode;
}

export function BottomSheet({ isOpen, onClose, onAfterClose, title, children }: BottomSheetProps) {
  const theme = useTheme();
  const sheetId = useId();
  const registerSheet = useBottomSheetStore((state) => state.registerSheet);
  const unregisterSheet = useBottomSheetStore((state) => state.unregisterSheet);
  const isRegisteredRef = useRef(false);
  const [isOverlayInteractive, setOverlayInteractive] = useState(false);
  const overlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const afterCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasPreviouslyOpenRef = useRef(isOpen);

  // 전역 시트 상태 등록
  useEffect(() => {
    if (isOpen && !isRegisteredRef.current) {
      registerSheet(sheetId);
      isRegisteredRef.current = true;
    }

    if (!isOpen && isRegisteredRef.current) {
      unregisterSheet(sheetId);
      isRegisteredRef.current = false;
    }

    return () => {
      if (isRegisteredRef.current) {
        unregisterSheet(sheetId);
        isRegisteredRef.current = false;
      }
    };
  }, [isOpen, registerSheet, unregisterSheet, sheetId]);

  // 오버레이 클릭 가능 시점을 지연해 초기 클릭을 무시
  useEffect(() => {
    if (overlayTimerRef.current) {
      clearTimeout(overlayTimerRef.current);
      overlayTimerRef.current = null;
    }

    if (isOpen) {
      setOverlayInteractive(false);
      overlayTimerRef.current = setTimeout(() => {
        setOverlayInteractive(true);
      }, 200);
    } else {
      setOverlayInteractive(false);
    }

    return () => {
      if (overlayTimerRef.current) {
        clearTimeout(overlayTimerRef.current);
        overlayTimerRef.current = null;
      }
    };
  }, [isOpen]);

  // 애니메이션 미완료 시에도 onAfterClose를 보장
  useEffect(() => {
    if (!isOpen && wasPreviouslyOpenRef.current) {
      if (afterCloseTimeoutRef.current) {
        clearTimeout(afterCloseTimeoutRef.current);
      }
      afterCloseTimeoutRef.current = setTimeout(() => {
        onAfterClose?.();
        afterCloseTimeoutRef.current = null;
      }, 350);
    }

    if (isOpen && afterCloseTimeoutRef.current) {
      clearTimeout(afterCloseTimeoutRef.current);
      afterCloseTimeoutRef.current = null;
    }

    wasPreviouslyOpenRef.current = isOpen;

    return () => {
      if (afterCloseTimeoutRef.current) {
        clearTimeout(afterCloseTimeoutRef.current);
        afterCloseTimeoutRef.current = null;
      }
    };
  }, [isOpen, onAfterClose]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (event.propertyName !== "transform") {
      return;
    }
    if (!isOpen) {
      if (afterCloseTimeoutRef.current) {
        clearTimeout(afterCloseTimeoutRef.current);
        afterCloseTimeoutRef.current = null;
      }
      onAfterClose?.();
    }
  };

  // ESC 키로 바텀시트 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // 바텀시트가 열려 있을 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* 오버레이 배경 */}
      <S.Overlay isOpen={isOpen} $interactive={isOverlayInteractive} onClick={onClose} />

      {/* 바텀시트 컨테이너 */}
      <S.Container
        isOpen={isOpen}
        onTransitionEnd={handleTransitionEnd}
        style={
          {
            "--link-color": theme.colors.info,
          } as React.CSSProperties
        }
      >
        {/* 헤더 영역 */}
        <S.Header>
          {/* 드래그 핸들 */}
          <S.DragHandle />
          {/* 제목 */}
          <S.Title>{title}</S.Title>
        </S.Header>

        {/* 내용 영역 */}
        <S.Content>{children}</S.Content>
      </S.Container>
    </>
  );
}
