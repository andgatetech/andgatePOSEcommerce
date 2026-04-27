"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import orderCompletedAnimation from "../../../../../public/images/svg/Order completed.json";
import orderFailAnimation from "../../../../../public/images/svg/order fail.json";
import orderLoadingAnimation from "../../../../../public/images/svg/order loading.json";
import {
  FiChevronRight,
  FiHome,
  FiShoppingBag,
} from "react-icons/fi";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import AddressDetailsForm, { type AddressFormValue } from "@/components/shared/AddressDetailsForm";
import { ROUTE_BUILDERS, ROUTES } from "@/config/routes";
import { useGetMyAddressesQuery } from "@/features/account/myAddressApi";
import { resolveImageUrl } from "@/lib/imageUrl";
import {
  emptyAddressFormValue,
  formValueToAddressPayload,
  getAddressDisplayLines,
  shippingAddressToFormValue,
} from "@/lib/address";
import { useCheckStockQuery, useGetCartQuery, useLazyCheckStockQuery } from "@/features/cart/cartApi";
import { clearGuestCart } from "@/features/cart/guestCartSlice";
import { getStockQuantityMap, getStockIssues } from "@/lib/stockCheck";
import { isTokenExpired } from "@/features/auth/authStorage";
import { useCreateOrderMutation } from "@/features/orders/ordersApi";
import { getBackendMessage } from "@/lib/apiMessage";
import { saveCheckoutSuccess } from "@/lib/checkoutSuccessStorage";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import type { CartItemData, CreateOrderRequest } from "@/types";

type PaymentOption = {
  id: string;
  label: string;
  logo: string;
  logoAlt: string;
  logoClassName?: string;
};

type OrderSubmitStatus = "idle" | "loading" | "success" | "failure";

const paymentOptions: PaymentOption[] = [
  {
    id: "cash-on-delivery",
    label: "Cash on Delivery",
    logo: "/images/payment/cod.png",
    logoAlt: "Cash on delivery",
  },
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
    id: "upay",
    label: "Upay",
    logo: "/images/payment/upay.png",
    logoAlt: "Upay",
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    logo: "/images/payment/card.png",
    logoAlt: "Credit and debit card",
  },
];

const paymentMethodMap: Record<string, string> = {
  bkash: "bkash",
  nagad: "nagad",
  upay: "upay",
  card: "card",
  "cash-on-delivery": "cash_on_delivery",
};

function formatPrice(value: number | string) {
  return `৳${Number(value).toFixed(2)}`;
}

function getOrderErrorMessage(error: unknown) {
  return getBackendMessage(error, "Order could not be placed.");
}

function OrderSubmitOverlay({
  status,
  message,
  onClose,
}: {
  status: Exclude<OrderSubmitStatus, "idle">;
  message?: string;
  onClose?: () => void;
}) {
  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const animationData = isLoading
    ? orderLoadingAnimation
    : isSuccess
      ? orderCompletedAnimation
      : orderFailAnimation;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-[rgba(255,255,255,0.78)] backdrop-blur-[2px]">
      <div className="flex min-w-[260px] max-w-[360px] flex-col items-center gap-3 rounded-[22px] border border-(--color-border) bg-white px-8 py-7 text-center shadow-[0_24px_70px_rgba(19,45,69,0.18)]">
        <Lottie
          animationData={animationData}
          autoplay
          loop={isLoading}
          className="h-40 w-40"
          rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
        />
        <div>
          <p className="text-base font-semibold text-(--color-dark)">
            {isLoading ? "Creating your order" : isSuccess ? "Order placed successfully" : "Order failed"}
          </p>
          <p className="mt-1 text-sm text-(--color-text-muted)">
            {message ??
              (isLoading
                ? "Please wait and do not click anywhere."
                : isSuccess
                  ? "Opening your order confirmation."
                  : "Please try again.")}
          </p>
        </div>
        {!isLoading && !isSuccess && onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="mt-2 inline-flex min-h-[42px] items-center justify-center rounded-full bg-(--color-primary) px-6 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
          >
            Try again
          </button>
        ) : null}
      </div>
    </div>
  );
}

function CheckoutItemRow({
  item,
  checkedStockQuantity,
}: {
  item: CartItemData;
  checkedStockQuantity?: number;
}) {
  const imageSrc = resolveImageUrl(item.stock.images[0]?.url);
  const variantLabel = item.stock.variant_data
    ? Object.entries(item.stock.variant_data)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" · ")
    : item.stock.sku;
  const displayStockQuantity = checkedStockQuantity ?? Number(item.stock.available_qty);
  const isOutOfStock = displayStockQuantity <= 0;
  const hasInsufficientStock = checkedStockQuantity !== undefined && item.quantity > checkedStockQuantity;
  const stockText = isOutOfStock
    ? "Out of stock"
    : hasInsufficientStock
      ? `${displayStockQuantity} available - reduce quantity`
      : `${displayStockQuantity} available`;

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
            <span className={isOutOfStock || hasInsufficientStock ? "font-medium text-(--color-danger)" : "font-medium text-green-600"}>
              {stockText}
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, expiresAt } = useAppSelector((state) => state.auth);
  const hasActiveSession = isAuthenticated && !isTokenExpired(expiresAt);
  const guestCart = useAppSelector((state) => state.guestCart);
  const { data: cartData, isLoading: isServerCartLoading } = useGetCartQuery(undefined, {
    skip: !hasActiveSession,
  });
  const { data: myAddressData, isFetching: isLoadingMyAddress } = useGetMyAddressesQuery(undefined, {
    skip: !hasActiveSession,
  });
  const [createOrder, { isLoading: isSubmitting }] = useCreateOrderMutation();
  const [triggerStockCheck, { isFetching: isCheckingStockBeforeSubmit }] = useLazyCheckStockQuery();

  const [addressValue, setAddressValue] = useState<AddressFormValue>(emptyAddressFormValue);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [paymentId, setPaymentId] = useState("cash-on-delivery");
  const [orderSubmitStatus, setOrderSubmitStatus] = useState<OrderSubmitStatus>("idle");
  const [orderSubmitMessage, setOrderSubmitMessage] = useState<string | undefined>();

  const isLoading = hasActiveSession ? isServerCartLoading : !guestCart.isHydrated;
  const items = hasActiveSession ? (cartData?.items ?? []) : guestCart.items;
  const stockIds = useMemo(
    () => Array.from(new Set(items.map((item) => item.stock.id))).sort((a, b) => a - b),
    [items]
  );
  const {
    data: stockCheckData,
    isError: isStockCheckError,
  } = useCheckStockQuery(stockIds.length > 0 ? { stock_ids: stockIds } : skipToken, {
    refetchOnMountOrArgChange: true,
  });
  const checkedStockQuantityById = useMemo(
    () => getStockQuantityMap(stockCheckData?.stocks),
    [stockCheckData?.stocks]
  );
  const stockIssues = useMemo(
    () => getStockIssues(items, stockCheckData?.stocks),
    [items, stockCheckData?.stocks]
  );
  const hasKnownStockIssues = stockIssues.length > 0;
  const cartTotal = hasActiveSession
    ? (cartData?.cart_total ?? 0)
    : guestCart.items.reduce((sum, item) => sum + item.subtotal, 0);
  const itemCount = hasActiveSession
    ? (cartData?.item_count ?? 0)
    : guestCart.items.reduce((count, item) => count + item.quantity, 0);
  const savedAddresses = hasActiveSession ? (myAddressData?.addresses ?? []) : [];
  const defaultAddress = hasActiveSession ? (myAddressData?.default_address ?? null) : null;
  const selectedAddress =
    savedAddresses.find((address) => address.id === selectedAddressId) ?? defaultAddress;
  const savedAddress = selectedAddress ?? null;
  const activeShippingAddress = !showAddressForm && savedAddress ? savedAddress : null;
  const displayAddress = activeShippingAddress ? getAddressDisplayLines(activeShippingAddress) : null;

  const subtotal = Number(cartTotal);
  const shippingFee =
    activeShippingAddress?.city || addressValue.districtName
      ? (activeShippingAddress?.city ?? addressValue.districtName).trim().toLowerCase() === "dhaka"
        ? 50
        : 85
      : 0;
  const total = subtotal + shippingFee;

  useEffect(() => {
    if (defaultAddress) {
      setShowAddressForm(false);
      setSelectedAddressId(defaultAddress.id);
      setAddressValue(shippingAddressToFormValue(defaultAddress));
    } else {
      setShowAddressForm(true);
      setAddressValue(emptyAddressFormValue);
    }
  }, [defaultAddress]);

  useEffect(() => {
    if (orderSubmitStatus === "idle") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [orderSubmitStatus]);

  async function handlePlaceOrder() {
    if (items.length === 0 || isSubmitting || isCheckingStockBeforeSubmit) {
      return;
    }

    setOrderSubmitStatus("idle");
    setOrderSubmitMessage(undefined);

    const shippingAddress = activeShippingAddress ?? formValueToAddressPayload(addressValue);

    const recipientName = shippingAddress.name?.trim() ?? "";
    const recipientPhone = shippingAddress.phone?.trim() ?? "";
    const addressLine = shippingAddress.address_line.trim();
    const city = shippingAddress.city?.trim() ?? "";
    const zone = shippingAddress.zone?.trim() ?? "";
    const area = shippingAddress.area?.trim() ?? "";

    if (!recipientName) {
      toast.error("Full name is required.");
      return;
    }

    if (!recipientPhone) {
      toast.error("Phone number is required.");
      return;
    }

    if (!addressLine) {
      toast.error("Address line is required.");
      return;
    }

    if (!city || !zone || !area) {
      toast.error("District, zone, and area are required.");
      return;
    }

    let latestStockData: { stocks: { stock_id: number; quantity: number }[] };

    try {
      setOrderSubmitStatus("loading");
      latestStockData = await triggerStockCheck({ stock_ids: stockIds }).unwrap();
    } catch {
      const message = "Could not verify stock. Please try again.";
      setOrderSubmitStatus("failure");
      setOrderSubmitMessage(message);
      toast.error(message);
      return;
    }

    const latestStockIssues = getStockIssues(items, latestStockData.stocks);

    if (latestStockIssues.length > 0) {
      const outOfStockIssue = latestStockIssues.find((issue) => issue.availableQuantity <= 0);
      const message = outOfStockIssue
        ? `${outOfStockIssue.item.stock.product_name} is out of stock.`
        : "Some items do not have enough stock. Please update your cart.";
      setOrderSubmitStatus("failure");
      setOrderSubmitMessage(message);
      toast.error(message);
      return;
    }

    const payload: CreateOrderRequest = {
      items: items.map((item) => ({
        stock_id: item.stock.id,
        quantity: item.quantity,
      })),
      payment_method: paymentMethodMap[paymentId] ?? paymentId,
      shipping_fee: shippingFee,
      notes: addressValue.note.trim() || undefined,
    };

    if (activeShippingAddress) {
      payload.address_id = activeShippingAddress.id;
    } else {
      payload.shipping_address = {
        ...shippingAddress,
        name: recipientName,
        phone: recipientPhone,
        address_line: addressLine,
        city,
        zone,
        area,
        postal_code: shippingAddress.postal_code ?? "",
      };
    }

    try {
      const result = await createOrder(payload).unwrap();
      if (!result.success || !result.data) {
        setOrderSubmitStatus("failure");
        setOrderSubmitMessage(result.message);
        toast.error(result.message);
        return;
      }

      const order = result.data;
      saveCheckoutSuccess(result);
      if (!hasActiveSession) {
        dispatch(clearGuestCart());
      }
      setOrderSubmitStatus("success");
      setOrderSubmitMessage(result.message);
      window.setTimeout(() => {
        router.push(ROUTE_BUILDERS.orderSuccess(encodeURIComponent(order.order_number)));
      }, 900);
    } catch (error) {
      const message = getOrderErrorMessage(error);
      setOrderSubmitStatus("failure");
      setOrderSubmitMessage(message);
      toast.error(message);
    }
  }

  return (
    <section className="relative bg-(--color-bg)">
      {orderSubmitStatus !== "idle" ? (
        <OrderSubmitOverlay
          status={orderSubmitStatus}
          message={orderSubmitMessage}
          onClose={() => {
            setOrderSubmitStatus("idle");
            setOrderSubmitMessage(undefined);
          }}
        />
      ) : null}

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
            {isLoadingMyAddress && !myAddressData ? (
              <section className="overflow-hidden rounded-[22px] border border-(--color-border) bg-(--color-bg) p-5">
                <div className="h-[210px] animate-pulse rounded-[18px] bg-[linear-gradient(90deg,#f6f8fa_0%,#eef3f7_50%,#f6f8fa_100%)]" />
              </section>
            ) : activeShippingAddress && !showAddressForm && displayAddress ? (
              <section className="overflow-hidden rounded-[22px] border border-(--color-border) bg-(--color-bg)">
                <div className="flex items-center justify-between gap-4 border-b border-(--color-border) bg-[#f4f6f8] px-5 py-4">
                  <div>
                    <h2 className="text-base font-semibold tracking-[-0.02em] text-(--color-dark)">
                      Delivery Address
                    </h2>
                    <p className="text-sm text-(--color-text-muted)">Choose a saved address for this order.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(true)}
                    className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-(--color-primary) bg-(--color-primary-100) px-5 text-sm font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-white"
                  >
                    Add New Address
                  </button>
                </div>

                <div className="grid gap-3 px-5 py-5">
                  {savedAddresses.map((address) => {
                    const addressLines = getAddressDisplayLines(address);
                    const checked = activeShippingAddress?.id === address.id;

                    return (
                      <label
                        key={address.id}
                        className={`flex cursor-pointer gap-3 rounded-[18px] border p-4 transition ${
                          checked
                            ? "border-(--color-primary) bg-(--color-primary-100)"
                            : "border-(--color-border) bg-(--color-bg) hover:border-(--color-primary)"
                        }`}
                      >
                        <input
                          type="radio"
                          name="savedAddress"
                          checked={checked}
                          onChange={() => {
                            setSelectedAddressId(address.id);
                            setAddressValue(shippingAddressToFormValue(address));
                          }}
                          className="mt-1 h-5 w-5 accent-(--color-primary)"
                        />
                        <span className="min-w-0 text-[15px] leading-7 text-(--color-dark)">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold">{addressLines.name}</span>
                            {address.is_default ? (
                              <span className="rounded-full bg-[#eef6ef] px-2.5 py-0.5 text-xs font-semibold text-[#0d7a74]">
                                Default
                              </span>
                            ) : null}
                          </span>
                          <span className="block">{addressLines.phone}</span>
                          <span className="block">{addressLines.addressLine}</span>
                          <span className="block text-(--color-text-muted)">{addressLines.locationLine}</span>
                        </span>
                      </label>
                    );
                  })}


                </div>
              </section>
            ) : (
              <div className="space-y-4">
                <AddressDetailsForm value={addressValue} onChange={setAddressValue} />
                {savedAddress ? (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddressForm(false);
                        setSelectedAddressId(savedAddress.id);
                        setAddressValue(shippingAddressToFormValue(savedAddress));
                      }}
                      className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg) px-5 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
                    >
                      Use saved address instead
                    </button>
                  </div>
                ) : null}
              </div>
            )}

            {/* Cart Items */}
            <section className="overflow-hidden rounded-[22px] border border-(--color-border) bg-(--color-bg)">
              <div className="hidden grid-cols-[minmax(0,2fr)_0.6fr_0.5fr_0.6fr] items-center gap-4 bg-[#f4f6f8] px-5 py-3 text-sm font-semibold text-(--color-dark) md:grid">
                <span>Product</span>
                <span>Price</span>
                <span>Qty</span>
                <span>Total</span>
              </div>

              {hasKnownStockIssues ? (
                <div className="border-b border-[#f6ccd4] bg-[#fff7f8] px-5 py-4 text-sm text-(--color-danger)">
                  {stockIssues.some((issue) => issue.availableQuantity <= 0)
                    ? "One or more checkout items are out of stock."
                    : "One or more checkout quantities are higher than current stock."}
                </div>
              ) : isStockCheckError ? (
                <div className="border-b border-[#f7e2a7] bg-[#fff9e8] px-5 py-4 text-sm text-[#8a5c00]">
                  Stock could not be refreshed automatically. It will be checked again before placing the order.
                </div>
              ) : null}

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
                    <CheckoutItemRow
                      key={item.id}
                      item={item}
                      checkedStockQuantity={checkedStockQuantityById.get(item.stock.id)}
                    />
                  ))}
                </div>
              )}

              <div className="h-3 bg-(--color-bg)" />
            </section>

            {/* Payment Method */}
            <section className="overflow-hidden rounded-[22px] border border-(--color-border) bg-(--color-bg)">
              <div className="border-b border-(--color-border) bg-[#f4f6f8] px-5 py-4">
                <h2 className="text-base font-semibold tracking-[-0.02em] text-(--color-dark)">Payment method</h2>
              </div>

              <div className="divide-y divide-(--color-border) px-5 py-2">
                {paymentOptions.map((option) => {
                  const checked = option.id === paymentId;
                  return (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-[14px] px-3 py-3.5 transition ${
                        checked
                          ? "bg-(--color-primary-100)"
                          : "hover:bg-[#f8f9fb]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={checked}
                        onChange={() => setPaymentId(option.id)}
                        className="sr-only"
                      />

                      {/* Custom radio circle — LEFT of logo */}
                      <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                        checked
                          ? "border-(--color-primary) bg-(--color-primary)"
                          : "border-(--color-border) bg-white"
                      }`}>
                        {checked && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>

                      {/* Logo box */}
                      <div className={`flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border transition ${
                        checked
                          ? "border-(--color-primary) bg-(--color-primary-100)"
                          : "border-(--color-border) bg-[#f8f9fb]"
                      }`}>
                        <Image
                          src={option.logo}
                          alt={option.logoAlt}
                          width={40}
                          height={40}
                          className="h-9 w-9 object-contain"
                          unoptimized
                        />
                      </div>

                      {/* Label */}
                      <span className={`flex-1 text-[15px] font-medium tracking-[-0.01em] transition ${
                        checked ? "text-(--color-primary)" : "text-(--color-dark)"
                      }`}>
                        {option.label}
                      </span>

                      {/* Chevron */}
                      <FiChevronRight
                        size={18}
                        className={checked ? "text-(--color-primary)" : "text-(--color-text-muted)"}
                      />
                    </label>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Order Summary sidebar */}
          <aside className="h-fit rounded-[22px] border border-(--color-border) bg-(--color-bg) p-4.5 max-sm:p-4 xl:sticky xl:top-16">
            <div className="mb-5 rounded-full bg-[#eef6ef] px-4.5 py-3 text-sm font-semibold text-(--color-dark)">
              <span className="text-(--color-primary)">Delivery Charge:</span>{" "}
              <span className="text-[#0d7a74]">
                {activeShippingAddress?.city || addressValue.districtName
                  ? formatPrice(shippingFee)
                  : "Select district first"}
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
                onClick={handlePlaceOrder}
                disabled={items.length === 0 || isLoading || isSubmitting || isCheckingStockBeforeSubmit || hasKnownStockIssues}
                className="flex min-h-[54px] w-full items-center justify-center rounded-full bg-(--color-primary) px-6 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark) disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiShoppingBag className="mr-2" />
                {isSubmitting || isCheckingStockBeforeSubmit ? "Placing order..." : "Place order"}
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
