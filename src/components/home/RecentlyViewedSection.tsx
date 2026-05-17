"use client";

import Image from "next/image";
import Link from "next/link";
import { ROUTE_BUILDERS } from "@/config/routes";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

export default function RecentlyViewedSection({ excludeId }: { excludeId?: number }) {
  const items = useRecentlyViewed(excludeId);
  if (items.length === 0) return null;

  return (
    <section className="mx-auto px-4 py-8 md:px-5 lg:px-7 xl:px-8">
      <div className="mb-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-(--color-text-muted)">
          Your history
        </p>
        <h2 className="mt-1 text-[22px] font-bold text-(--color-primary-900)">
          Recently Viewed
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {items.map((item) => (
          <Link
            key={item.id}
            href={ROUTE_BUILDERS.productDetail(item.slug)}
            className="group flex flex-col overflow-hidden rounded-[14px] border border-(--color-border) bg-white transition hover:border-(--color-primary) hover:shadow-md"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-[#f7f8fa]">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.product_name}
                  fill
                  className="object-contain p-2 transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 12.5vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-(--color-primary-200)">
                  {item.product_name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-0.5 p-2.5">
              <p className="line-clamp-2 text-[12px] font-medium text-(--color-primary-900) leading-snug">
                {item.product_name}
              </p>
              <p className="mt-auto text-[13px] font-bold" style={{ color: "var(--color-primary)" }}>
                ৳{parseFloat(item.price).toLocaleString("en-BD")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
