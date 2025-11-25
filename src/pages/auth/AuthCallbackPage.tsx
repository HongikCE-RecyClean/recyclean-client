import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";
import { useKakaoLogin } from "shared/api/auth";
import { useUserStore } from "shared/state/userStore";
import { useAuthStore } from "shared/state/authStore";

// ============================================================
// 카카오 OAuth 콜백 페이지
// ============================================================

type CallbackStatus = "loading" | "success" | "error";

interface LeafData {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  swayAmount: number;
  direction: 1 | -1; // 좌우 방향 (1: 오른쪽 먼저, -1: 왼쪽 먼저)
}

export function AuthCallbackPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<CallbackStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const isProcessingRef = useRef(false);

  // 나뭇잎 데이터 (컴포넌트 마운트 시 1회 생성)
  const leaves = useMemo<LeafData[]>(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const duration = 10 + Math.random() * 8;
      return {
        id: i,
        left: 5 + Math.random() * 90,
        // 음수 딜레이: 애니메이션이 이미 진행 중인 것처럼 시작
        delay: -Math.random() * duration,
        duration,
        size: 20 + Math.random() * 16,
        rotation: Math.random() * 360,
        swayAmount: 40 + Math.random() * 60,
        direction: (Math.random() > 0.5 ? 1 : -1) as 1 | -1,
      };
    });
  }, []);

  const kakaoLoginMutation = useKakaoLogin();
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);
  const setUserName = useUserStore((state) => state.setName);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
      return;
    }

    if (isProcessingRef.current) return;

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

    isProcessingRef.current = true;

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
        // 에러 시에도 플래그 유지 (재시도 버튼으로만 초기화)
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleRetry = () => {
    isProcessingRef.current = false;
    navigate("/onboarding", { replace: true });
  };

  return (
    <Page>
      <LeavesContainer>
        {leaves.map((leaf) => (
          <Leaf key={leaf.id} leaf={leaf} />
        ))}
      </LeavesContainer>

      <Content>
        {status === "loading" && <LoadingState />}
        {status === "success" && <SuccessState />}
        {status === "error" && <ErrorState message={errorMessage} onRetry={handleRetry} />}
      </Content>
    </Page>
  );
}

// ============================================================
// 나뭇잎 컴포넌트
// ============================================================

function Leaf({ leaf }: { leaf: LeafData }) {
  const d = leaf.direction; // 방향 (-1 또는 1)
  const s = leaf.swayAmount;
  const r = leaf.rotation;

  const fallAnimation = useMemo(
    () => keyframes`
      0% {
        top: -60px;
        transform: translateX(0) rotate(${r}deg);
        opacity: 0.7;
      }
      20% {
        transform: translateX(${s * 0.6 * d}px) rotate(${r + 40 * d}deg);
      }
      40% {
        transform: translateX(${s * 0.2 * d * -1}px) rotate(${r + 80 * d}deg);
      }
      60% {
        transform: translateX(${s * 0.8 * d}px) rotate(${r + 120 * d}deg);
      }
      80% {
        transform: translateX(${s * 0.3 * d * -1}px) rotate(${r + 160 * d}deg);
      }
      100% {
        top: 100vh;
        transform: translateX(${s * 0.5 * d}px) rotate(${r + 200 * d}deg);
        opacity: 0.3;
      }
    `,
    [r, s, d],
  );

  return (
    <LeafSvg
      viewBox="0 0 32 32"
      css={css`
        position: absolute;
        left: ${leaf.left}%;
        width: ${leaf.size}px;
        height: ${leaf.size}px;
        animation: ${fallAnimation} ${leaf.duration}s ease-in-out infinite;
        animation-delay: ${leaf.delay}s;
      `}
    >
      <path
        d="M16 2C16 2 8 8 8 18C8 24 11 28 16 30C21 28 24 24 24 18C24 8 16 2 16 2Z"
        fill="currentColor"
      />
      <path
        d="M16 8V26M12 14Q14 16 16 18M20 12Q18 14 16 16"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.3"
        fill="none"
      />
    </LeafSvg>
  );
}

// ============================================================
// 상태 컴포넌트
// ============================================================

function LoadingState() {
  const { t } = useTranslation();
  return (
    <StatusCard>
      <Spinner />
      <StatusText>{t("auth.callback.loading")}</StatusText>
    </StatusCard>
  );
}

function SuccessState() {
  const { t } = useTranslation();
  return (
    <StatusCard>
      <SuccessIcon>✓</SuccessIcon>
      <StatusText>{t("auth.callback.success")}</StatusText>
      <SubText>{t("auth.callback.redirecting")}</SubText>
    </StatusCard>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  const { t } = useTranslation();
  return (
    <StatusCard>
      <ErrorIcon>✕</ErrorIcon>
      <StatusText>{t("auth.callback.error")}</StatusText>
      <ErrorMessage>{message}</ErrorMessage>
      <RetryButton onClick={onRetry}>{t("auth.callback.retry")}</RetryButton>
    </StatusCard>
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
  position: relative;
  overflow: hidden;
`;

const LeavesContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
`;

const LeafSvg = styled.svg`
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.5;
`;

const Content = styled.div`
  z-index: 10;
  padding: 1rem;
`;

const StatusCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 2.5rem 2rem;
  min-width: 280px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
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

const ErrorIcon = styled.div`
  width: 56px;
  height: 56px;
  background: ${({ theme }) => theme.colors.danger};
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

const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0.75rem 0 1.25rem;
  line-height: 1.5;
`;

const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryContrast};
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;
