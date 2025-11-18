import { useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "shared/layout/Header/Header";
import { useUserStore } from "shared/state/userStore";
import * as S from "./OnboardingPage.styles";

// 앱 소개와 시작 버튼만 노출하는 온보딩 페이지
export function OnboardingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { completeOnboarding, isOnboarded } = useUserStore();
  const appName = t("app.name");
  const descriptionLines = useMemo(() => t("onboarding.description").split("\\n"), [t]); // 설명 줄 분리

  // 시작 버튼을 눌렀을 때 온보딩 완료 상태 저장
  const handleStart = () => {
    completeOnboarding();
    navigate("/", { replace: true });
  };

  // 온보딩 완료 상태는 즉시 대시보드로 리다이렉트
  if (isOnboarded) {
    return <Navigate to="/" replace />;
  }

  // 온보딩 화면 UI 구성 반환
  return (
    <S.Page>
      <S.HeaderBar>
        <Header hideProfileButton />
      </S.HeaderBar>
      <S.Content>
        {/* 브랜드 소개 텍스트 그룹 */}
        <S.TextGroup>
          <S.BrandName>{appName}</S.BrandName>
          <S.Tagline>{t("onboarding.tagline")}</S.Tagline>
          <S.Description>
            {descriptionLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < descriptionLines.length - 1 && <br />}
              </span>
            ))}
          </S.Description>
        </S.TextGroup>
        {/* 시작 버튼 영역 */}
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
