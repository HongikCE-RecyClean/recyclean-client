import type { PropsWithChildren, ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "shared/state/authStore";
import * as S from "./ProtectedRoute.styles";

// 보호 라우트(ProtectedRoute) 요소 속성 정의
interface ProtectedRouteProps extends PropsWithChildren {
  redirectTo?: string;
  fallback?: ReactNode;
}

// 인증 여부를 확인해 하위 라우트를 제어하는 컴포넌트
export function ProtectedRoute({ redirectTo = "/login", fallback, children }: ProtectedRouteProps) {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    // 로그인 진행 중일 때 대기 상태 렌더링
    return fallback ? (
      <>{fallback}</>
    ) : (
      <S.PendingState>로그인 상태 확인 중이에요...</S.PendingState>
    );
  }

  if (!isAuthenticated) {
    // 미인증 사용자는 로그인 페이지로 리다이렉션 처리
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // 인증된 경우 하위 라우트 혹은 자식 컴포넌트 렌더
  return children ? <>{children}</> : <Outlet />;
}
