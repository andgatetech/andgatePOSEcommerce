"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FiChevronRight,
  FiCreditCard,
  FiHome,
  FiShoppingBag,
} from "react-icons/fi";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import AddressDetailsForm, { type AddressFormValue } from "@/components/shared/AddressDetailsForm";
import { ROUTES } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import { useGetCartQuery } from "@/features/cart/cartApi";
import type { CartItemData } from "@/types";

type PaymentOption = {
  id: string;
  label: string;
  logo: string;
  logoAlt: string;
  logoClassName?: string;
};

const paymentOptions: PaymentOption[] = [
  {
    id: "bkash",
    label: "bKash",
    logo: "/images/payment/BKash-bKash-Logo.png",
    logoAlt: "bKash",
  },
  {
    id: "nagad",
    label: "Nagad",
    logo: "/images/payment/Nagad-Horizontal-Logo.png",
    logoAlt: "Nagad",
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    logo: "/images/payment/6220ac4b912013c51947f9c5.png",
    logoAlt: "Credit and debit card",
  },
  {
    id: "cash-on-delivery",
    label: "Cash on Delivery",
    logo: "/images/payment/cshonde.png",
    logoAlt: "Cash on delivery",
    logoClassName: "max-h-[7rem] scale-[1.55]",
  },
];

function formatPrice(value: number | string) {
  return `৳${Number(value).toFixed(2)}`;
}

function CheckoutItemRow({ item }: { item: CartItemData }) {
  const imageSrc = resolveImageUrl(item.stock.images[0]?.url);
  const variantLabel = item.stock.variant_data
    ? Object.entries(item.stock.variant_data)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" · ")
    : item.stock.sku;

  return (
    <article className="grid gap-4 px-4 py-4 md:grid-cols-[minmax(0,2fr)_0.6fr_0.5fr_0.6fr] md:items-center md:px-5">
      {/* Product */}
      <div className="flex gap-3">
        <div className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-[16px] bg-[#f7f7f9]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={item.stock.product_name}
              fill
              unoptimized
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl font-bold text-(--color-text-muted)">
              {item.stock.product_name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0 pt-1">
          <h2 className="truncate text-sm font-semibold tracking-[-0.02em] text-(--color-dark)">
            {item.stock.product_name}
          </h2>
          {variantLabel && (
            <p className="mt-1 text-xs text-(--color-text-muted)">{variantLabel}</p>
          )}
          <p className="mt-1 text-xs text-(--color-text-muted)">{item.store.store_name}</p>
          <p className="mt-1.5 text-xs text-(--color-text-muted)">
            Stock:{" "}
            <span className={Number(item.stock.available_qty) > 0 ? "text-green-600 font-medium" : "text-(--color-danger) font-medium"}>
              {Number(item.stock.available_qty) > 0 ? `${item.stock.available_qty} available` : "Out of stock"}
            </span>
          </p>
        </div>
      </div>

      {/* Unit price */}
      <div className="flex items-center gap-2 md:block">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
          Price
        </span>
        <span className="text-sm font-bold text-(--color-dark)">
          {formatPrice(item.stock.price)}
        </span>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2 md:block">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
          Qty
        </span>
        <span className="inline-flex h-8 w-10 items-center justify-center rounded-full border border-(--color-border) text-sm font-semibold text-(--color-dark)">
          {item.quantity}
        </span>
      </div>

      {/* Subtotal */}
      <div className="flex items-center gap-2 md:block">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
          Total
        </span>
        <span className="text-sm font-bold text-(--color-dark)">
          {formatPrice(item.subtotal)}
        </span>
      </div>
    </article>
  );
}

export default function CheckoutView() {
  const { data: cartData, isLoading } = useGetCartQuery();

  const [addressValue, setAddressValue] = useState<AddressFormValue>({
    fullName: "",
    phone: "",
    districtId: "",
    zoneId: "",
    areaId: "",
    addressLine: "",
    note: "",
    label: "home",
  });
  const [paymentId, setPaymentId] = useState(paymentOptions[0].id);

  const items = cartData?.items ?? [];
  const cartTotal = cartData?.cart_total ?? 0;
  const itemCount = cartData?.item_count ?? 0;

  const subtotal = Number(cartTotal);
  const shippingFee = addressValue.districtId ? (addressValue.districtId === "1" ? 50 : 85) : 0;
  const total = subtotal + shippingFee;

  return (
    <section className="bg-(--color-bg)">
      <div className="mx-auto px-4 py-6 md:px-5 lg:px-7 xl:px-8 xl:py-8">
        {/* Breadcrumb */}
        <div className="mb-7 flex items-center gap-3 text-sm text-(--color-text-muted)">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)"
          >
            <FiHome className="text-[17px]" />
            <span>Home</span>
          </Link>
          <span>&bull;</span>
          <Link href={ROUTES.CART} className="transition hover:text-(--color-primary)">
            Cart
          </Link>
          <span>&bull;</span>
          <span>Checkout</span>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-(--color-dark) max-sm:text-[24px]">
              Checkout{" "}
              <span className="text-(--color-text-muted)">
                ({isLoading ? "…" : `${itemCount} item${itemCount === 1 ? "" : "s"}`})
              </span>
            </h1>
            <p className="mt-1 text-sm text-(--color-text-muted)">
              Confirm your address and payment details before placing the order.
            </p>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px]">
          <div className="space-y-5">
            <AddressDetailsForm value={addressValue} onChange={setAddressValue} />

            {/* Cart Items */}
            <section className="overflow-hidden rounded-[22px] border border-(--color-border) bg-(--color-bg)">
              <div className="hidden grid-cols-[minmax(0,2fr)_0.6fr_0.5fr_0.6fr] items-center gap-4 bg-[#f4f6f8] px-5 py-3 text-sm font-semibold text-(--color-dark) md:grid">
                <span>Product</span>
                <span>Price</span>
                <span>Qty</span>
                <span>Total</span>
              </div>

              {isLoading ? (
                <div className="flex min-h-[160px] items-center justify-center text-sm text-(--color-text-muted)">
                  Loading cart…
                </div>
              ) : items.length === 0 ? (
                <div className="flex min-h-[160px] flex-col items-center justify-center gap-3 text-(--color-text-muted)">
                  <p className="text-sm font-medium">Your cart is empty.</p>
                  <Link
                    href={ROUTES.SHOP}
                    className="text-sm font-semibold text-(--color-primary) hover:underline"
                  >
                    Go shopping →
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-(--color-border)">
                  {items.map((item) => (
                    <CheckoutItemRow key={item.id} item={item} />
                  ))}
                </div>
              )}

              <div className="h-3 bg-(--color-bg)" />
            </section>

            {/* Payment Method */}
            <section className="overflow-hidden rounded-[22px] border border-(--color-border) bg-(--color-bg)">
              <div className="flex items-center gap-3 border-b border-(--color-border) bg-[#f4f6f8] px-5 py-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                  <FiCreditCard size={18} />
                </div>
                <div>
                  <h2 className="text-base font-semibold tracking-[-0.02em] text-(--color-dark)">
                    Payment Method
                  </h2>
                  <p className="text-sm text-(--color-text-muted)">
                    Pick how you will complete the payment.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 p-5">
                <div className="flex flex-wrap gap-2">
                  {paymentOptions.map((option) => {
                    const checked = option.id === paymentId;
                    return (
                      <label
                        key={option.id}
                        className={`flex h-[108px] min-w-[200px] cursor-pointer flex-col items-center justify-center rounded-[10px] border px-2 py-2 transition ${
                          checked
                            ? "border-(--color-primary) bg-(--color-primary-100)"
                            : "border-(--color-border) bg-(--color-bg) hover:border-(--color-primary)"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={checked}
                          onChange={() => setPaymentId(option.id)}
                          className="sr-only"
                        />
                        <Image
                          src={option.logo}
                          alt={option.logoAlt}
                          width={520}
                          height={160}
                          className={`h-auto w-auto object-contain ${option.logoClassName ?? "max-h-21"}`}
                        />
                        <span className="mt-1.5 text-center text-xs font-medium text-(--color-dark)">
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          {/* Order Summary sidebar */}
          <aside className="h-fit rounded-[22px] border border-(--color-border) bg-(--color-bg) p-4.5 max-sm:p-4 xl:sticky xl:top-16">
            <div className="mb-5 rounded-full bg-[#eef6ef] px-4.5 py-3 text-sm font-semibold text-(--color-dark)">
              <span className="text-(--color-primary)">Delivery Charge:</span>{" "}
              <span className="text-[#0d7a74]">
                {addressValue.districtId ? formatPrice(shippingFee) : "Select district first"}
              </span>
            </div>

            <div className="rounded-[20px] border border-(--color-border) p-4.5 max-sm:p-4">
              <h2 className="text-base font-semibold tracking-[-0.02em] text-(--color-dark)">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-(--color-text-muted)">Sub-Total</span>
                  <span className="font-medium text-(--color-dark)">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-(--color-text-muted)">Delivery Charge</span>
                  <span className="font-medium text-(--color-dark)">{formatPrice(shippingFee)}</span>
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
              <button
                type="button"
                disabled={items.length === 0 || isLoading}
                className="flex min-h-[54px] w-full items-center justify-center rounded-full bg-(--color-primary) px-6 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark) disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiShoppingBag className="mr-2" />
                Place order
              </button>

              <Link
                href={ROUTES.CART}
                className="flex min-h-[54px] items-center justify-center rounded-full border border-(--color-primary) bg-(--color-primary-100) px-6 text-sm font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-(--color-bg)"
              >
                Back to cart
                <FiChevronRight className="ml-2" />
              </Link>
            </div>
          </aside>
        </div>

        <ServiceHighlights className="mt-10" />
      </div>
    </section>
  );
}
