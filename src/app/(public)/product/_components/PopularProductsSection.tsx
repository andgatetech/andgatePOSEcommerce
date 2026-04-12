import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import PopularProductCard from "./PopularProductCard";
import { ROUTES } from "@/config/routes";
import type { EcommerceProduct } from "@/types";

interface PopularProductsSectionProps {
  products: EcommerceProduct[];
}

export default function PopularProductsSection({ products }: PopularProductsSectionProps) {
  return (
    <section id="trending" className="px-4 pb-8 md:px-8 md:pb-10 lg:px-10 lg:pb-14">
      <div className="mx-auto max-w-[1720px]">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-(--color-primary-200) bg-(--color-primary-100) px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-(--color-primary)">
              Curated Picks
            </span>
            <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.03em] text-(--color-primary-900) md:text-[38px]">
              Popular Products
            </h2>
          </div>

          <Link
            href={ROUTES.PRODUCT}
            className="inline-flex items-center gap-3 self-start rounded-full bg-(--color-primary) px-5 py-3 text-[15px] font-semibold text-white shadow-[0_14px_28px_rgba(44,95,138,0.24)] transition hover:bg-(--color-primary-dark)"
          >
            Explore Collection
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-(--color-primary-900)">
              <FiArrowUpRight className="text-[18px]" />
            </span>
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            {products.map((product) => (
              <PopularProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[24px] border border-dashed border-(--color-border) bg-(--color-primary-100) px-6 py-12 text-center">
            <p className="text-sm text-(--color-text-muted)">No products available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
