import { useEffect, type ReactNode } from "react";
import { useTheme } from "@emotion/react";
import * as S from "./BottomSheet.styles";

export interface BottomSheetProps {
  // 바텀시트 열림/닫힘 상태
  isOpen: boolean;
  // 바텀시트 닫기 핸들러
  onClose: () => void;
  // 바텀시트 제목
  title: string;
  // 바텀시트 내용
  children: ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  const theme = useTheme();
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
      <S.Overlay isOpen={isOpen} onClick={onClose} />

      {/* 바텀시트 컨테이너 */}
      <S.Container
        isOpen={isOpen}
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
