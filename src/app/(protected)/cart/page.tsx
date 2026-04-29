"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import {
  FiAlertTriangle,
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
import { getStockQuantityMap, getStockIssues } from "@/lib/stockCheck";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import {
  useCheckStockQuery,
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} from "@/features/cart/cartApi";
import { clearGuestCart, removeGuestCartItem, syncGuestCartStock, updateGuestCartItem } from "@/features/cart/guestCartSlice";
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
    <div className="relative h-[96px] w-[96px] shrink-0 overflow-hidden rounded-[20px] bg-[#f7f7f9] sm:h-[108px] sm:w-[108px]">
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

function CartItemRow({
  item,
  isAuthenticated,
  checkedStockQuantity,
  isStockChecking,
}: {
  item: CartItemData;
  isAuthenticated: boolean;
  checkedStockQuantity?: number;
  isStockChecking: boolean;
}) {
  const dispatch = useAppDispatch();
  const [updateItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
  const [removeItem, { isLoading: isRemoving }] = useRemoveCartItemMutation();
  const [toggleWishlist, { isLoading: isTogglingWishlist }] = useToggleWishlistMutation();

  const effectiveAvailableQty = checkedStockQuantity ?? Number(item.stock.available_qty);
  const isOutOfStock = effectiveAvailableQty <= 0;
  const hasInsufficientStock = checkedStockQuantity !== undefined && item.quantity > checkedStockQuantity;

  const [quantityInput, setQuantityInput] = useState(String(item.quantity));

  useEffect(() => {
    setQuantityInput(String(item.quantity));
  }, [item.quantity]);

  const variantLabel = item.stock.variant_data
    ? Object.entries(item.stock.variant_data)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ")
    : item.stock.sku;

  async function applyQuantity(next: number) {
    if (next === item.quantity) return;
    if (!isAuthenticated) {
      dispatch(updateGuestCartItem({ cart_id: item.id, quantity: next }));
      return;
    }
    const result = await updateItem({ cart_id: item.id, quantity: next });
    if ("error" in result) toast.error("Failed to update quantity.");
  }

  async function handleDecrement() {
    if (item.quantity <= 1) return;
    await applyQuantity(item.quantity - 1);
  }

  async function handleIncrement() {
    if (item.quantity >= effectiveAvailableQty) {
      toast.error("Cannot add more than available stock.");
      return;
    }
    await applyQuantity(item.quantity + 1);
  }

  function handleQuantityInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantityInput(event.target.value.replace(/[^0-9]/g, ""));
  }

  async function commitQuantityInput() {
    const parsed = parseInt(quantityInput, 10);
    const maxAllowed = Math.max(1, effectiveAvailableQty);
    let next: number;
    if (!Number.isFinite(parsed) || parsed < 1) {
      next = 1;
    } else if (parsed > effectiveAvailableQty) {
      next = maxAllowed;
      if (effectiveAvailableQty > 0) {
        toast.error(`Only ${effectiveAvailableQty} available.`);
      }
    } else {
      next = parsed;
    }
    setQuantityInput(String(next));
    if (isOutOfStock) return;
    await applyQuantity(next);
  }

  function handleQuantityKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
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
    <article className="grid min-h-[146px] gap-4 px-4 py-4 md:grid-cols-[minmax(0,1.8fr)_0.55fr_0.6fr_0.55fr_0.35fr] md:items-center md:px-4">
      <div className="flex gap-3 sm:gap-4">
        <ProductImage images={item.stock.images} name={item.stock.product_name} />

        <div className="min-w-0 pt-1">
          <h2 className="text-[15px] font-semibold tracking-[-0.02em] text-(--color-dark) sm:text-base md:truncate">
            {item.stock.product_name}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-(--color-text-muted)">
            <span>{variantLabel}</span>
          </div>

          <p className="mt-2 text-sm text-(--color-dark)">
            Stock:{" "}
            <span className={
              isStockChecking
                ? "text-(--color-text-muted)"
                : isOutOfStock || hasInsufficientStock
                  ? "font-medium text-(--color-danger)"
                  : "font-medium text-green-600"
            }>
              {isStockChecking
                ? "Checking..."
                : isOutOfStock
                  ? "Out of stock"
                  : hasInsufficientStock
                    ? `Only ${effectiveAvailableQty} available`
                    : `${effectiveAvailableQty} available`}
            </span>
          </p>

          <p className="mt-1 text-xs text-(--color-text-muted)">{item.store.store_name}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-[18px] bg-[#f8fafc] p-3 md:hidden">
        <div className="rounded-[14px] bg-white px-2.5 py-3 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-(--color-text-muted)">
            Price
          </span>
          <span className="mt-1 block text-sm font-bold text-(--color-dark)">
            {formatPrice(item.stock.price)}
          </span>
        </div>
        <div className="rounded-[14px] bg-white px-2.5 py-3 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-(--color-text-muted)">
            Qty
          </span>
          <div className="mt-2 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-(--color-border) bg-(--color-bg) px-2 py-1.5">
              <button
                type="button"
                disabled={isBusy || item.quantity <= 1}
                onClick={handleDecrement}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100) disabled:opacity-40"
              >
                <FiMinus size={14} />
              </button>
              <input
                type="text"
                inputMode="numeric"
                value={quantityInput}
                onChange={handleQuantityInputChange}
                onBlur={commitQuantityInput}
                onKeyDown={handleQuantityKeyDown}
                disabled={isBusy || isOutOfStock}
                aria-label="Quantity"
                style={{ width: `${Math.max(quantityInput.length + 1, 2)}ch` }}
                className="mx-1 bg-transparent text-center text-sm font-semibold text-(--color-dark) outline-none focus:ring-1 focus:ring-(--color-primary) rounded disabled:opacity-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                disabled={isBusy || item.quantity >= effectiveAvailableQty}
                onClick={handleIncrement}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100) disabled:opacity-40"
              >
                <FiPlus size={14} />
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-[14px] bg-white px-2.5 py-3 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-(--color-text-muted)">
            Total
          </span>
          <span className="mt-1 block text-sm font-bold text-(--color-dark)">
            {formatPrice(item.subtotal)}
          </span>
        </div>
      </div>

      <div className="hidden items-center justify-between gap-3 rounded-[16px] bg-[#f8fafc] px-3 py-2.5 md:block md:rounded-none md:bg-transparent md:px-0 md:py-0">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
          Price
        </span>
        <span className="text-base font-bold text-(--color-dark)">
          {formatPrice(item.stock.price)}
        </span>
      </div>

      <div className="hidden items-center justify-between gap-3 rounded-[16px] bg-[#f8fafc] px-3 py-2.5 md:block md:rounded-none md:bg-transparent md:px-0 md:py-0">
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
          <input
            type="text"
            inputMode="numeric"
            value={quantityInput}
            onChange={handleQuantityInputChange}
            onBlur={commitQuantityInput}
            onKeyDown={handleQuantityKeyDown}
            disabled={isBusy || isOutOfStock}
            aria-label="Quantity"
            style={{ width: `${Math.max(quantityInput.length + 1, 3)}ch` }}
            className="mx-1 bg-transparent text-center text-base font-semibold text-(--color-dark) outline-none focus:ring-1 focus:ring-(--color-primary) rounded disabled:opacity-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            disabled={isBusy || item.quantity >= effectiveAvailableQty}
            onClick={handleIncrement}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100) disabled:opacity-40"
          >
            <FiPlus size={15} />
          </button>
        </div>
      </div>

      <div className="hidden items-center justify-between gap-3 rounded-[16px] bg-[#f8fafc] px-3 py-2.5 md:block md:rounded-none md:bg-transparent md:px-0 md:py-0">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
          Total
        </span>
        <span className="text-base font-bold text-(--color-dark)">
          {formatPrice(item.subtotal)}
        </span>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-(--color-border) pt-3 text-(--color-dark) md:justify-start md:border-t-0 md:pt-0">
        <button
          type="button"
          disabled={isTogglingWishlist}
          onClick={handleMoveToWishlist}
          title="Save to wishlist"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-white transition hover:border-(--color-primary-200) hover:text-(--color-primary) disabled:opacity-40"
        >
          <FiHeart size={20} />
        </button>
        <button
          type="button"
          disabled={isRemoving}
          onClick={handleRemove}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-white transition hover:border-[rgba(220,38,38,0.2)] hover:text-(--color-danger) disabled:opacity-40"
        >
          <FiTrash2 size={20} />
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

  const stockIds = useMemo(
    () => Array.from(new Set(items.map((item) => item.stock.id))).sort((a, b) => a - b),
    [items],
  );
  const {
    data: stockCheckData,
    isFetching: isCheckingStock,
    isError: isStockCheckError,
  } = useCheckStockQuery(
    stockIds.length > 0 ? { stock_ids: stockIds } : skipToken,
    { refetchOnMountOrArgChange: true },
  );
  const checkedStockQuantityById = useMemo(
    () => getStockQuantityMap(stockCheckData?.stocks),
    [stockCheckData?.stocks],
  );
  const stockIssues = useMemo(
    () => getStockIssues(items, stockCheckData?.stocks),
    [items, stockCheckData?.stocks],
  );
  const hasStockIssues = stockIssues.length > 0;

  useEffect(() => {
    if (hasActiveSession || !stockCheckData?.stocks) return;
    dispatch(
      syncGuestCartStock(
        stockCheckData.stocks.map((s) => ({ stockId: s.stock_id, availableQty: s.quantity })),
      ),
    );
  }, [dispatch, hasActiveSession, stockCheckData]);

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
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-(--color-text-muted)">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)">
            <FiHome className="text-[17px]" />
            <span>Home</span>
          </Link>
          <span>&bull;</span>
          <span>Cart</span>
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
              className="inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)">
              Start Shopping
              <FiChevronRight />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px]">
            <div>
              <div className="mb-4 flex flex-col gap-3 rounded-[20px] border border-(--color-border) bg-white p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-(--color-dark)">
                    {itemCount} item(s)
                  </span>
                  <span className="rounded-full bg-(--color-primary-100) px-3 py-1 text-xs font-semibold text-(--color-primary)">
                    Cart ready
                  </span>
                </div>
                <button
                  type="button"
                  disabled={isClearing}
                  onClick={handleClearCart}
                  className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-[rgba(220,38,38,0.12)] bg-[#fff7f8] px-4 font-semibold text-(--color-danger) transition hover:opacity-80 disabled:opacity-40">
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

                {hasStockIssues ? (
                  <div className="flex items-center gap-2 border-b border-[#f6ccd4] bg-[#fff7f8] px-4 py-3 text-sm text-(--color-danger)">
                    <FiAlertTriangle className="shrink-0" />
                    {stockIssues.some((issue) => issue.availableQuantity <= 0)
                      ? "One or more items are out of stock."
                      : "Some items exceed available stock. Please adjust quantities."}
                  </div>
                ) : isStockCheckError ? (
                  <div className="flex items-center gap-2 border-b border-[#f7e2a7] bg-[#fff9e8] px-4 py-3 text-sm text-[#8a5c00]">
                    <FiAlertTriangle className="shrink-0" />
                    Stock could not be verified. It will be checked again at
                    checkout.
                  </div>
                ) : null}

                <div className="divide-y divide-(--color-border)">
                  {items.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      isAuthenticated={hasActiveSession}
                      checkedStockQuantity={checkedStockQuantityById.get(
                        item.stock.id,
                      )}
                      isStockChecking={isCheckingStock}
                    />
                  ))}
                </div>

                <div className="h-3 bg-(--color-bg)" />
              </div>
            </div>

            <aside className="h-fit rounded-[22px] border border-(--color-border) bg-(--color-bg) p-4.5 max-sm:p-4 xl:sticky xl:top-16">
              <div className="mb-5 rounded-full bg-[#eef6ef] px-4.5 py-3 text-center text-sm font-semibold text-(--color-dark) sm:text-left">
                <span className="text-(--color-primary)">Free shipping</span> on
                all orders
              </div>

              <div className="rounded-[20px] border border-(--color-border) p-4.5 max-sm:p-4">
                <h2 className="text-base font-semibold tracking-[-0.02em] text-(--color-dark)">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-(--color-text-muted)">Sub-Total</span>
                    <span className="font-medium text-(--color-dark)">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                  <div className="border-t border-(--color-border) pt-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-(--color-dark)">
                        Total
                      </span>
                      <span className="text-base font-bold text-(--color-dark)">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 space-y-3">
                {hasStockIssues ? (
                  <button
                    type="button"
                    disabled
                    onClick={() =>
                      toast.error("Please fix stock issues before checkout.")
                    }
                    className="flex min-h-[54px] w-full items-center justify-center rounded-full bg-(--color-primary) px-6 text-sm font-semibold text-white opacity-50 cursor-not-allowed">
                    <FiShoppingBag className="mr-2" />
                    Proceed to checkout
                  </button>
                ) : (
                  <Link
                    href={ROUTES.CHECKOUT}
                    className="flex min-h-[54px] items-center justify-center rounded-full bg-(--color-primary) px-6 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)">
                    <FiShoppingBag className="mr-2" />
                    Proceed to checkout
                  </Link>
                )}

                <Link
                  href={ROUTES.SHOP}
                  className="flex min-h-[54px] items-center justify-center rounded-full border border-(--color-primary) bg-(--color-primary-100) px-6 text-sm font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-(--color-bg)">
                  Continue Shopping
                  <FiChevronRight className="ml-2" />
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
      <ServiceHighlights/>
    </section>
  );
}
