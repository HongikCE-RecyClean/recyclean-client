import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "shared/layout/Header/Header";
import * as S from "./OnboardingPage.styles";

// 앱 소개와 시작하기 버튼을 제공하는 온보딩 페이지
export function OnboardingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const appName = t("app.name");
  const descriptionLines = useMemo(() => t("onboarding.description").split("\\n"), [t]);

  // 시작하기 버튼 클릭 시 대시보드로 이동
  const handleStart = () => {
    navigate("/", { replace: true });
  };

  return (
    <S.Page>
      <S.HeaderBar>
        <Header hideProfileButton />
      </S.HeaderBar>
      <S.Content>
        <S.TextGroup>
          <S.BrandName>{appName}</S.BrandName>
          <S.Tagline>{t("onboarding.tagline")}</S.Tagline>
          <S.Description>
            {descriptionLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < descriptionLines.length - 1 && <br />}
              </span>
            ))}
          </S.Description>
        </S.TextGroup>
        <S.Footer>
          <S.StartButton type="button" onClick={handleStart}>
            {t("onboarding.cta")}
          </S.StartButton>
          <S.ButtonHint>{t("onboarding.hint", { appName })}</S.ButtonHint>
        </S.Footer>
      </S.Content>
    </S.Page>
  );
}
