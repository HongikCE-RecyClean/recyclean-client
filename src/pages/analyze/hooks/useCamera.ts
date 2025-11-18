import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface UseCameraOptions {
  onError?: (message: string | null) => void;
}

interface UseCameraResult {
  // 카메라 영상 요소 참조 전달
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  isActive: boolean;
  isReady: boolean;
  openCamera: () => Promise<void>;
  stopCamera: () => void;
  handleVideoReady: () => void;
  capturePhoto: () => string | null;
}

export function useCamera({ onError }: UseCameraOptions = {}): UseCameraResult {
  // 카메라 미리보기 요소 참조 정의
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // 스트림과 준비 상태 제어를 위한 내부 상태 정의
  const streamRef = useRef<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { t } = useTranslation();

  const reportError = useCallback(
    (message: string | null) => {
      onError?.(message);
    },
    [onError],
  );

  // 기존 스트림 자원을 해제하는 함수 정의
  const releaseStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const openCamera = useCallback(async () => {
    reportError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      reportError(t("analyze.errors.unsupported"));
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });

      releaseStream();
      streamRef.current = stream;
      setIsReady(false);
      setIsActive(true);
    } catch {
      reportError(t("analyze.errors.permission"));
    }
  }, [releaseStream, reportError, t]);

  const stopCamera = useCallback(() => {
    releaseStream();
    setIsActive(false);
    setIsReady(false);
  }, [releaseStream]);

  const handleVideoReady = useCallback(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        reportError(t("analyze.errors.playback"));
      });
    }

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      setIsReady(true);
    }
  }, [reportError, t]);

  const capturePhoto = useCallback(() => {
    reportError(null);
    const video = videoRef.current;

    if (!video) {
      reportError(t("analyze.errors.notReady"));
      return null;
    }

    if (!video.videoWidth || !video.videoHeight) {
      reportError(t("analyze.errors.stillInitializing"));
      return null;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) {
      reportError(t("analyze.errors.captureFailed"));
      return null;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.92);
  }, [reportError, t]);

  useEffect(() => {
    if (isActive && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isActive]);

  useEffect(() => {
    return () => {
      releaseStream();
    };
  }, [releaseStream]);

  return {
    videoRef,
    isActive,
    isReady,
    openCamera,
    stopCamera,
    handleVideoReady,
    capturePhoto,
  };
}
