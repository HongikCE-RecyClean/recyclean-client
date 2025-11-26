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
import { useSettingsStore } from "./shared/state/settingsStore";

// 온보딩/인증 완료 여부를 확인하는 가드 컴포넌트
function AuthGuard({ children }: { children: React.ReactElement }) {
  const { isOnboarded } = useUserStore();
  const userHydrated = useUserStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const authHydrated = useAuthStore((state) => state.hasHydrated);
  const settingsHydrated = useSettingsStore((state) => state.hasHydrated);

  // 스토어 하이드레이션 완료 전에는 판단 보류
  if (!authHydrated || !userHydrated || !settingsHydrated) {
    return null;
  }

  // 인증 또는 온보딩이 하나라도 미충족이면 온보딩으로 이동
  if (!isAuthenticated || !isOnboarded) {
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
