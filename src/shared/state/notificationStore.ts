import { create } from "zustand";

// 알림 타입 정의
export type NotificationType = "success" | "error" | "warning" | "info";

// 배너 상태 인터페이스
export interface BannerState {
  id: string;
  type: NotificationType;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// 스낵바 상태 인터페이스
export interface SnackbarState {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number; // 자동 닫기까지 시간 (밀리초, 기본값 4000)
  action?: {
    label: string;
    onClick: () => void;
  };
}

// 알림 스토어 인터페이스
interface NotificationStore {
  // 배너 상태 (한 번에 하나만 표시)
  banner: BannerState | null;
  showBanner: (banner: Omit<BannerState, "id">) => void;
  closeBanner: () => void;

  // 스낵바 상태 (여러 개 큐 방식으로 표시)
  snackbars: SnackbarState[];
  showSnackbar: (message: string, options?: Partial<Omit<SnackbarState, "id" | "message">>) => void;
  closeSnackbar: (id: string) => void;
}

// UUID 생성 함수
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// 알림 스토어 생성 (persist 미사용 - 알림은 휘발성)
export const useNotificationStore = create<NotificationStore>((set) => ({
  // 배너 상태
  banner: null,

  // 배너 표시
  showBanner: (banner) =>
    set({
      banner: {
        ...banner,
        id: generateId(),
      },
    }),

  // 배너 닫기
  closeBanner: () => set({ banner: null }),

  // 스낵바 상태
  snackbars: [],

  // 스낵바 표시 (큐에 추가)
  showSnackbar: (message, options = {}) =>
    set((state) => ({
      snackbars: [
        ...state.snackbars,
        {
          id: generateId(),
          message,
          type: options.type ?? "success",
          duration: options.duration ?? 4000,
          action: options.action,
        },
      ],
    })),

  // 스낵바 닫기 (큐에서 제거)
  closeSnackbar: (id) =>
    set((state) => ({
      snackbars: state.snackbars.filter((snackbar) => snackbar.id !== id),
    })),
}));
