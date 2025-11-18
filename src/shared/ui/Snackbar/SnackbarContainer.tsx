import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { useNotificationStore } from "../../state/notificationStore";
import { useBottomSheetStore, selectIsAnySheetOpen } from "../../state/bottomSheetStore";
import { Snackbar } from "./Snackbar";

// 스낵바 컨테이너 스타일
const Container = styled.div<{ $isSheetOpen: boolean }>(({ theme, $isSheetOpen }) => ({
  position: "fixed",
  bottom: $isSheetOpen ? "auto" : `calc(${theme.spacing(16)} + env(safe-area-inset-bottom))`,
  top: $isSheetOpen ? `calc(${theme.spacing(6)} + env(safe-area-inset-top))` : "auto",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1200,
  display: "flex",
  flexDirection: $isSheetOpen ? "column" : "column-reverse",
  alignItems: "center",
  pointerEvents: "none",

  // 자식 요소는 클릭 가능
  "& > *": {
    pointerEvents: "auto",
  },
}));

// 스낵바 전역 렌더링 컴포넌트
export function SnackbarContainer() {
  const { snackbars, closeSnackbar } = useNotificationStore();
  const isSheetOpen = useBottomSheetStore(selectIsAnySheetOpen);

  if (snackbars.length === 0) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <Container $isSheetOpen={isSheetOpen}>
      {snackbars.map((snackbar) => (
        <Snackbar key={snackbar.id} {...snackbar} onClose={() => closeSnackbar(snackbar.id)} />
      ))}
    </Container>,
    document.body,
  );
}
