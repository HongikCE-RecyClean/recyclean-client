import { useTranslation } from "react-i18next";
import * as S from "../../../shared/ui/BottomSheet/BottomSheet.styles";
import { HELP_COPY } from "../content";
import { normalizeLanguage } from "shared/i18n/supportedLanguages";

// 도움말 센터 바텀시트 내용
export function HelpContent() {
  const { i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const copy = HELP_COPY[language];

  return (
    <>
      <S.Section>
        <S.SectionTitle>{copy.faqTitle}</S.SectionTitle>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.faq.guestMode.question}</S.SectionTitle>
        <S.SectionText>{copy.faq.guestMode.answer}</S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.faq.points.question}</S.SectionTitle>
        <S.SectionText>{copy.faq.points.answer}</S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.faq.analysis.question}</S.SectionTitle>
        <S.SectionText>{copy.faq.analysis.answer}</S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.faq.centers.question}</S.SectionTitle>
        <S.SectionText>{copy.faq.centers.answer}</S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.faq.dataLoss.question}</S.SectionTitle>
        <S.SectionText>{copy.faq.dataLoss.answer}</S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.faq.issues.question}</S.SectionTitle>
        <S.SectionText>{copy.faq.issues.intro}</S.SectionText>
        <S.List>
          {copy.faq.issues.steps.map((step) => (
            <S.ListItem key={step}>{step}</S.ListItem>
          ))}
        </S.List>
        <S.SectionText>{copy.faq.issues.outro}</S.SectionText>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.guideTitle}</S.SectionTitle>
        <S.List>
          {copy.guideItems.map((item) => (
            <S.ListItem key={item.label}>
              <S.HighlightText>{item.label}</S.HighlightText> {item.description}
            </S.ListItem>
          ))}
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.contactTitle}</S.SectionTitle>
        <S.SectionText>
          {copy.contactIntro}{" "}
          <a href="mailto:support@recyclean.com" css={S.linkStyle}>
            support@recyclean.com
          </a>
          {copy.contactOutro}
        </S.SectionText>
      </S.Section>
    </>
  );
}
