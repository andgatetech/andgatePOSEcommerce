"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { ROUTES, ROUTE_BUILDERS } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
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
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-(--color-primary-900) md:text-[38px]">
              Featured Categories
            </h2>
            <Link
              href={ROUTES.CATEGORY}
              className="rounded-full border border-(--color-border) px-4 py-2 text-sm font-medium text-(--color-primary-900) transition hover:border-(--color-primary) hover:text-(--color-primary)"
            >
              See All
            </Link>
          </div>

          <div className="flex items-center gap-3 self-end lg:self-auto">
            <button
              type="button"
              aria-label="Scroll categories left"
              onClick={() => scrollRail("left")}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2f2f2] text-[#5d6671] transition hover:bg-[#e7e7e7]"
            >
              <FiArrowLeft className="text-lg" />
            </button>
            <button
              type="button"
              aria-label="Scroll categories right"
              onClick={() => scrollRail("right")}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2f2f2] text-[#5d6671] transition hover:bg-[#e7e7e7]"
            >
              <FiArrowRight className="text-lg" />
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                    <div className="h-16 w-16 rounded-full bg-(--color-primary-100)" aria-hidden />
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
    </section>
  );
}
