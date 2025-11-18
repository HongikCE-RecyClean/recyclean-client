import styled from "@emotion/styled";
import { useNotificationStore } from "../../state/notificationStore";
import { Snackbar } from "./Snackbar";

// 스낵바 컨테이너 스타일
const Container = styled.div(({ theme }) => ({
  position: "fixed",
  bottom: `calc(${theme.spacing(16)} + env(safe-area-inset-bottom))`, // BottomNav 위
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 9999,
  display: "flex",
  flexDirection: "column-reverse", // 최신 스낵바가 위로
  alignItems: "center",
  pointerEvents: "none", // 배경 클릭 방지

  // 자식 요소는 클릭 가능
  "& > *": {
    pointerEvents: "auto",
  },
}));

// 스낵바 전역 렌더링 컴포넌트
export function SnackbarContainer() {
  const { snackbars, closeSnackbar } = useNotificationStore();

  if (snackbars.length === 0) {
    return null;
  }

  return (
    <Container>
      {snackbars.map((snackbar) => (
        <Snackbar key={snackbar.id} {...snackbar} onClose={() => closeSnackbar(snackbar.id)} />
      ))}
    </Container>
  );
}
