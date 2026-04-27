"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiShoppingCart } from "react-icons/fi";
import { ROUTES, ROUTE_BUILDERS } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import GeneratedImageFallback from "@/components/shared/GeneratedImageFallback";
import type { EcommerceProduct } from "@/types";

const labels = ["Days", "Hours", "Mins", "Sec"];

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

function formatCountdown(totalSeconds: number) {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    mins: String(mins).padStart(2, "0"),
    secs: String(secs).padStart(2, "0"),
  };
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
        initial[p.id] = getDealEndTime(p.id);
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
    <section id="deals-of-the-day" className="px-4 pb-12 pt-2 md:px-8 md:pb-14 lg:px-12 lg:pb-16">
      <div className="mx-auto">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-(--color-primary-900) md:text-[38px]">
              Deals Of The Day
            </h2>
          </div>

          <Link
            href={ROUTES.SHOP}
            className="inline-flex items-center gap-3 self-start rounded-full bg-(--color-primary) px-5 py-3 text-[15px] font-semibold text-white shadow-[0_14px_28px_rgba(44,95,138,0.24)] transition hover:bg-(--color-primary-dark)"
          >
            All Deals
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-(--color-primary-900)">
              <FiArrowUpRight className="text-[18px]" />
            </span>
          </Link>
        </div>

        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => {
            const remaining = countdowns[product.id] ?? 0;
            const time = formatCountdown(remaining);
            const timeValues = isMounted
              ? [time.days, time.hours, time.mins, time.secs]
              : ["00", "00", "00", "00"];
            const image = resolveImageUrl(product.images[0]?.url ?? null);
            const price = parseFloat(product.price);

            return (
              <Link
                key={product.id}
                href={ROUTE_BUILDERS.productDetail(product.slug)}
                className="group relative block"
              >
                <div className="relative h-[200px] overflow-hidden rounded-[18px]">
                  {image ? (
                    <Image
                      src={image}
                      alt={product.product_name}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
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

                <div className="absolute left-1/2 z-20 flex -translate-x-1/2 items-center gap-[6px]" style={{ top: "calc(200px - 70px)" }}>
                  {timeValues.map((value, index) => (
                    <div
                      key={`${product.id}-${labels[index]}`}
                      className="flex min-w-[66px] flex-col items-center rounded-[8px] bg-white px-2 py-[9px] shadow-[0_4px_14px_rgba(15,23,42,0.14)]"
                    >
                      <span className="text-[17px] font-semibold leading-none text-(--color-primary)">
                        {value}
                      </span>
                      <span className="mt-[6px] text-[12px] leading-none text-(--color-text-muted)">
                        {labels[index]}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 mx-3 -mt-10 rounded-[12px] bg-white px-5 pb-5 pt-[44px] shadow-[0_8px_28px_rgba(15,23,42,0.09)]">
                  <h3 className="min-h-[48px] text-[16px] font-semibold leading-[1.3] text-(--color-primary-900) line-clamp-2">
                    {product.product_name}
                  </h3>

                  <p className="mt-2 text-[14px] text-(--color-text-muted)">
                    By <span className="text-(--color-primary)">{product.sold_by.store_name}</span>
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-[18px] font-semibold text-(--color-primary)">
                      ৳{price.toLocaleString("en-BD", { minimumFractionDigits: 2 })}
                    </span>

                    <span className="inline-flex items-center gap-[6px] rounded-[6px] bg-(--color-primary) px-4 py-[9px] text-[14px] font-semibold text-white">
                      <FiShoppingCart className="text-sm" />
                      Add
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
