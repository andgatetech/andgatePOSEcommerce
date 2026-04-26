"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  FiChevronRight,
  FiHeart,
  FiHome,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";
import { ROUTES } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} from "@/features/cart/cartApi";
import { clearGuestCart, removeGuestCartItem, updateGuestCartItem } from "@/features/cart/guestCartSlice";
import { isTokenExpired } from "@/features/auth/authStorage";
import { useToggleWishlistMutation } from "@/features/wishlist/wishlistApi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import type { CartItemData } from "@/types";

function formatPrice(value: number | string) {
  return `৳${Number(value).toFixed(2)}`;
}

function ProductImage({ images, name }: { images: { id: number; url: string }[]; name: string }) {
  const src = resolveImageUrl(images[0]?.url);
  return (
    <div className="relative h-[108px] w-[108px] shrink-0 overflow-hidden rounded-[20px] bg-[#f7f7f9] max-sm:h-[88px] max-sm:w-[88px]">
      {src ? (
        <Image src={src} alt={name} fill unoptimized className="object-cover" sizes="108px" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-(--color-text-muted)">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}

function CartItemRow({ item, isAuthenticated }: { item: CartItemData; isAuthenticated: boolean }) {
  const dispatch = useAppDispatch();
  const [updateItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
  const [removeItem, { isLoading: isRemoving }] = useRemoveCartItemMutation();
  const [toggleWishlist, { isLoading: isTogglingWishlist }] = useToggleWishlistMutation();

  const variantLabel = item.stock.variant_data
    ? Object.entries(item.stock.variant_data)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ")
    : item.stock.sku;

  async function handleDecrement() {
    if (item.quantity <= 1) return;
    if (!isAuthenticated) {
      dispatch(updateGuestCartItem({ cart_id: item.id, quantity: item.quantity - 1 }));
      return;
    }
    const result = await updateItem({ cart_id: item.id, quantity: item.quantity - 1 });
    if ("error" in result) toast.error("Failed to update quantity.");
  }

  async function handleIncrement() {
    if (!isAuthenticated) {
      dispatch(updateGuestCartItem({ cart_id: item.id, quantity: item.quantity + 1 }));
      return;
    }
    const result = await updateItem({ cart_id: item.id, quantity: item.quantity + 1 });
    if ("error" in result) toast.error("Failed to update quantity.");
  }

  async function handleRemove() {
    if (!isAuthenticated) {
      dispatch(removeGuestCartItem(item.id));
      toast.success("Item removed from cart.");
      return;
    }
    const result = await removeItem(item.id);
    if ("error" in result) {
      toast.error("Failed to remove item.");
    } else {
      toast.success("Item removed from cart.");
    }
  }

  async function handleMoveToWishlist() {
    if (!isAuthenticated) {
      toast.error("Please login to save items.");
      return;
    }
    const result = await toggleWishlist({ stock_id: item.stock.id });
    if ("error" in result) {
      toast.error("Failed to save to wishlist.");
    } else if ("data" in result) {
      toast.success(result.data.data.added ? "Saved to wishlist." : "Removed from wishlist.");
    }
  }

  const isBusy = isUpdating || isRemoving;

  return (
    <article className="grid min-h-[146px] gap-4 px-4 py-3.5 md:grid-cols-[minmax(0,1.8fr)_0.55fr_0.6fr_0.55fr_0.35fr] md:items-center md:px-4">
      <div className="flex gap-4">
        <ProductImage images={item.stock.images} name={item.stock.product_name} />

        <div className="min-w-0 pt-1">
          <h2 className="truncate text-base font-semibold tracking-[-0.02em] text-(--color-dark) max-sm:text-[15px]">
            {item.stock.product_name}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-(--color-text-muted)">
            <span>{variantLabel}</span>
          </div>

          <p className="mt-2 text-sm text-(--color-dark)">
            Available:{" "}
            <span className="text-(--color-text-muted)">{item.stock.available_qty}</span>
          </p>

          <p className="mt-1 text-xs text-(--color-text-muted)">{item.store.store_name}</p>
        </div>
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
            disabled={isBusy || item.quantity <= 1}
            onClick={handleDecrement}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100) disabled:opacity-40"
          >
            <FiMinus size={15} />
          </button>
          <span className="min-w-10 text-center text-base font-semibold text-(--color-dark)">
            {item.quantity}
          </span>
          <button
            type="button"
            disabled={isBusy}
            onClick={handleIncrement}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100) disabled:opacity-40"
          >
            <FiPlus size={15} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 md:block">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
          Total
        </span>
        <span className="text-base font-bold text-(--color-dark)">
          {formatPrice(item.subtotal)}
        </span>
      </div>

      <div className="flex items-center gap-4 text-(--color-dark)">
        <button
          type="button"
          disabled={isTogglingWishlist}
          onClick={handleMoveToWishlist}
          title="Save to wishlist"
          className="transition hover:text-(--color-primary) disabled:opacity-40"
        >
          <FiHeart size={24} />
        </button>
        <button
          type="button"
          disabled={isRemoving}
          onClick={handleRemove}
          className="transition hover:text-(--color-danger) disabled:opacity-40"
        >
          <FiTrash2 size={24} />
        </button>
      </div>
    </article>
  );
}

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, expiresAt } = useAppSelector((state) => state.auth);
  const hasActiveSession = isAuthenticated && !isTokenExpired(expiresAt);
  const guestCart = useAppSelector((state) => state.guestCart);
  const { data, isLoading: isServerCartLoading } = useGetCartQuery(undefined, {
    skip: !hasActiveSession,
  });
  const [clearCart, { isLoading: isClearing }] = useClearCartMutation();

  const isLoading = hasActiveSession ? isServerCartLoading : !guestCart.isHydrated;
  const items = hasActiveSession ? (data?.items ?? []) : guestCart.items;
  const cartTotal = hasActiveSession
    ? (data?.cart_total ?? 0)
    : guestCart.items.reduce((sum, item) => sum + item.subtotal, 0);
  const itemCount = hasActiveSession
    ? (data?.item_count ?? 0)
    : guestCart.items.reduce((count, item) => count + item.quantity, 0);
  const total = cartTotal;

  async function handleClearCart() {
    if (items.length === 0) return;
    if (!hasActiveSession) {
      dispatch(clearGuestCart());
      toast.success("Cart cleared.");
      return;
    }
    const result = await clearCart();
    if ("error" in result) {
      toast.error("Failed to clear cart.");
    } else {
      toast.success("Cart cleared.");
    }
  }

  return (
    <section className="bg-(--color-bg)">
      <div className="mx-auto px-4 py-6 md:px-5 lg:px-7 xl:px-8 xl:py-8">
        <div className="mb-7 flex items-center gap-3 text-sm text-(--color-text-muted)">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)"
          >
            <FiHome className="text-[17px]" />
            <span>Home</span>
          </Link>
          <span>&bull;</span>
          <span>Cart</span>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-(--color-dark) max-sm:text-[24px]">
            Cart{" "}
            <span className="text-(--color-text-muted)">
              ({isLoading ? "…" : `${itemCount} item${itemCount === 1 ? "" : "s"}`})
            </span>
          </h1>
        </div>

        {isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center text-(--color-text-muted)">
            Loading cart…
          </div>
        ) : items.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-(--color-text-muted)">
            <FiShoppingBag size={48} className="opacity-30" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <Link
              href={ROUTES.SHOP}
              className="inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
            >
              Start Shopping
              <FiChevronRight />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px]">
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4 text-sm">
                <span className="font-semibold text-(--color-dark)">{itemCount} item(s)</span>
                <button
                  type="button"
                  disabled={isClearing}
                  onClick={handleClearCart}
                  className="inline-flex items-center gap-2 font-semibold text-(--color-danger) transition hover:opacity-80 disabled:opacity-40"
                >
                  <FiTrash2 />
                  Remove All
                </button>
              </div>

              <div className="overflow-hidden rounded-[22px] border border-(--color-border) bg-(--color-bg)">
                <div className="hidden grid-cols-[minmax(0,1.8fr)_0.55fr_0.6fr_0.55fr_0.35fr] items-center gap-4 bg-[#f4f6f8] px-4 py-3 text-sm font-semibold text-(--color-dark) md:grid">
                  <span>Product</span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Total Price</span>
                  <span>Action</span>
                </div>

                <div className="divide-y divide-(--color-border)">
                  {items.map((item) => (
                    <CartItemRow key={item.id} item={item} isAuthenticated={hasActiveSession} />
                  ))}
                </div>

                <div className="h-3 bg-(--color-bg)" />
              </div>
            </div>

            <aside className="h-fit rounded-[22px] border border-(--color-border) bg-(--color-bg) p-4.5 max-sm:p-4">
              <div className="mb-5 rounded-full bg-[#eef6ef] px-4.5 py-3 text-sm font-semibold text-(--color-dark)">
                <span className="text-(--color-primary)">Free shipping</span> on all orders
              </div>

              <div className="rounded-[20px] border border-(--color-border) p-4.5 max-sm:p-4">
                <h2 className="text-base font-semibold tracking-[-0.02em] text-(--color-dark)">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-(--color-text-muted)">Sub-Total</span>
                    <span className="font-medium text-(--color-dark)">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="border-t border-(--color-border) pt-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-(--color-dark)">Total</span>
                      <span className="text-base font-bold text-(--color-dark)">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 space-y-3">
                <Link
                  href={ROUTES.CHECKOUT}
                  className="flex min-h-[54px] items-center justify-center rounded-full bg-(--color-primary) px-6 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
                >
                  <FiShoppingBag className="mr-2" />
                  Proceed to checkout
                </Link>

                <Link
                  href={ROUTES.SHOP}
                  className="flex min-h-[54px] items-center justify-center rounded-full border border-(--color-primary) bg-(--color-primary-100) px-6 text-sm font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-(--color-bg)"
                >
                  Continue Shopping
                  <FiChevronRight className="ml-2" />
                </Link>
              </div>
            </aside>
          </div>
        )}

        <ServiceHighlights className="mt-10" />
      </div>
    </section>
  );
}
