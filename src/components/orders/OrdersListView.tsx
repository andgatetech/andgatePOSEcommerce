"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  FiAlertCircle,
  FiArrowRight,
  FiChevronRight,
  FiClock,
  FiCreditCard,
  FiGrid,
  FiHome,
  FiPackage,
  FiRefreshCw,
} from "react-icons/fi";
import Pagination from "@/components/shared/Pagination";
import { ROUTE_BUILDERS, ROUTES } from "@/config/routes";
import { useGetOrdersQuery } from "@/features/orders/ordersApi";
import type { EcommerceOrderStatus } from "@/types";
import {
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  formatOrderCurrency,
  formatPaymentMethodLabel,
  getOrderListPageValue,
  getOrderStatusTone,
  getOrderSummaryUnitCount,
  getPaymentStatusTone,
  isOrderCancellable,
  toOrdersPagination,
} from "./orderUi";

type StatusFilter = "all" | EcommerceOrderStatus;

const STATUS_FILTERS: StatusFilter[] = [
  "all",
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

interface OrdersListViewProps {
  embedded?: boolean;
}

function getFilterLabel(filter: StatusFilter) {
  return filter === "all" ? "All orders" : ORDER_STATUS_LABELS[filter];
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
    if (activeFilter === "all") {
      return orders;
    }

    return orders.filter((order) => order.status === activeFilter);
  }, [activeFilter, orders]);

  const pagination = data ? toOrdersPagination(data) : null;
  const openOrders = orders.filter((order) => order.status !== "delivered" && order.status !== "cancelled").length;
  const cancellableOrders = orders.filter((order) => isOrderCancellable(order.status)).length;
  const pageValue = getOrderListPageValue(orders);
  const latestOrder = orders[0] ?? null;

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

          <section className="overflow-hidden rounded-[32px] border border-(--color-border) bg-[radial-gradient(circle_at_top_left,rgba(220,234,246,0.92),transparent_42%),linear-gradient(135deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_22px_60px_rgba(19,45,69,0.08)]">
            <div className="grid gap-8 px-6 py-7 md:px-8 lg:grid-cols-[minmax(0,1.1fr)_390px] lg:px-10 lg:py-9">
              <div>
                <span className="inline-flex rounded-full border border-(--color-primary-200) bg-(--color-primary-100) px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-(--color-primary)">
                  Order Center
                </span>
                <h1 className="mt-5 text-[30px] font-semibold tracking-[-0.04em] text-(--color-primary-900) md:text-[40px]">
                  A cleaner order workspace for repeat customers.
                </h1>
                <p className="mt-4 max-w-[760px] text-sm leading-7 text-(--color-text-muted) md:text-[15px]">
                  Review order status, payment state, totals, and current page activity from one place, then open any order for full shipping and item details.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <article className="rounded-[20px] border border-white/70 bg-white/78 p-4 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                      All orders
                    </p>
                    <p className="mt-2 text-[24px] font-semibold text-(--color-dark)">
                      {data?.total ?? "—"}
                    </p>
                  </article>
                  <article className="rounded-[20px] border border-white/70 bg-white/78 p-4 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                      On this page
                    </p>
                    <p className="mt-2 text-[24px] font-semibold text-(--color-dark)">{orders.length}</p>
                  </article>
                  <article className="rounded-[20px] border border-white/70 bg-white/78 p-4 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                      Open now
                    </p>
                    <p className="mt-2 text-[24px] font-semibold text-(--color-dark)">{openOrders}</p>
                  </article>
                  <article className="rounded-[20px] border border-white/70 bg-white/78 p-4 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                      Page value
                    </p>
                    <p className="mt-2 text-[24px] font-semibold text-(--color-dark)">
                      {formatOrderCurrency(pageValue)}
                    </p>
                  </article>
                </div>
              </div>

              <aside className="rounded-[28px] border border-white/80 bg-white/80 p-5 shadow-[0_18px_40px_rgba(19,45,69,0.08)] backdrop-blur">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                    <FiGrid className="text-[20px]" />
                  </div>
                  <div>
                    <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                      Current page snapshot
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                      Quick visibility into pending action and the newest order loaded on this page.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-[20px] border border-(--color-border) bg-[#fbfcfd] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                      Cancellable now
                    </p>
                    <p className="mt-2 text-lg font-semibold text-(--color-dark)">
                      {cancellableOrders} order{cancellableOrders === 1 ? "" : "s"}
                    </p>
                  </div>
                  <div className="rounded-[20px] border border-(--color-border) bg-[#fbfcfd] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                      Latest order loaded
                    </p>
                    {latestOrder ? (
                      <>
                        <p className="mt-2 text-base font-semibold text-(--color-dark)">
                          {latestOrder.order_number}
                        </p>
                        <p className="mt-1 text-sm text-(--color-text-muted)">
                          {ORDER_STATUS_LABELS[latestOrder.status]} • {formatOrderCurrency(latestOrder.total)}
                        </p>
                        <Link
                          href={ROUTE_BUILDERS.orderDetail(latestOrder.order_number)}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-(--color-primary) transition hover:text-(--color-primary-900)"
                        >
                          Open details
                          <FiChevronRight className="text-[15px]" />
                        </Link>
                      </>
                    ) : (
                      <p className="mt-2 text-sm text-(--color-text-muted)">No orders loaded yet.</p>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </>
      ) : (
        <div>
          <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">
            Orders
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-(--color-text-muted)">
            Review recent orders from your account and jump into the dedicated order detail workspace when you need item, payment, or delivery specifics.
          </p>
        </div>
      )}

      <section className="rounded-[30px] border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-6 xl:p-7">
        <div className="flex flex-wrap gap-3">
          {STATUS_FILTERS.map((filter) => {
            const count =
              filter === "all" ? orders.length : orders.filter((order) => order.status === filter).length;
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

        <div className="mt-6 rounded-[24px] border border-(--color-border) bg-[#fcfcfd]">
          <div className="hidden grid-cols-[1.1fr_0.75fr_0.7fr_0.55fr_0.7fr_0.55fr] gap-4 border-b border-(--color-border) px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted) xl:grid">
            <span>Order</span>
            <span>Created</span>
            <span>Status</span>
            <span>Items</span>
            <span>Payment</span>
            <span className="text-right">Total</span>
          </div>

          {isError ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center px-6 py-10 text-center">
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
            <div className="flex min-h-[260px] flex-col items-center justify-center px-6 py-10 text-center">
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
            <div className="divide-y divide-(--color-border)">
              {filteredOrders.map((order) => {
                const statusTone = getOrderStatusTone(order.status);
                const paymentTone = getPaymentStatusTone(order.payment_status);

                return (
                  <Link
                    key={order.order_number}
                    href={ROUTE_BUILDERS.orderDetail(order.order_number)}
                    className="group block px-5 py-5 transition hover:bg-white"
                  >
                    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.75fr_0.7fr_0.55fr_0.7fr_0.55fr] xl:items-center">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-[19px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                            {order.order_number}
                          </h2>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone.badge}`}>
                            {ORDER_STATUS_LABELS[order.status]}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-(--color-text-muted)">
                          <span className="inline-flex items-center gap-2 rounded-full bg-[#f4f6f8] px-3 py-1.5">
                            <FiCreditCard className="text-[14px] text-(--color-primary)" />
                            {formatPaymentMethodLabel(order.payment_method)}
                          </span>
                          {isOrderCancellable(order.status) ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#fffaf0] px-3 py-1.5 text-[#c97a12]">
                              <FiClock className="text-[14px]" />
                              Cancellable
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="text-sm text-(--color-dark)">
                        <p className="font-semibold xl:hidden">Created</p>
                        <p>{order.created_at}</p>
                      </div>

                      <div>
                        <p className="font-semibold text-(--color-dark) xl:hidden">Status</p>
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusTone.badge}`}>
                          {ORDER_STATUS_LABELS[order.status]}
                        </span>
                      </div>

                      <div className="text-sm text-(--color-dark)">
                        <p className="font-semibold xl:hidden">Items</p>
                        <p>{getOrderSummaryUnitCount(order)} unit{getOrderSummaryUnitCount(order) === 1 ? "" : "s"}</p>
                      </div>

                      <div>
                        <p className="font-semibold text-(--color-dark) xl:hidden">Payment</p>
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${paymentTone.badge}`}>
                          {PAYMENT_STATUS_LABELS[order.payment_status]}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 xl:justify-end">
                        <div className="text-left xl:text-right">
                          <p className="font-semibold text-(--color-dark) xl:hidden">Total</p>
                          <p className="text-[18px] font-semibold text-(--color-dark)">
                            {formatOrderCurrency(order.total)}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-(--color-primary)">
                          Details
                          <FiArrowRight className="text-[15px] transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
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
      <div className="mx-auto max-w-[1600px]">{content}</div>
    </section>
  );
}
