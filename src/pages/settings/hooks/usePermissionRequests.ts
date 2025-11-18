import { useCallback, useEffect, useState } from "react";

// 권한 요청 단계 표현 타입 정의
export type PermissionRequestStatus =
  | "idle"
  | "requesting"
  | "granted"
  | "denied"
  | "unsupported"
  | "error";

// 위치 권한 거부 코드 상수 정의
const GEO_PERMISSION_DENIED_CODE = 1;

// 위치 권한을 프로미스로 감싸는 헬퍼 정의
const getCurrentPosition = () =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 0,
    });
  });

export function usePermissionRequests() {
  // 알림과 위치 권한 상태 추적
  const [notificationStatus, setNotificationStatus] = useState<PermissionRequestStatus>("idle");
  const [locationStatus, setLocationStatus] = useState<PermissionRequestStatus>("idle");

  const supportsNotifications = typeof window !== "undefined" && "Notification" in window;
  const supportsGeolocation = typeof navigator !== "undefined" && "geolocation" in navigator;

  // 알림 권한 초기 상태 동기화
  useEffect(() => {
    if (!supportsNotifications) {
      setNotificationStatus("unsupported");
      return;
    }

    if (Notification.permission === "granted") {
      setNotificationStatus("granted");
    } else if (Notification.permission === "denied") {
      setNotificationStatus("denied");
    } else {
      setNotificationStatus("idle");
    }
  }, [supportsNotifications]);

  // 위치 권한 초기 상태 동기화 (Permissions API 사용 가능 시)
  useEffect(() => {
    if (!supportsGeolocation) {
      setLocationStatus("unsupported");
      return;
    }

    if (!("permissions" in navigator)) {
      setLocationStatus("idle");
      return;
    }

    let isMounted = true;
    let permissionHandle: PermissionStatus | null = null;
    let handleChange: (() => void) | null = null;

    const syncState = (status: PermissionStatus) => {
      if (!isMounted) return;
      if (status.state === "granted") {
        setLocationStatus("granted");
      } else if (status.state === "denied") {
        setLocationStatus("denied");
      } else {
        setLocationStatus("idle");
      }
    };

    navigator.permissions
      .query({ name: "geolocation" })
      .then((status) => {
        if (!isMounted) return;
        permissionHandle = status;
        syncState(status);
        handleChange = () => syncState(status);
        status.addEventListener("change", handleChange);
      })
      .catch(() => {
        if (isMounted) {
          setLocationStatus("idle");
        }
      });

    return () => {
      isMounted = false;
      if (permissionHandle && handleChange) {
        permissionHandle.removeEventListener("change", handleChange);
      }
    };
  }, [supportsGeolocation]);

  // 알림 권한 요청 처리
  const requestNotificationPermission = useCallback(async () => {
    if (!supportsNotifications) {
      setNotificationStatus("unsupported");
      return false;
    }

    if (Notification.permission === "granted") {
      setNotificationStatus("granted");
      return true;
    }

    if (Notification.permission === "denied") {
      setNotificationStatus("denied");
      return false;
    }

    setNotificationStatus("requesting");
    try {
      const permission = await Notification.requestPermission();
      const granted = permission === "granted";
      setNotificationStatus(granted ? "granted" : "denied");
      return granted;
    } catch (error) {
      console.error("Notification permission request failed", error);
      setNotificationStatus("error");
      return false;
    }
  }, [supportsNotifications]);

  // 위치 권한 요청 처리
  const requestLocationPermission = useCallback(async () => {
    if (!supportsGeolocation) {
      setLocationStatus("unsupported");
      return false;
    }

    setLocationStatus("requesting");
    try {
      await getCurrentPosition();
      setLocationStatus("granted");
      return true;
    } catch (error) {
      console.error("Location permission request failed", error);
      const positionError = error as GeolocationPositionError | null;
      if (positionError?.code === GEO_PERMISSION_DENIED_CODE) {
        setLocationStatus("denied");
      } else {
        setLocationStatus("error");
      }
      return false;
    }
  }, [supportsGeolocation]);

  // 상태 리셋 헬퍼 정의
  const resetNotificationStatus = useCallback(() => setNotificationStatus("idle"), []);
  const resetLocationStatus = useCallback(() => setLocationStatus("idle"), []);

  return {
    supportsNotifications,
    supportsGeolocation,
    notificationStatus,
    locationStatus,
    requestNotificationPermission,
    requestLocationPermission,
    resetNotificationStatus,
    resetLocationStatus,
  };
}
