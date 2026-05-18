"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCreditCard,
  FiHome,
  FiPackage,
  FiRefreshCw,
} from "react-icons/fi";
import Pagination from "@/components/shared/Pagination";
import { ROUTE_BUILDERS, ROUTES } from "@/config/routes";
import { useGetOrdersQuery } from "@/features/orders/ordersApi";
import { resolveImageUrl } from "@/lib/imageUrl";
import type { EcommerceOrderStatus, EcommerceOrderSummary } from "@/types";
import {
  formatOrderCurrency,
  formatPaymentMethodLabel,
  getCustomerOrderStatusLabel,
  getOrderItemImage,
  getOrderStatusTone,
  getOrderSummaryUnitCount,
  getStoreOrderItemCount,
  getStoreOrderSellerName,
  toOrdersPagination,
} from "./orderUi";

type StatusFilter =
  | "all"
  | "to_pay"
  | "to_ship"
  | "out_for_delivery"
  | Extract<EcommerceOrderStatus, "pending" | "confirmed" | "shipped" | "delivered">;

const STATUS_FILTERS: StatusFilter[] = [
  "all",
  "to_pay",
  "pending",
  "confirmed",
  "to_ship",
  "shipped",
  "out_for_delivery",
  "delivered",
];

interface OrdersListViewProps {
  embedded?: boolean;
}

function getFilterLabel(filter: StatusFilter) {
  const labels: Record<StatusFilter, string> = {
    all: "All",
    to_pay: "To Pay",
    pending: "Pending",
    confirmed: "Confirmed",
    to_ship: "To Ship",
    shipped: "Shipped",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
  };

  return labels[filter];
}

function getStoreHref(order: EcommerceOrderSummary) {
  return order.store?.slug ? ROUTE_BUILDERS.storeDetail(order.store.slug) : ROUTES.STORE;
}

function matchesFilter(order: EcommerceOrderSummary, filter: StatusFilter) {
  switch (filter) {
    case "all":
      return true;
    case "to_pay":
      return order.payment_status === "pending" || order.payment_status === "partial" || order.payment_status === "failed";
    case "to_ship":
      return order.status === "partially_processing" || order.status === "processing" || order.status === "packed";
    case "out_for_delivery":
      return (order.status as string) === "out_for_delivery";
    default:
      return order.status === filter;
  }
}

export default function OrdersListView({
  embedded = false,
}: OrdersListViewProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [embeddedPage, setEmbeddedPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("all");

  const pageFromUrl = Number(searchParams.get("page") ?? "1");
  const page = embedded ? embeddedPage : Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  const { data, isFetching, isError, refetch } = useGetOrdersQuery({ page });
  const orders = data?.orders ?? [];

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => matchesFilter(order, activeFilter));
  }, [activeFilter, orders]);

  const pagination = data ? toOrdersPagination(data) : null;
  function handlePageChange(nextPage: number) {
    if (embedded) {
      setEmbeddedPage(nextPage);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (nextPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const content = (
    <div className={embedded ? "space-y-6" : "space-y-8"}>
      {!embedded ? (
        <>
          <div className="flex flex-wrap items-center gap-3 text-sm text-(--color-text-muted)">
            <Link
              href={ROUTES.HOME}
              className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)"
            >
              <FiHome className="text-[17px]" />
              <span>Home</span>
            </Link>
            <span>&bull;</span>
            <span className="text-(--color-dark)">Orders</span>
          </div>

          <div>
            <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">
              My Orders
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-(--color-text-muted)">
              Review your recent store orders, payment state, and delivery progress.
            </p>
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">
            My Orders
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-(--color-text-muted)">
            Review your recent orders, seller packages, payment state, and delivery progress.
          </p>
        </div>
      )}

      <section className="rounded-[30px] border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-6 xl:p-7">
        <div className="flex flex-wrap gap-3">
          {STATUS_FILTERS.map((filter) => {
            const count = orders.filter((order) => matchesFilter(order, filter)).length;
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`inline-flex items-center gap-3 rounded-full border px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "border-(--color-primary) bg-(--color-primary) text-white"
                    : "border-(--color-border) bg-(--color-bg) text-(--color-dark) hover:border-(--color-primary) hover:text-(--color-primary)"
                }`}
              >
                <span>{getFilterLabel(filter)}</span>
                <span
                  className={`inline-flex min-w-7 items-center justify-center rounded-full px-2 py-1 text-xs ${
                    isActive ? "bg-white/18 text-white" : "bg-(--color-primary-100) text-(--color-primary)"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          {isError ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[24px] border border-(--color-border) bg-[#fcfcfd] px-6 py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff3f0] text-[#d65e42]">
                <FiAlertCircle className="text-[24px]" />
              </div>
              <h2 className="mt-5 text-[22px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                Failed to load your orders
              </h2>
              <p className="mt-3 max-w-[480px] text-sm leading-7 text-(--color-text-muted)">
                The order list could not be retrieved right now. Try loading the page again.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--color-primary-900)"
              >
                <FiRefreshCw className="text-[16px]" />
                Retry
              </button>
            </div>
          ) : isFetching && !data ? (
            <div className="space-y-4 p-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[120px] animate-pulse rounded-[22px] border border-(--color-border) bg-[linear-gradient(90deg,#f6f8fa_0%,#eef3f7_50%,#f6f8fa_100%)]"
                />
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[24px] border border-(--color-border) bg-[#fcfcfd] px-6 py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                <FiPackage className="text-[24px]" />
              </div>
              <h2 className="mt-5 text-[22px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                {orders.length === 0 ? "No orders yet" : `No ${getFilterLabel(activeFilter).toLowerCase()} on this page`}
              </h2>
              <p className="mt-3 max-w-[500px] text-sm leading-7 text-(--color-text-muted)">
                {orders.length === 0
                  ? "Placed orders will appear here automatically once checkout starts creating order history for this account."
                  : "Switch filters or move through pagination to review more orders in your history."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const sellerName = getStoreOrderSellerName(order);
                const storeHref = getStoreHref(order);
                const unitCount = getOrderSummaryUnitCount(order);
                const dueAmount = order.due_amount ?? Math.max(Number(order.total) - Number(order.paid_amount ?? 0), 0);
                const storeOrderId = order.store_order_id ?? order.id;

                return (
                  <article
                    key={`${storeOrderId}-${order.order_number}`}
                    className="rounded-[24px] border border-(--color-border) bg-[#fcfcfd] p-4 transition hover:border-(--color-primary-200) hover:bg-white md:p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-(--color-border) pb-4">
                      <div>
                        <h2 className="text-[19px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                          #{order.order_number} - {sellerName}
                        </h2>
                        <p className="mt-2 text-sm text-(--color-text-muted)">Placed on: {order.created_at}</p>
                      </div>
                      <Link
                        href={ROUTE_BUILDERS.orderDetail(order.order_number, storeOrderId)}
                        className="inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--color-primary-900)"
                      >
                        View Details
                        <FiArrowRight className="text-[15px]" />
                      </Link>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-(--color-text-muted)">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5">
                        <FiCreditCard className="text-[14px] text-(--color-primary)" />
                        {formatPaymentMethodLabel(order.payment_method)}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5">
                        <FiPackage className="text-[14px] text-(--color-primary)" />
                        {unitCount} item{unitCount === 1 ? "" : "s"}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5">
                        Due {formatOrderCurrency(dueAmount)}
                      </span>
                    </div>

                    <div className="mt-5 hidden grid-cols-[minmax(0,1fr)_180px_90px_80px_120px_130px] gap-4 border-b border-(--color-border) pb-3 text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted) lg:grid">
                      <span>Name</span>
                      <span>Seller Name</span>
                      <span>Image</span>
                      <span>Qty</span>
                      <span>Amount</span>
                      <span>Order Status</span>
                    </div>

                    <div className="divide-y divide-(--color-border)">
                      {(() => {
                        const rowStatusTone = getOrderStatusTone(order.status);
                        const itemCount = getStoreOrderItemCount(order) || unitCount;
                        const itemRows = order.items?.length ? order.items : [null];

                        return itemRows.map((item, itemIndex) => {
                          const imageUrl = item ? resolveImageUrl(getOrderItemImage(item)) : null;

                          return (
                            <div
                              key={`${order.store_order_id ?? order.id}-${item?.id ?? itemIndex}`}
                              className="grid gap-3 py-4 lg:grid-cols-[minmax(0,1fr)_180px_90px_80px_120px_130px] lg:items-center"
                            >
                              <div className="min-w-0">
                                <p className="font-semibold text-(--color-dark)">
                                  {item?.product_name ?? "Order items"}
                                </p>
                                {item?.variant_data ? (
                                  <p className="mt-1 text-sm text-(--color-text-muted)">
                                    {Object.entries(item.variant_data).map(([key, value]) => `${key}-${value}`).join(", ")}
                                  </p>
                                ) : null}
                                <p className="mt-1 text-sm text-(--color-text-muted)">Fulfilled by {sellerName}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted) lg:hidden">
                                  Seller Name
                                </p>
                                <Link
                                  href={storeHref}
                                  className="text-sm font-semibold text-(--color-dark) transition hover:text-(--color-primary)"
                                >
                                  {sellerName}
                                </Link>
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted) lg:hidden">
                                  Image
                                </p>
                                <div className="relative mt-1 flex h-14 w-14 items-center justify-center overflow-hidden rounded-[14px] border border-(--color-border) bg-[#f7f8fa] text-(--color-primary) lg:mt-0">
                                  {imageUrl ? (
                                    <Image src={imageUrl} alt={item?.product_name ?? "Order item"} fill className="object-contain p-2" sizes="56px" />
                                  ) : (
                                    <FiPackage className="text-[20px]" />
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted) lg:hidden">
                                  Qty
                                </p>
                                <p className="text-sm font-semibold text-(--color-dark)">
                                  {item?.quantity ?? itemCount}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted) lg:hidden">
                                  Amount
                                </p>
                                <p className="text-sm font-semibold text-(--color-dark)">
                                  {formatOrderCurrency(item?.subtotal ?? order.total)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted) lg:hidden">
                                  Order Status
                                </p>
                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${rowStatusTone.badge}`}>
                                  {getCustomerOrderStatusLabel(order.status)}
                                </span>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>

                    <div className="mt-2 flex justify-end border-t border-(--color-border) pt-4">
                      <p className="text-base font-semibold text-(--color-dark)">
                        Store total ({unitCount} Item{unitCount === 1 ? "" : "s"}):{" "}
                        {formatOrderCurrency(order.total)}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {pagination ? (
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-(--color-text-muted)">
              Showing page <span className="font-semibold text-(--color-dark)">{pagination.current_page}</span> of{" "}
              <span className="font-semibold text-(--color-dark)">{pagination.last_page}</span>
            </div>
            <Pagination pagination={pagination} onPageChange={handlePageChange} />
          </div>
        ) : null}
      </section>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <section className="bg-(--color-bg) px-4 pb-8 pt-10 md:px-8 md:pb-10 lg:px-12 lg:pb-14 lg:pt-12">
      <div className="mx-auto">{content}</div>
    </section>
  );
}
