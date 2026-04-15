"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FiCheckCircle,
  FiDownload,
  FiFileText,
  FiHome,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiRefreshCw,
  FiShoppingBag,
  FiTruck,
  FiArrowRight,
} from "react-icons/fi";
import { ROUTE_BUILDERS, ROUTES } from "@/config/routes";
import { useGetOrderQuery } from "@/features/orders/ordersApi";
import type { EcommerceOrder } from "@/types";
import {
  formatOrderCurrency,
  formatPaymentMethodLabel,
  getOrderUnitCount,
} from "./orderUi";

interface OrderSuccessViewProps {
  orderNumber: string;
}

function buildInvoiceMarkup(order: EcommerceOrder) {
  const rows = order.items
    .map(
      (item: EcommerceOrder["items"][number]) => `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #d7dee6;">${item.product_name}</td>
          <td style="padding:12px;border-bottom:1px solid #d7dee6;">${item.quantity}</td>
          <td style="padding:12px;border-bottom:1px solid #d7dee6;">${formatOrderCurrency(item.unit_price)}</td>
          <td style="padding:12px;border-bottom:1px solid #d7dee6;text-align:right;">${formatOrderCurrency(item.subtotal)}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Invoice ${order.order_number}</title>
  </head>
  <body style="margin:0;background:#f3f7fa;color:#14212b;font-family:Segoe UI, Arial, sans-serif;">
    <div style="max-width:860px;margin:0 auto;padding:40px 24px;">
      <div style="background:#ffffff;border:1px solid #d7dee6;border-radius:24px;padding:32px;">
        <div style="display:flex;justify-content:space-between;gap:24px;align-items:flex-start;">
          <div>
            <div style="display:inline-block;padding:8px 14px;border-radius:999px;background:#e8f3ef;color:#14695c;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Invoice</div>
            <h1 style="margin:18px 0 0;font-size:32px;line-height:1.15;">${order.order_number}</h1>
            <p style="margin:10px 0 0;color:#5c6c79;">Created ${order.created_at}</p>
          </div>
          <div style="text-align:right;">
            <p style="margin:0;font-size:12px;color:#5c6c79;text-transform:uppercase;letter-spacing:.08em;">Grand total</p>
            <p style="margin:10px 0 0;font-size:28px;font-weight:700;">${formatOrderCurrency(order.total)}</p>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:28px;">
          <div style="border:1px solid #d7dee6;border-radius:18px;padding:18px;">
            <p style="margin:0 0 10px;font-size:12px;color:#5c6c79;text-transform:uppercase;letter-spacing:.08em;">Shipping</p>
            <p style="margin:0;font-weight:700;">${order.shipping_address.name}</p>
            <p style="margin:6px 0 0;">${order.shipping_address.phone}</p>
            <p style="margin:6px 0 0;">${order.shipping_address.address_line}</p>
            <p style="margin:6px 0 0;">${order.shipping_address.city}, ${order.shipping_address.postal_code}</p>
          </div>
          <div style="border:1px solid #d7dee6;border-radius:18px;padding:18px;">
            <p style="margin:0 0 10px;font-size:12px;color:#5c6c79;text-transform:uppercase;letter-spacing:.08em;">Payment</p>
            <p style="margin:0;font-weight:700;">${formatPaymentMethodLabel(order.payment_method)}</p>
            <p style="margin:6px 0 0;">Status: ${order.payment_status}</p>
            <p style="margin:6px 0 0;">Subtotal: ${formatOrderCurrency(order.subtotal)}</p>
            <p style="margin:6px 0 0;">Shipping: ${formatOrderCurrency(order.shipping_fee)}</p>
          </div>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-top:28px;">
          <thead>
            <tr style="background:#f6f9fb;text-align:left;">
              <th style="padding:12px;">Item</th>
              <th style="padding:12px;">Qty</th>
              <th style="padding:12px;">Unit price</th>
              <th style="padding:12px;text-align:right;">Subtotal</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  </body>
</html>`;
}

export default function OrderSuccessView({ orderNumber }: OrderSuccessViewProps) {
  const { data: order, isFetching, isError, refetch } = useGetOrderQuery(orderNumber);
  const [isDownloading, setIsDownloading] = useState(false);

  const units = useMemo(() => (order ? getOrderUnitCount(order) : 0), [order]);
  const firstItems = useMemo(() => order?.items.slice(0, 3) ?? [], [order]);

  function handleInvoiceDownload() {
    if (!order || isDownloading) {
      return;
    }

    setIsDownloading(true);

    try {
      const markup = buildInvoiceMarkup(order);
      const blob = new Blob([markup], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${order.order_number}-invoice.html`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  }

  if (isFetching && !order) {
    return (
      <section className="bg-(--color-bg) px-4 pb-8 pt-10 md:px-8 md:pb-10 lg:px-12 lg:pb-14 lg:pt-12">
        <div className="mx-auto max-w-[1180px]">
          <div className="h-[620px] animate-pulse rounded-[34px] bg-[linear-gradient(90deg,#f6f8fa_0%,#eef3f7_50%,#f6f8fa_100%)]" />
        </div>
      </section>
    );
  }

  if (isError || !order) {
    return (
      <section className="bg-(--color-bg) px-4 pb-8 pt-10 md:px-8 md:pb-10 lg:px-12 lg:pb-14 lg:pt-12">
        <div className="mx-auto max-w-[900px] rounded-[32px] border border-(--color-border) bg-(--color-bg) p-8 text-center shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff3f0] text-[#d65e42]">
            <FiPackage className="text-[28px]" />
          </div>
          <h1 className="mt-6 text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">
            Order created, but confirmation screen could not load
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-sm leading-7 text-(--color-text-muted)">
            The order may still exist. Reload this page or open the order details directly.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-(--color-primary) px-7 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
            >
              <FiRefreshCw className="mr-2" />
              Reload
            </button>
            <Link
              href={ROUTE_BUILDERS.orderDetail(orderNumber)}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg) px-7 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
            >
              Open order details
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
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f4ef] text-[#146c5a]">
                  <FiCheckCircle className="text-[22px]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#146c5a]">
                    Order Confirmed
                  </p>
                  <h1 className="mt-1 text-[28px] font-semibold tracking-[-0.04em] text-[#15202b] md:text-[34px]">
                    Thank you. Your order has been placed successfully.
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
                    Total Paid
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
                  We have received your order and started the processing workflow. You can keep the invoice for your records, review the live order details, or return to shopping.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <article className="rounded-[22px] border border-[rgba(20,33,43,0.08)] bg-white p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef5ff] text-[#2563eb]">
                      <FiFileText className="text-[18px]" />
                    </div>
                    <h3 className="mt-4 text-[18px] font-semibold text-(--color-dark)">Invoice ready</h3>
                    <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                      Download a clean invoice snapshot for accounting and confirmation.
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
                      Shipping and delivery updates will appear in the order detail page.
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
                    Open full order
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
                    Actions
                  </h2>
                  <div className="mt-5 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={handleInvoiceDownload}
                      className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-(--color-primary) px-6 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
                    >
                      <FiDownload className="mr-2 text-[16px]" />
                      {isDownloading ? "Preparing invoice..." : "Download invoice"}
                    </button>
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
                        {order.shipping_address.city}
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
