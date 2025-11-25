import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./shared/layout/AppShell/AppShell";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AnalyzePage } from "./pages/analyze/AnalyzePage";
import { CalendarPage } from "./pages/calendar/CalendarPage";
import { MapPage } from "./pages/map/MapPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { OnboardingPage } from "./pages/onboarding/OnboardingPage";
import { AuthCallbackPage } from "./pages/auth/AuthCallbackPage";
import { useUserStore } from "./shared/state/userStore";
import { useAuthStore } from "./shared/state/authStore";

// 온보딩/인증 완료 여부를 확인하는 가드 컴포넌트
function AuthGuard({ children }: { children: React.ReactElement }) {
  const { isOnboarded } = useUserStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 인증되지 않고 온보딩도 완료되지 않은 경우 온보딩으로 이동
  if (!isAuthenticated && !isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

// 앱 라우터 구성
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인증 관련 라우트 (가드 미적용) */}
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* 인증/온보딩 완료 후에만 AppShell 렌더링 */}
        <Route
          element={
            <AuthGuard>
              <AppShell />
            </AuthGuard>
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
