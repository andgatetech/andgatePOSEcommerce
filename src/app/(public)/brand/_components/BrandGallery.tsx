"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type BrandItem = {
  id: string;
  name: string;
  image: string;
};

export default function BrandGallery() {
  const [brands, setBrands] = useState<BrandItem[]>([]);

  useEffect(() => {
    let active = true;

    async function loadBrands() {
      const response = await fetch("/brand/brands.json");
      const data = (await response.json()) as BrandItem[];
      if (active) {
        setBrands(data);
      }
    }

    loadBrands().catch(() => {
      if (active) {
        setBrands([]);
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
            Brand
          </span>
          <h1 className="mt-5 text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark) md:text-[46px]">
            Brand
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-(--color-text-muted) md:text-base">
            Mock brand listing prepared for future dynamic integration. The visual system matches the category page and stays within the current global theme tokens.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9">
          {brands.map((brand) => (
            <article
              key={brand.id}
              className="group rounded-[18px] border border-(--color-border) bg-(--color-bg) p-2.5 shadow-[0_14px_30px_rgba(17,17,17,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:border-(--color-primary-200)"
            >
              <div className="flex h-[88px] items-center justify-center rounded-[16px] bg-[#F7F7F8] sm:h-[96px] md:h-[104px]">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={120}
                  height={72}
                  className="h-auto w-auto max-h-[64px] max-w-[120px] object-contain sm:max-h-[70px] sm:max-w-[132px] md:max-h-[76px] md:max-w-[144px]"
                />
              </div>
              <h2 className="mt-2.5 text-center text-[12px] font-semibold leading-[1.18] tracking-[-0.03em] text-(--color-dark) sm:text-[13px] md:text-[14px]">
                {brand.name}
              </h2>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
