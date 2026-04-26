"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiMinus,
  FiPlus,
  FiRefreshCw,
  FiShoppingBag,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { ROUTES } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import { useClearCartMutation, useUpdateCartItemMutation, useRemoveCartItemMutation } from "@/features/cart/cartApi";
import { clearGuestCart, removeGuestCartItem, updateGuestCartItem } from "@/features/cart/guestCartSlice";
import { useAppDispatch } from "@/lib/hooks";
import type { CartItemData } from "@/types";

type CartDrawerProps = {
  isOpen: boolean;
  items: CartItemData[];
  isAuthenticated: boolean;
  onClose: () => void;
};

function formatPrice(value: number | string) {
  return `৳${Number(value).toFixed(2)}`;
}

function DrawerItemRow({ item, isAuthenticated }: { item: CartItemData; isAuthenticated: boolean }) {
  const dispatch = useAppDispatch();
  const [updateItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
  const [removeItem, { isLoading: isRemoving }] = useRemoveCartItemMutation();

  const imageSrc = resolveImageUrl(item.stock.images[0]?.url);
  const availableQty = Number(item.stock.available_qty);
  const isOutOfStock = availableQty <= 0;

  const [quantityInput, setQuantityInput] = useState(String(item.quantity));

  useEffect(() => {
    setQuantityInput(String(item.quantity));
  }, [item.quantity]);

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
    if (item.quantity >= availableQty) {
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
    const maxAllowed = Math.max(1, availableQty);
    let next: number;
    if (!Number.isFinite(parsed) || parsed < 1) {
      next = 1;
    } else if (parsed > availableQty) {
      next = maxAllowed;
      if (availableQty > 0) {
        toast.error(`Only ${availableQty} available.`);
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

  const isBusy = isUpdating || isRemoving;

  const variantLabel = item.stock.variant_data
    ? Object.entries(item.stock.variant_data)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ")
    : item.stock.sku;

  return (
    <article className="rounded-[22px] border border-[#e9edf2] bg-(--color-bg) px-3.5 py-2.5 shadow-[0_8px_22px_rgba(17,17,17,0.04)]">
      <div className="flex gap-3">
        <div className="relative h-[82px] w-[82px] shrink-0 overflow-hidden rounded-[16px] bg-[#f7f7f9] max-sm:h-[76px] max-sm:w-[76px]">
          {imageSrc ? (
            <Image src={imageSrc} alt={item.stock.product_name} fill unoptimized className="object-cover" sizes="82px" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl font-bold text-(--color-text-muted)">
              {item.stock.product_name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-[15px] font-semibold tracking-[-0.02em] text-(--color-dark)">
                {item.stock.product_name}
              </h3>
              <p className="mt-1 text-[11px] text-(--color-text-muted)">{variantLabel}</p>
            </div>

            <button
              type="button"
              disabled={isRemoving}
              onClick={handleRemove}
              className="rounded-full p-1 transition hover:bg-[#fff1f0] hover:text-(--color-danger) disabled:opacity-40"
            >
              <FiTrash2 size={16} />
            </button>
          </div>

          <div className="mt-auto flex items-end justify-between gap-2 pt-2.5">
            <span className="text-[14px] font-bold text-(--color-dark)">
              {formatPrice(item.stock.price)}
            </span>

            <div className="flex items-center rounded-full border border-[#dfe5ec] bg-(--color-bg) px-2 py-1 shadow-[0_4px_14px_rgba(17,17,17,0.03)]">
              <button
                type="button"
                disabled={isBusy || item.quantity <= 1}
                onClick={handleDecrement}
                className="flex h-6.5 w-6.5 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100) disabled:opacity-40"
              >
                <FiMinus size={13} />
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
                className="mx-0.5 bg-transparent text-center text-[15px] font-semibold text-(--color-dark) outline-none focus:ring-1 focus:ring-(--color-primary) rounded disabled:opacity-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                disabled={isBusy || item.quantity >= availableQty}
                onClick={handleIncrement}
                className="flex h-6.5 w-6.5 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100) disabled:opacity-40"
              >
                <FiPlus size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CartDrawer({ isOpen, items, isAuthenticated, onClose }: CartDrawerProps) {
  const dispatch = useAppDispatch();
  const [clearCart, { isLoading: isClearing }] = useClearCartMutation();

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);

  async function handleClearCart() {
    if (items.length === 0 || isClearing) return;

    if (!isAuthenticated) {
      dispatch(clearGuestCart());
      toast.success("Cart cleared.");
      return;
    }

    const result = await clearCart();
    if ("error" in result) {
      toast.error("Failed to clear cart.");
      return;
    }

    toast.success(result.data.message || "Cart cleared.");
  }

  return (
    <>
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-40 bg-black/35 transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        aria-hidden={!isOpen}
        aria-label="Cart products"
        className={`fixed bottom-3 right-3 top-3 z-50 flex w-full max-w-[540px] flex-col overflow-hidden rounded-[28px] bg-(--color-bg) shadow-[0_24px_80px_rgba(17,17,17,0.18)] transition-transform duration-300 max-sm:bottom-0 max-sm:right-0 max-sm:top-0 max-sm:max-w-full max-sm:rounded-none ${
          isOpen ? "translate-x-0" : "translate-x-[110%]"
        }`}
      >
        <div className="flex items-start justify-between border-b border-(--color-border) bg-(--color-bg) px-6 pb-3.5 pt-4.5 max-sm:px-4 max-sm:pb-3 max-sm:pt-4">
          <div>
            <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-dark) max-sm:text-[18px]">
              Cart Products
            </h2>
            <p className="mt-1 text-[14px] text-(--color-text-muted)">
              {items.length} Item{items.length === 1 ? "" : "s"} in Cart
            </p>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 ? (
              <button
                type="button"
                onClick={handleClearCart}
                disabled={isClearing}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-(--color-border) bg-[#f7f7f9] px-4 text-[13px] font-semibold text-(--color-dark) transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiRefreshCw className={isClearing ? "animate-spin" : ""} size={14} />
                {isClearing ? "Clearing..." : "Clear all"}
              </button>
            ) : null}

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-[#f7f7f9] text-(--color-dark) transition hover:bg-white"
            >
              <FiX size={22} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#fcfcfd] px-6 py-3 [scrollbar-color:var(--color-text-muted)_transparent] [scrollbar-width:thin] max-sm:px-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-(--color-text-muted)">
              <FiShoppingBag size={40} className="opacity-30" />
              <p className="text-sm font-medium">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {items.map((item) => (
                <DrawerItemRow key={item.id} item={item} isAuthenticated={isAuthenticated} />
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-(--color-border) bg-(--color-bg) px-6 pb-4 pt-3.5 shadow-[0_-10px_30px_rgba(17,17,17,0.04)] max-sm:px-4">
          <div className="mb-3.5 flex items-center justify-between gap-4">
            <span className="text-[18px] font-semibold tracking-[-0.02em] text-(--color-dark)">
              Subtotal
            </span>
            <span className="text-[18px] font-bold text-(--color-dark)">
              {formatPrice(subtotal)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            <Link
              href={ROUTES.CART}
              onClick={onClose}
              className="flex min-h-[48px] items-center justify-center rounded-full border border-[#dfe5ec] bg-(--color-bg) px-5 text-[15px] font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
            >
              View Cart
            </Link>
            <Link
              href={ROUTES.CHECKOUT}
              onClick={onClose}
              className="flex min-h-[48px] items-center justify-center rounded-full bg-(--color-primary) px-5 text-[15px] font-semibold text-white transition hover:bg-(--color-primary-dark)"
            >
              <FiShoppingBag className="mr-2 text-[15px]" />
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
