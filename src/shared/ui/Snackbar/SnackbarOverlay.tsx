import styled from "@emotion/styled";
import { selectIsAnySheetOpen, useBottomSheetStore } from "../../state/bottomSheetStore";
import { Snackbar } from "./Snackbar";
import type { SnackbarProps } from "./Snackbar";
import { SNACKBAR_MAX_WIDTH } from "./Snackbar.styles";

const OverlayPositioner = styled.div<{ $isSheetOpen: boolean }>(({ theme, $isSheetOpen }) => ({
  position: "fixed",
  left: 0,
  right: 0,
  zIndex: 1300,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  pointerEvents: "none",
  padding: `0 ${theme.spacing(4)}`, // 좌우 16px 여백 유지
  flexDirection: $isSheetOpen ? "column" : "column-reverse",
  width: "100%",
  bottom: $isSheetOpen ? "auto" : `calc(${theme.spacing(16)} + env(safe-area-inset-bottom))`,
  top: $isSheetOpen ? `calc(${theme.spacing(6)} + env(safe-area-inset-top))` : "auto",

  "& > *": {
    pointerEvents: "auto",
    width: "100%",
    maxWidth: `${SNACKBAR_MAX_WIDTH}px`,
  },
}));

export function SnackbarOverlay(props: SnackbarProps) {
  const isSheetOpen = useBottomSheetStore(selectIsAnySheetOpen);
  return (
    <OverlayPositioner $isSheetOpen={isSheetOpen}>
      <Snackbar {...props} />
    </OverlayPositioner>
  );
}
