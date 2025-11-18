import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./shared/layout/AppShell/AppShell";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AnalyzePage } from "./pages/analyze/AnalyzePage";
import { CalendarPage } from "./pages/calendar/CalendarPage";
import { MapPage } from "./pages/map/MapPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { OnboardingPage } from "./pages/onboarding/OnboardingPage";
import { useUserStore } from "./shared/state/userStore";

// 온보딩 완료 여부에 따라 리다이렉트하는 컴포넌트
function OnboardingGuard({ children }: { children: React.ReactElement }) {
  const { name } = useUserStore();

  // 닉네임이 없으면 온보딩으로 리다이렉트
  if (!name) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

// 앱 라우터 구성
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 온보딩 페이지 */}
        <Route path="/onboarding" element={<OnboardingPage />} />
        {/* 모든 페이지는 AppShell 레이아웃 내에서 렌더링 + 온보딩 가드 */}
        <Route
          element={
            <OnboardingGuard>
              <AppShell />
            </OnboardingGuard>
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
