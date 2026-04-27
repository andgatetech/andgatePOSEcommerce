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
import { FiHeart } from "react-icons/fi";
import AddToCartButton from "./AddToCartButton";

type PopularProductCardProps = {
  product: EcommerceProduct;
};

export default function PopularProductCard({
  product,
}: PopularProductCardProps) {
  const primaryImage = resolveImageUrl(product.images[0]?.url ?? null);
  const price = parseFloat(product.price).toLocaleString("en-BD");
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
    <div className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-(--color-border) bg-white shadow-[0_10px_35px_rgba(19,45,69,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(19,45,69,0.12)]">
      {/* Clickable area → product detail page */}
      <Link href={ROUTE_BUILDERS.productDetail(product.slug)} className="flex flex-col">
        <div className="relative p-4 pb-3">
          <button
            type="button"
            aria-label={`Save ${product.product_name} to wishlist`}
            onClick={handleToggleWishlist}
            disabled={isTogglingWishlist}
            className={`absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-(--color-border) bg-white/95 shadow-[0_8px_22px_rgba(19,45,69,0.08)] transition hover:border-(--color-primary-200) hover:text-(--color-primary) disabled:opacity-50 ${
              isWishlisted
                ? "text-(--color-primary)"
                : "text-(--color-primary-900)"
            }`}>
            <FiHeart
              className={`text-[18px] ${isWishlisted ? "fill-(--color-primary)" : ""}`}
            />
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
        </div>

        <div className="flex flex-1 flex-col px-4 pb-2">
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
              <span className="text-(--color-danger) font-medium">
                Out of stock
              </span>
            )}
          </p>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-[18px] font-semibold text-(--color-primary)">
              ৳{price}
            </span>
          </div>
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
            price: product.price,
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
          className="mt-3 w-full"
        />
      </div>
    </div>
  );
}
