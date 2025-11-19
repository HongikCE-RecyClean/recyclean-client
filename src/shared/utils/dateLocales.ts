import type { Locale } from "date-fns";
import { enUS, es, fr, ko as koLocale } from "date-fns/locale";
import { normalizeLanguage, type SupportedLanguage } from "shared/i18n/supportedLanguages";

// date-fns 로케일 매핑을 중앙에서 관리하는 헬퍼 정의
const DATE_FNS_LOCALE_MAP: Record<SupportedLanguage, Locale> = {
  en: enUS,
  ko: koLocale,
  es,
  fr,
};

// 언어 코드에 맞춰 date-fns 로케일을 반환하는 함수 제공
export function resolveDateFnsLocale(language?: string): Locale {
  const normalized = normalizeLanguage(language);
  return DATE_FNS_LOCALE_MAP[normalized];
}
