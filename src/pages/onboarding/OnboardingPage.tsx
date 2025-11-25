import { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "shared/layout/Header/Header";
import { useUserStore } from "shared/state/userStore";
import { useAuthStore } from "shared/state/authStore";
import { getKakaoLoginUrl } from "shared/api/auth";
import {
  getKakaoClientId,
  getKakaoRedirectUri,
  isKakaoAuthConfigured,
} from "shared/api/authConfig";
import * as S from "./OnboardingPage.styles";

// 앱 소개와 카카오 로그인 버튼을 노출하는 온보딩 페이지
export function OnboardingPage() {
  const { t } = useTranslation();
  const { isOnboarded } = useUserStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const appName = t("app.name");
  const descriptionLines = useMemo(() => t("onboarding.description").split("\\n"), [t]);

  // 카카오 로그인 버튼 클릭 시 카카오 인증 페이지로 리다이렉트
  const handleKakaoLogin = () => {
    const clientId = getKakaoClientId();
    const redirectUri = getKakaoRedirectUri();

    if (!clientId) {
      console.error("카카오 클라이언트 ID가 설정되지 않았어요.");
      return;
    }

    const kakaoLoginUrl = getKakaoLoginUrl(redirectUri, clientId);
    window.location.href = kakaoLoginUrl;
  };

  // 이미 인증된 사용자 또는 온보딩 완료 시 대시보드로 리다이렉트
  if (isAuthenticated || isOnboarded) {
    return <Navigate to="/" replace />;
  }

  const isKakaoConfigured = isKakaoAuthConfigured();

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
        {/* 카카오 로그인 버튼 영역 */}
        <S.Footer>
          <S.KakaoLoginButton
            type="button"
            onClick={handleKakaoLogin}
            disabled={!isKakaoConfigured}
          >
            <S.KakaoIcon />
            {t("onboarding.kakaoLogin")}
          </S.KakaoLoginButton>
          {!isKakaoConfigured && <S.ButtonHint>{t("onboarding.kakaoNotConfigured")}</S.ButtonHint>}
          <S.ButtonHint>{t("onboarding.hint", { appName })}</S.ButtonHint>
        </S.Footer>
      </S.Content>
    </S.Page>
  );
}
