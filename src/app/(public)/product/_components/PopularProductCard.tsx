"use client";

import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { ROUTE_BUILDERS } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import type { EcommerceProduct } from "@/types";

type PopularProductCardProps = {
  product: EcommerceProduct;
};

export default function PopularProductCard({ product }: PopularProductCardProps) {
  const primaryImage = resolveImageUrl(product.images[0]?.url ?? null);
  const price = parseFloat(product.price).toLocaleString("en-BD");
  const stockCount = parseFloat(product.quantity);

  return (
    <Link
      href={ROUTE_BUILDERS.productDetail(product.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-(--color-border) bg-white shadow-[0_10px_35px_rgba(19,45,69,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(19,45,69,0.12)]"
    >
      <div className="relative p-4 pb-3">
        <button
          type="button"
          aria-label={`Save ${product.product_name} to wishlist`}
          onClick={(e) => e.preventDefault()}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-(--color-border) bg-white/95 text-(--color-primary-900) shadow-[0_8px_22px_rgba(19,45,69,0.08)] transition hover:border-(--color-primary-200) hover:text-(--color-primary)"
        >
          <FiHeart className="text-[18px]" />
        </button>

        <div className="relative flex h-[176px] items-center justify-center overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,var(--color-primary-100),#ffffff)]">
          {primaryImage ? (
            <>
              <div className="absolute inset-x-10 bottom-2 h-8 rounded-full bg-(--color-primary-100) blur-2xl" />
              <Image
                src={primaryImage}
                alt={product.product_name}
                fill
                unoptimized
                className="object-contain p-9 transition duration-300 group-hover:scale-[1.05]"
              />
            </>
          ) : (
            <span className="text-sm font-medium text-(--color-text-muted) px-6 text-center">
              {product.product_name}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4">
        {product.category && (
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-(--color-text-muted)">
            {product.category.name}
          </p>
        )}

        <h3 className="mt-2 line-clamp-2 min-h-[42px] text-[16px] font-semibold leading-[1.3] text-(--color-primary-900)">
          {product.product_name}
        </h3>

        {product.brand && (
          <p className="mt-1 text-[14px] text-(--color-text-muted)">
            By{" "}
            <span className="font-semibold text-(--color-primary)">
              {product.brand.name}
            </span>
          </p>
        )}

        <p className="mt-1 text-[13px] text-(--color-text-muted)">
          {stockCount > 0 ? (
            <span className="text-(--color-success) font-medium">In stock</span>
          ) : (
            <span className="text-(--color-danger) font-medium">Out of stock</span>
          )}
        </p>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-[18px] font-semibold text-(--color-primary)">
            ৳{price}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="mt-3 inline-flex w-full items-center justify-center gap-[6px] rounded-[12px] bg-(--color-primary) px-4 py-[10px] text-[14px] font-semibold text-white transition hover:bg-(--color-primary-dark)"
        >
          <FiShoppingCart className="text-sm" />
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
