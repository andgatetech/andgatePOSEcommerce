"use client";

export type MetaPixelEvent =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase";

export type MetaPixelParams = Record<string, string | number | boolean | string[] | number[] | undefined | null>;

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: Fbq;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const initializedPixels = new Set<string>();

export function isValidMetaPixelId(pixelId?: string | null): pixelId is string {
  return typeof pixelId === "string" && /^[0-9]+$/.test(pixelId.trim());
}

function ensureFbq() {
  if (typeof window === "undefined") return null;

  if (!window.fbq) {
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue?.push(args);
      }
    }) as Fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
  }

  if (!document.getElementById("meta-pixel-sdk")) {
    const script = document.createElement("script");
    script.id = "meta-pixel-sdk";
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
  }

  return window.fbq;
}

export function initMetaPixel(pixelId?: string | null) {
  if (!isValidMetaPixelId(pixelId)) return null;

  const normalizedPixelId = pixelId.trim();
  const fbq = ensureFbq();
  if (!fbq) return null;

  if (!initializedPixels.has(normalizedPixelId)) {
    fbq("init", normalizedPixelId);
    initializedPixels.add(normalizedPixelId);
  }

  return normalizedPixelId;
}

export function trackMetaPixel(
  pixelId: string | null | undefined,
  eventName: MetaPixelEvent,
  params: MetaPixelParams = {},
) {
  const normalizedPixelId = initMetaPixel(pixelId);
  if (!normalizedPixelId || !window.fbq) return;

  window.fbq("trackSingle", normalizedPixelId, eventName, params);
}
