"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import { ROUTES } from "@/config/routes";

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
    <section className="relative w-full px-4 md:px-8 lg:px-12 py-4 md:py-6">
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            prevEl: ".banner-prev",
            nextEl: ".banner-next",
          }}
          loop={true}
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
                <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
                  <div className="flex flex-col md:flex-row items-center min-h-[340px] md:min-h-[420px] lg:min-h-[480px]">
                  {/* Left Content */}
                  <div className="w-full md:w-[48%] z-10 pt-14 pb-6 md:py-16 lg:py-20">
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="text-[13px] font-semibold italic"
                        style={{ color: "#3d5a6e" }}
                      >
                        {slide.badge}
                      </span>
                      <span className="text-[11px] font-bold bg-[#4ade80] text-white px-3 py-[3px] rounded-[4px] tracking-wide uppercase">
                        {slide.discount}
                      </span>
                    </div>

                    <h1 className="text-[28px] md:text-[36px] lg:text-[44px] xl:text-[50px] font-bold text-[#1a1a2e] leading-[1.15] mb-4 tracking-[-0.02em]">
                      {slide.heading}
                    </h1>

                    <p className="text-[14px] md:text-[15px] text-[#5a6a7a] max-w-[420px] mb-7 leading-[1.7]">
                      {slide.description}
                    </p>

                    <Link href={ROUTES.LOGIN} className="inline-block">
                      <button className="group inline-flex items-center gap-2.5 bg-[#facc15] hover:bg-[#eab308] text-[#1a1a2e] font-semibold text-[14px] px-6 py-3 rounded-full transition-all duration-300 cursor-pointer">
                        Shop Now
                        <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                          <GoArrowUpRight className="text-[#1a1a2e] text-xs" />
                        </span>
                      </button>
                    </Link>
                  </div>

                  {/* Right Image */}
                  <div className="w-full md:w-[52%] relative flex justify-center md:justify-end items-end self-end">
                    <div className="relative w-full max-w-[520px] h-[240px] md:h-[320px] lg:h-[400px] xl:h-[440px]">
                      <Image
                        src={slide.image}
                        alt={slide.heading}
                        fill
                        unoptimized={true}
                        sizes="(max-width: 768px) 100vw, 52vw"
                        className="object-contain object-bottom"
                        priority={slide.id === 1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        </Swiper>

        {/* Navigation Arrows */}
      <button
        className="banner-prev absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
        style={{ background: "rgba(255,255,255,0.25)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.55)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.25)")
        }
      >
        <FiChevronLeft className="text-lg text-[#4a5568]" />
      </button>
      <button
        className="banner-next absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
        style={{ background: "rgba(255,255,255,0.25)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.55)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.25)")
        }
      >
        <FiChevronRight className="text-lg text-[#4a5568]" />
      </button>

        {/* Pagination - Curved white tab at bottom center */}
        <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 z-20 flex items-end pointer-events-none">
          {/* Left curve wing */}
          <svg width="40" height="40" viewBox="0 0 40 40" className="block">
            <path d="M40,0 Q40,40 0,40 L40,40 Z" fill="white" />
          </svg>
          {/* Center pill with dots */}
          <div className="bg-white px-14 pt-7 pb-5 rounded-t-[32px] pointer-events-auto">
            <div className="flex items-center gap-2.5 justify-center">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiperRef.current?.slideToLoop(index)}
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    width: activeIndex === index ? "42px" : "10px",
                    height: "10px",
                    borderRadius: activeIndex === index ? "5px" : "50%",
                    background: activeIndex === index ? "#0d9488" : "#d1d5db",
                    border: "none",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
          {/* Right curve wing */}
          <svg width="40" height="40" viewBox="0 0 40 40" className="block">
            <path d="M0,0 Q0,40 40,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </div>
    </section>
  );
}
