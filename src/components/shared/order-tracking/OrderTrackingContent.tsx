"use client";

import { useMemo, useState } from "react";
import {
  FiBox,
  FiCheckCircle,
  FiClock,
  FiHome,
  FiMapPin,
  FiPackage,
  FiSearch,
  FiTruck,
} from "react-icons/fi";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

type TrackingStep = {
  id: string;
  label: string;
  description: string;
  time: string;
  complete: boolean;
};

type TrackingOrder = {
  trackingId: string;
  orderId: string;
  status: string;
  eta: string;
  destination: string;
  courier: string;
  steps: TrackingStep[];
};

type OrderTrackingContentProps = {
  variant?: "public" | "account";
};

const mockOrders: TrackingOrder[] = [
  {
    trackingId: "AG-TRK-24018",
    orderId: "ORD-24018",
    status: "Out for Delivery",
    eta: "Expected today, 5:30 PM",
    destination: "House 12, Road 7, Adabor, Dhaka",
    courier: "Pathao Courier",
    steps: [
      {
        id: "placed",
        label: "Order Placed",
        description: "Your order has been placed successfully.",
        time: "08 Apr, 09:15 AM",
        complete: true,
      },
      {
        id: "packed",
        label: "Packed",
        description: "Items were packed and handed to fulfilment.",
        time: "08 Apr, 11:10 AM",
        complete: true,
      },
      {
        id: "shipped",
        label: "Shipped",
        description: "Shipment left the local distribution hub.",
        time: "08 Apr, 01:40 PM",
        complete: true,
      },
      {
        id: "delivery",
        label: "Out for Delivery",
        description: "Courier is on the way to the destination.",
        time: "08 Apr, 03:05 PM",
        complete: true,
      },
      {
        id: "delivered",
        label: "Delivered",
        description: "Final delivery confirmation will appear here.",
        time: "Pending",
        complete: false,
      },
    ],
  },
  {
    trackingId: "AG-TRK-23977",
    orderId: "ORD-23977",
    status: "Packed",
    eta: "Expected tomorrow",
    destination: "Level 5, Business Hub, Agargaon, Dhaka",
    courier: "Pathao Courier",
    steps: [
      {
        id: "placed",
        label: "Order Placed",
        description: "Your order has been placed successfully.",
        time: "07 Apr, 06:25 PM",
        complete: true,
      },
      {
        id: "packed",
        label: "Packed",
        description: "Items are packed and ready for pickup.",
        time: "08 Apr, 10:00 AM",
        complete: true,
      },
      {
        id: "shipped",
        label: "Shipped",
        description: "The shipment is waiting for dispatch.",
        time: "Pending",
        complete: false,
      },
      {
        id: "delivery",
        label: "Out for Delivery",
        description: "Courier update will appear here once dispatched.",
        time: "Pending",
        complete: false,
      },
      {
        id: "delivered",
        label: "Delivered",
        description: "Final delivery confirmation will appear here.",
        time: "Pending",
        complete: false,
      },
    ],
  },
];

export default function OrderTrackingContent({
  variant = "public",
}: OrderTrackingContentProps) {
  const [query, setQuery] = useState(mockOrders[0].trackingId);
  const isAccount = variant === "account";

  const activeOrder = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return (
      mockOrders.find(
        (order) =>
          order.trackingId.toLowerCase() === normalizedQuery ||
          order.orderId.toLowerCase() === normalizedQuery
      ) ?? mockOrders[0]
    );
  }, [query]);

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
          Track shipment progress with order ID or tracking ID. This is a mock production-style panel for now and can be connected to live courier tracking later.
        </p>
      </div>

      <div className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-6 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-7 xl:p-8">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_210px]">
          <label className="space-y-2 text-sm">
            <span className="font-medium text-(--color-dark)">Tracking ID / Order ID</span>
            <div className="flex h-13 items-center rounded-[16px] border border-(--color-border) bg-(--color-bg) px-4">
              <FiSearch className="mr-3 text-[18px] text-(--color-text-muted)" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Enter tracking ID"
                className="w-full bg-transparent text-(--color-dark) outline-none placeholder:text-(--color-text-muted)"
              />
            </div>
          </label>

          <div className="flex items-end">
            <button
              type="button"
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-(--color-primary) px-8 text-sm font-semibold text-(--color-bg) shadow-[0_10px_24px_rgba(44,95,138,0.18)] transition hover:bg-(--color-primary-dark)"
            >
              Track Order
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[22px] border border-(--color-border) bg-(--color-bg) p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                <FiPackage className="text-[18px]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                  Order ID
                </p>
                <p className="mt-1 text-sm font-semibold text-(--color-dark)">{activeOrder.orderId}</p>
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
                <p className="mt-1 text-sm font-semibold text-(--color-dark)">{activeOrder.status}</p>
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
                  Estimated Arrival
                </p>
                <p className="mt-1 text-sm font-semibold text-(--color-dark)">{activeOrder.eta}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-(--color-border) bg-(--color-bg) p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                <FiMapPin className="text-[18px]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                  Courier
                </p>
                <p className="mt-1 text-sm font-semibold text-(--color-dark)">{activeOrder.courier}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
          <div className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-6">
            <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-(--color-dark)">
              Tracking Timeline
            </h2>

            <div className="mt-8 space-y-6">
              {activeOrder.steps.map((step, index) => (
                <div key={step.id} className="relative flex gap-4">
                  {index !== activeOrder.steps.length - 1 ? (
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
                      <span className="text-sm font-medium text-(--color-text-muted)">{step.time}</span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-6">
              <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                Delivery Details
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-(--color-text-muted)">
                <div>
                  <p className="font-semibold text-(--color-dark)">Tracking ID</p>
                  <p>{activeOrder.trackingId}</p>
                </div>
                <div>
                  <p className="font-semibold text-(--color-dark)">Destination</p>
                  <p>{activeOrder.destination}</p>
                </div>
                <div>
                  <p className="font-semibold text-(--color-dark)">Courier Partner</p>
                  <p>{activeOrder.courier}</p>
                </div>
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
                    If shipment updates stop or look incorrect, contact support with the order ID and tracking ID for manual verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
