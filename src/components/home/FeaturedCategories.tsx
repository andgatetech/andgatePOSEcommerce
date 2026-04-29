"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { ROUTES, ROUTE_BUILDERS } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import GeneratedImageFallback from "@/components/shared/GeneratedImageFallback";
import type { Category } from "@/types";

const scrollAmount = 320;

interface FeaturedCategoriesProps {
  categories: Category[];
}

export default function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollRail = (direction: "left" | "right") => {
    railRef.current?.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-4 pb-8 md:px-8 md:pb-10 lg:px-12 lg:pb-14">
      <div className="mx-auto">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-(--color-primary-900) md:text-[38px]">
              Featured Categories
            </h2>
          </div>

          <Link
            href={ROUTES.CATEGORY}
            className="inline-flex items-center gap-3 self-start rounded-full bg-(--color-primary) px-5 py-3 text-[15px] font-semibold text-white shadow-[0_14px_28px_rgba(44,95,138,0.24)] transition hover:bg-(--color-primary-dark)"
          >
            Explore Collection
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-(--color-primary-900)">
              <FiArrowUpRight className="text-[18px]" />
            </span>
          </Link>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center">
            <button
              type="button"
              aria-label="Scroll categories left"
              onClick={() => scrollRail("left")}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-(--color-primary-900) shadow-[0_10px_28px_rgba(15,23,42,0.14)] transition hover:bg-(--color-primary) hover:text-white"
            >
              <FiArrowLeft className="text-lg" />
            </button>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center">
            <button
              type="button"
              aria-label="Scroll categories right"
              onClick={() => scrollRail("right")}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-(--color-primary-900) shadow-[0_10px_28px_rgba(15,23,42,0.14)] transition hover:bg-(--color-primary) hover:text-white"
            >
              <FiArrowRight className="text-lg" />
            </button>
          </div>

          <div
            ref={railRef}
            className="flex gap-5 overflow-x-auto px-10 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => {
              return (
                <Link
                  key={category.id}
                  href={ROUTE_BUILDERS.categoryDetail(category.slug)}
                  className="group min-w-[160px] flex-1 px-4 py-6 text-center transition-transform duration-300 hover:-translate-y-1 sm:min-w-[180px]"
                >
                  <div
                    className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-[#F3F4F6] transition-transform duration-200 group-hover:scale-105 group-hover:shadow-[0_14px_30px_rgba(44,95,138,0.12)]"
                  >
                    {resolveImageUrl(category.image_url) ? (
                      <Image
                        src={resolveImageUrl(category.image_url)!}
                        alt={category.name}
                        width={92}
                        height={92}
                        unoptimized
                        className="h-auto w-auto max-h-[88px] max-w-[88px] object-contain"
                      />
                    ) : (
                      <GeneratedImageFallback
                        name={category.name}
                        kind="category"
                        className="h-20 w-20 rounded-full border"
                        iconClassName="text-[18px]"
                        textClassName="text-[22px]"
                      />
                    )}
                  </div>

                  <h3 className="line-clamp-2 text-[17px] font-semibold leading-[1.35] text-(--color-primary-900)">
                    {category.name}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
