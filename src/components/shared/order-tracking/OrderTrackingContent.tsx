"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FiAlertCircle,
  FiBox,
  FiClock,
  FiCreditCard,
  FiHome,
  FiPackage,
  FiRefreshCw,
  FiSearch,
  FiTruck,
} from "react-icons/fi";
import { ROUTES } from "@/config/routes";
import { OrderTrackingResultSkeleton } from "@/components/shared/Skeletons";
import { useLazyGetOrderTrackingQuery } from "@/features/orders/orderTrackingApi";
import type { EcommerceOrder, EcommerceStoreOrder } from "@/types";
import {
  PAYMENT_STATUS_LABELS,
  formatOrderCurrency,
  formatPaymentMethodLabel,
  getCustomerOrderStatusLabel,
  getOrderStatusTone,
  getPaymentStatusTone,
  getStoreOrderItemCount,
  getStoreOrderSellerName,
} from "@/components/orders/orderUi";

type OrderTrackingContentProps = {
  variant?: "public" | "account";
};

function getStoreOrders(order: EcommerceOrder) {
  const storeOrders = order.orders ?? order.store_orders;

  if (storeOrders?.length) {
    return storeOrders;
  }

  if (!order.status || !order.payment_status || typeof order.total === "undefined") {
    return [];
  }

  return [
    {
      id: order.id ?? 0,
      store_order_id: order.id,
      order_number: order.order_number,
      status: order.status,
      payment_status: order.payment_status,
      payment_method: order.payment_method,
      items_count: order.item_count ?? order.items?.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: order.subtotal ?? order.items?.reduce((sum, item) => sum + Number(item.subtotal), 0) ?? order.total,
      shipping_fee: order.shipping_fee ?? 0,
      total: order.total,
      paid_amount: order.payment_summary?.paid_amount,
      due_amount: order.payment_summary?.due_amount,
      items: order.items,
      shipping_address: order.shipping_address,
      notes: order.notes,
      created_at: order.created_at,
      updated_at: order.updated_at,
    },
  ];
}

function getCheckoutSummary(order: EcommerceOrder, storeOrders: EcommerceStoreOrder[]) {
  return {
    subtotal: order.checkout_summary?.subtotal ?? storeOrders.reduce((sum, storeOrder) => sum + Number(storeOrder.subtotal), 0),
    shipping_fee:
      order.checkout_summary?.shipping_fee ?? storeOrders.reduce((sum, storeOrder) => sum + Number(storeOrder.shipping_fee), 0),
    total: order.checkout_summary?.total ?? storeOrders.reduce((sum, storeOrder) => sum + Number(storeOrder.total), 0),
  };
}

function getStoreOrderKey(storeOrder: EcommerceStoreOrder) {
  return storeOrder.store_order_id ?? storeOrder.id;
}

function getTimelineRows(storeOrder: EcommerceStoreOrder) {
  return [
    { label: "Placed", value: storeOrder.created_at },
    { label: "Reserved", value: storeOrder.reserved_at },
    { label: "Delivered", value: storeOrder.delivered_at },
    { label: "Cancelled", value: storeOrder.cancelled_at },
    { label: "Returned", value: storeOrder.returned_at },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));
}

export default function OrderTrackingContent({ variant = "public" }: OrderTrackingContentProps) {
  const searchParams = useSearchParams();
  const prefilledOrder = searchParams.get("order") ?? "";
  const [query, setQuery] = useState(prefilledOrder);
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [triggerTracking, trackingState] = useLazyGetOrderTrackingQuery();
  const autoSubmitted = useRef(false);
  const isAccount = variant === "account";

  useEffect(() => {
    if (prefilledOrder && !autoSubmitted.current) {
      autoSubmitted.current = true;
      setSubmittedQuery(prefilledOrder);
      void triggerTracking(prefilledOrder);
    }
  // run once on mount only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeOrder = trackingState.data;
  const storeOrders = activeOrder ? getStoreOrders(activeOrder) : [];
  const checkoutSummary = activeOrder ? getCheckoutSummary(activeOrder, storeOrders) : null;
  const totalItems = storeOrders.reduce((sum, storeOrder) => sum + getStoreOrderItemCount(storeOrder), 0);

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
          <Link href={ROUTES.HOME} className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)">
            <FiHome className="text-[17px]" />
            <span>Home</span>
          </Link>
          <span>&bull;</span>
          <span>Order Tracking</span>
        </div>
      ) : null}

      <div className="mb-8">
        <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">Order Tracking</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-(--color-text-muted)">
          Enter your order number to review each store order status, payment state, totals, and delivery address.
        </p>
      </div>

      <div className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-6 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-7 xl:p-8">
        <form onSubmit={handleTrackOrder} className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_210px]">
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
            <h2 className="mt-5 text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">Enter an order number to start tracking</h2>
            <p className="mt-3 max-w-[520px] text-sm leading-7 text-(--color-text-muted)">
              Use the exact order number from your confirmation page, invoice, or order history.
            </p>
          </div>
        ) : null}

        {trackingState.isFetching ? (
          <OrderTrackingResultSkeleton />
        ) : null}

        {trackingState.isError ? (
          <div className="mt-8 flex min-h-[320px] flex-col items-center justify-center rounded-[24px] border border-[#f6ccd4] bg-[#fff7f8] px-6 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#d2435b]">
              <FiAlertCircle className="text-[24px]" />
            </div>
            <h2 className="mt-5 text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">Order not found</h2>
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

        {activeOrder && checkoutSummary && !trackingState.isFetching ? (
          <>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[22px] border border-(--color-border) bg-(--color-bg) p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                    <FiPackage className="text-[18px]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">Order Number</p>
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
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">Store Orders</p>
                    <p className="mt-1 text-sm font-semibold text-(--color-dark)">
                      {activeOrder.store_order_count ?? storeOrders.length} block{(activeOrder.store_order_count ?? storeOrders.length) === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] border border-(--color-border) bg-(--color-bg) p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                    <FiCreditCard className="text-[18px]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">Checkout Total</p>
                    <p className="mt-1 text-sm font-semibold text-(--color-dark)">{formatOrderCurrency(checkoutSummary.total)}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] border border-(--color-border) bg-(--color-bg) p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                    <FiClock className="text-[18px]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">Created</p>
                    <p className="mt-1 text-sm font-semibold text-(--color-dark)">{activeOrder.created_at}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
              <div className="space-y-5">
                {storeOrders.map((storeOrder) => {
                  const statusTone = getOrderStatusTone(storeOrder.status);
                  const paymentTone = getPaymentStatusTone(storeOrder.payment_status);
                  const timelineRows = getTimelineRows(storeOrder);

                  return (
                    <article key={getStoreOrderKey(storeOrder)} className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                            #{storeOrder.order_number ?? activeOrder.order_number} - {getStoreOrderSellerName(storeOrder)}
                          </h2>
                          <p className="mt-2 text-sm text-(--color-text-muted)">Store order #{getStoreOrderKey(storeOrder)}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone.badge}`}>
                            {getCustomerOrderStatusLabel(storeOrder.status)}
                          </span>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentTone.badge}`}>
                            Payment {PAYMENT_STATUS_LABELS[storeOrder.payment_status]}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3 md:grid-cols-4">
                        <div className="rounded-[18px] border border-(--color-border) bg-[#fbfcfd] p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">Total</p>
                          <p className="mt-2 text-sm font-semibold text-(--color-dark)">{formatOrderCurrency(storeOrder.total)}</p>
                        </div>
                        <div className="rounded-[18px] border border-(--color-border) bg-[#fbfcfd] p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">Due</p>
                          <p className="mt-2 text-sm font-semibold text-(--color-dark)">
                            {formatOrderCurrency(storeOrder.due_amount ?? Math.max(Number(storeOrder.total) - Number(storeOrder.paid_amount ?? 0), 0))}
                          </p>
                        </div>
                        <div className="rounded-[18px] border border-(--color-border) bg-[#fbfcfd] p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">Items</p>
                          <p className="mt-2 text-sm font-semibold text-(--color-dark)">{getStoreOrderItemCount(storeOrder)}</p>
                        </div>
                        <div className="rounded-[18px] border border-(--color-border) bg-[#fbfcfd] p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">Method</p>
                          <p className="mt-2 text-sm font-semibold text-(--color-dark)">{formatPaymentMethodLabel(storeOrder.payment_method)}</p>
                        </div>
                      </div>

                      {timelineRows.length > 0 ? (
                        <div className="mt-5 flex flex-wrap gap-3">
                          {timelineRows.map((row) => (
                            <span key={`${getStoreOrderKey(storeOrder)}-${row.label}`} className="inline-flex items-center gap-2 rounded-full bg-[#fbfcfd] px-3 py-1.5 text-sm text-(--color-text-muted)">
                              <FiClock className="text-[14px] text-(--color-primary)" />
                              <span className="font-semibold text-(--color-dark)">{row.label}:</span> {row.value}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>

              <div className="space-y-5">
                <div className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-6">
                  <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-dark)">Checkout Summary</h2>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-(--color-text-muted)">
                    <div className="flex items-center justify-between gap-4">
                      <span>Subtotal</span>
                      <span className="font-semibold text-(--color-dark)">{formatOrderCurrency(checkoutSummary.subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Shipping</span>
                      <span className="font-semibold text-(--color-dark)">{formatOrderCurrency(checkoutSummary.shipping_fee)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-(--color-border) pt-4">
                      <span className="font-semibold text-(--color-dark)">Checkout total</span>
                      <span className="font-semibold text-(--color-dark)">{formatOrderCurrency(checkoutSummary.total)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Items</span>
                      <span className="font-semibold text-(--color-dark)">{totalItems}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-6">
                  <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-dark)">Shipping Address</h2>
                  <div className="mt-5 space-y-2 text-sm leading-7 text-(--color-text-muted)">
                    <p className="font-semibold text-(--color-dark)">{activeOrder.shipping_address.name}</p>
                    <p>{activeOrder.shipping_address.phone}</p>
                    <p>{activeOrder.shipping_address.address_line}</p>
                    <p>{[activeOrder.shipping_address.area, activeOrder.shipping_address.zone, activeOrder.shipping_address.city].filter(Boolean).join(", ")}</p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-(--color-border) bg-(--color-primary-100) p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-bg) text-(--color-primary)">
                      <FiBox className="text-[20px]" />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-primary-900)">Delivery Support</h3>
                      <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                        Use the shared order number plus the store name when asking support about a specific shipment.
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
