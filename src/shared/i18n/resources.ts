import type { Resource } from "i18next";
import { enTranslation } from "./locales/en";
import { koTranslation } from "./locales/ko";
import { esTranslation } from "./locales/es";
import { frTranslation } from "./locales/fr";

export type TranslationSchema = typeof enTranslation;

export const resources: Resource = {
  en: { translation: enTranslation },
  ko: { translation: koTranslation },
  es: { translation: esTranslation },
  fr: { translation: frTranslation },
};
