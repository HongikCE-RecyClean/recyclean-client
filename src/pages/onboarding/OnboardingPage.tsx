import { useNavigate } from "react-router-dom";
import { Header } from "shared/layout/Header/Header";
import * as S from "./OnboardingPage.styles";

// 앱 소개와 시작하기 버튼을 제공하는 온보딩 페이지
export function OnboardingPage() {
  const navigate = useNavigate();

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
          <S.BrandName>RecyClean</S.BrandName>
          <S.Tagline>재활용이 쉬워지는 순간</S.Tagline>
          <S.Description>
            일상의 작은 환경 실천을 기록하고,
            <br />
            주변 수거함을 쉽게 찾아보세요.
          </S.Description>
        </S.TextGroup>
        <S.Footer>
          <S.StartButton type="button" onClick={handleStart}>
            시작하기
          </S.StartButton>
          <S.ButtonHint>지금 바로 RecyClean과 함께 환경 실천을 시작해요.</S.ButtonHint>
        </S.Footer>
      </S.Content>
    </S.Page>
  );
}
