import type {
  EcommerceOrder,
  EcommerceOrderItem,
  EcommerceOrderListData,
  EcommerceOrderStatus,
  EcommercePaymentStatus,
  EcommerceStoreOrder,
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
  partially_processing: "Partially Processing",
  packed: "Packed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
};

export const PAYMENT_STATUS_LABELS: Record<EcommercePaymentStatus, string> = {
  pending: "Pending",
  partial: "Partial",
  paid: "Paid",
  refunded: "Refunded",
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
  partially_processing: {
    badge: "bg-[#f4efff] text-[#6d4fe0]",
    soft: "bg-[#faf8ff]",
    ring: "border-[#ddd1ff]",
  },
  packed: {
    badge: "bg-[#ecfbff] text-[#0f8f86]",
    soft: "bg-[#f4feff]",
    ring: "border-[#c8f0ee]",
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
  returned: {
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
  partial: {
    badge: "bg-[#fff6e8] text-[#c97a12]",
    soft: "bg-[#fffaf0]",
    ring: "border-[#f5d7a7]",
  },
  refunded: {
    badge: "bg-[#eef5ff] text-[#2563eb]",
    soft: "bg-[#f7fbff]",
    ring: "border-[#cddfff]",
  },
  failed: {
    badge: "bg-[#fff1f2] text-[#d2435b]",
    soft: "bg-[#fff7f8]",
    ring: "border-[#f6ccd4]",
  },
};

const ORDER_PROGRESS: Array<{
  status: Exclude<EcommerceOrderStatus, "cancelled" | "partially_processing" | "returned">;
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
    description: "The seller has accepted the order and reserved the requested items.",
  },
  {
    status: "packed",
    label: "Packed",
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

export function formatPaymentMethodLabel(value?: string | null) {
  if (!value) {
    return "Not specified";
  }

  const normalized = value.trim().toLowerCase();

  if (!normalized) {
    return "Not specified";
  }

  const map: Record<string, string> = {
    bkash: "bKash",
    nagad: "Nagad",
    card: "Card",
    cash_on_delivery: "Cash on Delivery",
    bank_transfer: "Bank Transfer",
    cash: "Cash",
    cod: "Cash on Delivery",
    upay: "Upay",
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

export function getOrderUnitCount(order: Pick<EcommerceOrder, "items" | "orders">) {
  if (order.items?.length) {
    return order.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  return order.orders.reduce((sum, storeOrder) => sum + getStoreOrderItemCount(storeOrder), 0);
}

export function getOrderSummaryUnitCount(
  order: Pick<EcommerceOrderListData["orders"][number], "item_count" | "items_count" | "items">,
) {
  return order.item_count ?? getStoreOrderItemCount(order);
}

export function getOrderStoreCount(
  order: Pick<EcommerceOrder, "store_order_count" | "store_orders">,
) {
  return order.store_order_count ?? order.store_orders?.length ?? 0;
}

export function getStoreOrderSellerName(storeOrder: Pick<EcommerceStoreOrder, "store" | "store_name" | "store_id">) {
  return storeOrder.store?.store_name ?? storeOrder.store_name ?? (storeOrder.store_id ? `Seller ${storeOrder.store_id}` : "Seller");
}

export function getStoreOrderItemCount(storeOrder: Pick<EcommerceStoreOrder, "items" | "items_count">) {
  return storeOrder.items_count ?? storeOrder.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
}

export function getCustomerOrderStatusLabel(status: EcommerceOrderStatus) {
  if (status === "partially_processing") {
    return "Processing";
  }

  return ORDER_STATUS_LABELS[status];
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
  const progressStatus = status === "processing" ? "packed" : status;
  const currentIndex = ORDER_PROGRESS.findIndex((step) => step.status === progressStatus);

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
      return "Confirmed by the seller and queued for fulfilment.";
    case "processing":
      return "Items are being packed and prepared for dispatch.";
    case "partially_processing":
      return "Your order is being prepared in separate packages.";
    case "packed":
      return "Items are packed and prepared for courier handoff.";
    case "shipped":
      return "Handed to the courier and moving through delivery.";
    case "delivered":
      return "Delivered successfully and archived in your order history.";
    case "cancelled":
      return "This order was cancelled before delivery completed.";
    case "returned":
      return "This order has been returned after delivery.";
  }
}

export function getOrderListPageValue(
  orders: EcommerceOrderListData["orders"],
) {
  return orders.reduce((sum, order) => sum + Number(order.total), 0);
}

export function getOrderItemImage(item: EcommerceOrderItem) {
  return item.images?.[0]?.url ?? null;
}
