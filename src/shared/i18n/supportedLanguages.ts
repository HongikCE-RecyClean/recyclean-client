export const SUPPORTED_LANGUAGES = ["en", "ko", "es", "fr"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = "ko";

export function normalizeLanguage(value?: string): SupportedLanguage {
  if (!value) {
    return DEFAULT_LANGUAGE;
  }
  const lowerValue = value.toLowerCase();
  const matched = SUPPORTED_LANGUAGES.find(
    (language) => lowerValue === language || lowerValue.startsWith(`${language}-`),
  );
  return matched ?? DEFAULT_LANGUAGE;
}
