"use client";

import { useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import {
  featuredCategoryItems,
} from "@/components/home/featuredCategoriesData";

const scrollAmount = 320;

export default function FeaturedCategories() {
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
            <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-[var(--color-primary-900)] md:text-[38px]">
              Featured Categories
            </h2>
            <button
              type="button"
              className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-primary-900)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              See All
            </button>
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
          className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {featuredCategoryItems.map((category) => {
            const Icon = category.icon;

            return (
              <article
                key={category.id}
                className="min-w-[150px] flex-1 rounded-[20px] px-4 py-6 text-center transition-transform duration-300 hover:-translate-y-1 sm:min-w-[160px]"
                style={{ backgroundColor: category.background }}
              >
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                  <Icon
                    className="text-[44px]"
                    style={{ color: category.accent }}
                  />
                </div>

                <h3 className="text-[17px] font-semibold text-[var(--color-primary-900)]">
                  {category.name}
                </h3>
                <p className="mt-1 text-[15px] text-[var(--color-text-muted)]">
                  {category.itemCount} items
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
