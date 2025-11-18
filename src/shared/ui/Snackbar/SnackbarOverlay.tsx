import styled from "@emotion/styled";
import { selectIsAnySheetOpen, useBottomSheetStore } from "../../state/bottomSheetStore";
import { Snackbar } from "./Snackbar";
import type { SnackbarProps } from "./Snackbar";

const OverlayPositioner = styled.div<{ $isSheetOpen: boolean }>(({ theme, $isSheetOpen }) => ({
  position: "fixed",
  bottom: $isSheetOpen ? "auto" : `calc(${theme.spacing(16)} + env(safe-area-inset-bottom))`,
  top: $isSheetOpen ? `calc(${theme.spacing(6)} + env(safe-area-inset-top))` : "auto",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1300,
  display: "flex",
  flexDirection: $isSheetOpen ? "column" : "column-reverse",
  alignItems: "center",
  pointerEvents: "none",
  width: "100%",
  maxWidth: "500px",

  "& > *": {
    pointerEvents: "auto",
    width: "100%",
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
