"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CategoryItem = {
  id: string;
  name: string;
  image: string;
};

export default function CategoryGallery() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    let active = true;

    async function loadCategories() {
      const response = await fetch("/category/categories.json");
      const data = (await response.json()) as CategoryItem[];
      if (active) {
        setCategories(data);
      }
    }

    loadCategories().catch(() => {
      if (active) {
        setCategories([]);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="bg-(--color-bg) px-4 pb-8 pt-12 md:px-8 md:pb-10 md:pt-14 lg:px-12 lg:pb-14 lg:pt-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 text-center">
          <span className="inline-flex rounded-full border border-(--color-primary-200) bg-(--color-primary-100) px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-(--color-primary)">
            Category
          </span>
          <h1 className="mt-5 text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark) md:text-[46px]">
            Category
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-(--color-text-muted) md:text-base">
            Production-ready mock category listing for now. The layout is structured so these cards can be replaced with dynamic category data later without changing the overall design.
          </p>
        </div>

        <div className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-4 shadow-[0_24px_60px_rgba(17,17,17,0.06)] md:p-5 xl:p-6">
          <div className="grid grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 xl:gap-x-3 xl:gap-y-7">
            {categories.map((category) => (
              <article
                key={category.id}
                className="group flex flex-col items-center text-center"
              >
                <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#F7F7F8] transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_rgba(44,95,138,0.14)] sm:h-[94px] sm:w-[94px] md:h-[102px] md:w-[102px]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={84}
                    height={84}
                    className="h-auto w-auto max-h-[68px] max-w-[68px] object-contain sm:max-h-[76px] sm:max-w-[76px] md:max-h-[84px] md:max-w-[84px]"
                  />
                </div>
                <h2 className="mt-3 max-w-[112px] text-[12px] font-semibold leading-[1.18] tracking-[-0.03em] text-(--color-dark) sm:text-[13px] md:max-w-[124px] md:text-[14px]">
                  {category.name}
                </h2>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
