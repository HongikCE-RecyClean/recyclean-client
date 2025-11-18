import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams, type Location } from "react-router-dom";
import { Header } from "shared/layout/Header/Header";
import { useKakaoLoginMutation } from "shared/api/auth";
import { buildKakaoAuthorizeUrl, isKakaoConfigReady } from "shared/config/kakao";
import { useAuthStore } from "shared/state/authStore";
import { useUserStore } from "shared/state/userStore";
import kakaoIconAsset from "../../assets/kakaoIcon.svg";
import recycleanLogoAsset from "../../assets/recycleanLogo.svg";
import * as S from "./LoginPage.styles";

type LocationState = {
  from?: Location;
};

// 로고 아래 로그인 버튼 하나만 두는 초간단 페이지
export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { beginAuth, completeAuth, failAuth, isLoading } = useAuthStore();
  const { setName } = useUserStore();
  const [message, setMessage] = useState<string | null>(null);
  const redirectTargetRef = useRef<string>("/");

  const kakaoCode = searchParams.get("code");
  const kakaoState = searchParams.get("state");
  const kakaoError = searchParams.get("error");
  const kakaoErrorDescription = searchParams.get("error_description");

  const defaultRedirectTarget = useMemo(() => {
    const state = location.state as LocationState | undefined;
    const from = state?.from;
    if (!from) {
      return "/";
    }
    const search = from.search ?? "";
    const hash = from.hash ?? "";
    return `${from.pathname}${search}${hash}`;
  }, [location.state]);

  useEffect(() => {
    if (kakaoState) {
      try {
        redirectTargetRef.current = decodeURIComponent(kakaoState);
      } catch {
        redirectTargetRef.current = kakaoState;
      }
    } else {
      redirectTargetRef.current = defaultRedirectTarget;
    }
  }, [kakaoState, defaultRedirectTarget]);

  const kakaoLoginMutation = useKakaoLoginMutation({
    onSuccess: (data) => {
      completeAuth({
        memberId: data.memberId,
        socialType: data.socialType,
        socialId: data.socialId,
        nickname: data.nickname,
        profileImageUrl: data.profileImageUrl,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        method: "kakao",
      });
      setName(data.nickname);
      const target = redirectTargetRef.current || "/";
      navigate(target, { replace: true });
    },
    onError: (error) => {
      console.error("카카오 로그인 실패", error);
      failAuth();
      setMessage("카카오 로그인에 실패했어요. 다시 시도해 주세요.");
      navigate("/login", { replace: true });
    },
  });

  useEffect(() => {
    if (!kakaoCode) {
      return;
    }
    if (kakaoLoginMutation.isPending) {
      return;
    }
    setMessage("카카오 인증 정보를 확인 중이에요...");
    beginAuth("kakao");
    kakaoLoginMutation.mutate(kakaoCode);
  }, [beginAuth, kakaoCode, kakaoLoginMutation]);

  useEffect(() => {
    if (!kakaoError) {
      return;
    }
    failAuth();
    const hint = kakaoErrorDescription ?? "카카오 로그인 요청이 취소됐어요.";
    setMessage(hint);
    navigate("/login", { replace: true });
  }, [failAuth, kakaoError, kakaoErrorDescription, navigate]);

  const handleLogin = useCallback(() => {
    const target = defaultRedirectTarget;
    const encodedState = encodeURIComponent(target);
    const authorizeUrl = buildKakaoAuthorizeUrl(encodedState);
    window.location.assign(authorizeUrl);
  }, [defaultRedirectTarget]);

  const kakaoConfigReady = isKakaoConfigReady();
  const disableButton = isLoading || kakaoLoginMutation.isPending || !kakaoConfigReady;
  const buttonLabel = !kakaoConfigReady
    ? "카카오 로그인 준비 중"
    : kakaoLoginMutation.isPending
      ? "카카오 인증 처리 중"
      : isLoading
        ? "연결 중"
        : "카카오 로그인";
  const helperText = !kakaoConfigReady
    ? "카카오 로그인을 준비 중이에요. 잠시 후 다시 시도해 주세요."
    : (message ?? "가입 시 서비스 약관 및 개인정보처리방침에 동의한 것으로 간주합니다.");

  return (
    <S.Page>
      <S.HeaderBar>
        <Header />
      </S.HeaderBar>
      <S.Content>
        <S.Hero>
          <S.BrandMark>
            <S.BrandSymbol src={recycleanLogoAsset} alt="RecyClean 로고(logo)" />
            <S.BrandTitle>RECYCLEAN</S.BrandTitle>
          </S.BrandMark>
          <S.Tagline>재활용 데이터와 지도를 한곳에서 확인해요.</S.Tagline>
          <S.Description>
            수거함 상태, 도시별 순환 계획, 커뮤니티 챌린지를 하나의 대시보드에서 추적해요.
          </S.Description>
        </S.Hero>
        <S.Footer>
          <S.KakaoButton type="button" onClick={handleLogin} disabled={disableButton}>
            <S.KakaoIcon src={kakaoIconAsset} alt="카카오(Kakao) 아이콘" />
            {buttonLabel}
          </S.KakaoButton>
          <S.ButtonHint>{helperText}</S.ButtonHint>
        </S.Footer>
      </S.Content>
    </S.Page>
  );
}
