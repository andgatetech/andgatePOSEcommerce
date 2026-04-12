"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiShoppingCart } from "react-icons/fi";
import { dealsOfTheDay } from "@/components/home/dealsOfTheDayData";
import { ROUTES } from "@/config/routes";

const labels = ["Days", "Hours", "Mins", "Sec"];

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      style={{ color: index < rating ? "var(--color-warning)" : "var(--color-border)" }}
    >
      ★
    </span>
  ));
}

/**
 * Generate a deterministic "random" countdown (in total seconds) for a deal.
 * Uses the current date + deal ID as a seed so every deal gets a unique
 * but consistent countdown that resets daily.
 * Different deals get different ranges — some have days, some only hours,
 * some are almost expiring — so the grid looks natural and varied.
 * Guarantees a countdown is always active (never shows all zeros).
 */
function getDealEndTime(dealId: number): number {
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Simple hash from date string + dealId
  const seed = `${todayMidnight.toISOString()}-deal-${dealId}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  hash = Math.abs(hash);

  // Each deal gets a different range based on its slot
  const slot = dealId % 4;
  let minSeconds: number;
  let maxSeconds: number;
  switch (slot) {
    case 0: // multi-day deal (2–5 days)
      minSeconds = 2 * 24 * 60 * 60;
      maxSeconds = 5 * 24 * 60 * 60;
      break;
    case 1: // about a day (14–30 hours)
      minSeconds = 14 * 60 * 60;
      maxSeconds = 30 * 60 * 60;
      break;
    case 2: // hours only (3–10 hours)
      minSeconds = 3 * 60 * 60;
      maxSeconds = 10 * 60 * 60;
      break;
    case 3: // almost expiring (30 min – 2.5 hours)
    default:
      minSeconds = 30 * 60;
      maxSeconds = 2.5 * 60 * 60;
      break;
  }

  const range = maxSeconds - minSeconds;
  const baseOffset = minSeconds + (hash % range);

  // End time anchored to midnight
  let endTimestamp = todayMidnight.getTime() + baseOffset * 1000;
  let remaining = Math.floor((endTimestamp - now.getTime()) / 1000);

  // If already expired, cycle forward: add a recurring window from NOW
  // so the deal always has a live countdown
  if (remaining <= 0) {
    const cycleMin = 2 * 60 * 60;   // at least 2 hours
    const cycleMax = 18 * 60 * 60;  // up to 18 hours
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

export default function DealsOfTheDay() {
  const [isMounted, setIsMounted] = useState(false);
  const [countdowns, setCountdowns] = useState<Record<number, number>>({});

  useEffect(() => {
    setIsMounted(true);
    // Initialize countdowns
    setCountdowns(() => {
      const initial: Record<number, number> = {};
      dealsOfTheDay.forEach((deal) => {
        initial[deal.id] = getDealEndTime(deal.id);
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
  }, []);

  return (
    <section id="deals-of-the-day" className="px-4 pb-12 pt-2 md:px-8 md:pb-14 lg:px-12 lg:pb-16">
      <div className="mx-auto max-w-[1680px]">
        {/* Section Header */}
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

        {/* Cards Grid */}
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
          {dealsOfTheDay.map((deal) => {
            const remaining = countdowns[deal.id] ?? 0;
            const time = formatCountdown(remaining);
            const timeValues = isMounted 
              ? [time.days, time.hours, time.mins, time.secs] 
              : ["00", "00", "00", "00"];

            return (
              <article key={deal.id} className="group relative">

                {/* Product Image */}
                <div className="relative h-[200px] overflow-hidden rounded-[18px]">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                {/* Countdown Timer — centered, straddling image/card boundary */}
                <div className="absolute left-1/2 z-20 flex -translate-x-1/2 items-center gap-[6px]" style={{ top: "calc(200px - 70px)" }}>
                  {timeValues.map((value, index) => (
                    <div
                      key={`${deal.id}-${labels[index]}`}
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

                {/* Floating White Info Card */}
                <div className="relative z-10 mx-3 -mt-10 rounded-[12px] bg-white px-5 pb-5 pt-[44px] shadow-[0_8px_28px_rgba(15,23,42,0.09)]">
                  {/* Title */}
                  <h3 className="min-h-[48px] text-[16px] font-semibold leading-[1.3] text-(--color-primary-900) line-clamp-2">
                    {deal.title}
                  </h3>

                  {/* Stars */}
                  <div className="mt-2 flex items-center gap-2 text-[16px] leading-none">
                    <div className="flex items-center gap-[1px]">
                      {renderStars(deal.rating)}
                    </div>
                    <span className="text-[13px] text-(--color-text-muted)">
                      ({deal.rating}.0)
                    </span>
                  </div>

                  {/* Vendor */}
                  <p className="mt-2 text-[14px] text-(--color-text-muted)">
                    By <span className="text-(--color-primary)">{deal.vendor}</span>
                  </p>

                  {/* Price + Add Button */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-end gap-2">
                      <span className="text-[18px] font-semibold text-(--color-primary)">
                        ৳{deal.price.toFixed(2)}
                      </span>
                      <span className="mb-[2px] text-[13px] font-medium text-(--color-text-muted) line-through">
                        ৳{deal.oldPrice}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-[6px] rounded-[6px] bg-(--color-primary) px-4 py-[9px] text-[14px] font-semibold text-white transition hover:bg-(--color-primary-dark)"
                    >
                      <FiShoppingCart className="text-sm" />
                      Add
                    </button>
                  </div>
                </div>

              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
