import { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import { Header } from "shared/layout/Header/Header";
import { useAuthStore } from "shared/state/authStore";
import { useUserStore } from "shared/state/userStore";
import kakaoIconAsset from "../../assets/kakaoIcon.svg";
import * as S from "./LoginPage.styles";

type LocationState = {
  from?: Location;
};

// 로고 아래 로그인 버튼 하나만 두는 초간단 페이지
export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { beginAuth, completeAuth, isLoading } = useAuthStore();
  const { setName } = useUserStore();
  const timerRef = useRef<number | null>(null);

  const redirectAfterLogin = useCallback(() => {
    const redirectPath = (location.state as LocationState | undefined)?.from?.pathname ?? "/";
    navigate(redirectPath, { replace: true });
  }, [location.state, navigate]);

  const handleLogin = useCallback(() => {
    beginAuth("kakao");
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      const profile = {
        id: crypto.randomUUID?.() ?? `${Date.now()}`,
        nickname: "카카오 사용자",
        email: "kakao-user@kakao.com",
        avatarUrl: undefined,
        method: "kakao" as const,
      };
      completeAuth(profile);
      setName(profile.nickname);
      redirectAfterLogin();
    }, 500);
  }, [beginAuth, completeAuth, redirectAfterLogin, setName]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <S.Page>
      <S.HeaderBar>
        <Header />
      </S.HeaderBar>
      <S.Content>
        <S.Hero>
          <S.Logo>RECYCLEAN</S.Logo>
          <S.Title>도시 순환 생활을 위한 Recyclean</S.Title>
          <S.Subtitle>재활용 데이터와 지도를 한곳에서 확인해요.</S.Subtitle>
        </S.Hero>
        <S.Footer>
          <S.KakaoButton type="button" onClick={handleLogin} disabled={isLoading}>
            <S.KakaoIcon src={kakaoIconAsset} alt="카카오(Kakao) 아이콘" />
            {isLoading ? "연결 중" : "카카오 로그인"}
          </S.KakaoButton>
          <S.ButtonHint>
            가입 시 서비스 약관 및 개인정보처리방침에 동의한 것으로 간주합니다.
          </S.ButtonHint>
        </S.Footer>
      </S.Content>
    </S.Page>
  );
}
