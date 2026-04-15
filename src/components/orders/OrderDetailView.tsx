"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import toast from "react-hot-toast";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiBox,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiHome,
  FiMapPin,
  FiPackage,
  FiRefreshCw,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import { ROUTES } from "@/config/routes";
import { useCancelOrderMutation, useGetOrderQuery } from "@/features/orders/ordersApi";
import { resolveImageUrl } from "@/lib/imageUrl";
import {
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  buildOrderProgress,
  formatOrderCurrency,
  formatPaymentMethodLabel,
  getOrderHeroCopy,
  getOrderItemImage,
  getOrderStatusTone,
  getOrderUnitCount,
  getPaymentStatusTone,
  getVariantSummary,
  isOrderCancellable,
} from "./orderUi";

interface OrderDetailViewProps {
  orderNumber: string;
}

export default function OrderDetailView({ orderNumber }: OrderDetailViewProps) {
  const { data: order, isFetching, isError, refetch } = useGetOrderQuery(orderNumber);
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

  const progress = useMemo(
    () => (order && order.status !== "cancelled" ? buildOrderProgress(order.status) : []),
    [order],
  );

  async function handleCancelOrder() {
    if (!order || !isOrderCancellable(order.status) || isCancelling) {
      return;
    }

    try {
      await cancelOrder(order.order_number).unwrap();
      toast.success("Order cancelled successfully.");
    } catch {
      toast.error("Order could not be cancelled.");
    }
  }

  if (isError) {
    return (
      <section className="bg-(--color-bg) px-4 pb-8 pt-10 md:px-8 md:pb-10 lg:px-12 lg:pb-14 lg:pt-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-7 flex flex-wrap items-center gap-3 text-sm text-(--color-text-muted)">
            <Link
              href={ROUTES.HOME}
              className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)"
            >
              <FiHome className="text-[17px]" />
              <span>Home</span>
            </Link>
            <span>&bull;</span>
            <Link href={ROUTES.ORDERS} className="transition hover:text-(--color-primary)">
              Orders
            </Link>
            <span>&bull;</span>
            <span className="text-(--color-dark)">{orderNumber}</span>
          </div>

          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[30px] border border-(--color-border) bg-(--color-bg) px-6 py-10 text-center shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff3f0] text-[#d65e42]">
              <FiAlertCircle className="text-[28px]" />
            </div>
            <h1 className="mt-5 text-[28px] font-semibold tracking-[-0.03em] text-(--color-dark)">
              Order could not be loaded
            </h1>
            <p className="mt-3 max-w-[540px] text-sm leading-7 text-(--color-text-muted)">
              The order might not exist, may belong to another account, or the request failed.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--color-primary-900)"
              >
                <FiRefreshCw className="text-[16px]" />
                Retry
              </button>
              <Link
                href={ROUTES.ORDERS}
                className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-bg) px-5 py-3 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
              >
                <FiArrowLeft className="text-[16px]" />
                Back to orders
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isFetching && !order) {
    return (
      <section className="bg-(--color-bg) px-4 pb-8 pt-10 md:px-8 md:pb-10 lg:px-12 lg:pb-14 lg:pt-12">
        <div className="mx-auto max-w-[1200px] space-y-6">
          <div className="h-6 w-[220px] animate-pulse rounded-full bg-[#edf2f6]" />
          <div className="h-[220px] animate-pulse rounded-[30px] bg-[linear-gradient(90deg,#f6f8fa_0%,#eef3f7_50%,#f6f8fa_100%)]" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="h-[520px] animate-pulse rounded-[30px] bg-[linear-gradient(90deg,#f6f8fa_0%,#eef3f7_50%,#f6f8fa_100%)]" />
            <div className="h-[520px] animate-pulse rounded-[30px] bg-[linear-gradient(90deg,#f6f8fa_0%,#eef3f7_50%,#f6f8fa_100%)]" />
          </div>
        </div>
      </section>
    );
  }

  if (!order) {
    return null;
  }

  const statusTone = getOrderStatusTone(order.status);
  const paymentTone = getPaymentStatusTone(order.payment_status);
  const units = getOrderUnitCount(order);

  return (
    <section className="bg-(--color-bg) px-4 pb-8 pt-10 md:px-8 md:pb-10 lg:px-12 lg:pb-14 lg:pt-12">
      <div className="mx-auto ">
        <div className="mb-7 flex flex-wrap items-center gap-3 text-sm text-(--color-text-muted)">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)"
          >
            <FiHome className="text-[17px]" />
            <span>Home</span>
          </Link>
          <span>&bull;</span>
          <Link href={ROUTES.ORDERS} className="transition hover:text-(--color-primary)">
            Orders
          </Link>
          <span>&bull;</span>
          <span className="text-(--color-dark)">{order.order_number}</span>
        </div>

        <section className="overflow-hidden rounded-[32px] border border-(--color-border) bg-[radial-gradient(circle_at_top_left,rgba(220,234,246,0.92),transparent_42%),linear-gradient(135deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_22px_60px_rgba(19,45,69,0.08)]">
          <div className="grid gap-8 px-6 py-7 md:px-8 lg:grid-cols-[minmax(0,1.1fr)_340px] lg:px-10 lg:py-9">
            <div>
              <Link
                href={ROUTES.ORDERS}
                className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary-200) hover:text-(--color-primary)"
              >
                <FiArrowLeft className="text-[15px]" />
                Back to orders
              </Link>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <h1 className="text-[30px] font-semibold tracking-[-0.04em] text-(--color-primary-900) md:text-[38px]">
                  {order.order_number}
                </h1>
                <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusTone.badge}`}>
                  {ORDER_STATUS_LABELS[order.status]}
                </span>
                <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${paymentTone.badge}`}>
                  Payment {PAYMENT_STATUS_LABELS[order.payment_status]}
                </span>
              </div>

              <p className="mt-4 max-w-[720px] text-sm leading-7 text-(--color-text-muted) md:text-[15px]">
                {getOrderHeroCopy(order.status)}
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-[20px] border border-white/70 bg-white/78 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                    Created
                  </p>
                  <p className="mt-2 text-sm font-semibold text-(--color-dark)">{order.created_at}</p>
                </article>
                <article className="rounded-[20px] border border-white/70 bg-white/78 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                    Payment method
                  </p>
                  <p className="mt-2 text-sm font-semibold text-(--color-dark)">
                    {formatPaymentMethodLabel(order.payment_method)}
                  </p>
                </article>
                <article className="rounded-[20px] border border-white/70 bg-white/78 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                    Units
                  </p>
                  <p className="mt-2 text-sm font-semibold text-(--color-dark)">
                    {units} unit{units === 1 ? "" : "s"}
                  </p>
                </article>
                <article className="rounded-[20px] border border-white/70 bg-white/78 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                    Grand total
                  </p>
                  <p className="mt-2 text-sm font-semibold text-(--color-dark)">
                    {formatOrderCurrency(order.total)}
                  </p>
                </article>
              </div>
            </div>

            <aside className="rounded-[28px] border border-white/80 bg-white/80 p-5 shadow-[0_18px_40px_rgba(19,45,69,0.08)] backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                  <FiShield className="text-[20px]" />
                </div>
                <div>
                  <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                    Order actions
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                    Use the current state of this order to decide whether it is still editable from the customer side.
                  </p>
                </div>
              </div>

              {isOrderCancellable(order.status) ? (
                <button
                  type="button"
                  disabled={isCancelling}
                  onClick={handleCancelOrder}
                  className="mt-5 flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#cf4459] px-5 text-sm font-semibold text-white transition hover:bg-[#b93a4f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCancelling ? "Cancelling…" : "Cancel order"}
                </button>
              ) : (
                <div className={`mt-5 rounded-[20px] border px-4 py-4 text-sm ${statusTone.ring} ${statusTone.soft}`}>
                  This order can no longer be cancelled from the frontend because it is already {ORDER_STATUS_LABELS[order.status].toLowerCase()}.
                </div>
              )}

              <div className="mt-5 rounded-[20px] border border-(--color-border) bg-[#fbfcfd] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                  Payment state
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentTone.badge}`}>
                    {PAYMENT_STATUS_LABELS[order.payment_status]}
                  </span>
                  <span className="text-sm text-(--color-text-muted)">
                    via {formatPaymentMethodLabel(order.payment_method)}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <section className="rounded-[30px] border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                    Items in this order
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                    Snapshot item details captured at checkout time.
                  </p>
                </div>
                <span className="rounded-full bg-(--color-primary-100) px-3 py-1.5 text-sm font-semibold text-(--color-primary)">
                  {units} unit{units === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {order.items.map((item) => {
                  const imageUrl = resolveImageUrl(getOrderItemImage(item));
                  const variantSummary = getVariantSummary(item.variant_data);

                  return (
                    <article
                      key={item.id}
                      className="rounded-[24px] border border-(--color-border) bg-[#fcfcfd] p-4 md:p-5"
                    >
                      <div className="grid gap-4 md:grid-cols-[108px_minmax(0,1fr)_200px]">
                        <div className="relative h-[108px] overflow-hidden rounded-[20px] bg-[#f4f6f8]">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={item.product_name}
                              fill
                              unoptimized
                              className="object-cover"
                              sizes="108px"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[28px] font-semibold text-(--color-text-muted)">
                              {item.product_name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                              {item.product_name}
                            </h3>
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-(--color-text-muted)">
                              SKU {item.sku}
                            </span>
                          </div>

                          {variantSummary ? (
                            <p className="mt-3 text-sm text-(--color-text-muted)">{variantSummary}</p>
                          ) : null}

                          {item.description ? (
                            <p className="mt-3 text-sm leading-7 text-(--color-text-muted)">
                              {item.description}
                            </p>
                          ) : null}
                        </div>

                        <div className="rounded-[20px] border border-(--color-border) bg-white p-4">
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-(--color-text-muted)">Unit price</span>
                            <span className="font-semibold text-(--color-dark)">
                              {formatOrderCurrency(item.unit_price)}
                            </span>
                          </div>
                          <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                            <span className="text-(--color-text-muted)">Quantity</span>
                            <span className="font-semibold text-(--color-dark)">{item.quantity}</span>
                          </div>
                          <div className="mt-3 border-t border-(--color-border) pt-3">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-semibold text-(--color-dark)">Subtotal</span>
                              <span className="text-base font-semibold text-(--color-dark)">
                                {formatOrderCurrency(item.subtotal)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[30px] border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                  <FiTruck className="text-[20px]" />
                </div>
                <div>
                  <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                    Fulfilment progress
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                    Derived from the current order status returned by the API.
                  </p>
                </div>
              </div>

              {order.status === "cancelled" ? (
                <div className="mt-6 rounded-[24px] border border-[#f6ccd4] bg-[#fff7f8] p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#d2435b]">
                      <FiAlertCircle className="text-[20px]" />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                        Order cancelled
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                        This order was cancelled before delivery completed. No further fulfilment stages will be shown for cancelled orders because the API only returns the final status, not the full status-change history.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 space-y-5">
                  {progress.map((step, index) => (
                    <div key={step.status} className="relative flex gap-4">
                      {index !== progress.length - 1 ? (
                        <span
                          className={`absolute left-[15px] top-9 h-[calc(100%+14px)] w-[2px] ${
                            step.complete ? "bg-(--color-primary)" : "bg-(--color-border)"
                          }`}
                        />
                      ) : null}

                      <div
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                          step.complete
                            ? "border-(--color-primary) bg-(--color-primary) text-white"
                            : "border-(--color-border) bg-(--color-bg) text-(--color-text-muted)"
                        }`}
                      >
                        <FiCheckCircle className="text-[15px]" />
                      </div>

                      <div
                        className={`min-w-0 flex-1 rounded-[20px] border px-4 py-4 ${
                          step.current
                            ? "border-(--color-primary-200) bg-(--color-primary-100)"
                            : "border-(--color-border) bg-[#fbfcfd]"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h3 className="text-[18px] font-semibold text-(--color-dark)">{step.label}</h3>
                          {step.current ? (
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-(--color-primary)">
                              Current stage
                            </span>
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
            </section>

            {order.notes ? (
              <section className="rounded-[30px] border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                    <FiClock className="text-[20px]" />
                  </div>
                  <div>
                    <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                      Customer note
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">{order.notes}</p>
                  </div>
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-16 lg:h-fit">
            <section className="rounded-[30px] border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                  <FiBox className="text-[20px]" />
                </div>
                <div>
                  <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                    Order summary
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                    Totals returned by the orders API.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 rounded-[22px] border border-(--color-border) bg-[#fbfcfd] p-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-(--color-text-muted)">Subtotal</span>
                  <span className="font-semibold text-(--color-dark)">{formatOrderCurrency(order.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-(--color-text-muted)">Shipping fee</span>
                  <span className="font-semibold text-(--color-dark)">{formatOrderCurrency(order.shipping_fee)}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-(--color-text-muted)">Items</span>
                  <span className="font-semibold text-(--color-dark)">{order.items.length}</span>
                </div>
                <div className="border-t border-(--color-border) pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-(--color-dark)">Grand total</span>
                    <span className="text-lg font-semibold text-(--color-dark)">{formatOrderCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[30px] border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                  <FiMapPin className="text-[20px]" />
                </div>
                <div>
                  <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                    Shipping address
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                    Delivery destination captured during checkout.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[22px] border border-(--color-border) bg-[#fbfcfd] p-4 text-sm leading-7 text-(--color-text-muted)">
                <p className="font-semibold text-(--color-dark)">{order.shipping_address.name}</p>
                <p>{order.shipping_address.phone}</p>
                <p className="mt-2">{order.shipping_address.address_line}</p>
                <p>
                  {order.shipping_address.city}, {order.shipping_address.postal_code}
                </p>
              </div>
            </section>

            <section className="rounded-[30px] border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                  <FiCreditCard className="text-[20px]" />
                </div>
                <div>
                  <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                    Payment summary
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                    Current payment method and payment status.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 rounded-[22px] border border-(--color-border) bg-[#fbfcfd] p-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-(--color-text-muted)">Method</span>
                  <span className="font-semibold text-(--color-dark)">
                    {formatPaymentMethodLabel(order.payment_method)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-(--color-text-muted)">Status</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentTone.badge}`}>
                    {PAYMENT_STATUS_LABELS[order.payment_status]}
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-[30px] border border-(--color-border) bg-(--color-primary-100) p-5 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-(--color-primary)">
                  <FiPackage className="text-[20px]" />
                </div>
                <div>
                  <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-(--color-primary-900)">
                    Order support
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                    Keep the order number ready if customer support needs to investigate payment or delivery issues.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
