"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ROUTES } from "@/config/routes";
import Container from "@/components/shared/Container";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    badge: "Exclusive offer",
    discount: "25% OFF",
    heading: "Experience a Smarter, More Convenient Home.",
    description:
      "Smart lights, security systems, speakers, and IoT devices designed to bring convenience and intelligence to your everyday life.",
    image: "/images/banner/banner (3).png",
    bg: "#b8d4e3",
  },
  {
    id: 2,
    badge: "New Arrival",
    discount: "30% OFF",
    heading: "Premium Sound, Anytime, Anywhere.",
    description:
      "Discover the latest headphones, earbuds, and audio gear for an immersive music experience on the go.",
    image: "/images/banner/banner (1).png",
    bg: "#6fadcf",
  },
  {
    id: 3,
    badge: "Best Deal",
    discount: "20% OFF",
    heading: "Fresh Living Starts with Smart Appliances.",
    description:
      "Explore top-rated refrigerators, kitchen gadgets, and home essentials built for modern living.",
    image: "/images/banner/banner (2).png",
    bg: "#e8e4df",
  },
  {
    id: 4,
    badge: "Limited Time",
    discount: "40% OFF",
    heading: "Cinematic Experience Right at Home.",
    description:
      "Ultra HD smart TVs, projectors, and streaming devices to transform your living room into a theater.",
    image: "/images/banner/banner (4).png",
    bg: "#a8cde8",
  },
];

export default function HeroBanner() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full py-4 md:py-6">
      <Container>
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
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
                    <div className="flex min-h-[340px] flex-col items-center md:min-h-[420px] md:flex-row lg:min-h-[480px]">
                      <div className="z-10 w-full pb-6 pt-14 md:w-[48%] md:py-16 lg:py-20">
                        <div className="mb-5 flex items-center gap-3">
                          <span
                            className="text-[13px] font-semibold italic"
                            style={{ color: "#3d5a6e" }}
                          >
                            {slide.badge}
                          </span>
                          <span className="rounded-[4px] bg-[#166534] px-3 py-[3px] text-[11px] font-bold uppercase tracking-wide text-white">
                            {slide.discount}
                          </span>
                        </div>

                        <h1 className="mb-4 text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-[#1a1a2e] md:text-[36px] lg:text-[44px] xl:text-[50px]">
                          {slide.heading}
                        </h1>

                        <p className="mb-7 max-w-[420px] text-[14px] leading-[1.7] text-[#334155] md:text-[15px]">
                          {slide.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            href={ROUTES.PRODUCT}
                            className="group inline-flex items-center gap-2.5 rounded-full bg-[#facc15] px-6 py-3 text-[14px] font-semibold text-[#1a1a2e] transition-all duration-300 hover:bg-[#eab308]"
                          >
                            Shop Now
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                              <GoArrowUpRight className="text-xs text-[#1a1a2e]" />
                            </span>
                          </Link>

                          <Link
                            href={ROUTES.CATEGORY}
                            className="inline-flex items-center rounded-full border border-[#1a1a2e]/20 bg-white/30 px-5 py-3 text-[14px] font-semibold text-[#1a1a2e] backdrop-blur-sm transition-all duration-300 hover:bg-white/55"
                          >
                            Browse Categories
                          </Link>
                        </div>
                      </div>

                      <div className="relative flex w-full items-end justify-center self-end md:w-[52%] md:justify-end">
                        <div className="relative h-[240px] w-full max-w-[520px] md:h-[320px] lg:h-[400px] xl:h-[440px]">
                          <Image
                            src={slide.image}
                            alt={slide.heading}
                            fill
                            priority={slide.id === 1}
                            fetchPriority={slide.id === 1 ? "high" : undefined}
                            sizes="(max-width: 768px) 100vw, 52vw"
                            className="object-contain object-bottom"
                          />
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

          <div className="pointer-events-none absolute -bottom-[1px] left-1/2 z-20 flex -translate-x-1/2 items-end">
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
                      background: activeIndex === index ? "#0d9488" : "#d1d5db",
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
