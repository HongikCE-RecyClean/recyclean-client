import { Globe } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { SelectField } from "../../../shared/ui/SelectField/SelectField";
import * as S from "../SettingsPage.styles";
import type { LocaleOption } from "../types";

// 언어와 지역 설정 카드 정의
interface SettingsLocaleCardProps {
  languages: LocaleOption[];
  regions: LocaleOption[];
  language: string;
  region: string;
  onLanguageChange: (value: string) => void;
  onRegionChange: (value: string) => void;
}

export function SettingsLocaleCard({
  languages,
  regions,
  language,
  region,
  onLanguageChange,
  onRegionChange,
}: SettingsLocaleCardProps) {
  // SelectField 변경 이벤트를 상위 상태와 연결
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Globe size={18} />
          언어 및 지역
        </CardTitle>
      </CardHeader>
      <S.SectionStack>
        <div>
          {/* 설정 필드 레이블 컴포넌트 적용 */}
          <S.SettingsFieldLabel>언어</S.SettingsFieldLabel>
          <SelectField
            options={languages}
            value={language}
            onChange={(event) => onLanguageChange(event.target.value)}
          />
        </div>
        <div>
          <S.SettingsFieldLabel>지역</S.SettingsFieldLabel>
          <SelectField
            options={regions}
            value={region}
            onChange={(event) => onRegionChange(event.target.value)}
          />
        </div>
      </S.SectionStack>
    </Card>
  );
}
