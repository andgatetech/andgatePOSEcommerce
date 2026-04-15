"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  FiAlertCircle,
  FiBox,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiHome,
  FiMapPin,
  FiPackage,
  FiRefreshCw,
  FiSearch,
  FiTruck,
} from "react-icons/fi";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { useLazyGetOrderTrackingQuery } from "@/features/orders/orderTrackingApi";
import type { EcommerceOrderStatus } from "@/types";
import {
  buildOrderProgress,
  formatOrderCurrency,
  formatPaymentMethodLabel,
  getOrderStatusTone,
  getPaymentStatusTone,
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
} from "@/components/orders/orderUi";

type OrderTrackingContentProps = {
  variant?: "public" | "account";
};

function getTrackingCopy(status: EcommerceOrderStatus) {
  switch (status) {
    case "pending":
      return "Your order has been received and is waiting for confirmation.";
    case "confirmed":
      return "The order has been confirmed and is queued for fulfilment.";
    case "processing":
      return "The order is currently being prepared for shipment.";
    case "shipped":
      return "The package has shipped and is moving through delivery.";
    case "delivered":
      return "The order has been delivered successfully.";
    case "cancelled":
      return "This order was cancelled and will not move further.";
  }
}

export default function OrderTrackingContent({
  variant = "public",
}: OrderTrackingContentProps) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [triggerTracking, trackingState] = useLazyGetOrderTrackingQuery();
  const isAccount = variant === "account";

  const activeOrder = trackingState.data;
  const progress = useMemo(
    () =>
      activeOrder && activeOrder.status !== "cancelled"
        ? buildOrderProgress(activeOrder.status)
        : [],
    [activeOrder],
  );

  const statusTone = activeOrder ? getOrderStatusTone(activeOrder.status) : null;
  const paymentTone = activeOrder ? getPaymentStatusTone(activeOrder.payment_status) : null;

  async function handleTrackOrder(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      return;
    }

    setSubmittedQuery(normalizedQuery);
    await triggerTracking(normalizedQuery);
  }

  return (
    <div>
      {!isAccount ? (
        <div className="mb-10 flex flex-wrap items-center gap-3 text-sm text-(--color-text-muted)">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)"
          >
            <FiHome className="text-[17px]" />
            <span>Home</span>
          </Link>
          <span>&bull;</span>
          <span>Order Tracking</span>
        </div>
      ) : null}

      <div className="mb-8">
        <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">
          Order Tracking
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-(--color-text-muted)">
          Enter your order number to check the latest status, payment state, totals, and delivery address.
        </p>
      </div>

      <div className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-6 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-7 xl:p-8">
        <form
          onSubmit={handleTrackOrder}
          className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_210px]"
        >
          <label className="space-y-2 text-sm">
            <span className="font-medium text-(--color-dark)">Order Number</span>
            <div className="flex h-13 items-center rounded-[16px] border border-(--color-border) bg-(--color-bg) px-4">
              <FiSearch className="mr-3 text-[18px] text-(--color-text-muted)" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Enter order number"
                className="w-full bg-transparent text-(--color-dark) outline-none placeholder:text-(--color-text-muted)"
              />
            </div>
          </label>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={trackingState.isFetching}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-(--color-primary) px-8 text-sm font-semibold text-(--color-bg) shadow-[0_10px_24px_rgba(44,95,138,0.18)] transition hover:bg-(--color-primary-dark)"
            >
              {trackingState.isFetching ? "Tracking..." : "Track Order"}
            </button>
          </div>
        </form>

        {!submittedQuery && !trackingState.isFetching ? (
          <div className="mt-8 flex min-h-[320px] flex-col items-center justify-center rounded-[24px] border border-dashed border-(--color-border) bg-[#fbfcfd] px-6 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
              <FiSearch className="text-[24px]" />
            </div>
            <h2 className="mt-5 text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">
              Enter an order number to start tracking
            </h2>
            <p className="mt-3 max-w-[520px] text-sm leading-7 text-(--color-text-muted)">
              Use the exact order number from your confirmation page, invoice, or order history.
            </p>
          </div>
        ) : null}

        {trackingState.isFetching ? (
          <div className="mt-8 h-[420px] animate-pulse rounded-[24px] bg-[linear-gradient(90deg,#f6f8fa_0%,#eef3f7_50%,#f6f8fa_100%)]" />
        ) : null}

        {trackingState.isError ? (
          <div className="mt-8 flex min-h-[320px] flex-col items-center justify-center rounded-[24px] border border-[#f6ccd4] bg-[#fff7f8] px-6 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#d2435b]">
              <FiAlertCircle className="text-[24px]" />
            </div>
            <h2 className="mt-5 text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">
              Order not found
            </h2>
            <p className="mt-3 max-w-[520px] text-sm leading-7 text-(--color-text-muted)">
              We could not find an order with <span className="font-semibold text-(--color-dark)">{submittedQuery}</span>. Check the order number and try again.
            </p>
            <button
              type="button"
              onClick={() => void handleTrackOrder()}
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#f1c1ca] bg-white px-6 text-sm font-semibold text-[#d2435b] transition hover:bg-[#fff1f4]"
            >
              <FiRefreshCw className="mr-2 text-[15px]" />
              Try again
            </button>
          </div>
        ) : null}

        {activeOrder && !trackingState.isFetching ? (
          <>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[22px] border border-(--color-border) bg-(--color-bg) p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                    <FiPackage className="text-[18px]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                      Order Number
                    </p>
                    <p className="mt-1 text-sm font-semibold text-(--color-dark)">{activeOrder.order_number}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] border border-(--color-border) bg-(--color-bg) p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                    <FiTruck className="text-[18px]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                      Status
                    </p>
                    <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusTone?.badge}`}>
                      {ORDER_STATUS_LABELS[activeOrder.status]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] border border-(--color-border) bg-(--color-bg) p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                    <FiCreditCard className="text-[18px]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                      Payment
                    </p>
                    <p className="mt-1 text-sm font-semibold text-(--color-dark)">
                      {formatPaymentMethodLabel(activeOrder.payment_method)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] border border-(--color-border) bg-(--color-bg) p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                    <FiClock className="text-[18px]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                      Last Updated
                    </p>
                    <p className="mt-1 text-sm font-semibold text-(--color-dark)">{activeOrder.updated_at}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
              <div className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-6">
                <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                  Tracking Timeline
                </h2>
                <p className="mt-3 text-sm leading-7 text-(--color-text-muted)">
                  {getTrackingCopy(activeOrder.status)}
                </p>

                {activeOrder.status === "cancelled" ? (
                  <div className="mt-8 rounded-[20px] border border-[#f6ccd4] bg-[#fff7f8] p-5 text-sm leading-7 text-(--color-text-muted)">
                    This order has been cancelled. Further tracking updates are not available for cancelled orders.
                  </div>
                ) : (
                  <div className="mt-8 space-y-6">
                    {progress.map((step, index) => (
                      <div key={step.status} className="relative flex gap-4">
                        {index !== progress.length - 1 ? (
                          <span
                            className={`absolute left-[15px] top-9 h-[calc(100%+12px)] w-[2px] ${
                              step.complete ? "bg-(--color-primary)" : "bg-(--color-border)"
                            }`}
                          />
                        ) : null}

                        <div
                          className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                            step.complete
                              ? "border-(--color-primary) bg-(--color-primary) text-(--color-bg)"
                              : "border-(--color-border) bg-(--color-bg) text-(--color-text-muted)"
                          }`}
                        >
                          <FiCheckCircle className="text-[15px]" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="text-[17px] font-semibold text-(--color-dark)">{step.label}</h3>
                            {step.current ? (
                              <span className="text-sm font-medium text-(--color-primary)">Current</span>
                            ) : null}
                          </div>
                          <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-5">
                <div className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-6">
                  <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                    Order Details
                  </h2>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-(--color-text-muted)">
                    <div>
                      <p className="font-semibold text-(--color-dark)">Payment status</p>
                      <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${paymentTone?.badge}`}>
                        {PAYMENT_STATUS_LABELS[activeOrder.payment_status]}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-(--color-dark)">Created</p>
                      <p>{activeOrder.created_at}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-(--color-dark)">Items</p>
                      <p>{activeOrder.item_count} item{activeOrder.item_count === 1 ? "" : "s"}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-(--color-dark)">Total</p>
                      <p>{formatOrderCurrency(activeOrder.total)}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-6">
                  <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                    Shipping Address
                  </h2>
                  <div className="mt-5 space-y-2 text-sm leading-7 text-(--color-text-muted)">
                    <p className="font-semibold text-(--color-dark)">{activeOrder.shipping_address.name}</p>
                    <p>{activeOrder.shipping_address.phone}</p>
                    <p>{activeOrder.shipping_address.address_line}</p>
                    <p>
                      {[
                        activeOrder.shipping_address.area,
                        activeOrder.shipping_address.zone,
                        activeOrder.shipping_address.city,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-(--color-border) bg-(--color-primary-100) p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-bg) text-(--color-primary)">
                      <FiBox className="text-[20px]" />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-primary-900)">
                        Delivery Support
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                        If the current status looks incorrect, contact support with the order number for manual verification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
