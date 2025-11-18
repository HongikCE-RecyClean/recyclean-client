export {};

declare global {
  interface Window {
    naver?: typeof naver;
  }

  namespace naver {
    namespace maps {
      class LatLng {
        constructor(lat: number, lng: number);
      }

      interface MapOptions {
        center?: LatLng | { lat: number; lng: number };
        zoom?: number;
      }

      class Map {
        constructor(container: HTMLElement | string, options?: MapOptions);
        destroy(): void;
        setCenter(latlng: LatLng): void;
      }

      // 네이버 지도 이벤트 핸들러 타입 정의
      type EventHandler = (...args: unknown[]) => void;

      // 이벤트 구독 반환 객체 정의
      interface EventSubscription {
        remove(): void;
      }

      // Event 네임스페이스 정의
      interface EventNamespace {
        addListener(target: unknown, eventName: string, handler: EventHandler): EventSubscription;
        once(target: unknown, eventName: string, handler: EventHandler): EventSubscription;
        removeListener(subscription: EventSubscription): void;
      }

      // 런타임에서 접근하는 Event 객체 선언
      const Event: EventNamespace;

      // SDK 로딩 상태 플래그 정의
      let jsContentLoaded: boolean | undefined;
      let onJSContentLoaded: (() => void) | undefined;
    }
  }
}
