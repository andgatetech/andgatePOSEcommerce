"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FiHeart,
  FiHome,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiTrash2,
} from "react-icons/fi";
import { ROUTES } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import { useGetWishlistQuery, useRemoveWishlistItemMutation } from "@/features/wishlist/wishlistApi";
import { useAddToCartMutation } from "@/features/cart/cartApi";
import type { WishlistItemData } from "@/types";

type WishlistContentProps = {
  variant?: "page" | "account";
};

function formatPrice(value: number | string) {
  return `৳${Number(value).toFixed(2)}`;
}

function WishlistProductImage({
  images,
  name,
  size,
}: {
  images: { id: number; url: string }[];
  name: string;
  size: number;
}) {
  const src = resolveImageUrl(images[0]?.url);
  return (
    <div
      style={{ width: size, height: size }}
      className="relative shrink-0 overflow-hidden rounded-[20px] bg-[#f5f7fa]"
    >
      {src ? (
        <Image src={src} alt={name} fill unoptimized className="object-cover" sizes={`${size}px`} />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xl font-bold text-(--color-text-muted)">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}

function WishlistItemRow({
  item,
  isAccount,
}: {
  item: WishlistItemData;
  isAccount: boolean;
}) {
  const [quantity, setQuantity] = useState(1);
  const [removeItem, { isLoading: isRemoving }] = useRemoveWishlistItemMutation();
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

  const stockStatus =
    item.stock.available_qty > 0
      ? `${item.stock.available_qty} In Stock`
      : "Out of Stock";

  async function handleRemove() {
    const result = await removeItem(item.id);
    if ("error" in result) {
      toast.error("Failed to remove from wishlist.");
    } else {
      toast.success("Removed from wishlist.");
    }
  }

  async function handleAddToCart() {
    const result = await addToCart({ stock_id: item.stock.id });
    if ("error" in result) {
      toast.error("Failed to add to cart.");
    } else if ("data" in result) {
      const msg = result.data.data ? result.data.message : "Added to cart!";
      toast.success(msg);
    }
  }

  return (
    <article
      className={`grid gap-4 px-4 py-4 md:items-center ${
        isAccount
          ? "md:grid-cols-[2fr_0.7fr_0.8fr_0.95fr_1.15fr_0.45fr] md:px-6"
          : "md:grid-cols-[2.2fr_0.7fr_0.8fr_0.95fr_1.15fr_0.45fr] md:px-7"
      }`}
    >
      <div className="flex gap-4">
        <WishlistProductImage
          images={item.stock.images}
          name={item.stock.product_name}
          size={isAccount ? 96 : 112}
        />

        <div className="min-w-0 pt-1">
          {isAccount ? (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-(--color-primary-100) px-3 py-1 text-xs font-semibold text-(--color-primary)">
              <FiHeart className="text-[12px]" />
              Saved Item
            </div>
          ) : null}
          <h2 className="truncate text-base font-semibold tracking-[-0.02em] text-(--color-dark)">
            {item.stock.product_name}
          </h2>
          <p className="mt-2 text-sm font-medium text-[#0f8f86]">{item.store.store_name}</p>
          {item.stock.variant_data ? (
            <p className="mt-1 text-xs text-(--color-text-muted)">
              {Object.entries(item.stock.variant_data)
                .map(([k, v]) => `${k}: ${v}`)
                .join(" · ")}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-3 md:block">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
          Stock
        </span>
        <span
          className={`text-base font-semibold ${
            item.stock.available_qty > 0 ? "text-(--color-dark)" : "text-(--color-danger)"
          }`}
        >
          {stockStatus}
        </span>
      </div>

      <div className="flex items-center gap-3 md:block">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
          Price
        </span>
        <span className="text-base font-bold text-(--color-dark)">
          {formatPrice(item.stock.price)}
        </span>
      </div>

      <div className="flex items-center gap-3 md:block">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
          Quantity
        </span>
        <div className="inline-flex items-center rounded-full border border-(--color-border) bg-(--color-bg) px-3 py-2">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100)"
          >
            <FiMinus size={15} />
          </button>
          <span className="min-w-10 text-center text-base font-semibold text-(--color-dark)">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100)"
          >
            <FiPlus size={15} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={isAddingToCart || item.stock.available_qty === 0}
          onClick={handleAddToCart}
          className={`inline-flex items-center justify-center rounded-full bg-(--color-primary) text-sm font-semibold text-(--color-bg) shadow-[0_10px_24px_rgba(44,95,138,0.18)] transition hover:bg-(--color-primary-dark) disabled:opacity-50 ${
            isAccount ? "min-h-[44px] px-5" : "min-h-[46px] px-6"
          }`}
        >
          <FiShoppingCart className="mr-2 text-[18px]" />
          {isAccount ? "Add" : "Add To Cart"}
        </button>
      </div>

      <div className="flex items-center md:justify-center">
        <button
          type="button"
          disabled={isRemoving}
          onClick={handleRemove}
          className="text-(--color-dark) transition hover:text-(--color-danger) disabled:opacity-40"
        >
          <FiTrash2 size={24} />
        </button>
      </div>
    </article>
  );
}

export default function WishlistContent({ variant = "page" }: WishlistContentProps) {
  const { data, isLoading } = useGetWishlistQuery();
  const isAccount = variant === "account";
  const items = data?.items ?? [];

  return (
    <div>
      {!isAccount ? (
        <div className="mb-7 flex items-center gap-3 text-sm text-(--color-text-muted)">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)"
          >
            <FiHome className="text-[17px]" />
            <span>Home</span>
          </Link>
          <span>&bull;</span>
          <span>Wishlist</span>
        </div>
      ) : null}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1
            className={`font-semibold tracking-[-0.04em] text-(--color-dark) ${
              isAccount ? "text-[34px]" : "text-[28px] max-sm:text-[24px]"
            }`}
          >
            {isAccount ? "Wishlist" : "Product Wishlist"}
          </h1>
          {isAccount ? (
            <p className="mt-2 text-sm text-(--color-text-muted)">
              {items.length} saved item{items.length === 1 ? "" : "s"}
            </p>
          ) : null}
        </div>
      </div>

      {isLoading ? (
        <div className="flex min-h-[200px] items-center justify-center text-(--color-text-muted)">
          Loading wishlist…
        </div>
      ) : items.length === 0 ? (
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 text-(--color-text-muted)">
          <FiHeart size={40} className="opacity-30" />
          <p className="text-sm font-medium">Your wishlist is empty</p>
          {!isAccount ? (
            <Link
              href={ROUTES.SHOP}
              className="inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
            >
              Browse Products
            </Link>
          ) : null}
        </div>
      ) : (
        <div
          className={`overflow-hidden border border-(--color-border) bg-(--color-bg) ${
            isAccount
              ? "rounded-[24px] shadow-[0_18px_40px_rgba(17,17,17,0.04)]"
              : "rounded-[22px]"
          }`}
        >
          <div
            className={`hidden items-center gap-4 bg-[#f4f6f8] text-sm font-semibold text-(--color-dark) md:grid ${
              isAccount
                ? "grid-cols-[2fr_0.7fr_0.8fr_0.95fr_1.15fr_0.45fr] px-6 py-4"
                : "grid-cols-[2.2fr_0.7fr_0.8fr_0.95fr_1.15fr_0.45fr] px-7 py-4"
            }`}
          >
            <span>Product</span>
            <span>{isAccount ? "Stock" : "Stock Status"}</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Buy Action</span>
            <span>Remove</span>
          </div>

          <div className="divide-y divide-(--color-border)">
            {items.map((item) => (
              <WishlistItemRow key={item.id} item={item} isAccount={isAccount} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
