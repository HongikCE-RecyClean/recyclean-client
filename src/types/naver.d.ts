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

      interface MapsGlobal {
        Map: typeof Map;
        LatLng: typeof LatLng;
        jsContentLoaded?: boolean;
        onJSContentLoaded?: () => void;
      }
    }
  }
}
