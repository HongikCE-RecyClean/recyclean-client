import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Card, CardHeader, CardTitle } from "../../../shared/ui/Card/Card";
import { SelectField } from "../../../shared/ui/SelectField/SelectField";
import * as S from "../SettingsPage.styles";
import type { LocaleOption } from "../types";
import type { SupportedLanguage } from "shared/i18n/supportedLanguages";

// 언어와 지역 설정 카드 정의
interface SettingsLocaleCardProps {
  languages: LocaleOption[];
  regions: LocaleOption[];
  language: SupportedLanguage;
  region: string;
  onLanguageChange: (value: SupportedLanguage) => void;
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
  const { t } = useTranslation();
  const theme = useTheme();

  // SelectField 변경 이벤트를 상위 상태와 연결
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Globe size={18} />
          {t("settings.locale.title")}
        </CardTitle>
      </CardHeader>
      <S.SectionStack>
        <div>
          {/* 설정 필드 레이블 컴포넌트 적용 */}
          <S.SettingsFieldLabel>{t("settings.locale.languageLabel")}</S.SettingsFieldLabel>
          <SelectField
            options={languages}
            value={language}
            onChange={(event) => onLanguageChange(event.target.value as SupportedLanguage)}
          />
        </div>
        <div>
          <S.SettingsFieldLabel>{t("settings.locale.regionLabel")}</S.SettingsFieldLabel>
          <div css={{ marginBottom: "8px" }}>
            <span css={S.settingsItemDescription(theme)}>{t("settings.locale.regionHint")}</span>
          </div>
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
