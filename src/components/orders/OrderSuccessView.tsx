"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Lottie from "lottie-react";
import {
  FiArrowRight,
  FiFileText,
  FiHome,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import orderCompletedAnimation from "../../../public/images/svg/Order completed.json";
import orderFailAnimation from "../../../public/images/svg/order fail.json";
import { ROUTE_BUILDERS, ROUTES } from "@/config/routes";
import { loadCheckoutSuccess } from "@/lib/checkoutSuccessStorage";
import type { OrderMutationResult } from "@/types";
import {
  formatOrderCurrency,
  formatPaymentMethodLabel,
  getOrderUnitCount,
} from "./orderUi";

interface OrderSuccessViewProps {
  orderNumber: string;
}

export default function OrderSuccessView({ orderNumber }: OrderSuccessViewProps) {
  const [checkoutResult, setCheckoutResult] = useState<OrderMutationResult | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setCheckoutResult(loadCheckoutSuccess(orderNumber));
    setIsHydrated(true);
  }, [orderNumber]);

  const order = checkoutResult?.data ?? null;
  const units = useMemo(() => (order ? getOrderUnitCount(order) : 0), [order]);
  const firstItems = useMemo(() => order?.items.slice(0, 3) ?? [], [order]);

  if (!isHydrated) {
    return (
      <section className="bg-[#f6f8fb] px-4 pb-8 pt-10 md:px-8 md:pb-10 lg:px-12 lg:pb-14 lg:pt-12">
        <div className="mx-auto rounded-[32px] border border-[rgba(20,33,43,0.08)] bg-white shadow-[0_24px_70px_rgba(20,33,43,0.08)]">
          <div className="border-b border-[rgba(20,33,43,0.08)] px-6 py-5 md:px-8">
            <div className="h-16 animate-pulse rounded-[18px] bg-[linear-gradient(90deg,#f6f8fa_0%,#eef3f7_50%,#f6f8fa_100%)]" />
          </div>
          <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-6 px-6 py-7 md:px-8 md:py-8">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="h-28 animate-pulse rounded-[24px] bg-[linear-gradient(90deg,#f6f8fa_0%,#eef3f7_50%,#f6f8fa_100%)]" />
                <div className="h-28 animate-pulse rounded-[24px] bg-[linear-gradient(90deg,#f6f8fa_0%,#eef3f7_50%,#f6f8fa_100%)]" />
                <div className="h-28 animate-pulse rounded-[24px] bg-[linear-gradient(90deg,#f6f8fa_0%,#eef3f7_50%,#f6f8fa_100%)]" />
              </div>
              <div className="h-64 animate-pulse rounded-[28px] bg-[linear-gradient(90deg,#f6f8fa_0%,#eef3f7_50%,#f6f8fa_100%)]" />
            </div>
            <div className="border-t border-[rgba(20,33,43,0.08)] px-6 py-7 md:px-8 xl:border-l xl:border-t-0 xl:py-8">
              <div className="h-96 animate-pulse rounded-[24px] bg-[linear-gradient(90deg,#f6f8fa_0%,#eef3f7_50%,#f6f8fa_100%)]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="bg-[#f6f8fb] px-4 pb-8 pt-10 md:px-8 md:pb-10 lg:px-12 lg:pb-14 lg:pt-12">
        <div className="mx-auto max-w-[900px] rounded-[32px] border border-(--color-border) bg-(--color-bg) p-8 text-center shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
          <Lottie
            animationData={orderFailAnimation}
            autoplay
            loop={false}
            className="mx-auto h-40 w-40"
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          />
          <h1 className="mt-6 text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">
            Order confirmation snapshot is unavailable
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-sm leading-7 text-(--color-text-muted)">
            The order may still exist. Use the order number below from your current browser session, or open your protected order details after logging in.
          </p>
          <div className="mx-auto mt-5 max-w-max rounded-[20px] border border-[rgba(20,33,43,0.08)] bg-[#fbfcfd] px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
              Order Number
            </p>
            <p className="mt-2 text-[18px] font-semibold text-(--color-dark)">{orderNumber}</p>
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href={ROUTE_BUILDERS.orderDetail(orderNumber)}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-(--color-primary) px-7 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
            >
              Open order details
            </Link>
            <Link
              href={ROUTES.HOME}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg) px-7 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f6f8fb] px-4 py-8 md:px-8 lg:px-12 lg:py-10">
      <div className="mx-auto ">
        <div className="rounded-[32px] border border-[rgba(20,33,43,0.08)] bg-white shadow-[0_24px_70px_rgba(20,33,43,0.08)]">
          <div className="border-b border-[rgba(20,33,43,0.08)] px-6 py-5 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Lottie
                  animationData={orderCompletedAnimation}
                  autoplay
                  loop={false}
                  className="h-20 w-20 shrink-0 md:h-24 md:w-24"
                  rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#146c5a]">
                    Order Confirmed
                  </p>
                  <h1 className="mt-1 text-[28px] font-semibold tracking-[-0.04em] text-[#15202b] md:text-[34px]">
                    {checkoutResult?.message || "Order placed successfully."}
                  </h1>
                </div>
              </div>

              <div className="rounded-[20px] border border-[rgba(20,33,43,0.08)] bg-[#fbfcfd] px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                  Order Number
                </p>
                <p className="mt-2 text-[18px] font-semibold text-(--color-dark)">
                  {order.order_number}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="px-6 py-7 md:px-8 md:py-8">
              <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-[24px] border border-[rgba(20,33,43,0.08)] bg-[#fbfcfd] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                    Total
                  </p>
                  <p className="mt-3 text-[24px] font-semibold text-(--color-dark)">
                    {formatOrderCurrency(order.total)}
                  </p>
                </article>
                <article className="rounded-[24px] border border-[rgba(20,33,43,0.08)] bg-[#fbfcfd] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                    Payment Method
                  </p>
                  <p className="mt-3 text-[24px] font-semibold text-(--color-dark)">
                    {formatPaymentMethodLabel(order.payment_method)}
                  </p>
                </article>
                <article className="rounded-[24px] border border-[rgba(20,33,43,0.08)] bg-[#fbfcfd] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                    Items
                  </p>
                  <p className="mt-3 text-[24px] font-semibold text-(--color-dark)">
                    {units} unit{units === 1 ? "" : "s"}
                  </p>
                </article>
              </div>

              <div className="mt-8 rounded-[28px] border border-[rgba(20,33,43,0.08)] bg-[#fcfdfd] p-6">
                <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                  What happens next
                </h2>
                <p className="mt-3 max-w-[760px] text-sm leading-7 text-(--color-text-muted)">
                  We have received your order and started the processing workflow. You can review protected order details from your account or return to shopping.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <article className="rounded-[22px] border border-[rgba(20,33,43,0.08)] bg-white p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef5ff] text-[#2563eb]">
                      <FiFileText className="text-[18px]" />
                    </div>
                    <h3 className="mt-4 text-[18px] font-semibold text-(--color-dark)">Confirmation saved</h3>
                    <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                      Keep the order number for support and account lookup.
                    </p>
                  </article>
                  <article className="rounded-[22px] border border-[rgba(20,33,43,0.08)] bg-white p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eefaf5] text-[#146c5a]">
                      <FiShoppingBag className="text-[18px]" />
                    </div>
                    <h3 className="mt-4 text-[18px] font-semibold text-(--color-dark)">Processing started</h3>
                    <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                      The order is now in the queue for confirmation, packing, and shipment.
                    </p>
                  </article>
                  <article className="rounded-[22px] border border-[rgba(20,33,43,0.08)] bg-white p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff7ea] text-[#bf7b1a]">
                      <FiTruck className="text-[18px]" />
                    </div>
                    <h3 className="mt-4 text-[18px] font-semibold text-(--color-dark)">Tracking updates</h3>
                    <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                      Shipping and delivery updates will appear in the protected order detail page.
                    </p>
                  </article>
                </div>
              </div>

              <div className="mt-8 rounded-[28px] border border-[rgba(20,33,43,0.08)] bg-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                      Order preview
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                      A quick snapshot of the items included in this order.
                    </p>
                  </div>
                  <Link
                    href={ROUTE_BUILDERS.orderDetail(order.order_number)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-(--color-primary) transition hover:text-(--color-primary-dark)"
                  >
                    Open protected order details
                    <FiArrowRight className="text-[15px]" />
                  </Link>
                </div>

                <div className="mt-6 divide-y divide-[rgba(20,33,43,0.08)] rounded-[22px] border border-[rgba(20,33,43,0.08)] bg-[#fbfcfd]">
                  {firstItems.map((item) => (
                    <article
                      key={item.id}
                      className="grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,1fr)_120px_140px] md:items-center"
                    >
                      <div className="min-w-0">
                        <p className="text-[16px] font-semibold text-(--color-dark)">
                          {item.product_name}
                        </p>
                        <p className="mt-1 text-sm text-(--color-text-muted)">
                          SKU {item.sku}
                        </p>
                      </div>
                      <p className="text-sm text-(--color-text-muted)">
                        Qty <span className="font-semibold text-(--color-dark)">{item.quantity}</span>
                      </p>
                      <p className="text-sm font-semibold text-(--color-dark) md:text-right">
                        {formatOrderCurrency(item.subtotal)}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <aside className="border-t border-[rgba(20,33,43,0.08)] bg-[#f9fbfc] px-6 py-7 xl:border-l xl:border-t-0 md:px-8 xl:py-8">
              <div className="space-y-4">
                <div className="rounded-[24px] border border-[rgba(20,33,43,0.08)] bg-white p-5">
                  <h2 className="text-[21px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                    Next steps
                  </h2>
                  <div className="mt-5 flex flex-col gap-3">
                    <Link
                      href={ROUTE_BUILDERS.orderDetail(order.order_number)}
                      className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-(--color-primary) bg-(--color-primary-100) px-6 text-sm font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-white"
                    >
                      View order details
                    </Link>
                    <Link
                      href={ROUTES.HOME}
                      className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-(--color-border) bg-white px-6 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
                    >
                      <FiHome className="mr-2 text-[16px]" />
                      Back to home
                    </Link>
                  </div>
                </div>

                <div className="rounded-[24px] border border-[rgba(20,33,43,0.08)] bg-white p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef5ff] text-[#2563eb]">
                      <FiMapPin className="text-[18px]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                        Shipping Address
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-7 text-(--color-dark)">
                        {order.shipping_address.name}
                      </p>
                      <p className="text-sm leading-7 text-(--color-text-muted)">
                        {order.shipping_address.address_line}
                      </p>
                      <p className="text-sm leading-7 text-(--color-text-muted)">
                        {[order.shipping_address.area, order.shipping_address.zone, order.shipping_address.city]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                      <p className="mt-2 inline-flex items-center gap-2 text-sm text-(--color-text-muted)">
                        <FiPhone className="text-[14px]" />
                        {order.shipping_address.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-[rgba(20,33,43,0.08)] bg-white p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eefaf5] text-[#146c5a]">
                      <FiPackage className="text-[18px]" />
                    </div>
                    <div className="w-full">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                        Payment Summary
                      </p>
                      <div className="mt-4 space-y-3 text-sm">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-(--color-text-muted)">Subtotal</span>
                          <span className="font-semibold text-(--color-dark)">
                            {formatOrderCurrency(order.subtotal)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-(--color-text-muted)">Shipping</span>
                          <span className="font-semibold text-(--color-dark)">
                            {formatOrderCurrency(order.shipping_fee)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-(--color-text-muted)">Method</span>
                          <span className="font-semibold text-(--color-dark)">
                            {formatPaymentMethodLabel(order.payment_method)}
                          </span>
                        </div>
                        <div className="border-t border-[rgba(20,33,43,0.08)] pt-3">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-semibold text-(--color-dark)">Grand total</span>
                            <span className="text-[18px] font-semibold text-(--color-dark)">
                              {formatOrderCurrency(order.total)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
