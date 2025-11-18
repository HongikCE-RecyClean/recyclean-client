import { createElement } from "react";
import { create } from "zustand";
import { overlay } from "overlay-kit";
import { SnackbarOverlay } from "../ui/Snackbar/SnackbarOverlay";
import type { NotificationType, SnackbarAction, SnackbarOptions } from "../types/notifications";

// 배너 상태 인터페이스
export interface BannerState {
  id: string;
  type: NotificationType;
  message: string;
  action?: SnackbarAction;
}

// 알림 스토어 인터페이스
interface NotificationStore {
  // 배너 상태 (한 번에 하나만 표시)
  banner: BannerState | null;
  bannerStack: BannerState[];
  showBanner: (banner: Omit<BannerState, "id">) => string;
  closeBanner: (id?: string) => void;

  // 스낵바 표시
  showSnackbar: (message: string, options?: SnackbarOptions) => void;
}

// UUID 생성 함수
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// 알림 스토어 생성 (persist 미사용 - 알림은 휘발성)
export const useNotificationStore = create<NotificationStore>((set) => ({
  // 배너 상태
  banner: null,
  // 페이지별 배너 복원을 위한 스택 유지
  bannerStack: [],

  // 배너 표시
  showBanner: (banner) => {
    const nextBanner: BannerState = {
      ...banner,
      id: generateId(),
    };

    set((state) => ({
      bannerStack: [...state.bannerStack, nextBanner],
      banner: nextBanner,
    }));

    return nextBanner.id;
  },

  // 배너 닫기 (id가 지정되면 해당 배너만 제거)
  closeBanner: (id) =>
    set((state) => {
      if (state.bannerStack.length === 0) {
        return undefined;
      }

      const activeId = id ?? state.banner?.id;
      if (!activeId) {
        return undefined;
      }

      const filteredStack = state.bannerStack.filter((item) => item.id !== activeId);
      if (filteredStack.length === state.bannerStack.length) {
        return undefined;
      }

      const nextBanner = filteredStack[filteredStack.length - 1] ?? null;

      return {
        bannerStack: filteredStack,
        banner: nextBanner,
      };
    }),

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
