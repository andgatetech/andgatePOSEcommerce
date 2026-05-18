"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiClock, FiTag } from "react-icons/fi";
import { ROUTES, ROUTE_BUILDERS } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import GeneratedImageFallback from "@/components/shared/GeneratedImageFallback";
import AddToCartButton from "@/app/(public)/product/_components/AddToCartButton";
import Container from "@/components/shared/Container";
import type { EcommerceProduct } from "@/types";

function getDealEndTime(dealId: number): number {
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const seed = `${todayMidnight.toISOString()}-deal-${dealId}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  hash = Math.abs(hash);

  const slot = dealId % 4;
  let minSeconds: number;
  let maxSeconds: number;
  switch (slot) {
    case 0:
      minSeconds = 2 * 24 * 60 * 60;
      maxSeconds = 5 * 24 * 60 * 60;
      break;
    case 1:
      minSeconds = 14 * 60 * 60;
      maxSeconds = 30 * 60 * 60;
      break;
    case 2:
      minSeconds = 3 * 60 * 60;
      maxSeconds = 10 * 60 * 60;
      break;
    case 3:
    default:
      minSeconds = 30 * 60;
      maxSeconds = 2.5 * 60 * 60;
      break;
  }

  const range = maxSeconds - minSeconds;
  const baseOffset = minSeconds + (hash % range);

  let endTimestamp = todayMidnight.getTime() + baseOffset * 1000;
  let remaining = Math.floor((endTimestamp - now.getTime()) / 1000);

  if (remaining <= 0) {
    const cycleMin = 2 * 60 * 60;
    const cycleMax = 18 * 60 * 60;
    const cycleOffset = cycleMin + (hash % (cycleMax - cycleMin));
    remaining = cycleOffset - (Math.floor((now.getTime() - endTimestamp) / 1000) % cycleOffset);
    if (remaining <= 0) remaining = cycleOffset;
  }

  return remaining;
}

function getPromotionRemainingSeconds(endsAt?: string | null): number | null {
  if (!endsAt) return null;

  const endTime = new Date(endsAt).getTime();
  if (Number.isNaN(endTime)) return null;

  return Math.max(0, Math.floor((endTime - Date.now()) / 1000));
}

function formatCountdown(totalSeconds: number) {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${String(hours).padStart(2, "0")}h`;
  }

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

interface DealsOfTheDayProps {
  products: EcommerceProduct[];
}

export default function DealsOfTheDay({ products }: DealsOfTheDayProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [countdowns, setCountdowns] = useState<Record<number, number>>({});

  useEffect(() => {
    setIsMounted(true);
    setCountdowns(() => {
      const initial: Record<number, number> = {};
      products.forEach((p) => {
        initial[p.id] =
          getPromotionRemainingSeconds(p.promotion?.ends_at) ?? getDealEndTime(p.id);
      });
      return initial;
    });

    const interval = setInterval(() => {
      setCountdowns((prev) => {
        const next: Record<number, number> = {};
        for (const id in prev) {
          next[id] = Math.max(0, prev[id] - 1);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [products]);

  if (products.length === 0) return null;

  return (
    <section id="deals-of-the-day" className="pb-10 pt-2 md:pb-12">
      <Container>
        <div className="rounded-[20px] border border-(--color-primary-100) bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_54%,#f0fdfa_100%)] p-4 shadow-[0_16px_42px_rgba(15,23,42,0.05)] md:p-5">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[680px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-(--color-cta)/20 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-(--color-cta)">
                <FiTag className="text-[15px]" />
                Limited Offers
              </span>
              <h2 className="mt-2 text-[25px] font-semibold tracking-[-0.03em] text-(--color-primary-900) md:text-[32px]">
                Deals Of The Day
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-white px-3 py-2 text-[12px] font-semibold text-(--color-primary-900) shadow-[0_10px_22px_rgba(15,23,42,0.05)]">
                <FiClock className="text-[16px] text-(--color-cta)" />
                Live deal timers
              </div>
              <Link
                href={ROUTES.DEAL_OF_DAY}
                className="inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-4 py-2 text-[13px] font-semibold text-white shadow-[0_12px_24px_rgba(44,95,138,0.2)] transition hover:bg-(--color-primary-dark)"
              >
                All Deals
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-(--color-primary-900)">
                  <FiArrowUpRight className="text-[15px]" />
                </span>
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => {
            const remaining = countdowns[product.id] ?? 0;
            const timeText = isMounted ? formatCountdown(remaining) : "00:00:00";
            const image = resolveImageUrl(product.images[0]?.url ?? null);
            const displayPrice = product.promotion?.deal_price ?? product.price;
            const originalPrice = product.promotion?.original_price;
            const price = parseFloat(displayPrice);
            const originalPriceValue = originalPrice ? parseFloat(originalPrice) : null;
            const stockCount = parseFloat(product.quantity);
            const hasDiscount = originalPriceValue !== null && originalPriceValue > price;
            const discountPercent = hasDiscount
              ? Math.round(((originalPriceValue - price) / originalPriceValue) * 100)
              : null;

            return (
              <article
                key={product.id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-[14px] border border-(--color-border) bg-white shadow-[0_10px_26px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(15,23,42,0.09)]"
              >
                <Link href={ROUTE_BUILDERS.productDetail(product.slug)} className="block p-2 pb-0">
                  <div className="relative aspect-[5/4] overflow-hidden rounded-[12px] bg-[#f7f8fa]">
                    {discountPercent ? (
                      <span className="absolute left-2 top-2 z-10 rounded-full bg-(--color-cta) px-2 py-1 text-[10px] font-bold text-white shadow-[0_10px_18px_rgba(216,137,31,0.24)]">
                        {discountPercent}% OFF
                      </span>
                    ) : (
                      <span className="absolute left-2 top-2 z-10 rounded-full bg-(--color-primary) px-2 py-1 text-[10px] font-bold text-white shadow-[0_10px_18px_rgba(44,95,138,0.2)]">
                        Hot Deal
                      </span>
                    )}

                    <span className="absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-(--color-primary-900) shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
                      <FiClock className="text-[11px] text-(--color-cta)" />
                      {timeText}
                    </span>

                    {image ? (
                      <>
                        <Image
                          src={image}
                          alt={product.product_name}
                          fill
                          sizes="(max-width: 639px) 50vw, (max-width: 1279px) 25vw, 18vw"
                          className="object-contain p-3 transition duration-300 group-hover:scale-[1.05]"
                        />
                        <div className="pointer-events-none absolute inset-x-8 bottom-3 h-5 rounded-full bg-black/[0.06] blur-xl" />
                      </>
                    ) : (
                        <GeneratedImageFallback
                          name={product.product_name}
                          kind="product"
                          showLabel
                          className="h-full w-full border-0"
                          iconClassName="text-[24px]"
                          textClassName="text-[30px]"
                        />
                      )}
                  </div>
                </Link>

                <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5">
                  <Link href={ROUTE_BUILDERS.productDetail(product.slug)}>
                    <h3 className="min-h-[34px] text-[13px] font-semibold leading-[1.28] text-(--color-primary-900) line-clamp-2">
                      {product.product_name}
                    </h3>
                  </Link>

                  <p className="mt-1 truncate text-[12px] text-(--color-text-muted)">
                    By{" "}
                    <Link
                      href={ROUTE_BUILDERS.storeDetail(product.sold_by.store_slug)}
                      className="font-medium text-(--color-primary) transition hover:text-(--color-primary-900)"
                    >
                      {product.sold_by.store_name}
                    </Link>
                  </p>

                  <div className="mt-2 flex flex-1 flex-col">
                    <div className="flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <span className="block text-[16px] font-bold leading-none text-(--color-primary)">
                          ৳{price.toLocaleString("en-BD", { minimumFractionDigits: 0 })}
                        </span>
                        {hasDiscount ? (
                          <span className="mt-1 block text-[12px] text-(--color-text-muted) line-through">
                            ৳{originalPriceValue.toLocaleString("en-BD", { maximumFractionDigits: 0 })}
                          </span>
                        ) : null}
                      </div>

                      {hasDiscount ? (
                        <span className="shrink-0 rounded-full bg-(--color-success)/10 px-2 py-1 text-[10px] font-semibold text-(--color-success)">
                          Save ৳{(originalPriceValue - price).toLocaleString("en-BD", { maximumFractionDigits: 0 })}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-3">
                    <AddToCartButton
                      stockId={product.id}
                      stockCount={stockCount}
                      product={{
                        id: product.id,
                        slug: product.slug,
                        sku: product.sku,
                        price: displayPrice,
                        available_qty: stockCount,
                        variant_data: product.variant_data,
                        product_name: product.product_name,
                        description: product.description,
                        images: product.images,
                        store: {
                          id: 0,
                          store_name: product.sold_by.store_name,
                          slug: product.sold_by.store_slug,
                        },
                      }}
                      className="w-full"
                    />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
          </div>
        </div>
      </Container>
    </section>
  );
}
