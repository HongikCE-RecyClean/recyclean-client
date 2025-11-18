import { useNotificationStore } from "../../state/notificationStore";
import { Banner } from "./Banner";

// 배너 전역 렌더링 컴포넌트
export function BannerContainer() {
  const { banner, closeBanner } = useNotificationStore();

  if (!banner) {
    return null;
  }

  return <Banner {...banner} onClose={closeBanner} />;
}
