"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  FiEdit2,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import type { CartItem } from "./cartMockData";
import { ROUTES } from "@/config/routes";

type CartDrawerProps = {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
};

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

function CartThumbnail({ item }: { item: CartItem }) {
  return (
    <div className="relative h-[82px] w-[82px] overflow-hidden rounded-[16px] bg-[#f7f7f9] max-sm:h-[76px] max-sm:w-[76px]">
      {item.thumbnail === "melon" ? (
        <>
          <div className="absolute left-3 top-3 h-9 w-9 rounded-full border-4 border-[#438e3f] bg-[#8fd25b]" />
          <div className="absolute left-9 top-6 h-12 w-12 rounded-full border-4 border-[#3b9c3e] bg-[#ef4f58]" />
          <div className="absolute left-[38px] top-[28px] h-8 w-8 rounded-full border-[3px] border-[#fff5e4] bg-[#f65b63]" />
          <div className="absolute left-3 top-[46px] h-7 w-12 -rotate-10 rounded-[999px_999px_10px_10px] border-[3px] border-[#3b9c3e] bg-[#f65b63]" />
          <div className="absolute left-5 top-[49px] h-5 w-8 -rotate-10 rounded-[999px_999px_8px_8px] border-2 border-[#fff5e4] bg-[#ff6c74]" />
          <div className="absolute left-[35px] top-2 h-2 w-1.5 rounded-full bg-[#5e7e2d]" />
        </>
      ) : null}

      {item.thumbnail === "avocado" ? (
        <>
          <div className="absolute left-3 top-2 h-10 w-8 rotate-14 rounded-[999px] bg-[#447d39]" />
          <div className="absolute left-7 top-3 h-11 w-8 rotate-10 rounded-[999px] bg-[#5c9e4d]" />
          <div className="absolute left-1 top-[33px] h-7 w-14 -rotate-18 rounded-[999px] bg-[#7fb95b]" />
          <div className="absolute left-3 top-[37px] h-5 w-10 -rotate-18 rounded-[999px] bg-[#fff0c7]" />
          <div className="absolute left-7 top-[41px] h-4 w-4 rounded-full bg-[#b56b2d]" />
          <div className="absolute left-[31px] top-[45px] h-2 w-2 rounded-full bg-[#e8b98c]" />
        </>
      ) : null}

      {item.thumbnail === "pouch" ? (
        <>
          <div className="absolute left-5 top-1 h-16 w-8 -skew-y-4 rounded-[6px] bg-[#4f8c35]" />
          <div className="absolute left-6 top-3 h-3 w-6 rounded-sm bg-[#376427]" />
          <div className="absolute left-5 top-8 h-4 w-8 bg-[#2f4f1f]" />
          <div className="absolute left-2 top-[34px] h-4 w-14 bg-[#d93025]" />
          <div className="absolute left-3 top-[37px] text-[7px] font-semibold text-white">
            Out of Stock
          </div>
          <div className="absolute left-9 top-9 h-7 w-2.5 bg-[#88c668]" />
          <div className="absolute left-[34px] top-1 h-16 w-[2px] bg-white/35" />
        </>
      ) : null}
    </div>
  );
}

export default function CartDrawer({
  isOpen,
  items,
  onClose,
}: CartDrawerProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-[#f7f7f9] text-(--color-dark) transition hover:bg-white"
          >
            <FiX size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#fcfcfd] px-6 py-3 [scrollbar-color:var(--color-text-muted)_transparent] [scrollbar-width:thin] max-sm:px-4">
          <div className="space-y-2.5">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-[22px] border border-[#e9edf2] bg-(--color-bg) px-3.5 py-2.5 shadow-[0_8px_22px_rgba(17,17,17,0.04)]"
              >
                <div className="flex gap-3">
                  <div className="shrink-0">
                    <CartThumbnail item={item} />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-[15px] font-semibold tracking-[-0.02em] text-(--color-dark)">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-[11px] text-(--color-text-muted)">
                          {item.variant}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1.5 text-(--color-dark)">
                        <button
                          type="button"
                          className="rounded-full p-1 transition hover:bg-(--color-primary-100) hover:text-(--color-primary)"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          type="button"
                          className="rounded-full p-1 transition hover:bg-[#fff1f0] hover:text-(--color-danger)"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-2 pt-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[14px] font-bold text-(--color-dark)">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice ? (
                          <span className="text-[12px] text-[#9aa4b2] line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        ) : null}
                      </div>

                      <div className="flex items-center rounded-full border border-[#dfe5ec] bg-(--color-bg) px-2 py-1 shadow-[0_4px_14px_rgba(17,17,17,0.03)]">
                        <button
                          type="button"
                          className="flex h-6.5 w-6.5 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100)"
                        >
                          <FiMinus size={13} />
                        </button>
                        <span className="min-w-6 text-center text-[15px] font-semibold text-(--color-dark)">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="flex h-6.5 w-6.5 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100)"
                        >
                          <FiPlus size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
