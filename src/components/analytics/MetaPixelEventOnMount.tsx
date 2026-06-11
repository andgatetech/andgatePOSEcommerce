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
    trackMetaPixel(pixelId, eventName, JSON.parse(serializedParams) as MetaPixelParams);
  }, [eventName, pixelId, serializedParams]);

  return null;
}
