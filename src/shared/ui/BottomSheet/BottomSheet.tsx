import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
  type TransitionEvent,
} from "react";
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
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartYRef = useRef<number | null>(null);
  const activePointerIdRef = useRef<number | null>(null);

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

  // 드래그 제스처 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setIsDragging(false);
      setDragOffset(0);
      dragStartYRef.current = null;
      activePointerIdRef.current = null;
    }
  }, [isOpen]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!isOpen) {
      return;
    }
    dragStartYRef.current = event.clientY;
    activePointerIdRef.current = event.pointerId;
    setIsDragging(true);
    setDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }
    if (activePointerIdRef.current !== event.pointerId) {
      return;
    }
    if (dragStartYRef.current === null) {
      return;
    }
    const deltaY = event.clientY - dragStartYRef.current;
    setDragOffset(deltaY > 0 ? deltaY : 0);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }
    if (activePointerIdRef.current !== event.pointerId) {
      return;
    }
    if (dragStartYRef.current === null) {
      return;
    }

    const deltaY = event.clientY - dragStartYRef.current;
    const shouldClose = deltaY > 72;

    setIsDragging(false);
    setDragOffset(0);
    dragStartYRef.current = null;
    activePointerIdRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (shouldClose) {
      onClose();
    }
  };

  const handlePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
    setDragOffset(0);
    dragStartYRef.current = null;
    activePointerIdRef.current = null;
  };

  return (
    <>
      {/* 오버레이 배경 */}
      <S.Overlay isOpen={isOpen} $interactive={isOverlayInteractive} onClick={onClose} />

      {/* 바텀시트 컨테이너 */}
      <S.Container
        isOpen={isOpen}
        $isDragging={isDragging}
        onTransitionEnd={handleTransitionEnd}
        style={
          {
            "--link-color": theme.colors.info,
            "--drag-offset": `${dragOffset}px`,
          } as React.CSSProperties
        }
      >
        {/* 헤더 영역 */}
        <S.Header
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
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
