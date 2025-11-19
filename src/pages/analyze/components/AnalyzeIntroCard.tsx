import { useTranslation } from "react-i18next";
import { CardTitle } from "../../../shared/ui/Card/Card";
import * as S from "../AnalyzePage.styles";

// 분석 소개 카드 모듈 정의
export function AnalyzeIntroCard() {
  const { t } = useTranslation();
  return (
    <S.SectionCard>
      <S.SectionCardHeader>
        {/* 제목과 안내 문구 레이아웃 구성 */}
        <CardTitle>{t("analyze.introTitle")}</CardTitle>
      </S.SectionCardHeader>
      <S.SectionCardContent>
        {/* 소개 문구 출력 */}
        {/* 소개 문구 텍스트 클래스 적용 */}
        <p css={S.introDescriptionText}>{t("analyze.introDescription")}</p>
      </S.SectionCardContent>
    </S.SectionCard>
  );
}
