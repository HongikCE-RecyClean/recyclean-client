import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "shared/layout/Header/Header";
import { useUserStore } from "shared/state/userStore";
import { openAlertDialog } from "shared/ui/AlertDialog";
import * as S from "./OnboardingPage.styles";

// 앱 소개와 닉네임 입력을 제공하는 온보딩 페이지
export function OnboardingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setName } = useUserStore();
  const [nickname, setNickname] = useState("");
  const appName = t("app.name");
  const descriptionLines = useMemo(() => t("onboarding.description").split("\\n"), [t]);

  // 시작하기 버튼 클릭 시 닉네임 저장 후 대시보드로 이동
  const handleStart = () => {
    const trimmedName = nickname.trim();
    if (!trimmedName) {
      openAlertDialog({
        title: t("onboarding.nameRequired"),
        confirmLabel: t("common.confirm"),
        tone: "warning",
      });
      return;
    }

    // userStore에 닉네임 저장
    setName(trimmedName);
    navigate("/", { replace: true });
  };

  // Enter 키로도 제출 가능
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleStart();
    }
  };

  return (
    <S.Page>
      <S.HeaderBar>
        <Header hideProfileButton />
      </S.HeaderBar>
      <S.Content>
        <S.TextGroup>
          <S.BrandName>{appName}</S.BrandName>
          <S.Tagline>{t("onboarding.tagline")}</S.Tagline>
          <S.Description>
            {descriptionLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < descriptionLines.length - 1 && <br />}
              </span>
            ))}
          </S.Description>
        </S.TextGroup>
        <S.Footer>
          <S.NameInput
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t("onboarding.namePlaceholder")}
            maxLength={20}
            autoFocus
          />
          <S.StartButton type="button" onClick={handleStart} disabled={!nickname.trim()}>
            {t("onboarding.cta")}
          </S.StartButton>
          <S.ButtonHint>{t("onboarding.hint", { appName })}</S.ButtonHint>
        </S.Footer>
      </S.Content>
    </S.Page>
  );
}
