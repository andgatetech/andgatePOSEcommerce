"use client";

import { ROUTE_BUILDERS } from "@/config/routes";
import {
  useGetWishlistQuery,
  useToggleWishlistMutation,
} from "@/features/wishlist/wishlistApi";
import { useAppSelector } from "@/lib/hooks";
import { resolveImageUrl } from "@/lib/imageUrl";
import GeneratedImageFallback from "@/components/shared/GeneratedImageFallback";
import type { EcommerceProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiHeart, FiStar } from "react-icons/fi";
import AddToCartButton from "./AddToCartButton";

type PopularProductCardProps = {
  product: EcommerceProduct;
};

export default function PopularProductCard({
  product,
}: PopularProductCardProps) {
  const primaryImage = resolveImageUrl(product.images[0]?.url ?? null);
  const displayPrice = product.promotion?.deal_price ?? product.price;
  const originalPrice = product.promotion?.original_price;
  const price = parseFloat(displayPrice).toLocaleString("en-BD");
  const originalPriceText = originalPrice
    ? parseFloat(originalPrice).toLocaleString("en-BD")
    : null;
  const dealEndsAt = product.promotion?.ends_at
    ? new Date(product.promotion.ends_at)
    : null;
  const stockCount = parseFloat(product.quantity);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [toggleWishlist, { isLoading: isTogglingWishlist }] =
    useToggleWishlistMutation();
  const { data: wishlistData } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });

  const isWishlisted =
    wishlistData?.items.some((item) => item.stock.id === product.id) ?? false;


  async function handleToggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to save items.");
      return;
    }
    const result = await toggleWishlist({ stock_id: product.id });
    if ("error" in result) {
      toast.error("Failed to update wishlist.");
    } else if ("data" in result) {
      toast.success(
        result.data.data.added
          ? "Added to wishlist."
          : "Removed from wishlist.",
      );
    }
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-(--color-primary-100) bg-white shadow-[0_14px_42px_rgba(2,58,92,0.07)] transition duration-300 hover:-translate-y-1.5 hover:border-(--color-primary-200) hover:shadow-[0_22px_60px_rgba(2,58,92,0.14)]">
      <div className="relative">
        <button
          type="button"
          aria-label={`Save ${product.product_name} to wishlist`}
          onClick={handleToggleWishlist}
          disabled={isTogglingWishlist}
          className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-(--color-border) bg-white/95 shadow-[0_8px_22px_rgba(19,45,69,0.08)] transition hover:border-(--color-primary-200) hover:text-(--color-primary) disabled:opacity-50 ${
            isWishlisted
              ? "text-(--color-primary)"
              : "text-(--color-primary-900)"
          }`}>
          <FiHeart
            className={`text-[18px] ${isWishlisted ? "fill-(--color-primary)" : ""}`}
          />
        </button>

        <Link href={ROUTE_BUILDERS.productDetail(product.slug)}>
          <div className="relative aspect-square overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,var(--color-primary-50)_100%)]">
            <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-bold text-(--color-primary-900) shadow-sm backdrop-blur">
              <FiStar className="h-3 w-3 fill-(--color-cta) text-(--color-cta)" />
              Popular
            </div>
            {primaryImage ? (
              <>
                <Image
                  src={primaryImage}
                  alt={product.product_name}
                  fill
                  sizes="(max-width: 639px) 50vw, (max-width: 1279px) 33vw, 20vw"
                  className="object-contain p-5 transition duration-500 group-hover:scale-[1.07]"
                />
                <div className="pointer-events-none absolute inset-x-8 bottom-4 h-6 rounded-full bg-(--color-primary-900)/[0.08] blur-xl" />
              </>
            ) : (
              <GeneratedImageFallback
                name={product.product_name}
                kind="product"
                showLabel
                className="h-full w-full border-0"
                iconClassName="text-[24px]"
                textClassName="text-[30px]"
              />
            )}
          </div>
        </Link>
      </div>

      <Link href={ROUTE_BUILDERS.productDetail(product.slug)} className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col px-4 pb-2 pt-4">
          {product.category && (
            <p className="inline-flex w-fit rounded-full bg-(--color-primary-50) px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-(--color-primary)">
              {product.category.name}
            </p>
          )}

          <h3 className="mt-3 line-clamp-2 min-h-[42px] text-[15px] font-extrabold leading-[1.35] tracking-[-0.02em] text-(--color-primary-900)">
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
              <span className="text-(--color-danger) font-medium">
                Out of stock
              </span>
            )}
          </p>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-[21px] font-extrabold tracking-[-0.03em] text-(--color-primary)">
              ৳{price}
            </span>
            {originalPriceText && originalPrice !== displayPrice ? (
              <span className="pb-[2px] text-[13px] text-(--color-text-muted) line-through">
                ৳{originalPriceText}
              </span>
            ) : null}
          </div>
          {dealEndsAt && !Number.isNaN(dealEndsAt.getTime()) ? (
            <p className="mt-1 text-[12px] font-medium text-(--color-primary)">
              Ends {dealEndsAt.toLocaleString("en-BD", {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          ) : null}
        </div>
      </Link>

      {/* Add to Cart — outside Link so it's never inside an <a> tag */}
      <div className="px-4 pb-4">
        <AddToCartButton
          stockId={product.id}
          stockCount={stockCount}
          product={{
            id: product.id,
            slug: product.slug,
            sku: product.sku,
            price: displayPrice,
            available_qty: stockCount,
            variant_data: product.variant_data,
            product_name: product.product_name,
            description: product.description,
            images: product.images,
            store: {
              id: 0,
              store_name: product.sold_by.store_name,
              slug: product.sold_by.store_slug,
            },
          }}
          className="mt-3 w-full shadow-[0_12px_24px_rgba(231,145,55,0.22)]"
        />
      </div>
    </div>
  );
}
