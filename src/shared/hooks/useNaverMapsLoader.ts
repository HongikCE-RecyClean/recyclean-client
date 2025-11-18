import { useEffect, useState } from "react";

declare global {
  interface Window {
    navermap_authFailure?: () => void;
  }
}

type LoaderStatus = "idle" | "loading" | "success" | "error";
type LoaderError = "missing-key" | "load-failed";

interface LoaderState {
  status: LoaderStatus;
  maps?: typeof naver.maps;
  error?: LoaderError;
}

interface ScriptOptions {
  clientId?: string;
  keyId?: string;
  submodules?: string;
}

const NAVER_SDK_ID = "naver-maps-sdk";
let naverMapsPromise: Promise<typeof naver.maps> | null = null;

function normalizeSubmodules(input?: string) {
  return input
    ?.split(",")
    .map((module) => module.trim())
    .filter((module) => module.length > 0)
    .join(",");
}

function buildSdkUrl({ clientId, keyId, submodules }: ScriptOptions) {
  const identifier = keyId ? `ncpKeyId=${keyId}` : clientId ? `ncpClientId=${clientId}` : undefined;

  if (!identifier) {
    throw new Error("NAVER Maps SDK requires either a Client ID or Key ID.");
  }

  const normalizedSubmodules = normalizeSubmodules(submodules);

  let url = `https://oapi.map.naver.com/openapi/v3/maps.js?${identifier}`;

  if (normalizedSubmodules) {
    url += `&submodules=${normalizedSubmodules}`;
  }

  return url;
}

function loadSdk(options: ScriptOptions) {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("NAVER Maps SDK can only load in the browser."));
  }

  if (window.naver?.maps) {
    return Promise.resolve(window.naver.maps);
  }

  if (naverMapsPromise) {
    return naverMapsPromise;
  }

  const url = buildSdkUrl(options);

  naverMapsPromise = new Promise<typeof naver.maps>((resolve, reject) => {
    const handleLoaded = () => {
      const maps = window.naver?.maps;

      if (!maps) {
        naverMapsPromise = null;
        reject(new Error("NAVER Maps SDK loaded but window.naver.maps is undefined."));
        return;
      }

      if (maps.jsContentLoaded) {
        resolve(maps);
        return;
      }

      maps.onJSContentLoaded = () => resolve(maps);
    };

    const handleError = () => {
      naverMapsPromise = null;
      reject(new Error("Failed to load the NAVER Maps SDK."));
    };

    const existing = document.getElementById(NAVER_SDK_ID) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener("load", handleLoaded, { once: true });
      existing.addEventListener("error", handleError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = NAVER_SDK_ID;
    script.async = true;
    script.defer = true;
    script.src = url;
    script.onload = handleLoaded;
    script.onerror = handleError;
    document.head.appendChild(script);
  });

  return naverMapsPromise;
}

export function useNaverMapsLoader() {
  const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID as string | undefined;
  const keyId = import.meta.env.VITE_NAVER_MAP_KEY_ID as string | undefined;
  const submodules = import.meta.env.VITE_NAVER_MAP_SUBMODULES as string | undefined;
  const hasLegacyClientOnly = Boolean(clientId && !keyId);

  const [state, setState] = useState<LoaderState>(() => {
    if (typeof window !== "undefined" && window.naver?.maps) {
      return { status: "success", maps: window.naver.maps };
    }

    if (!clientId && !keyId) {
      return { status: "error", error: "missing-key" };
    }

    return { status: "idle" };
  });

  // 구버전 Client ID만 있을 경우 경고 출력
  useEffect(() => {
    if (hasLegacyClientOnly) {
      console.warn(
        "[naver] NAVER 지도 API v3는 신규 ncpKeyId 기반 SDK를 권장해요. https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html 안내에 따라 VITE_NAVER_MAP_KEY_ID를 설정해주세요.",
      );
    }
  }, [hasLegacyClientOnly]);

  // 인증 실패 콜백을 통해 도메인/키 불일치 원인을 추적
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.navermap_authFailure = () => {
      console.error(
        "[naver] NAVER 지도 인증에 실패했어요. 콘솔에서 안내된 도메인과 VITE_NAVER_MAP_KEY_ID 설정, 허용된 도메인 목록을 다시 확인해주세요.",
      );
    };

    return () => {
      window.navermap_authFailure = undefined;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.naver?.maps) {
      setState({ status: "success", maps: window.naver.maps });
      return;
    }

    if (!clientId && !keyId) {
      setState({ status: "error", error: "missing-key" });
      return;
    }

    let cancelled = false;
    setState({ status: "loading" });

    loadSdk({ clientId, keyId, submodules })
      .then((maps) => {
        if (!cancelled) {
          setState({ status: "success", maps });
        }
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) {
          setState({ status: "error", error: "load-failed" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [clientId, keyId, submodules]);

  return state;
}
