import { useTranslation } from "react-i18next";
import * as S from "../../../shared/ui/BottomSheet/BottomSheet.styles";
import { APP_INFO_COPY } from "../content";
import { normalizeLanguage } from "shared/i18n/supportedLanguages";

// 앱 정보 바텀시트 내용
export function AppInfoContent() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const copy = APP_INFO_COPY[language];
  const appName = t("app.name");

  return (
    <>
      <S.Section>
        <S.SectionTitle>{appName}</S.SectionTitle>
        <S.SectionText>{copy.description}</S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.versionTitle}</S.SectionTitle>
        <S.SectionText>
          <S.HighlightText>{copy.currentVersionLabel}</S.HighlightText> {copy.currentVersionValue}
        </S.SectionText>
        <S.SectionText>
          <S.HighlightText>{copy.latestUpdateLabel}</S.HighlightText> {copy.latestUpdateValue}
        </S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.featuresTitle}</S.SectionTitle>
        <S.List>
          {copy.features.map((feature) => (
            <S.ListItem key={feature}>{feature}</S.ListItem>
          ))}
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.teamTitle}</S.SectionTitle>
        <S.SectionText>
          <S.HighlightText>{copy.companyLabel}</S.HighlightText> RecyClean Team
        </S.SectionText>
        <S.SectionText>
          <S.HighlightText>{copy.emailLabel}</S.HighlightText>{" "}
          <a href="mailto:contact@recyclean.com" css={S.linkStyle}>
            contact@recyclean.com
          </a>
        </S.SectionText>
        <S.SectionText>
          <S.HighlightText>{copy.websiteLabel}</S.HighlightText>{" "}
          <a
            href="https://recyclean.com"
            css={S.linkStyle}
            target="_blank"
            rel="noopener noreferrer"
          >
            recyclean.com
          </a>
        </S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.ossTitle}</S.SectionTitle>
        <S.SectionText>{copy.ossDescription}</S.SectionText>
        <S.List>
          <S.ListItem>React 19 · Vite 7 · TypeScript 5</S.ListItem>
          <S.ListItem>React Router 7 · Zustand 5 · TanStack Query 5</S.ListItem>
          <S.ListItem>Emotion · i18next · date-fns · Lucide</S.ListItem>
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.termsTitle}</S.SectionTitle>
        <S.SectionText>
          {copy.termsDescription}{" "}
          <a
            href="https://recyclean.com/terms"
            css={S.linkStyle}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.termsLinkText}
          </a>
          {copy.termsSuffix}
        </S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.copyrightTitle}</S.SectionTitle>
        <S.SectionText>{copy.copyrightNotice}</S.SectionText>
        <S.SectionText>{copy.copyrightWarning}</S.SectionText>
      </S.Section>
    </>
  );
}
