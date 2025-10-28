import { Card, CardContent } from "../../../shared/ui/Card/Card";
import * as S from "../AnalyzePage.styles";

// 분석 진행 중 카드 정의
export function AnalyzeScanningCard() {
  return (
    <Card>
      {/* 스캔 컨텐츠 정렬 클래스 적용 */}
      <CardContent className={S.scanningContent}>
        {/* 대기 스피너 표시 */}
        <S.Spinner />
        {/* 안내 문구 영역 */}
        <div className={S.scanningHeadline}>이미지를 분석 중이에요...</div>
        <div className={S.scanningSubtext}>잠시만 기다려 주세요.</div>
      </CardContent>
    </Card>
  );
}
