import { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { keyframes, css } from "@emotion/react";
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

// ============================================================
// 나뭇잎 데이터 타입
// ============================================================
interface LeafData {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  swayAmount: number;
  direction: 1 | -1;
}

// ============================================================
// 나뭇잎 컴포넌트
// ============================================================
function Leaf({ leaf }: { leaf: LeafData }) {
  const d = leaf.direction;
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
    <S.LeafSvg
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
    </S.LeafSvg>
  );
}

// ============================================================
// 온보딩 페이지
// ============================================================
export function OnboardingPage() {
  const { t } = useTranslation();
  const { isOnboarded } = useUserStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const appName = t("app.name");
  const descriptionLines = useMemo(() => t("onboarding.description").split("\\n"), [t]);

  // 나뭇잎 데이터 생성
  const leaves = useMemo<LeafData[]>(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const duration = 10 + Math.random() * 8;
      return {
        id: i,
        left: 5 + Math.random() * 90,
        delay: -Math.random() * duration,
        duration,
        size: 20 + Math.random() * 16,
        rotation: Math.random() * 360,
        swayAmount: 40 + Math.random() * 60,
        direction: (Math.random() > 0.5 ? 1 : -1) as 1 | -1,
      };
    });
  }, []);

  // 카카오 로그인 버튼 클릭 핸들러
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

  // 이미 인증 또는 온보딩 완료 시 대시보드로 이동
  if (isAuthenticated || isOnboarded) {
    return <Navigate to="/" replace />;
  }

  const isKakaoConfigured = isKakaoAuthConfigured();

  return (
    <S.Page>
      {/* 떨어지는 나뭇잎 배경 */}
      <S.LeavesContainer>
        {leaves.map((leaf) => (
          <Leaf key={leaf.id} leaf={leaf} />
        ))}
      </S.LeavesContainer>

      <S.HeaderBar>
        <Header hideProfileButton />
      </S.HeaderBar>

      <S.Content>
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
