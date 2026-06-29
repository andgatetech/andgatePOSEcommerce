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

// @ts-expect-error Swiper CSS imports are handled by Next's bundler.
import "swiper/css";
// @ts-expect-error Swiper CSS imports are handled by Next's bundler.
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    badge: "Bangladesh marketplace",
    discount: "Verified stores",
    heading: "Shop local stores without the usual guesswork.",
    description:
      "Discover grocery, fashion, beauty, electronics, and daily essentials from sellers connected through the AndgatePOS commerce network.",
    image: "/images/hawkeri/home/hero-local-market.jpg",
    bg: "#dff1ff",
  },
  {
    id: 2,
    badge: "Fresh picks",
    discount: "New arrivals",
    heading: "Find the products shoppers are choosing now.",
    description:
      "Browse popular products, compare prices, and add favorites to your cart in a clean shopping flow.",
    image: "/images/hawkeri/home/hero-fashion-shop.jpg",
    bg: "#c7e3f4",
  },
  {
    id: 3,
    badge: "Easy checkout",
    discount: "COD ready",
    heading: "Order with confidence, from cart to doorstep.",
    description:
      "Cash on delivery, digital payment options, courier-ready fulfillment, and order tracking help shoppers buy with less uncertainty.",
    image: "/images/hawkeri/home/hero-delivery.jpg",
    bg: "#fff0db",
  },
  {
    id: 4,
    badge: "For every shop",
    discount: "Hawkeri stores",
    heading: "From neighborhood shops to online carts.",
    description:
      "Hawkeri brings Bangladeshi SME products online so buyers can discover neighborhood shops, local brands, and practical daily products in one place.",
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
    <section className="relative w-full overflow-hidden bg-white">
      <Container className="px-0 sm:px-4 md:px-5 lg:px-7 xl:px-8">
        <div className="relative overflow-hidden border-b border-(--color-primary-100) bg-(--color-primary-50)">
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
            className="w-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div
                  className="relative w-full overflow-hidden"
                  style={{ backgroundColor: slide.bg }}
                >
                  <div className="absolute inset-0 md:hidden">
                    <Image
                      src={slide.image}
                      alt=""
                      fill
                      priority={slide.id === 1}
                      fetchPriority={slide.id === 1 ? "high" : undefined}
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.76)_48%,rgba(255,255,255,0.94)_100%)]" />
                  </div>

                  <div className="relative mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
                    <div className="flex min-h-[560px] flex-col items-start justify-center pb-20 pt-10 md:min-h-[430px] md:flex-row md:items-center md:py-0 lg:min-h-[500px]">
                      <div className="z-10 w-full md:w-[52%] md:py-14 lg:py-18">
                        <div className="mb-5 flex items-center gap-3">
                          <span
                            className="rounded-full bg-white/78 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] shadow-sm backdrop-blur sm:text-[12px]"
                            style={{ color: "#023a5c" }}
                          >
                            {slide.badge}
                          </span>
                          <span className="rounded-full bg-(--color-cta) px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-[0_10px_20px_rgba(231,145,55,0.28)]">
                            {slide.discount}
                          </span>
                        </div>

                        <h2 className="mb-4 max-w-[560px] text-[32px] font-extrabold leading-[1.08] text-(--color-primary-900) sm:text-[38px] md:text-[40px] lg:text-[52px] xl:text-[58px]">
                          {slide.heading}
                        </h2>

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
                            className="inline-flex items-center rounded-full border border-(--color-primary-900)/15 bg-white/76 px-5 py-3 text-[14px] font-bold text-(--color-primary-900) backdrop-blur-sm transition-all duration-300 hover:bg-white"
                          >
                            Explore stores
                          </Link>
                        </div>

                        <div className="mt-7 grid max-w-[560px] gap-2 sm:grid-cols-3">
                          {trustItems.map((item) => (
                            <div
                              key={item.label}
                              className="flex min-h-12 items-center gap-2 rounded-[8px] border border-white/70 bg-white/76 px-3 py-2 text-[12px] font-semibold text-(--color-primary-900) shadow-sm backdrop-blur"
                            >
                              <item.icon className="h-4 w-4 shrink-0 text-(--color-primary)" />
                              <span>{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="relative hidden w-full items-center justify-center md:flex md:w-[48%] md:justify-end">
                        <div className="relative h-[320px] w-full max-w-[540px] overflow-hidden rounded-[8px] border border-white/70 bg-white shadow-[0_28px_60px_rgba(2,58,92,0.16)] lg:h-[410px] xl:h-[450px]">
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
                          <div className="absolute bottom-4 left-4 right-4 rounded-[8px] border border-white/30 bg-white/86 px-4 py-3 shadow-[0_18px_38px_rgba(2,58,92,0.14)] backdrop-blur-md">
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
            className="banner-prev absolute left-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-all duration-300 sm:left-3 md:flex md:left-6 md:h-10 md:w-10"
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
            className="banner-next absolute right-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-all duration-300 sm:right-3 md:flex md:right-6 md:h-10 md:w-10"
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

          <div className="pointer-events-auto absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/50 bg-white/86 px-4 py-3 shadow-[0_14px_36px_rgba(2,58,92,0.14)] backdrop-blur">
            <div className="flex items-center justify-center gap-2.5">
              {slides.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  aria-label={`Go to hero slide ${index + 1}`}
                  aria-current={activeIndex === index ? "step" : undefined}
                  onClick={() => swiperRef.current?.slideToLoop(index)}
                  className="relative h-2.5 w-8 cursor-pointer rounded-full transition-colors duration-300 sm:w-[42px]"
                  style={{
                    background: activeIndex === index ? "#046ca9" : "#d1d5db",
                    border: "none",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
