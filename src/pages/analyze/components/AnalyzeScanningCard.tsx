import { Card } from "../../../shared/ui/Card/Card";
import * as S from "../AnalyzePage.styles";

// 분석 진행 중 카드 정의
export function AnalyzeScanningCard() {
  return (
    <Card>
      {/* 스캔 컨텐츠 정렬 컴포넌트 적용 */}
      <S.ScanningContent>
        {/* 대기 스피너 표시 */}
        <S.Spinner />
        {/* 안내 문구 영역 */}
        <S.ScanningHeadline>이미지를 분석 중이에요...</S.ScanningHeadline>
        <S.ScanningSubtext>잠시만 기다려 주세요.</S.ScanningSubtext>
      </S.ScanningContent>
    </Card>
  );
}
