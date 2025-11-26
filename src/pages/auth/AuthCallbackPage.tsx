import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useKakaoLogin } from "shared/api/auth";
import { useUserStore } from "shared/state/userStore";
import { useAuthStore } from "shared/state/authStore";

// ============================================================
// 카카오 OAuth 콜백 페이지
// ============================================================

// 동일 인가 코드(code) 재사용으로 인한 중복 호출을 막기 위한 단일 인스턴스 메모리 캐시

type CallbackStatus = "loading" | "success" | "error";

export function AuthCallbackPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<CallbackStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handledCodeRef = useRef<string | null>(null); // code 중복 처리 여부 추적해 멱등 보장

  const kakaoLoginMutation = useKakaoLogin();
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);
  const setUserName = useUserStore((state) => state.setName);
  const isOnboarded = useUserStore((state) => state.isOnboarded);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // 토큰은 있지만 온보딩 플래그가 꺼져 있을 때 보정해 루프 차단
    if (isAuthenticated && !isOnboarded) {
      completeOnboarding();
      navigate("/", { replace: true });
      return;
    }

    if (isAuthenticated && isOnboarded) {
      navigate("/", { replace: true });
      return;
    }

    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (error) {
      setStatus("error");
      setErrorMessage(errorDescription || t("auth.errors.kakaoFailed"));
      return;
    }

    if (!code) {
      setStatus("error");
      setErrorMessage(t("auth.errors.noCode"));
      return;
    }

    // 동일 인가 코드(code)로 중복 호출을 차단해 서버에서 "code already used" 오류가 나지 않도록 해요
    if (handledCodeRef.current === code) {
      return;
    }

    handledCodeRef.current = code;

    kakaoLoginMutation.mutate(code, {
      onSuccess: (data) => {
        setStatus("success");
        completeOnboarding();
        if (data.nickname) {
          setUserName(data.nickname);
        }
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      },
      onError: (err) => {
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : t("auth.errors.loginFailed"));
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isAuthenticated, isOnboarded]);

  const handleRetry = () => {
    handledCodeRef.current = null;
    navigate("/onboarding", { replace: true });
  };

  return (
    <Page>
      <Content>
        {status === "loading" && <LoadingState />}
        {status === "success" && <SuccessState />}
        {status === "error" && <ErrorState message={errorMessage} onRetry={handleRetry} />}
      </Content>
    </Page>
  );
}

// ============================================================
// 상태 컴포넌트
// ============================================================

function LoadingState() {
  const { t } = useTranslation();
  return (
    <>
      <Spinner />
      <StatusText>{t("auth.callback.loading")}</StatusText>
    </>
  );
}

function SuccessState() {
  const { t } = useTranslation();
  return (
    <SuccessStack>
      <SuccessIcon>✓</SuccessIcon>
      <StatusText>{t("auth.callback.success")}</StatusText>
      <SubText>{t("auth.callback.redirecting")}</SubText>
    </SuccessStack>
  );
}

function ErrorState({ message, onRetry }: { message?: string; onRetry: () => void }) {
  const { t } = useTranslation();
  return (
    <ErrorStack>
      <StatusText>{t("auth.callback.error")}</StatusText>
      {message && <ErrorMessage>{message}</ErrorMessage>}
      <RetryButton onClick={onRetry}>{t("auth.callback.retry")}</RetryButton>
    </ErrorStack>
  );
}

// ============================================================
// 애니메이션
// ============================================================

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const scaleIn = keyframes`
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

// ============================================================
// 스타일
// ============================================================

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
`;

const Content = styled.div`
  padding: 1rem;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.spinnerTrack};
  border-top-color: ${({ theme }) => theme.colors.spinnerPrimary};
  border-radius: 50%;
  margin: 0 auto 1.25rem;
  animation: ${spin} 0.8s linear infinite;
`;

const StatusText = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const SubText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0.5rem 0 0;
`;

const SuccessIcon = styled.div`
  width: 56px;
  height: 56px;
  background: ${({ theme }) => theme.colors.success};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  animation: ${scaleIn} 0.3s ease-out;
`;

const ErrorStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`; // 에러 상태는 카드 없이 단순 스택으로 표시

// 재시도 버튼을 위험 색상으로 강조해 실패 상황을 명확히 전달
const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryContrast};
  background: ${({ theme }) => theme.colors.danger};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const SuccessStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0.25rem 0 0.75rem;
  line-height: 1.5;
  text-align: center;
`;
