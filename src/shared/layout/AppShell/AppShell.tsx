import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { BottomNav } from "../../navigation/BottomNav/BottomNav";
import * as S from "./AppShell.styles";

export function AppShell() {
  // 앱 전역 레이아웃 구성
  return (
    <S.Shell>
      <Header />
      <S.Main>
        <S.Content>
          <Outlet />
        </S.Content>
      </S.Main>
      <BottomNav />
    </S.Shell>
  );
}
