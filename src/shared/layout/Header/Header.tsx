import { User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button/Button";
import recycleanLogo from "../../../assets/recycleanLogo.svg";
import * as S from "./Header.styles";

// 헤더에서 프로필 버튼 노출 여부를 제어
interface HeaderProps {
  hideProfileButton?: boolean;
}

export function Header({ hideProfileButton = false }: HeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
          // 프로필 버튼 클릭 시 프로필 페이지로 이동
          <Button
            variant="ghost"
            size="icon"
            aria-label={profileLabel}
            onClick={() => navigate("/profile")}
          >
            <User size={20} />
          </Button>
        )}
      </S.HeaderInner>
    </S.HeaderBar>
  );
}
