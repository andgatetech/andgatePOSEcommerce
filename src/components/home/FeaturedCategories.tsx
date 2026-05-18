"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiGrid } from "react-icons/fi";
import { ROUTES, ROUTE_BUILDERS } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import Container from "@/components/shared/Container";
import type { Category } from "@/types";

interface FeaturedCategoriesProps {
  categories: Category[];
}

export default function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  if (categories.length === 0) return null;

  return (
    <section className="pb-8 md:pb-10">
      <Container>
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-(--color-primary-200) bg-(--color-primary-100) px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-(--color-primary)">
              Shop By Category
            </span>
            <h2 className="mt-2 text-[25px] font-semibold tracking-[-0.03em] text-(--color-primary-900) md:text-[32px]">
              Featured Categories
            </h2>
          </div>

          <Link
            href={ROUTES.CATEGORY}
            className="inline-flex items-center gap-2 self-start rounded-full bg-(--color-primary) px-4 py-2 text-[13px] font-semibold text-white shadow-[0_12px_24px_rgba(44,95,138,0.2)] transition hover:bg-(--color-primary-dark)"
          >
            Browse Categories
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-(--color-primary-900)">
              <FiArrowUpRight className="text-[15px]" />
            </span>
          </Link>
        </div>

        <div className="rounded-[20px] border border-(--color-border) bg-white p-3 shadow-[0_14px_36px_rgba(15,23,42,0.05)] md:p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10">
            {categories.map((category) => {
              const image = resolveImageUrl(category.image_url);

              return (
                <Link
                  key={category.id}
                  href={ROUTE_BUILDERS.categoryDetail(category.slug)}
                  className="group min-w-0 rounded-[14px] border border-(--color-border) bg-[#f8fafc] p-2 text-center transition duration-300 hover:-translate-y-0.5 hover:border-(--color-primary-200) hover:bg-white hover:shadow-[0_14px_28px_rgba(15,23,42,0.08)]"
                >
                  <div className="relative mx-auto mb-2 flex aspect-square w-full max-w-[92px] items-center justify-center overflow-hidden rounded-[12px] bg-white">
                    {image ? (
                      <Image
                        src={image}
                        alt={category.name}
                        fill
                        sizes="120px"
                        className="object-contain p-2.5 transition duration-300 group-hover:scale-[1.06]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#eef7f8_0%,#fff7ed_100%)] text-(--color-primary)">
                        <FiGrid className="text-[26px]" />
                      </div>
                    )}
                  </div>

                  <h3 className="line-clamp-2 min-h-[32px] text-[12px] font-semibold leading-[1.3] text-(--color-primary-900) md:text-[13px]">
                    {category.name}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
