import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./shared/layout/AppShell/AppShell";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AnalyzePage } from "./pages/analyze/AnalyzePage";
import { CalendarPage } from "./pages/calendar/CalendarPage";
import { MapPage } from "./pages/map/MapPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { OnboardingPage } from "./pages/onboarding/OnboardingPage";
import { useUserStore } from "./shared/state/userStore";

// 온보딩 완료 여부를 확인하는 가드 컴포넌트
function OnboardingGuard({ children }: { children: React.ReactElement }) {
  const { isOnboarded } = useUserStore();

  if (!isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

// 앱 라우터 구성
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        {/* 온보딩 완료 후에만 AppShell 렌더링 */}
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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
