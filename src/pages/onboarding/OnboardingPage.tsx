import { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { keyframes, css, useTheme } from "@emotion/react";
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
// 타입 정의
// ============================================================
type ParticleType = "greenLeaf" | "autumnLeaf" | "snow" | "rain";

interface ParticleData {
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
// 파티클 컴포넌트
// ============================================================
function Particle({ particle, type }: { particle: ParticleData; type: ParticleType }) {
  const theme = useTheme();
  const d = particle.direction;
  const s = particle.swayAmount;
  const r = particle.rotation;

  // 타입별 애니메이션 (비는 직선, 나머지는 흔들림)
  const fallAnimation = useMemo(() => {
    if (type === "rain") {
      // 비: 빠르고 직선으로 떨어짐
      return keyframes`
        0% {
          top: -20px;
          opacity: 0.6;
        }
        100% {
          top: 100vh;
          opacity: 0.2;
        }
      `;
    }
    if (type === "snow") {
      // 눈: 천천히 좌우로 흔들리며 떨어짐
      return keyframes`
        0% {
          top: -20px;
          transform: translateX(0);
          opacity: 0.8;
        }
        25% {
          transform: translateX(${s * 0.3 * d}px);
        }
        50% {
          transform: translateX(${s * 0.5 * d * -1}px);
        }
        75% {
          transform: translateX(${s * 0.2 * d}px);
        }
        100% {
          top: 100vh;
          transform: translateX(${s * 0.4 * d * -1}px);
          opacity: 0.3;
        }
      `;
    }
    // 나뭇잎: 회전하며 흔들리며 떨어짐
    return keyframes`
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
    `;
  }, [type, r, s, d]);

  // 타입별 색상
  const color = useMemo(() => {
    switch (type) {
      case "greenLeaf":
        return theme.colors.primary;
      case "autumnLeaf":
        return ["#e67e22", "#d35400", "#c0392b", "#e74c3c"][particle.id % 4];
      case "snow":
        return "#c0c0c0"; // 옅은 회색
      case "rain":
        return "#60a5fa"; // 밝은 파랑
      default:
        return theme.colors.primary;
    }
  }, [type, theme, particle.id]);

  // 타입별 duration 조정
  const duration = useMemo(() => {
    if (type === "rain") return particle.duration * 0.3; // 비는 빠르게
    if (type === "snow") return particle.duration * 1.5; // 눈은 천천히
    return particle.duration;
  }, [type, particle.duration]);

  // 타입별 SVG 렌더링
  const renderShape = () => {
    if (type === "rain") {
      return (
        <line x1="16" y1="4" x2="16" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
      );
    }
    if (type === "snow") {
      return (
        <>
          <circle cx="16" cy="16" r="6" fill={color} />
          <circle cx="16" cy="16" r="3" fill={color} fillOpacity="0.5" />
        </>
      );
    }
    // 나뭇잎 (green, autumn)
    return (
      <>
        <path
          d="M16 2C16 2 8 8 8 18C8 24 11 28 16 30C21 28 24 24 24 18C24 8 16 2 16 2Z"
          fill={color}
        />
        <path
          d="M16 8V26M12 14Q14 16 16 18M20 12Q18 14 16 16"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.3"
          fill="none"
        />
      </>
    );
  };

  return (
    <S.ParticleSvg
      viewBox="0 0 32 32"
      css={css`
        position: absolute;
        left: ${particle.left}%;
        width: ${particle.size}px;
        height: ${particle.size}px;
        animation: ${fallAnimation} ${duration}s ${type === "rain" ? "linear" : "ease-in-out"}
          infinite;
        animation-delay: ${particle.delay}s;
        opacity: ${type === "rain" ? 0.4 : 0.5};
      `}
    >
      {renderShape()}
    </S.ParticleSvg>
  );
}

// ============================================================
// 온보딩 페이지
// ============================================================
export function OnboardingPage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isOnboarded } = useUserStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const appName = t("app.name");
  const descriptionLines = useMemo(() => t("onboarding.description").split("\\n"), [t]);

  // 파티클 타입 랜덤 선택 (마운트 시 1회)
  const particleType = useMemo<ParticleType>(() => {
    const types: ParticleType[] = ["greenLeaf", "autumnLeaf", "snow", "rain"];
    return types[Math.floor(Math.random() * types.length)];
  }, []);

  // 타입별 제목 색상
  const titleColor = useMemo(() => {
    switch (particleType) {
      case "greenLeaf":
        return theme.colors.primary;
      case "autumnLeaf":
        return "#d35400";
      case "snow":
        return "#888888"; // 옅은 회색
      case "rain":
        return "#60a5fa"; // 밝은 파랑
      default:
        return theme.colors.primary;
    }
  }, [particleType, theme]);

  // 파티클 데이터 생성
  const particles = useMemo<ParticleData[]>(() => {
    // 타입별 개수 설정
    const count = particleType === "rain" ? 20 : particleType === "snow" ? 30 : 12;

    return Array.from({ length: count }, (_, i) => {
      // 타입별 duration 설정
      const duration =
        particleType === "rain"
          ? 2 + Math.random() * 2
          : particleType === "snow"
            ? 12 + Math.random() * 10
            : 10 + Math.random() * 8;

      // 타입별 크기 설정
      const size =
        particleType === "rain"
          ? 12 + Math.random() * 8
          : particleType === "snow"
            ? 10 + Math.random() * 10
            : 20 + Math.random() * 16;

      return {
        id: i,
        left: 5 + Math.random() * 90,
        delay: -Math.random() * duration,
        duration,
        size,
        rotation: Math.random() * 360,
        swayAmount: particleType === "rain" ? 5 : 40 + Math.random() * 60,
        direction: (Math.random() > 0.5 ? 1 : -1) as 1 | -1,
      };
    });
  }, [particleType]);

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

  // 로그인과 온보딩이 모두 완료된 경우에만 대시보드로 이동해 루프를 방지
  if (isAuthenticated && isOnboarded) {
    return <Navigate to="/" replace />;
  }

  const isKakaoConfigured = isKakaoAuthConfigured();

  return (
    <S.Page>
      {/* 떨어지는 파티클 배경 */}
      <S.LeavesContainer>
        {particles.map((particle) => (
          <Particle key={particle.id} particle={particle} type={particleType} />
        ))}
      </S.LeavesContainer>

      <S.HeaderBar>
        <Header hideProfileButton />
      </S.HeaderBar>

      <S.Content>
        <S.TextGroup>
          <S.BrandName style={{ color: titleColor }}>{appName}</S.BrandName>
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
