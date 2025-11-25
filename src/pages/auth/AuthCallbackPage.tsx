import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useKakaoLogin } from "shared/api/auth";
import { useUserStore } from "shared/state/userStore";
import { useAuthStore } from "shared/state/authStore";
import * as S from "./LoginPage.styles";

// ============================================================
// 카카오 OAuth 콜백 페이지
// - 카카오 인증 후 리다이렉트되는 페이지
// - URL에서 인가코드(code)를 추출하여 백엔드 로그인 API 호출
// ============================================================

type CallbackStatus = "loading" | "success" | "error";

export function AuthCallbackPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<CallbackStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const kakaoLoginMutation = useKakaoLogin();
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);
  const setUserName = useUserStore((state) => state.setName);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // 이미 인증된 경우 대시보드로 이동
    if (isAuthenticated) {
      navigate("/", { replace: true });
      return;
    }

    // URL에서 인가코드 추출
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    // 카카오 에러 응답 처리
    if (error) {
      setStatus("error");
      setErrorMessage(errorDescription || t("auth.errors.kakaoFailed"));
      return;
    }

    // 인가코드 없음
    if (!code) {
      setStatus("error");
      setErrorMessage(t("auth.errors.noCode"));
      return;
    }

    // 백엔드 로그인 API 호출
    kakaoLoginMutation.mutate(code, {
      onSuccess: (data) => {
        setStatus("success");
        // 온보딩 완료 처리 및 사용자 이름 설정
        completeOnboarding();
        if (data.nickname) {
          setUserName(data.nickname);
        }
        // 대시보드로 이동
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      },
      onError: (err) => {
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : t("auth.errors.loginFailed"));
      },
    });
  }, [
    searchParams,
    kakaoLoginMutation,
    completeOnboarding,
    setUserName,
    navigate,
    isAuthenticated,
    t,
  ]);

  // 로그인 페이지로 돌아가기
  const handleRetry = () => {
    navigate("/onboarding", { replace: true });
  };

  return (
    <S.Page>
      <S.Content>
        {status === "loading" && (
          <S.StatusContainer>
            <S.Spinner />
            <S.StatusText>{t("auth.callback.loading")}</S.StatusText>
          </S.StatusContainer>
        )}

        {status === "success" && (
          <S.StatusContainer>
            <S.SuccessIcon>✓</S.SuccessIcon>
            <S.StatusText>{t("auth.callback.success")}</S.StatusText>
            <S.SubText>{t("auth.callback.redirecting")}</S.SubText>
          </S.StatusContainer>
        )}

        {status === "error" && (
          <S.StatusContainer>
            <S.ErrorIcon>✕</S.ErrorIcon>
            <S.StatusText>{t("auth.callback.error")}</S.StatusText>
            <S.ErrorMessage>{errorMessage}</S.ErrorMessage>
            <S.RetryButton onClick={handleRetry}>{t("auth.callback.retry")}</S.RetryButton>
          </S.StatusContainer>
        )}
      </S.Content>
    </S.Page>
  );
}
