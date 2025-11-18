import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@styles/global.css.ts";
import App from "./App.tsx";
import { AppProviders } from "shared/providers/AppProviders";

// 루트 렌더링 설정
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);

// 프로덕션 환경에서 서비스 워커 등록해 홈 화면 실행 시에도 SPA 라우팅 유지
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.error("Failed to register service worker", error);
    });
  });
}
