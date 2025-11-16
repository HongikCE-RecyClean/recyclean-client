import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./shared/layout/AppShell/AppShell";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AnalyzePage } from "./pages/analyze/AnalyzePage";
import { CalendarPage } from "./pages/calendar/CalendarPage";
import { MapPage } from "./pages/map/MapPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { LoginPage } from "./pages/auth/LoginPage";

// 앱 라우터 구성
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공개 로그인 라우트 */}
        <Route path="/login" element={<LoginPage />} />
        {/* 인증이 필요한 영역을 ProtectedRoute로 보호 */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
