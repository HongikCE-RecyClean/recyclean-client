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
