"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import {
  FiChevronLeft,
  FiChevronRight,
  FiShield,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import { ROUTES } from "@/config/routes";
import Container from "@/components/shared/Container";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    badge: "Bangladesh marketplace",
    discount: "Trusted stores",
    heading: "Shop smarter from verified local stores.",
    description:
      "Discover daily essentials, fashion, electronics, and lifestyle products from sellers connected through AndgatePOS.",
    image: "/images/hawkeri/home/hero-local-market.jpg",
    bg: "#dff1ff",
  },
  {
    id: 2,
    badge: "Fresh picks",
    discount: "New arrivals",
    heading: "Find products customers are buying now.",
    description:
      "Browse popular products, compare prices, and add favorites to your cart in a clean shopping flow.",
    image: "/images/hawkeri/home/hero-fashion-shop.jpg",
    bg: "#c7e3f4",
  },
  {
    id: 3,
    badge: "Easy checkout",
    discount: "COD ready",
    heading: "Order with confidence across Bangladesh.",
    description:
      "Cash on delivery, local delivery partners, and order tracking help shoppers buy with less uncertainty.",
    image: "/images/hawkeri/home/hero-delivery.jpg",
    bg: "#fff0db",
  },
  {
    id: 4,
    badge: "For every shop",
    discount: "Hawkeri stores",
    heading: "From neighborhood shops to online carts.",
    description:
      "Hawkeri brings Bangladeshi SME products online so buyers can discover more stores in one place.",
    image: "/images/hawkeri/home/hero-beauty-counter.jpg",
    bg: "#d6ecfb",
  },
];

const trustItems = [
  { label: "Verified seller network", icon: FiShield },
  { label: "Fast local delivery flow", icon: FiTruck },
  { label: "Curated product discovery", icon: FiShoppingBag },
];

export default function HeroBanner() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full bg-gradient-to-b from-(--color-primary-50)/80 via-white to-white py-4 md:py-6">
      <Container>
        <div className="relative overflow-hidden rounded-[24px] border border-(--color-primary-100) bg-white shadow-[0_24px_70px_rgba(2,58,92,0.10)] md:rounded-[30px]">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{
              prevEl: ".banner-prev",
              nextEl: ".banner-next",
            }}
            loop
            speed={700}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full rounded-2xl md:rounded-3xl"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div
                  className="relative w-full overflow-hidden"
                  style={{ backgroundColor: slide.bg }}
                >
                  <div className="mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
                    <div className="flex min-h-[350px] flex-col items-center md:min-h-[430px] md:flex-row lg:min-h-[480px]">
                      <div className="z-10 w-full pb-7 pt-10 md:w-[52%] md:py-14 lg:py-18">
                        <div className="mb-5 flex items-center gap-3">
                          <span
                            className="rounded-full bg-white/70 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] shadow-sm backdrop-blur"
                            style={{ color: "#023a5c" }}
                          >
                            {slide.badge}
                          </span>
                          <span className="rounded-full bg-(--color-cta) px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-[0_10px_20px_rgba(231,145,55,0.28)]">
                            {slide.discount}
                          </span>
                        </div>

                        <h1 className="mb-4 max-w-[560px] text-[30px] font-extrabold leading-[1.08] tracking-[-0.02em] text-(--color-primary-900) md:text-[40px] lg:text-[52px] xl:text-[58px]">
                          {slide.heading}
                        </h1>

                        <p className="mb-7 max-w-[500px] text-[15px] leading-[1.75] text-slate-700 md:text-[16px]">
                          {slide.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            href={ROUTES.PRODUCT}
                            className="group inline-flex items-center gap-2.5 rounded-full bg-(--color-cta) px-6 py-3 text-[14px] font-bold text-white shadow-[0_16px_34px_rgba(231,145,55,0.28)] transition-all duration-300 hover:bg-(--color-cta-hover)"
                          >
                            Shop products
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/95 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                              <GoArrowUpRight className="text-xs text-(--color-cta-dark)" />
                            </span>
                          </Link>

                          <Link
                            href={ROUTES.STORE}
                            className="inline-flex items-center rounded-full border border-(--color-primary-900)/15 bg-white/72 px-5 py-3 text-[14px] font-bold text-(--color-primary-900) backdrop-blur-sm transition-all duration-300 hover:bg-white"
                          >
                            Explore stores
                          </Link>
                        </div>

                        <div className="mt-7 grid max-w-[560px] gap-2 sm:grid-cols-3">
                          {trustItems.map((item) => (
                            <div
                              key={item.label}
                              className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/68 px-3 py-2 text-[12px] font-semibold text-(--color-primary-900) shadow-sm backdrop-blur"
                            >
                              <item.icon className="h-4 w-4 shrink-0 text-(--color-primary)" />
                              <span>{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="relative hidden w-full items-center justify-center md:flex md:w-[48%] md:justify-end">
                        <div className="relative h-[300px] w-full max-w-[520px] overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_28px_60px_rgba(2,58,92,0.16)] lg:h-[390px] xl:h-[430px]">
                          <Image
                            src={slide.image}
                            alt={slide.heading}
                            fill
                            priority={slide.id === 1}
                            fetchPriority={slide.id === 1 ? "high" : undefined}
                            sizes="(max-width: 768px) 100vw, 42vw"
                            className="object-cover transition duration-700"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,58,92,0.02)_0%,rgba(2,58,92,0.10)_55%,rgba(2,58,92,0.40)_100%)]" />
                          <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/30 bg-white/86 px-4 py-3 shadow-[0_18px_38px_rgba(2,58,92,0.14)] backdrop-blur-md">
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-(--color-neutral-dark)">Hawkeri promise</p>
                            <p className="mt-1 text-sm font-extrabold text-(--color-primary-900)">Local products, easier shopping</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            aria-label="Previous hero slide"
            className="banner-prev absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-all duration-300 md:left-6 md:h-10 md:w-10"
            style={{ background: "rgba(255,255,255,0.25)" }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = "rgba(255,255,255,0.55)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = "rgba(255,255,255,0.25)";
            }}
          >
            <FiChevronLeft className="text-lg text-[#4a5568]" />
          </button>
          <button
            type="button"
            aria-label="Next hero slide"
            className="banner-next absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-all duration-300 md:right-6 md:h-10 md:w-10"
            style={{ background: "rgba(255,255,255,0.25)" }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = "rgba(255,255,255,0.55)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = "rgba(255,255,255,0.25)";
            }}
          >
            <FiChevronRight className="text-lg text-[#4a5568]" />
          </button>

          <div className="pointer-events-none absolute -bottom-[1px] left-1/2 z-20 hidden -translate-x-1/2 items-end md:flex">
            <svg width="40" height="40" viewBox="0 0 40 40" className="block">
              <path d="M40,0 Q40,40 0,40 L40,40 Z" fill="white" />
            </svg>
            <div className="pointer-events-auto rounded-t-[32px] bg-white px-14 pb-5 pt-7">
              <div className="flex items-center justify-center gap-2.5">
                {slides.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    aria-label={`Go to hero slide ${index + 1}`}
                    aria-current={activeIndex === index ? "step" : undefined}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    className="relative h-2.5 w-[42px] cursor-pointer rounded-full transition-colors duration-300"
                    style={{
                      background: activeIndex === index ? "#046ca9" : "#d1d5db",
                      border: "none",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
            <svg width="40" height="40" viewBox="0 0 40 40" className="block">
              <path d="M0,0 Q0,40 40,40 L0,40 Z" fill="white" />
            </svg>
          </div>
        </div>
      </Container>
    </section>
  );
}
