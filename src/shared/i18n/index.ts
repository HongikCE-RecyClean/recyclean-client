import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, normalizeLanguage } from "./supportedLanguages";
import { formatNumber, getLocale } from "../utils/numberFormat";
import { useSettingsStore } from "../state/settingsStore";

const i18nInstance = i18n.createInstance();

void i18nInstance
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        const { language, region } = useSettingsStore.getState();
        const normalized = normalizeLanguage(lng ?? language ?? DEFAULT_LANGUAGE);
        const locale = getLocale(normalized, region);
        const numericValue =
          typeof value === "string" ? Number(value) : (value as number | null | undefined);

        switch (format) {
          case "number":
            return formatNumber(numericValue, { locale });
          case "number0":
            return formatNumber(numericValue, { locale, maximumFractionDigits: 0 });
          case "number1":
            return formatNumber(numericValue, { locale, maximumFractionDigits: 1 });
          case "compact":
            return formatNumber(numericValue, {
              locale,
              notation: "compact",
              maximumFractionDigits: 1,
            });
          case "percent0":
            return formatNumber(numericValue, { locale, maximumFractionDigits: 0 });
          default:
            return value ?? "";
        }
      },
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    returnObjects: true,
  });

export { i18nInstance as i18n };
