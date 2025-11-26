import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "shared/state/settingsStore";
import { DEFAULT_LANGUAGE } from "shared/i18n/supportedLanguages";

export type NumberFormatOptions = Intl.NumberFormatOptions & {
  locale?: string;
};

// 언어+지역 코드를 조합해 일관된 로케일을 생성
export function getLocale(language?: string, region?: string): string {
  const base = language ?? DEFAULT_LANGUAGE;
  return region ? `${base}-${region}` : base;
}

// 숫자 포맷을 공통 처리하며 옵션 기반 확장 지원
export function formatNumber(
  value: number | null | undefined,
  options: NumberFormatOptions = {},
): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "";
  }

  const { locale, ...intlOptions } = options;
  const isInteger = Number.isInteger(value);

  const resolvedOptions: Intl.NumberFormatOptions = {
    maximumFractionDigits: intlOptions.maximumFractionDigits ?? (isInteger ? 0 : 1),
    minimumFractionDigits: intlOptions.minimumFractionDigits,
    ...intlOptions,
  };

  return new Intl.NumberFormat(locale ?? "en-US", resolvedOptions).format(value);
}

// zustand + i18n 상태를 바탕으로 메모이즈된 포맷터 훅 제공
export function useNumberFormatter(baseOptions?: NumberFormatOptions) {
  const { i18n } = useTranslation();
  const language = useSettingsStore((state) => state.language);
  const region = useSettingsStore((state) => state.region);

  const locale = getLocale(
    language ?? i18n.resolvedLanguage ?? i18n.language ?? DEFAULT_LANGUAGE,
    region,
  );

  return useMemo(
    () => (value: number | null | undefined, overrideOptions?: NumberFormatOptions) =>
      formatNumber(value, { locale, ...baseOptions, ...overrideOptions }),
    [locale, baseOptions],
  );
}
