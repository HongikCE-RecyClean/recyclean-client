import { User } from "lucide-react";
import { Button } from "../../ui/Button/Button";
import recycleanLogo from "../../../assets/recycleanLogo.svg";
import * as S from "./Header.styles";

export function Header() {
  // 전역 헤더 UI 렌더링
  return (
    <S.HeaderBar>
      <S.HeaderInner>
        <S.Brand>
          <S.BrandLogo src={recycleanLogo} alt="RecyClean 로고(logo)" />
          <S.BrandTitle>RecyClean</S.BrandTitle>
        </S.Brand>
        <Button variant="ghost" size="icon" aria-label="사용자 메뉴 열기">
          <User size={20} />
        </Button>
      </S.HeaderInner>
    </S.HeaderBar>
  );
}
