"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { ROUTES } from "@/config/routes";
import Container from "@/components/shared/Container";

const countdownTarget = new Date("2026-12-31T23:59:59");

type CountdownState = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const initialCountdownState: CountdownState = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

function getTimeLeft(): CountdownState {
  const diff = countdownTarget.getTime() - Date.now();

  if (diff <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

const timerCards = [
  { key: "days", label: "Days", background: "var(--color-success)" },
  { key: "hours", label: "Hours", background: "var(--color-warning)" },
  { key: "minutes", label: "Mins", background: "var(--color-primary-light)" },
  { key: "seconds", label: "Secs", background: "var(--color-primary)" },
] as const;

export default function CountdownPromoBanner() {
  const [timeLeft, setTimeLeft] = useState<CountdownState>(initialCountdownState);

  useEffect(() => {
    setTimeLeft(getTimeLeft());

    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="pb-16 md:pb-18 lg:pb-22">
      <Container>
        <div className="relative overflow-hidden rounded-[34px]">
          <Image
            src="/images/banner/countdown-bg.png"
            alt="Limited time countdown promotion"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--color-primary-900) 82%, transparent) 0%, color-mix(in srgb, var(--color-primary) 52%, transparent) 48%, color-mix(in srgb, var(--color-cta) 16%, transparent) 100%)",
            }}
          />

          <div className="relative z-10 flex min-h-[520px] items-center px-5 py-10 md:min-h-[620px] md:px-10 lg:px-14">
            <div className="max-w-[720px]">
              <span className="inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/92 backdrop-blur-sm">
                Last Chance Offer
              </span>

              <h2 className="mt-5 max-w-[520px] text-[34px] font-semibold leading-[0.98] tracking-[-0.05em] text-white md:text-[52px]">
                Midnight markdowns for your next favorite find
              </h2>

              <p className="mt-5 max-w-[500px] text-[15px] leading-7 text-white/82 md:text-[17px]">
                Catch limited-time pricing on audio, wearables, beauty, and
                everyday essentials before the countdown disappears.
              </p>

              <div className="mt-8 grid max-w-[620px] gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {timerCards.map((card) => (
                  <div
                    key={card.key}
                    className="rounded-[22px] border border-white/12 bg-white/12 px-5 py-5 text-white backdrop-blur-md">
                    <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-white/72">
                      {card.label}
                    </p>
                    <p className="mt-3 text-[36px] font-semibold leading-none tracking-[-0.05em] text-white">
                      {timeLeft[card.key]}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href={ROUTES.SHOP}
                  className="inline-flex items-center gap-3 rounded-full bg-(--color-bg) px-6 py-3 text-[16px] font-semibold text-(--color-primary-900) shadow-[0_18px_36px_rgba(15,23,42,0.22)] transition hover:bg-(--color-primary-100)">
                  Shop Flash Sale
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-primary-900) text-(--color-bg)">
                    <FiArrowUpRight className="text-[18px]" />
                  </span>
                </Link>

                <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-white/70">
                  Ends at midnight
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
