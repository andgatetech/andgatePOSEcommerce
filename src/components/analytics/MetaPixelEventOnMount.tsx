"use client";

import { useEffect, useMemo } from "react";
import { type MetaPixelEvent, type MetaPixelParams, trackMetaPixel } from "@/lib/metaPixel";

interface MetaPixelEventOnMountProps {
  pixelId?: string | null;
  eventName: MetaPixelEvent;
  params?: MetaPixelParams;
}

export default function MetaPixelEventOnMount({
  pixelId,
  eventName,
  params = {},
}: MetaPixelEventOnMountProps) {
  const serializedParams = useMemo(() => JSON.stringify(params), [params]);

  useEffect(() => {
    if (!pixelId) return;

    const eventParams = {
      page_url: window.location.href,
      ...(JSON.parse(serializedParams) as MetaPixelParams),
    };
    const eventKey = `meta-pixel-event:${pixelId.trim()}:${eventName}:${window.location.href}:${serializedParams}`;
    const now = Date.now();
    const lastSentAt = Number(window.sessionStorage.getItem(eventKey) || 0);

    if (now - lastSentAt < 10000) return;

    window.sessionStorage.setItem(eventKey, String(now));
    trackMetaPixel(pixelId, eventName, eventParams);
  }, [eventName, pixelId, serializedParams]);

  return null;
}
