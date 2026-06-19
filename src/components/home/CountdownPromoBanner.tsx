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
    <section className="pb-14 md:pb-16 lg:pb-20">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] border border-(--color-primary-100) shadow-[0_24px_70px_rgba(2,58,92,0.12)]">
          <Image
            src="/images/banner/countdown-bg.png"
            alt="Limited time countdown promotion"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--color-primary-900) 90%, transparent) 0%, color-mix(in srgb, var(--color-primary) 70%, transparent) 48%, color-mix(in srgb, var(--color-cta) 46%, transparent) 100%)",
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,rgba(255,255,255,0.20),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(231,145,55,0.26),transparent_34%)]" />

          <div className="relative z-10 flex min-h-[460px] items-center px-5 py-10 md:min-h-[540px] md:px-10 lg:px-14">
            <div className="max-w-[720px]">
              <span className="inline-flex rounded-full border border-white/20 bg-white/12 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white/92 backdrop-blur-sm">
                Last Chance Offer
              </span>

              <h2 className="mt-5 max-w-[560px] text-[34px] font-extrabold leading-[0.98] tracking-[-0.05em] text-white md:text-[56px]">
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
                    className="rounded-[22px] border border-white/15 bg-white/14 px-5 py-5 text-white shadow-[0_18px_38px_rgba(2,58,92,0.18)] backdrop-blur-md">
                    <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-white/72">
                      {card.label}
                    </p>
                    <p className="mt-3 text-[36px] font-extrabold leading-none tracking-[-0.05em] text-white">
                      {timeLeft[card.key]}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href={ROUTES.DEAL_OF_DAY}
                  className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-[16px] font-bold text-(--color-primary-900) shadow-[0_18px_36px_rgba(15,23,42,0.22)] transition hover:bg-(--color-primary-100)">
                  Shop Flash Sale
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-cta) text-white">
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
