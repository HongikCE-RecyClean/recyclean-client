import { createElement } from "react";
import { create } from "zustand";
import { overlay } from "overlay-kit";
import { SnackbarOverlay } from "../ui/Snackbar/SnackbarOverlay";
import { BannerOverlay } from "../ui/Banner/BannerOverlay";
import type { NotificationType, SnackbarAction, SnackbarOptions } from "../types/notifications";

// 배너 세션 키 접두사
const BANNER_SESSION_PREFIX = "recyclean-banner-dismissed:";

// 배너 설정 인터페이스
export interface BannerState {
  type: NotificationType;
  message: string;
  action?: SnackbarAction;
  sessionKey?: string; // 섹션별로 닫힘 상태를 세션 스토리지에 기록하기 위한 키
}

// 알림 스토어 인터페이스
interface NotificationStore {
  lastBannerId: string | null;
  showBanner: (banner: BannerState) => string | null;
  closeBanner: (id?: string) => void;

  // 스낵바 표시
  showSnackbar: (message: string, options?: SnackbarOptions) => void;
}

// 알림 스토어 생성 (persist 미사용 - 알림은 휘발성)
export const useNotificationStore = create<NotificationStore>((set, get) => ({
  lastBannerId: null,

  // 배너 표시
  showBanner: (banner) => {
    const storageKey =
      banner.sessionKey && typeof window !== "undefined"
        ? `${BANNER_SESSION_PREFIX}${banner.sessionKey}`
        : null;

    // 동일 세션에서 사용자가 닫은 배너는 다시 노출하지 않음
    if (storageKey && sessionStorage.getItem(storageKey) === "1") {
      return null;
    }

    let overlayId = "";
    overlayId = overlay.open(({ close, unmount }) =>
      createElement(BannerOverlay, {
        ...banner,
        onClose: () => {
          if (storageKey && typeof window !== "undefined") {
            sessionStorage.setItem(storageKey, "1");
          }
          close();
          unmount();
          set((state) => (state.lastBannerId === overlayId ? { lastBannerId: null } : state));
        },
      }),
    );
    set({ lastBannerId: overlayId });
    return overlayId;
  },

  // 배너 닫기
  closeBanner: (id) => {
    const targetId = id ?? get().lastBannerId;
    if (!targetId) {
      return;
    }
    overlay.close(targetId);
    overlay.unmount(targetId);
    set((state) => (state.lastBannerId === targetId ? { lastBannerId: null } : state));
  },

  // 스낵바 표시 (Toss overlay-kit으로 관리)
  showSnackbar: (message, options = {}) => {
    overlay.open(({ close, unmount }) =>
      createElement(SnackbarOverlay, {
        message,
        type: options.type ?? "success",
        duration: options.duration ?? 4000,
        action: options.action,
        onClose: () => {
          close();
          unmount();
        },
      }),
    );
  },
}));
