"use client";

import { useEffect, useState } from "react";

const KEY = "rv_products";
const MAX = 8;

export type RecentlyViewedItem = {
  id: number;
  slug: string;
  product_name: string;
  price: string;
  imageUrl: string | null;
  categorySlug?: string;
};

function readStorage(): RecentlyViewedItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addRecentlyViewed(item: RecentlyViewedItem) {
  if (typeof window === "undefined") return;
  const current = readStorage().filter((p) => p.id !== item.id);
  const updated = [item, ...current].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("rv_update"));
}

export function useRecentlyViewed(excludeId?: number) {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    const load = () =>
      setItems(readStorage().filter((p) => p.id !== excludeId));
    load();
    window.addEventListener("rv_update", load);
    return () => window.removeEventListener("rv_update", load);
  }, [excludeId]);

  return items;
}
