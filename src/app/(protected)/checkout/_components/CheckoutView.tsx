"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FiChevronRight,
  FiCreditCard,
  FiEdit2,
  FiHeart,
  FiHome,
  FiMapPin,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import { cartMockItems, type CartItem } from "@/components/shared/navbar/cartMockData";
import AddressDetailsForm, { type AddressFormValue } from "@/components/shared/AddressDetailsForm";
import { ROUTES } from "@/config/routes";

type PaymentOption = {
  id: string;
  label: string;
  description: string;
  logo: string;
  logoAlt: string;
  logoClassName?: string;
};

const paymentOptions: PaymentOption[] = [
  {
    id: "bkash",
    label: "bKash",
    description: "Complete payment using bKash mobile banking.",
    logo: "/images/payment/BKash-bKash-Logo.png",
    logoAlt: "bKash",
  },
  {
    id: "nagad",
    label: "Nagad",
    description: "Pay instantly using Nagad mobile banking.",
    logo: "/images/payment/Nagad-Horizontal-Logo.png",
    logoAlt: "Nagad",
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Pay with credit card or debit card.",
    logo: "/images/payment/6220ac4b912013c51947f9c5.png",
    logoAlt: "Credit and debit card",
  },
  {
    id: "cash-on-delivery",
    label: "Cash on Delivery",
    description: "Pay cash when the order arrives at your address.",
    logo: "/images/payment/cshonde.png",
    logoAlt: "Cash on delivery",
    logoClassName: "max-h-[7rem] scale-[1.55]",
  },
];

type CheckoutPageItem = CartItem & {
  availability: number;
  ratingCount: number;
};

const checkoutItems: CheckoutPageItem[] = cartMockItems.map((item) => ({
  ...item,
  availability: 2,
  ratingCount: 118,
}));

function formatPrice(value: number) {
  return `৳${value.toFixed(2)}`;
}

function CartThumbnail({ item }: { item: CartItem }) {
  return (
    <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[20px] bg-[#f7f7f9]">
      {item.thumbnail === "melon" ? (
        <>
          <div className="absolute left-3 top-3 h-9 w-9 rounded-full border-4 border-[#438e3f] bg-[#8fd25b]" />
          <div className="absolute left-8 top-5 h-12 w-12 rounded-full border-4 border-[#3b9c3e] bg-[#ef4f58]" />
          <div className="absolute left-[34px] top-[24px] h-9 w-9 rounded-full border-[3px] border-[#fff5e4] bg-[#f65b63]" />
          <div className="absolute left-3 top-[49px] h-7 w-12 -rotate-10 rounded-[999px_999px_10px_10px] border-[3px] border-[#3b9c3e] bg-[#f65b63]" />
          <div className="absolute left-5 top-[52px] h-4.5 w-8 -rotate-10 rounded-[999px_999px_8px_8px] border-2 border-[#fff5e4] bg-[#ff6c74]" />
        </>
      ) : null}

      {item.thumbnail === "avocado" ? (
        <>
          <div className="absolute left-3 top-3 h-10 w-8 rotate-14 rounded-[999px] bg-[#447d39]" />
          <div className="absolute left-7 top-4 h-11 w-8 rotate-10 rounded-[999px] bg-[#5c9e4d]" />
          <div className="absolute left-2 top-[38px] h-7 w-14 -rotate-18 rounded-[999px] bg-[#7fb95b]" />
          <div className="absolute left-5 top-[43px] h-5 w-9 -rotate-18 rounded-[999px] bg-[#fff0c7]" />
          <div className="absolute left-9 top-[46px] h-3.5 w-3.5 rounded-full bg-[#b56b2d]" />
        </>
      ) : null}

      {item.thumbnail === "pouch" ? (
        <>
          <div className="absolute left-7 top-2 h-20 w-10 -skew-y-4 rounded-[7px] bg-[#4f8c35]" />
          <div className="absolute left-8 top-4 h-3.5 w-7 rounded-sm bg-[#376427]" />
          <div className="absolute left-7 top-10 h-4.5 w-10 bg-[#2f4f1f]" />
          <div className="absolute left-2 top-[46px] h-5 w-[67px] bg-[#d93025]" />
          <div className="absolute left-5 top-[49px] text-[8px] font-semibold text-white">
            Out of Stock
          </div>
          <div className="absolute left-10 top-10 h-8 w-3 bg-[#88c668]" />
        </>
      ) : null}
    </div>
  );
}

function RatingStars() {
  return (
    <div className="flex items-center gap-1 text-[15px] leading-none">
      <span className="text-(--color-cta)">★</span>
      <span className="text-(--color-cta)">★</span>
      <span className="text-(--color-cta)">★</span>
      <span className="text-(--color-cta)">★</span>
      <span className="text-[#cfd6df]">★</span>
    </div>
  );
}

export default function CheckoutView() {
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

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = subtotal * 0.2;
  const shippingFee = addressValue.districtId ? (addressValue.districtId === "1" ? 50 : 85) : 0;
  const total = subtotal + vat + shippingFee;

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
          <Link href={ROUTES.CART} className="transition hover:text-(--color-primary)">
            Cart
          </Link>
          <span>&bull;</span>
          <span>Checkout</span>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-(--color-dark) max-sm:text-[24px]">
              Checkout <span className="text-(--color-text-muted)">({checkoutItems.length} item)</span>
            </h1>
            <p className="mt-1 text-sm text-(--color-text-muted)">
              Confirm your address and payment details before placing the order.
            </p>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px]">
          <div className="space-y-5">
            <AddressDetailsForm value={addressValue} onChange={setAddressValue} />

            <section className="overflow-hidden rounded-[22px] border border-(--color-border) bg-(--color-bg)">
              <div className="hidden grid-cols-[minmax(0,1.8fr)_0.55fr_0.6fr_0.55fr_0.35fr] items-center gap-4 bg-[#f4f6f8] px-4 py-3 text-sm font-semibold text-(--color-dark) md:grid">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total Price</span>
                <span>Action</span>
              </div>

              <div className="divide-y divide-(--color-border)">
                {checkoutItems.map((item) => (
                  <article
                    key={item.id}
                    className="grid min-h-[146px] gap-4 px-4 py-3.5 md:grid-cols-[minmax(0,1.8fr)_0.55fr_0.6fr_0.55fr_0.35fr] md:items-center md:px-4"
                  >
                    <div className="flex gap-4">
                      <CartThumbnail item={item} />

                      <div className="min-w-0 pt-1">
                        <h2 className="truncate text-base font-semibold tracking-[-0.02em] text-(--color-dark) max-sm:text-[15px]">
                          {item.name}
                        </h2>

                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-(--color-text-muted)">
                          <span>{item.variant}</span>
                          <button
                            type="button"
                            className="inline-flex items-center text-(--color-primary) transition hover:opacity-80"
                          >
                            <FiEdit2 />
                          </button>
                        </div>

                        <p className="mt-2 text-sm text-(--color-dark)">
                          Available: <span className="text-(--color-text-muted)">{item.availability}</span>
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-sm text-(--color-text-muted)">
                          <RatingStars />
                          <span>({item.ratingCount})</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:block">
                      <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
                        Price
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-base font-bold text-(--color-dark)">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice ? (
                          <span className="text-sm text-(--color-text-muted) line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:block">
                      <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
                        Quantity
                      </span>
                      <div className="inline-flex items-center rounded-full border border-(--color-border) bg-(--color-bg) px-3 py-2">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100)"
                        >
                          <FiMinus size={15} />
                        </button>
                        <span className="min-w-10 text-center text-base font-semibold text-(--color-dark)">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100)"
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
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-(--color-dark)">
                      <button
                        type="button"
                        className="transition hover:text-(--color-primary)"
                      >
                        <FiHeart size={24} />
                      </button>
                      <button
                        type="button"
                        className="transition hover:text-(--color-danger)"
                      >
                        <FiTrash2 size={24} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="h-3 bg-(--color-bg)" />
            </section>

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
                    Pick how the customer will complete the payment.
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

          <aside className="h-fit rounded-[22px] border border-(--color-border) bg-(--color-bg) p-4.5 max-sm:p-4 xl:sticky xl:top-16">
            <div className="mb-5 rounded-full bg-[#eef6ef] px-4.5 py-3 text-sm font-semibold text-(--color-dark)">
              <span className="text-(--color-primary)">Delivery Charge:</span>{" "}
              <span className="text-[#0d7a74]">{addressValue.districtId ? formatPrice(shippingFee) : "Select district first"}</span>
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
                  <span className="text-(--color-text-muted)">VAT (20%)</span>
                  <span className="font-medium text-(--color-dark)">{formatPrice(vat)}</span>
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
                className="flex min-h-[54px] w-full items-center justify-center rounded-full bg-(--color-primary) px-6 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
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
