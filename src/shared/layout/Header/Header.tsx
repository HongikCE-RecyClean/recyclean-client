import { User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button/Button";
import recycleanLogo from "../../../assets/recycleanLogo.svg";
import * as S from "./Header.styles";

// 헤더에서 프로필 버튼 노출 여부를 제어
interface HeaderProps {
  hideProfileButton?: boolean;
}

export function Header({ hideProfileButton = false }: HeaderProps) {
  const { t } = useTranslation();
  const appName = t("app.name");
  const profileLabel = t("header.profileButton");

  // 전역 헤더 UI 렌더링
  return (
    <S.HeaderBar>
      <S.HeaderInner>
        <S.Brand>
          <S.BrandLogo src={recycleanLogo} alt={t("header.logoAlt", { appName })} />
          <S.BrandTitle>{appName}</S.BrandTitle>
        </S.Brand>
        {!hideProfileButton && (
          // 로그인 외 페이지에서만 프로필 버튼 노출
          <Button variant="ghost" size="icon" aria-label={profileLabel}>
            <User size={20} />
          </Button>
        )}
      </S.HeaderInner>
    </S.HeaderBar>
  );
}
