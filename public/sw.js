const CACHE_VERSION = "recyclean-shell-v1";
const APP_SHELL = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-512-maskable.png",
  "/icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  // 설치 단계에서 앱 셸 리소스를 미리 캐시에 적재
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(APP_SHELL);
    }),
  );
});

self.addEventListener("activate", (event) => {
  // 이전 버전 캐시 정리
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_VERSION).map((oldKey) => caches.delete(oldKey)),
        ),
      ),
  );
});

self.addEventListener("fetch", (event) => {
  // 내비게이션 요청은 네트워크 우선 후 실패 시 index.html 반환
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match("/index.html")));
    return;
  }

  // 동일 출처 정적 자원은 캐시 우선으로 제공
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(
        (cachedResponse) =>
          cachedResponse ||
          fetch(event.request).then((response) => {
            const cloned = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, cloned));
            return response;
          }),
      ),
    );
  }
});
