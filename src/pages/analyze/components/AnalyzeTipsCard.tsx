import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNotificationStore } from "../../../shared/state/notificationStore";

// 촬영 팁 배너 정의
export function AnalyzeTipsCard() {
  const { t, i18n } = useTranslation();
  const { showBanner, closeBanner } = useNotificationStore();

  useEffect(() => {
    // 촬영 팁 요약 메시지를 상단 배너로 노출
    const bannerId = showBanner({
      type: "info",
      message: t("analyze.tips.bannerMessage"),
      sessionKey: "analyze-tips",
    });

    if (!bannerId) {
      return undefined;
    }

    return () => {
      closeBanner(bannerId);
    };
  }, [t, showBanner, closeBanner, i18n.language]);

  return null;
}
