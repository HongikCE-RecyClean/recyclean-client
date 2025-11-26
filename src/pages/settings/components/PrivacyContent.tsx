import { useTranslation } from "react-i18next";
import * as S from "../../../shared/ui/BottomSheet/BottomSheet.styles";
import { PRIVACY_COPY } from "../content";
import { normalizeLanguage } from "shared/i18n/supportedLanguages";

// 개인정보 보호 설정 바텀시트 내용
export function PrivacyContent() {
  const { i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const copy = PRIVACY_COPY[language];

  return (
    <>
      <S.Section>
        <S.SectionTitle>{copy.policyTitle}</S.SectionTitle>
        <S.SectionText>{copy.policyDescription}</S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.collectTitle}</S.SectionTitle>
        <S.SectionText>{copy.collectDescription}</S.SectionText>
        <S.List>
          <S.ListItem>
            <S.HighlightText>{copy.collect.requiredLabel}</S.HighlightText>{" "}
            {copy.collect.requiredValue}
          </S.ListItem>
          <S.ListItem>
            <S.HighlightText>{copy.collect.optionalLabel}</S.HighlightText>{" "}
            {copy.collect.optionalValue}
          </S.ListItem>
          <S.ListItem>
            <S.HighlightText>{copy.collect.automaticLabel}</S.HighlightText>{" "}
            {copy.collect.automaticValue}
          </S.ListItem>
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.purposeTitle}</S.SectionTitle>
        <S.List>
          {copy.purposeList.map((item) => (
            <S.ListItem key={item}>{item}</S.ListItem>
          ))}
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.thirdPartyTitle}</S.SectionTitle>
        <S.SectionText>{copy.thirdPartyDescription}</S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.rightsTitle}</S.SectionTitle>
        <S.SectionText>{copy.rightsDescription}</S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.retentionTitle}</S.SectionTitle>
        <S.SectionText>{copy.retentionDescription}</S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.deletionTitle}</S.SectionTitle>
        <S.SectionText>{copy.deletionDescription}</S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.contactTitle}</S.SectionTitle>
        <S.SectionText>
          {copy.contactIntro}{" "}
          <a href="mailto:privacy@recyclean.com" css={S.linkStyle}>
            privacy@recyclean.com
          </a>
          {copy.contactOutro}
        </S.SectionText>
      </S.Section>
    </>
  );
}
