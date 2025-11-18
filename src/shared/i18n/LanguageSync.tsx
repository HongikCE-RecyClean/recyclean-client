import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../state/settingsStore";
import { DEFAULT_LANGUAGE, normalizeLanguage } from "./supportedLanguages";

// zustand 언어 상태와 i18n 인스턴스를 동기화하는 컴포넌트
export function LanguageSync() {
  const { i18n } = useTranslation();
  const language = useSettingsStore((state) => state.language);
  const setLanguage = useSettingsStore((state) => state.setLanguage);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }
    const resolved = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language ?? DEFAULT_LANGUAGE);
    if (resolved !== language) {
      setLanguage(resolved);
    }
    hasInitialized.current = true;
  }, [i18n.language, i18n.resolvedLanguage, language, setLanguage]);

  useEffect(() => {
    const normalized = normalizeLanguage(language);
    if (i18n.language !== normalized) {
      void i18n.changeLanguage(normalized);
    }
  }, [language, i18n]);

  return null;
}
