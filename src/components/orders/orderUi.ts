import type {
  EcommerceOrder,
  EcommerceOrderItem,
  EcommerceOrderListData,
  EcommerceOrderStatus,
  EcommercePaymentStatus,
  Pagination,
} from "@/types";

type Tone = {
  badge: string;
  soft: string;
  ring: string;
};

export const ORDER_STATUS_LABELS: Record<EcommerceOrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const PAYMENT_STATUS_LABELS: Record<EcommercePaymentStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  failed: "Failed",
};

const ORDER_STATUS_TONES: Record<EcommerceOrderStatus, Tone> = {
  pending: {
    badge: "bg-[#fff6e8] text-[#c97a12]",
    soft: "bg-[#fffaf0]",
    ring: "border-[#f5d7a7]",
  },
  confirmed: {
    badge: "bg-[#eef5ff] text-[#2563eb]",
    soft: "bg-[#f7fbff]",
    ring: "border-[#cddfff]",
  },
  processing: {
    badge: "bg-[#f4efff] text-[#6d4fe0]",
    soft: "bg-[#faf8ff]",
    ring: "border-[#ddd1ff]",
  },
  shipped: {
    badge: "bg-[#ecfbff] text-[#0f8f86]",
    soft: "bg-[#f4feff]",
    ring: "border-[#c8f0ee]",
  },
  delivered: {
    badge: "bg-[#eef8f2] text-[#16824f]",
    soft: "bg-[#f6fcf8]",
    ring: "border-[#cde9d7]",
  },
  cancelled: {
    badge: "bg-[#fff1f2] text-[#d2435b]",
    soft: "bg-[#fff7f8]",
    ring: "border-[#f6ccd4]",
  },
};

const PAYMENT_STATUS_TONES: Record<EcommercePaymentStatus, Tone> = {
  pending: {
    badge: "bg-[#fff6e8] text-[#c97a12]",
    soft: "bg-[#fffaf0]",
    ring: "border-[#f5d7a7]",
  },
  paid: {
    badge: "bg-[#eef8f2] text-[#16824f]",
    soft: "bg-[#f6fcf8]",
    ring: "border-[#cde9d7]",
  },
  failed: {
    badge: "bg-[#fff1f2] text-[#d2435b]",
    soft: "bg-[#fff7f8]",
    ring: "border-[#f6ccd4]",
  },
};

const ORDER_PROGRESS: Array<{
  status: Exclude<EcommerceOrderStatus, "cancelled">;
  label: string;
  description: string;
}> = [
  {
    status: "pending",
    label: "Order placed",
    description: "Your order has been created and is awaiting seller confirmation.",
  },
  {
    status: "confirmed",
    label: "Confirmed",
    description: "The store has accepted the order and reserved the requested items.",
  },
  {
    status: "processing",
    label: "Processing",
    description: "Items are being packed and prepared for courier handoff.",
  },
  {
    status: "shipped",
    label: "Shipped",
    description: "The order is in transit through the delivery network.",
  },
  {
    status: "delivered",
    label: "Delivered",
    description: "Delivery is complete and the order has reached the customer.",
  },
];

export function formatOrderCurrency(value: number | string) {
  return `৳${Number(value).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatPaymentMethodLabel(value: string) {
  const normalized = value.trim().toLowerCase();
  const map: Record<string, string> = {
    bkash: "bKash",
    nagad: "Nagad",
    card: "Card",
    cash_on_delivery: "Cash on Delivery",
    bank_transfer: "Bank Transfer",
  };

  if (map[normalized]) {
    return map[normalized];
  }

  return normalized
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export function getOrderStatusTone(status: EcommerceOrderStatus) {
  return ORDER_STATUS_TONES[status];
}

export function getPaymentStatusTone(status: EcommercePaymentStatus) {
  return PAYMENT_STATUS_TONES[status];
}

export function getVariantSummary(variantData: Record<string, string> | null) {
  if (!variantData || Object.keys(variantData).length === 0) {
    return null;
  }

  return Object.entries(variantData)
    .map(([key, value]) => `${key}: ${value}`)
    .join(" · ");
}

export function getOrderUnitCount(order: Pick<EcommerceOrder, "items">) {
  return order.items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getOrderSummaryUnitCount(
  order: Pick<EcommerceOrderListData["orders"][number], "item_count">,
) {
  return order.item_count;
}

export function toOrdersPagination(data: EcommerceOrderListData): Pagination {
  return {
    current_page: data.current_page,
    per_page: data.per_page,
    total: data.total,
    last_page: data.last_page,
    from: data.orders.length === 0 ? null : (data.current_page - 1) * data.per_page + 1,
    to:
      data.orders.length === 0
        ? null
        : (data.current_page - 1) * data.per_page + data.orders.length,
    sort_field: "created_at",
    sort_direction: "desc",
    has_more_pages: data.current_page < data.last_page,
  };
}

export function isOrderCancellable(status: EcommerceOrderStatus) {
  return status === "pending" || status === "confirmed";
}

export function buildOrderProgress(status: EcommerceOrderStatus) {
  const currentIndex = ORDER_PROGRESS.findIndex((step) => step.status === status);

  if (currentIndex === -1) {
    return [];
  }

  return ORDER_PROGRESS.map((step, index) => ({
    ...step,
    complete: index <= currentIndex,
    current: index === currentIndex,
  }));
}

export function getOrderHeroCopy(status: EcommerceOrderStatus) {
  switch (status) {
    case "pending":
      return "Awaiting seller confirmation and final payment verification.";
    case "confirmed":
      return "Confirmed by the store and queued for fulfilment.";
    case "processing":
      return "Items are being packed and prepared for dispatch.";
    case "shipped":
      return "Handed to the courier and moving through delivery.";
    case "delivered":
      return "Delivered successfully and archived in your order history.";
    case "cancelled":
      return "This order was cancelled before delivery completed.";
  }
}

export function getOrderListPageValue(
  orders: EcommerceOrderListData["orders"],
) {
  return orders.reduce((sum, order) => sum + Number(order.total), 0);
}

export function getOrderItemImage(item: EcommerceOrderItem) {
  return item.images[0]?.url ?? null;
}
