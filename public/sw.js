const CACHE_VERSION = "v1";
const STATIC_CACHE = `hawkeri-static-${CACHE_VERSION}`;
const IMAGE_CACHE = `hawkeri-images-${CACHE_VERSION}`;
const PAGE_CACHE = `hawkeri-pages-${CACHE_VERSION}`;

const STATIC_EXTENSIONS = /\.(js|css|woff2?|ttf|otf|eot|ico|svg|png|jpg|jpeg|webp|avif)$/i;
const API_ORIGIN = "https://api.andgatepos.com";
const OFFLINE_URL = "/offline";

const ALL_CACHES = [STATIC_CACHE, IMAGE_CACHE, PAGE_CACHE];

// ── Install: pre-cache offline page ──────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PAGE_CACHE).then((cache) => cache.add(OFFLINE_URL))
  );
  self.skipWaiting();
});

// ── Activate: purge old cache versions ───────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => !ALL_CACHES.includes(key))
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch ─────────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET
  if (request.method !== "GET") return;

  // API calls — network first, no offline fallback (data must be fresh)
  if (url.origin === API_ORIGIN) {
    event.respondWith(networkFirst(request, PAGE_CACHE, 10000));
    return;
  }

  // Same-origin only from here
  if (url.origin !== self.location.origin) return;

  // Next.js static assets (_next/static) — cache first, long TTL
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Product images / public images — stale-while-revalidate
  if (STATIC_EXTENSIONS.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE));
    return;
  }

  // HTML navigation — network first, offline fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(OFFLINE_URL).then((res) => res ?? new Response("Offline", { status: 503 }))
      )
    );
    return;
  }
});

// ── Strategies ────────────────────────────────────────────────────────────────

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  });
  return cached ?? fetchPromise;
}

async function networkFirst(request, cacheName, timeoutMs) {
  const cache = await caches.open(cacheName);
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const response = await fetch(request, { signal: controller.signal });
    clearTimeout(timer);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request);
    return cached ?? new Response(JSON.stringify({ success: false, message: "Offline" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
}
