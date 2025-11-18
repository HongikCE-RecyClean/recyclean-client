import { apiClient } from "../client";
import { reissueTokens } from "../auth";
import { useAuthStore, type AuthSession } from "../../state/authStore";

// 토큰 재발급 중복 실행을 막기 위한 Promise 캐시
let refreshPromise: Promise<string | null> | null = null;

// 액세스 토큰을 새로 발급받고 스토어를 갱신하는 함수
async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) {
    return refreshPromise;
  }
  const state = useAuthStore.getState();
  const refreshToken = state.session?.refreshToken;
  if (!refreshToken) {
    state.logout();
    return null;
  }
  const method = state.session?.method ?? "kakao";

  refreshPromise = (async () => {
    try {
      const response = await reissueTokens({
        refreshToken,
      });
      const nextSession: AuthSession = {
        memberId: response.memberId,
        socialType: response.socialType,
        socialId: response.socialId,
        nickname: response.nickname,
        profileImageUrl: response.profileImageUrl,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        method,
      };
      state.completeAuth(nextSession);
      return nextSession.accessToken;
    } catch {
      state.logout();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// apiClient에 인증 핸들러를 주입
apiClient.setAuthHandlers({
  getAccessToken: () => useAuthStore.getState().session?.accessToken ?? null,
  refreshAccessToken,
  handleAuthFailure: () => {
    useAuthStore.getState().logout();
  },
});
