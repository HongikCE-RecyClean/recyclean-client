import { useTranslation } from "react-i18next";
import * as S from "../AnalyzePage.styles";

// 분석 진행 중 카드 정의
export function AnalyzeScanningCard() {
  const { t } = useTranslation();
  return (
    <S.SectionCard>
      {/* 스캔 컨텐츠 정렬 컴포넌트 적용 */}
      <S.ScanningContent>
        {/* 대기 스피너 표시 */}
        <S.Spinner />
        {/* 안내 문구 영역 */}
        <S.ScanningHeadline>{t("analyze.scanning.headline")}</S.ScanningHeadline>
        <S.ScanningSubtext>{t("analyze.scanning.subtext")}</S.ScanningSubtext>
      </S.ScanningContent>
    </S.SectionCard>
  );
}
