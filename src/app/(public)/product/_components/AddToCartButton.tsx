"use client";

import {
  useAddToCartMutation,
  useUpdateCartItemMutation,
} from "@/features/cart/cartApi";
import { addGuestCartItem, type GuestCartProduct } from "@/features/cart/guestCartSlice";
import { isTokenExpired } from "@/features/auth/authStorage";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";

interface AddToCartButtonProps {
  /** The stock/product ID to add */
  stockId: number | string;
  /** Current stock quantity — disables button when 0 */
  stockCount: number;
  /** Product snapshot used for guest cart rendering */
  product: GuestCartProduct;
  /** Quantity to add (default 1) */
  quantity?: number;
  /** Extra Tailwind/CSS classes on the outer button wrapper */
  className?: string;
}

/** Animation duration — API call and timer run in parallel via Promise.all */
const ANIM_MS = 1800;

export default function AddToCartButton({
  stockId,
  stockCount,
  product,
  quantity = 1,
  className = "",
}: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const { isAuthenticated, expiresAt } = useAppSelector((state) => state.auth);
  const hasActiveSession = isAuthenticated && !isTokenExpired(expiresAt);

  const [addToCart] = useAddToCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const [animState, setAnimState] = useState<"idle" | "loading" | "success">(
    "idle",
  );
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const normalizedStockId =
    typeof stockId === "number" ? stockId : Number(stockId);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const handleClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (animState !== "idle") return;

    if (!Number.isFinite(normalizedStockId)) {
      toast.error("Invalid product selection.");
      return;
    }

    setAnimState("loading");

    const animTimer = new Promise<void>((r) => setTimeout(r, ANIM_MS));

    if (!hasActiveSession) {
      await animTimer;
      dispatch(addGuestCartItem({ product, quantity }));
      toast.success("Added to cart!");
      setAnimState("success");
      resetTimer.current = setTimeout(() => setAnimState("idle"), 2000);
      return;
    }

    // Animation timer and API call run in parallel.
    // We wait for both so the full animation always completes before success is shown.
    const [result] = await Promise.all([
      addToCart({ stock_id: normalizedStockId }),
      animTimer,
    ]);

    if ("error" in result) {
      toast.error("Failed to add to cart.");
      setAnimState("idle");
      return;
    }

    if (quantity > 1 && "data" in result && result.data.data) {
      await updateCartItem({ cart_id: result.data.data.id, quantity });
    }

    toast.success(result.data?.message ?? "Added to cart!");
    setAnimState("success");
    resetTimer.current = setTimeout(() => setAnimState("idle"), 2000);
  }, [
    animState,
    dispatch,
    hasActiveSession,
    addToCart,
    normalizedStockId,
    product,
    quantity,
    updateCartItem,
  ]);

  const isDisabled = stockCount === 0 || animState !== "idle";

  const btnClass = [
    "atc-btn",
    animState === "loading" ? "atc-btn--loading" : "",
    animState === "success" ? "atc-btn--success" : "",
    stockCount === 0 ? "atc-btn--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      aria-label="Add to cart"
      className={btnClass}>
      {/* Layer 1 – idle: cart icon + text */}
      <span className="atc-label">
        <FiShoppingCart size={18} />
        <span>Add to cart</span>
      </span>

      {/* Layer 2 – loading: cart enters, box drops into cart, cart fills, cart exits */}
      <span className="atc-loading" aria-hidden="true">
        <span className="atc-slide-cart">
          {/* white fill — fades in when box lands inside cart */}
          <span className="atc-cart-body-fill">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                d="M6.5 7.5h12l-1.5 7.5a2 2 0 0 1-2 1.5H9a2 2 0 0 1-2-1.5z"
                fill="white"
              />
            </svg>
          </span>
          {/* cart outline */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </span>

        {/* falling package */}
        <span className="atc-drop-box">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="white">
            <rect x="2" y="5" width="12" height="9" rx="1" />
            <path
              d="M5 5V3a3 3 0 0 1 6 0v2"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </span>
      </span>

      {/* Layer 3 – success: "Added" */}
      <span className="atc-success">
        <FiShoppingCart size={18} />
        <span>Added</span>
      </span>
    </button>
  );
}
