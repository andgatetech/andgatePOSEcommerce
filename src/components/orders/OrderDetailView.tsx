"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertCircle, FiArrowLeft, FiHome, FiPackage, FiRefreshCw, FiTruck } from "react-icons/fi";
import { ROUTE_BUILDERS, ROUTES } from "@/config/routes";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import Container from "@/components/shared/Container";
import { OrderDetailSkeleton } from "@/components/shared/Skeletons";
import { useCancelOrderMutation, useGetOrderQuery } from "@/features/orders/ordersApi";
import { getBackendMessage } from "@/lib/apiMessage";
import { resolveImageUrl } from "@/lib/imageUrl";
import type { EcommerceOrder, EcommerceOrderShippingAddress, EcommerceStoreOrder } from "@/types";
import {
  PAYMENT_STATUS_LABELS,
  formatOrderCurrency,
  formatPaymentMethodLabel,
  getCustomerOrderStatusLabel,
  getOrderItemImage,
  getOrderStatusTone,
  getPaymentStatusTone,
  getStoreOrderItemCount,
  getStoreOrderSellerName,
  getVariantSummary,
  isOrderCancellable,
} from "./orderUi";

interface OrderDetailViewProps {
  orderNumber: string;
  selectedStoreOrderId?: string;
}

type CheckoutSummary = {
  subtotal: number;
  shipping_fee: number;
  total: number;
};

function getStoreOrderKey(storeOrder: EcommerceStoreOrder) {
  return storeOrder.store_order_id ?? storeOrder.id;
}

function isSelectedStoreOrder(storeOrder: EcommerceStoreOrder, selectedStoreOrderId?: string) {
  return Boolean(selectedStoreOrderId) && String(getStoreOrderKey(storeOrder)) === selectedStoreOrderId;
}

function getStoreOrders(order: EcommerceOrder): EcommerceStoreOrder[] {
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

function getCheckoutSummary(order: EcommerceOrder, storeOrders: EcommerceStoreOrder[]): CheckoutSummary {
  return {
    subtotal: order.checkout_summary?.subtotal ?? storeOrders.reduce((sum, storeOrder) => sum + Number(storeOrder.subtotal), 0),
    shipping_fee:
      order.checkout_summary?.shipping_fee ?? storeOrders.reduce((sum, storeOrder) => sum + Number(storeOrder.shipping_fee), 0),
    total: order.checkout_summary?.total ?? storeOrders.reduce((sum, storeOrder) => sum + Number(storeOrder.total), 0),
  };
}

function getStoreOrderDueAmount(storeOrder: EcommerceStoreOrder) {
  return storeOrder.due_amount ?? Math.max(Number(storeOrder.total) - Number(storeOrder.paid_amount ?? 0), 0);
}

function getStoreHref(storeOrder: EcommerceStoreOrder) {
  return storeOrder.store?.slug ? ROUTE_BUILDERS.storeDetail(storeOrder.store.slug) : ROUTES.STORE;
}

function getPaymentMethodLabel(storeOrders: EcommerceStoreOrder[]) {
  const methods = Array.from(new Set(storeOrders.map((storeOrder) => storeOrder.payment_method).filter(Boolean)));
  if (methods.length === 0) {
    return "Not specified";
  }

  if (methods.length === 1) {
    return formatPaymentMethodLabel(methods[0]);
  }

  return "Multiple methods";
}

function formatAddressLines(address: EcommerceOrderShippingAddress) {
  return [
    address.address_line,
    [address.area, address.zone, address.city].filter(Boolean).join(", "),
    address.postal_code,
  ].filter(Boolean);
}

function getPaymentSummaryLabel(storeOrders: EcommerceStoreOrder[]) {
  const statuses = Array.from(new Set(storeOrders.map((storeOrder) => storeOrder.payment_status).filter(Boolean)));
  if (statuses.length === 1) {
    return PAYMENT_STATUS_LABELS[statuses[0]];
  }

  return "Mixed";
}

function getPaymentSummaryTone(storeOrders: EcommerceStoreOrder[]) {
  const statuses = Array.from(new Set(storeOrders.map((storeOrder) => storeOrder.payment_status).filter(Boolean)));
  return statuses.length === 1 ? getPaymentStatusTone(statuses[0]).badge : "bg-[#eef5ff] text-[#2563eb]";
}

export default function OrderDetailView({ orderNumber, selectedStoreOrderId }: OrderDetailViewProps) {
  const { data: fetchedOrder, isFetching, isError, refetch } = useGetOrderQuery(orderNumber);
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
  const [replacementOrder, setReplacementOrder] = useState<EcommerceOrder | null>(null);

  useEffect(() => {
    setReplacementOrder(null);
  }, [orderNumber]);

  const order = replacementOrder ?? fetchedOrder ?? null;
  const allStoreOrders = useMemo(() => (order ? getStoreOrders(order) : []), [order]);
  const selectedStoreOrder = useMemo(
    () => allStoreOrders.find((storeOrder) => isSelectedStoreOrder(storeOrder, selectedStoreOrderId)) ?? null,
    [allStoreOrders, selectedStoreOrderId],
  );
  const storeOrders = useMemo(
    () => (selectedStoreOrder ? [selectedStoreOrder] : allStoreOrders),
    [allStoreOrders, selectedStoreOrder],
  );
  const isPackageDetail = Boolean(selectedStoreOrder);
  const checkoutSummary = useMemo(() => {
    if (!order) {
      return null;
    }

    return isPackageDetail
      ? {
          subtotal: storeOrders.reduce((sum, storeOrder) => sum + Number(storeOrder.subtotal), 0),
          shipping_fee: storeOrders.reduce((sum, storeOrder) => sum + Number(storeOrder.shipping_fee), 0),
          total: storeOrders.reduce((sum, storeOrder) => sum + Number(storeOrder.total), 0),
        }
      : getCheckoutSummary(order, storeOrders);
  }, [isPackageDetail, order, storeOrders]);
  const totalUnits = storeOrders.reduce((sum, storeOrder) => sum + getStoreOrderItemCount(storeOrder), 0);
  const canCancel = storeOrders.some((storeOrder) => isOrderCancellable(storeOrder.status));
  const paidAmount = storeOrders.reduce((sum, storeOrder) => sum + Number(storeOrder.paid_amount ?? 0), 0);
  const dueAmount = storeOrders.reduce((sum, storeOrder) => sum + getStoreOrderDueAmount(storeOrder), 0);

  async function handleCancelOrder() {
    if (!order || !canCancel || isCancelling) {
      return;
    }

    try {
      const result = await cancelOrder(order.order_number).unwrap();
      if (result.success) {
        toast.success(result.message);
        if (result.data) {
          setReplacementOrder(result.data);
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(getBackendMessage(error, "Order could not be cancelled."));
    }
  }

  if (isError) {
    return (
      <section className="bg-[#f7f8fa] py-8">
        <Container>
          <div className="flex min-h-[420px] flex-col items-center justify-center border border-(--color-border) bg-white px-6 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff3f0] text-[#d65e42]">
              <FiAlertCircle className="text-[24px]" />
            </div>
            <h1 className="mt-5 text-[26px] font-semibold text-(--color-dark)">Order could not be loaded</h1>
            <p className="mt-3 max-w-[540px] text-sm leading-7 text-(--color-text-muted)">
              The order might not exist, may belong to another account, or the request failed.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 rounded-md bg-(--color-primary) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--color-primary-900)"
              >
                <FiRefreshCw className="text-[16px]" />
                Retry
              </button>
              <Link
                href={ROUTES.ORDERS}
                className="inline-flex items-center gap-2 rounded-md border border-(--color-border) bg-white px-5 py-3 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
              >
                <FiArrowLeft className="text-[16px]" />
                Back to orders
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (isFetching && !order) {
    return <OrderDetailSkeleton />;
  }

  if (!order || !checkoutSummary) {
    return null;
  }

  return (
    <section className="bg-[#f7f8fa] py-6 text-[#0f172a]">
      <Container>
        <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-(--color-text-muted)">
          <Link href={ROUTES.HOME} className="inline-flex items-center gap-2 transition hover:text-(--color-primary)">
            <FiHome className="text-[16px]" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <Link href={ROUTES.ORDERS} className="transition hover:text-(--color-primary)">
            Orders
          </Link>
          <span>/</span>
          <span className="font-medium text-(--color-dark)">{order.order_number}</span>
        </div>

        <div className="bg-white px-5 py-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5e7eb] pb-4">
            <div>
              <h1 className="text-[25px] font-semibold tracking-[-0.02em] text-[#050b18]">Order Details</h1>
              <p className="mt-2 text-sm text-[#667085]">Placed on {order.created_at}</p>
            </div>
            <Link
              href={ROUTES.ORDERS}
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-[#d8dde5] bg-white px-4 text-sm font-semibold text-[#1f2937] transition hover:border-(--color-primary) hover:text-(--color-primary)"
            >
              <FiArrowLeft className="text-[15px]" />
              Back to orders
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-md border border-[#e5e7eb] bg-[#fafafa] px-5 py-4">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
              <span>
                Delivery Type: <strong className="font-semibold text-[#0f172a]">Standard Delivery</strong>
              </span>
              <span>
                Store Orders: <strong className="font-semibold text-[#0f172a]">{storeOrders.length}</strong>
              </span>
              <span>
                Items: <strong className="font-semibold text-[#0f172a]">{totalUnits}</strong>
              </span>
            </div>
            <div className="text-sm">
              Total: <strong className="text-[16px] text-[#0f172a]">{formatOrderCurrency(checkoutSummary.total)}</strong>
            </div>
          </div>

          <div className="mt-5 border border-[#e5e7eb]">
            <div className="flex flex-wrap items-start justify-between gap-4 px-5 py-5">
              <div>
                <p className="text-[16px] font-medium text-[#0f172a]">Order No: #{order.order_number}</p>
                <p className="mt-1 text-sm text-[#475467]">
                  {isPackageDetail ? "Selected package for this checkout" : "Package collection for this checkout"}
                </p>
              </div>
              <span className={`rounded px-3 py-1 text-xs font-semibold ${getPaymentSummaryTone(storeOrders)}`}>
                {getPaymentSummaryLabel(storeOrders)}
              </span>
            </div>

            <div className="divide-y divide-[#e5e7eb]">
              {storeOrders.map((storeOrder) => {
                const sellerName = getStoreOrderSellerName(storeOrder);
                const storeHref = getStoreHref(storeOrder);
                const statusTone = getOrderStatusTone(storeOrder.status);
                const paymentTone = getPaymentStatusTone(storeOrder.payment_status);
                const storeItems = storeOrder.items ?? [];

                return (
                  <section key={getStoreOrderKey(storeOrder)} className="px-5 py-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm text-[#0f172a]">
                          Package <span className="mx-2 text-[#98a2b3]">|</span>
                          Tracking ID:{" "}
                          <span className="font-semibold text-[#1d4ed8]">
                            #{storeOrder.store_order_id ?? storeOrder.id}-{storeOrder.order_number ?? order.order_number}
                          </span>
                        </p>
                        <p className="mt-1 text-xs text-[#667085]">
                          Payment <span className={`ml-1 rounded px-2 py-0.5 font-semibold ${paymentTone.badge}`}>
                            {PAYMENT_STATUS_LABELS[storeOrder.payment_status]}
                          </span>
                        </p>
                      </div>
                      {isOrderCancellable(storeOrder.status) ? (
                        <button
                          type="button"
                          disabled={isCancelling}
                          onClick={handleCancelOrder}
                          className="inline-flex min-h-9 items-center rounded-md border border-[#fecdd3] bg-[#fff1f2] px-3 text-xs font-semibold text-[#be123c] transition hover:bg-[#ffe4e6] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isCancelling ? "Cancelling..." : "Cancel order"}
                        </button>
                      ) : null}
                    </div>

                    <div className="mt-5 overflow-x-auto">
                      <div className="min-w-[820px]">
                        <div className="grid grid-cols-[minmax(250px,1.4fr)_180px_110px_80px_130px_130px] border-b border-[#e5e7eb] pb-3 text-[13px] font-semibold text-[#0f172a]">
                          <span>Name</span>
                          <span>Seller Name</span>
                          <span>Image</span>
                          <span className="text-center">Qty</span>
                          <span className="text-right">Amount</span>
                          <span className="text-center">Order Status</span>
                        </div>

                        {storeItems.length > 0 ? (
                          storeItems.map((item) => {
                            const imageUrl = resolveImageUrl(getOrderItemImage(item));
                            const variantSummary = getVariantSummary(item.variant_data);

                            return (
                              <article
                                key={item.id}
                                className="grid grid-cols-[minmax(250px,1.4fr)_180px_110px_80px_130px_130px] items-center gap-0 py-4 text-sm"
                              >
                                <div className="min-w-0 pr-4">
                                  <p className="font-medium leading-6 text-[#050b18]">{item.product_name}</p>
                                  {variantSummary ? <p className="mt-1 text-xs text-[#667085]">{variantSummary}</p> : null}
                                  {item.sku ? <p className="mt-1 text-xs text-[#667085]">SKU {item.sku}</p> : null}
                                </div>
                                <div className="pr-4">
                                  <Link
                                    href={storeHref}
                                    className="font-medium text-[#0f172a] transition hover:text-(--color-primary)"
                                  >
                                    {sellerName}
                                  </Link>
                                </div>
                                <div>
                                  <div className="relative flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-[8px] border border-[#d9dde4] bg-[#f7f8fa]">
                                    {imageUrl ? (
                                      <Image src={imageUrl} alt={item.product_name} fill className="object-contain p-1.5" sizes="56px" />
                                    ) : (
                                      <FiPackage className="text-[22px] text-(--color-primary)" />
                                    )}
                                  </div>
                                </div>
                                <div className="text-center text-[#0f172a]">{item.quantity}</div>
                                <div className="text-right font-medium text-[#0f172a]">{formatOrderCurrency(item.subtotal)}</div>
                                <div className="text-center">
                                  <span className={`inline-flex rounded px-2.5 py-1 text-xs font-semibold ${statusTone.badge}`}>
                                    {getCustomerOrderStatusLabel(storeOrder.status)}
                                  </span>
                                </div>
                              </article>
                            );
                          })
                        ) : (
                          <div className="py-5 text-sm text-[#667085]">No item snapshots were returned for this store order.</div>
                        )}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>

            <div className="border-t border-dashed border-[#d8dde5] px-5 py-5">
              <h2 className="text-[17px] font-semibold text-[#050b18]">Total summary</h2>
              <div className="mt-4 space-y-3 text-[15px]">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#344054]">Payment method</span>
                  <span className="font-medium text-[#0f172a]">{getPaymentMethodLabel(storeOrders)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#344054]">Product price</span>
                  <span className="font-medium text-[#0f172a]">{formatOrderCurrency(checkoutSummary.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#344054]">Delivery charge</span>
                  <span className="font-medium text-[#0f172a]">{formatOrderCurrency(checkoutSummary.shipping_fee)}</span>
                </div>
                {paidAmount > 0 ? (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#344054]">Paid amount</span>
                    <span className="font-medium text-[#0f172a]">- {formatOrderCurrency(paidAmount)}</span>
                  </div>
                ) : null}
                {dueAmount > 0 && dueAmount !== checkoutSummary.total ? (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#344054]">Due amount</span>
                    <span className="font-medium text-[#0f172a]">{formatOrderCurrency(dueAmount)}</span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between gap-4 border-t border-[#e5e7eb] pt-4">
                  <span className="font-semibold text-[#050b18]">Grand total</span>
                  <span className="text-[18px] font-semibold text-[#050b18]">{formatOrderCurrency(checkoutSummary.total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)]">
            <section className="border border-[#e5e7eb] bg-white p-5">
              <div className="flex items-center gap-2">
                <FiTruck className="text-[18px] text-(--color-primary)" />
                <h2 className="text-[18px] font-semibold text-[#050b18]">Shipping Address</h2>
              </div>
              <div className="mt-4 text-[15px] leading-7">
                <p className="font-semibold text-[#0f172a]">{order.shipping_address.name}</p>
                {formatAddressLines(order.shipping_address).map((line) => (
                  <p key={line} className="text-[#667085]">
                    {line}
                  </p>
                ))}
                <p className="mt-1 text-[#667085]">{order.shipping_address.phone}</p>
                {order.shipping_address.email ? <p className="text-[#667085]">{order.shipping_address.email}</p> : null}
              </div>
              {order.shipping_address.type ? (
                <span className="mt-4 inline-flex rounded bg-[#eef2f7] px-4 py-2 text-xs font-semibold capitalize text-[#344054]">
                  {order.shipping_address.type}
                </span>
              ) : null}
            </section>

            <section className="border border-[#e5e7eb] bg-[#fbfcfd] p-5">
              <div className="flex items-center gap-2">
                <FiPackage className="text-[18px] text-(--color-primary)" />
                <h2 className="text-[18px] font-semibold text-[#050b18]">Order support</h2>
              </div>
              <p className="mt-4 max-w-[520px] text-sm leading-7 text-[#667085]">
                Use the shared order number and the store order tracking ID when contacting support about a specific package.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="border border-[#e5e7eb] bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#667085]">Order number</p>
                  <p className="mt-2 font-semibold text-[#0f172a]">{order.order_number}</p>
                </div>
                <div className="border border-[#e5e7eb] bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#667085]">Packages</p>
                  <p className="mt-2 font-semibold text-[#0f172a]">{storeOrders.length}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
      <ServiceHighlights className="pt-2" />
    </section>
  );
}
