"use client";

import { useMemo, useState } from "react";
import {
  FiArrowRight,
  FiBox,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiMapPin,
  FiPackage,
  FiShield,
  FiShoppingBag,
  FiTruck,
  FiUser,
} from "react-icons/fi";

type OrderStatus =
  | "To Pay"
  | "Pending"
  | "Confirmed"
  | "To Ship"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered";

type OrderTab =
  | "All"
  | "To Pay"
  | "Pending"
  | "Confirmed"
  | "To Ship"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered";

type OrderStep = {
  id: string;
  label: string;
  description: string;
  time: string;
  complete: boolean;
};

type OrderItem = {
  id: number;
  name: string;
  variant: string;
  quantity: number;
  price: number;
};

type AccountOrder = {
  id: string;
  placedAt: string;
  status: OrderStatus;
  paymentStatus: string;
  paymentMethod: string;
  total: number;
  eta: string;
  destination: string;
  storeName: string;
  trackingId: string;
  items: OrderItem[];
  timeline: OrderStep[];
};

const orderTabs: OrderTab[] = [
  "All",
  "To Pay",
  "Pending",
  "Confirmed",
  "To Ship",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const mockOrders: AccountOrder[] = [
  {
    id: "ORD-24091",
    placedAt: "08 Apr 2026, 09:15 AM",
    status: "Out for Delivery",
    paymentStatus: "Paid",
    paymentMethod: "bKash",
    total: 6840,
    eta: "Today, 5:30 PM",
    destination: "House 12, Road 7, Adabor, Dhaka",
    storeName: "Andgate Fresh",
    trackingId: "AG-TRK-24091",
    items: [
      { id: 1, name: "Fresh Valley Organic Rice", variant: "10kg pack", quantity: 1, price: 2450 },
      { id: 2, name: "Premium Sunflower Oil", variant: "5L bottle", quantity: 1, price: 1680 },
      { id: 3, name: "Daily Dairy Milk Pack", variant: "12 pcs", quantity: 2, price: 1355 },
    ],
    timeline: [
      {
        id: "placed",
        label: "Order Placed",
        description: "Customer placed the order and payment was verified successfully.",
        time: "08 Apr, 09:15 AM",
        complete: true,
      },
      {
        id: "confirmed",
        label: "Confirmed",
        description: "Store confirmed item availability and prepared the packing slip.",
        time: "08 Apr, 09:48 AM",
        complete: true,
      },
      {
        id: "packed",
        label: "Packed",
        description: "The order was packed and handed to the fulfilment team.",
        time: "08 Apr, 11:10 AM",
        complete: true,
      },
      {
        id: "shipped",
        label: "Shipped",
        description: "Shipment left the local hub and was assigned to the courier.",
        time: "08 Apr, 01:40 PM",
        complete: true,
      },
      {
        id: "delivery",
        label: "Out for Delivery",
        description: "Courier is on the final route to the delivery destination.",
        time: "08 Apr, 03:05 PM",
        complete: true,
      },
      {
        id: "delivered",
        label: "Delivered",
        description: "Final delivery confirmation will appear here once completed.",
        time: "Pending",
        complete: false,
      },
    ],
  },
  {
    id: "ORD-24088",
    placedAt: "07 Apr 2026, 06:25 PM",
    status: "To Ship",
    paymentStatus: "Paid",
    paymentMethod: "Card",
    total: 3290,
    eta: "Tomorrow",
    destination: "Level 5, Business Hub, Agargaon, Dhaka",
    storeName: "Andgate Electronics",
    trackingId: "AG-TRK-24088",
    items: [
      { id: 1, name: "Wireless Keyboard and Mouse Combo", variant: "Black", quantity: 1, price: 2290 },
      { id: 2, name: "USB-C Charging Cable", variant: "2 meter", quantity: 2, price: 500 },
    ],
    timeline: [
      {
        id: "placed",
        label: "Order Placed",
        description: "Order placed successfully and payment authorization was received.",
        time: "07 Apr, 06:25 PM",
        complete: true,
      },
      {
        id: "pending",
        label: "Pending Review",
        description: "The order entered merchant review for stock and invoice confirmation.",
        time: "07 Apr, 06:40 PM",
        complete: true,
      },
      {
        id: "confirmed",
        label: "Confirmed",
        description: "Items are confirmed and the shipment is queued for dispatch.",
        time: "08 Apr, 09:05 AM",
        complete: true,
      },
      {
        id: "to-ship",
        label: "Ready To Ship",
        description: "Packed order is waiting for courier pickup from the fulfilment center.",
        time: "08 Apr, 12:20 PM",
        complete: true,
      },
      {
        id: "shipped",
        label: "Shipped",
        description: "Shipment update will appear here once the courier scans the package.",
        time: "Pending",
        complete: false,
      },
    ],
  },
  {
    id: "ORD-24077",
    placedAt: "06 Apr 2026, 11:35 AM",
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Cash on Delivery",
    total: 1980,
    eta: "Delivered on 07 Apr",
    destination: "House 44, Block C, Mirpur DOHS, Dhaka",
    storeName: "Andgate Lifestyle",
    trackingId: "AG-TRK-24077",
    items: [
      { id: 1, name: "Cotton Casual T-Shirt", variant: "Navy / XL", quantity: 2, price: 690 },
      { id: 2, name: "Minimal Leather Wallet", variant: "Brown", quantity: 1, price: 600 },
    ],
    timeline: [
      {
        id: "placed",
        label: "Order Placed",
        description: "Customer submitted the order with cash on delivery selected.",
        time: "06 Apr, 11:35 AM",
        complete: true,
      },
      {
        id: "confirmed",
        label: "Confirmed",
        description: "Merchant confirmed stock and approved the fulfilment request.",
        time: "06 Apr, 12:15 PM",
        complete: true,
      },
      {
        id: "shipped",
        label: "Shipped",
        description: "Shipment was dispatched through the assigned courier partner.",
        time: "06 Apr, 04:20 PM",
        complete: true,
      },
      {
        id: "delivery",
        label: "Out for Delivery",
        description: "Courier started final-mile delivery for the customer address.",
        time: "07 Apr, 10:05 AM",
        complete: true,
      },
      {
        id: "delivered",
        label: "Delivered",
        description: "Order delivered successfully and payment collected at doorstep.",
        time: "07 Apr, 12:42 PM",
        complete: true,
      },
    ],
  },
  {
    id: "ORD-24074",
    placedAt: "05 Apr 2026, 08:50 PM",
    status: "To Pay",
    paymentStatus: "Awaiting Payment",
    paymentMethod: "Nagad",
    total: 1240,
    eta: "Complete payment to continue",
    destination: "Banasree, Rampura, Dhaka",
    storeName: "Andgate Grocery",
    trackingId: "AG-TRK-24074",
    items: [
      { id: 1, name: "Imported Pasta Bundle", variant: "3 pcs", quantity: 1, price: 640 },
      { id: 2, name: "Italian Pasta Sauce", variant: "2 jars", quantity: 1, price: 600 },
    ],
    timeline: [
      {
        id: "placed",
        label: "Order Created",
        description: "Order has been created and is waiting for payment completion.",
        time: "05 Apr, 08:50 PM",
        complete: true,
      },
      {
        id: "payment",
        label: "Payment Pending",
        description: "Please complete the Nagad payment to move the order into confirmation.",
        time: "Current",
        complete: false,
      },
    ],
  },
  {
    id: "ORD-24070",
    placedAt: "05 Apr 2026, 03:10 PM",
    status: "Pending",
    paymentStatus: "Reviewing",
    paymentMethod: "Card",
    total: 4125,
    eta: "Awaiting merchant confirmation",
    destination: "Dhanmondi 27, Dhaka",
    storeName: "Andgate Appliances",
    trackingId: "AG-TRK-24070",
    items: [
      { id: 1, name: "Compact Rice Cooker", variant: "2.2L", quantity: 1, price: 3350 },
      { id: 2, name: "Heat Resistant Serving Spoon", variant: "Set of 2", quantity: 1, price: 775 },
    ],
    timeline: [
      {
        id: "placed",
        label: "Order Placed",
        description: "The order has been received and entered merchant validation.",
        time: "05 Apr, 03:10 PM",
        complete: true,
      },
      {
        id: "pending",
        label: "Pending",
        description: "Inventory and payment checks are being completed by the operations team.",
        time: "05 Apr, 03:35 PM",
        complete: true,
      },
      {
        id: "confirmed",
        label: "Awaiting Confirmation",
        description: "The next update will appear here when the order is confirmed.",
        time: "Pending",
        complete: false,
      },
    ],
  },
];

function formatCurrency(value: number) {
  return `৳${value.toLocaleString("en-BD")}`;
}

function getStatusTone(status: OrderStatus) {
  switch (status) {
    case "To Pay":
      return "bg-[#fff7e8] text-(--color-cta)";
    case "Pending":
      return "bg-[#f6f5ff] text-[#6d5bd0]";
    case "Confirmed":
      return "bg-[#eef7ff] text-[#2563eb]";
    case "To Ship":
      return "bg-(--color-primary-100) text-(--color-primary)";
    case "Shipped":
      return "bg-[#ecfbff] text-[#0f8f86]";
    case "Out for Delivery":
      return "bg-[#eff8f0] text-(--color-success)";
    case "Delivered":
      return "bg-[#eef8f3] text-[#1f8a4c]";
    default:
      return "bg-(--color-primary-100) text-(--color-primary)";
  }
}

function getStatusAccent(status: OrderStatus) {
  switch (status) {
    case "To Pay":
      return "from-[#fff7e8] to-[#fff0d2]";
    case "Pending":
      return "from-[#f6f5ff] to-[#eeebff]";
    case "Confirmed":
      return "from-[#eef7ff] to-[#ddefff]";
    case "To Ship":
      return "from-[#edf5fb] to-[#dceaf6]";
    case "Shipped":
      return "from-[#ecfbff] to-[#d7f7ff]";
    case "Out for Delivery":
      return "from-[#eff8f0] to-[#ddf3e2]";
    case "Delivered":
      return "from-[#eef8f3] to-[#ddf1e5]";
    default:
      return "from-[#edf5fb] to-[#dceaf6]";
  }
}

function getUnitCount(order: AccountOrder) {
  return order.items.reduce((sum, item) => sum + item.quantity, 0);
}

export default function MyAccountOrdersPanel() {
  const [activeTab, setActiveTab] = useState<OrderTab>("All");
  const [selectedOrderId, setSelectedOrderId] = useState<string>(mockOrders[0].id);

  const filteredOrders = useMemo(() => {
    if (activeTab === "All") {
      return mockOrders;
    }

    return mockOrders.filter((order) => order.status === activeTab);
  }, [activeTab]);

  const selectedOrder =
    filteredOrders.find((order) => order.id === selectedOrderId) ??
    mockOrders.find((order) => order.id === selectedOrderId) ??
    filteredOrders[0] ??
    mockOrders[0];

  const summaryCards = useMemo(
    () => [
      {
        label: "Active Orders",
        value: mockOrders.filter((order) => order.status !== "Delivered").length,
        icon: <FiPackage className="text-[18px]" />,
      },
      {
        label: "Awaiting Action",
        value: mockOrders.filter((order) => order.status === "To Pay" || order.status === "Pending").length,
        icon: <FiClock className="text-[18px]" />,
      },
      {
        label: "Delivered",
        value: mockOrders.filter((order) => order.status === "Delivered").length,
        icon: <FiCheckCircle className="text-[18px]" />,
      },
      {
        label: "This Month Spend",
        value: formatCurrency(mockOrders.reduce((sum, order) => sum + order.total, 0)),
        icon: <FiCreditCard className="text-[18px]" />,
      },
    ],
    []
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">
          Orders
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-(--color-text-muted)">
          Review every order stage from payment to delivery, then open any order to inspect
          the full timeline, items and shipping details from one production-style workspace.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="rounded-[22px] border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_18px_40px_rgba(17,17,17,0.04)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                {card.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                  {card.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-(--color-dark)">
                  {card.value}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-[28px] border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-6 xl:p-7">
        <div className="flex flex-wrap gap-3">
          {orderTabs.map((tab) => {
            const count =
              tab === "All"
                ? mockOrders.length
                : mockOrders.filter((order) => order.status === tab).length;
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center gap-3 rounded-full border px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "border-(--color-primary) bg-(--color-primary) text-(--color-bg)"
                    : "border-(--color-border) bg-(--color-bg) text-(--color-dark) hover:border-(--color-primary) hover:text-(--color-primary)"
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`inline-flex min-w-7 items-center justify-center rounded-full px-2 py-1 text-xs ${
                    isActive
                      ? "bg-white/18 text-white"
                      : "bg-(--color-primary-100) text-(--color-primary)"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div className="space-y-4">
            {filteredOrders.length ? (
              filteredOrders.map((order) => {
                const isActive = selectedOrder.id === order.id;

                return (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`w-full overflow-hidden rounded-[26px] border text-left transition ${
                      isActive
                        ? "border-(--color-primary) bg-(--color-bg) shadow-[0_18px_42px_rgba(44,95,138,0.14)]"
                        : "border-(--color-border) bg-(--color-bg) hover:border-(--color-primary-200) hover:shadow-[0_12px_28px_rgba(17,17,17,0.05)]"
                    }`}
                  >
                    <div className={`bg-linear-to-r ${getStatusAccent(order.status)} px-5 py-4`}>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                              {order.id}
                            </h2>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusTone(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="mt-2 text-sm font-medium text-(--color-primary-900)">
                            {order.storeName}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                            Total
                          </p>
                          <p className="mt-1 text-[18px] font-semibold text-(--color-dark)">
                            {formatCurrency(order.total)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-5">
                      <div className="grid gap-3 text-sm sm:grid-cols-3">
                        <div className="rounded-[18px] border border-(--color-border) bg-[#fbfcfd] px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                            Order Date
                          </p>
                          <p className="mt-2 font-semibold text-(--color-dark)">{order.placedAt}</p>
                        </div>
                        <div className="rounded-[18px] border border-(--color-border) bg-[#fbfcfd] px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                            Payment
                          </p>
                          <p className="mt-2 font-semibold text-(--color-dark)">{order.paymentStatus}</p>
                        </div>
                        <div className="rounded-[18px] border border-(--color-border) bg-[#fbfcfd] px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                            Units
                          </p>
                          <p className="mt-2 font-semibold text-(--color-dark)">{getUnitCount(order)}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-(--color-border) pt-4">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-(--color-text-muted)">
                          <span className="inline-flex items-center gap-2 rounded-full bg-(--color-primary-100) px-3 py-2 text-(--color-primary)">
                            <FiTruck className="text-[16px]" />
                            {order.eta}
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-full bg-[#f4f6f8] px-3 py-2">
                            <FiShoppingBag className="text-[16px] text-(--color-primary)" />
                            {order.items.length} line item{order.items.length === 1 ? "" : "s"}
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-(--color-primary)">
                          View Details
                          <FiArrowRight className={`text-[16px] transition-transform ${isActive ? "translate-x-1" : ""}`} />
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="rounded-[24px] border border-dashed border-(--color-border) bg-[#fbfcfd] px-6 py-10 text-center">
                <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                  No orders in this status
                </h2>
                <p className="mt-3 text-sm leading-7 text-(--color-text-muted)">
                  Orders will appear here automatically once they enter the selected stage.
                </p>
              </div>
            )}
          </div>

          {filteredOrders.length ? (
            <section className="overflow-hidden rounded-[28px] border border-(--color-border) bg-(--color-bg) shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
              <div className={`bg-linear-to-r ${getStatusAccent(selectedOrder.status)} px-6 py-6 md:px-7`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-[30px] font-semibold tracking-[-0.04em] text-(--color-dark)">
                      {selectedOrder.id}
                    </h2>
                    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusTone(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-(--color-primary-900)">
                    {selectedOrder.storeName} • Tracking ID{" "}
                    <span className="font-semibold text-(--color-dark)">{selectedOrder.trackingId}</span>
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[18px] bg-white/72 px-4 py-3 text-right backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                      Grand Total
                    </p>
                    <p className="mt-2 text-[20px] font-semibold text-(--color-dark)">
                      {formatCurrency(selectedOrder.total)}
                    </p>
                  </div>
                  <div className="rounded-[18px] bg-white/72 px-4 py-3 text-right backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                      Payment
                    </p>
                    <p className="mt-2 text-[20px] font-semibold text-(--color-dark)">
                      {selectedOrder.paymentStatus}
                    </p>
                  </div>
                </div>
              </div>
              </div>

              <div className="px-6 py-6 md:px-7 md:py-7">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[20px] border border-(--color-border) bg-[#fbfcfd] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                      <FiCalendar className="text-[17px]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                        Ordered At
                      </p>
                      <p className="mt-1 text-sm font-semibold text-(--color-dark)">
                        {selectedOrder.placedAt}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[20px] border border-(--color-border) bg-[#fbfcfd] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                      <FiCreditCard className="text-[17px]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                        Method
                      </p>
                      <p className="mt-1 text-sm font-semibold text-(--color-dark)">
                        {selectedOrder.paymentMethod}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[20px] border border-(--color-border) bg-[#fbfcfd] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                      <FiClock className="text-[17px]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                        Payment Status
                      </p>
                      <p className="mt-1 text-sm font-semibold text-(--color-dark)">
                        {selectedOrder.paymentStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[20px] border border-(--color-border) bg-[#fbfcfd] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                      <FiShield className="text-[17px]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
                        Order Stage
                      </p>
                      <p className="mt-1 text-sm font-semibold text-(--color-dark)">
                        {selectedOrder.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_340px]">
                <div className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[22px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                      Order Timeline
                    </h3>
                    <span className="rounded-full bg-(--color-primary-100) px-3 py-1 text-xs font-semibold text-(--color-primary)">
                      {selectedOrder.timeline.filter((step) => step.complete).length}/{selectedOrder.timeline.length} complete
                    </span>
                  </div>

                  <div className="mt-7 space-y-6">
                    {selectedOrder.timeline.map((step, index) => (
                      <div key={step.id} className="relative flex gap-4">
                        {index !== selectedOrder.timeline.length - 1 ? (
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

                        <div className="min-w-0 flex-1 rounded-[18px] border border-(--color-border) bg-[#fbfcfd] px-4 py-3">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <h4 className="text-[17px] font-semibold text-(--color-dark)">
                              {step.label}
                            </h4>
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-(--color-text-muted)">
                              {step.time}
                            </span>
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
                  <div className="rounded-[24px] border border-(--color-border) bg-[#fbfcfd] p-5">
                    <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                      Delivery Details
                    </h3>

                    <div className="mt-5 space-y-4 text-sm leading-7 text-(--color-text-muted)">
                      <div className="flex items-start gap-3 rounded-[18px] bg-white px-4 py-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                          <FiUser className="text-[16px]" />
                        </div>
                        <div>
                          <p className="font-semibold text-(--color-dark)">Seller</p>
                          <p>{selectedOrder.storeName}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-[18px] bg-white px-4 py-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                          <FiMapPin className="text-[16px]" />
                        </div>
                        <div>
                          <p className="font-semibold text-(--color-dark)">Destination</p>
                          <p>{selectedOrder.destination}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-(--color-border) bg-(--color-primary-100) p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-bg) text-(--color-primary)">
                        <FiBox className="text-[20px]" />
                      </div>
                      <div>
                        <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-primary-900)">
                          Order Summary
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                          Cleaner totals, units and payment summary for the selected order.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 rounded-[20px] bg-white p-4 shadow-[0_10px_24px_rgba(17,17,17,0.04)]">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-(--color-text-muted)">Line Items</span>
                        <span className="font-semibold text-(--color-dark)">{selectedOrder.items.length}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-(--color-text-muted)">Units</span>
                        <span className="font-semibold text-(--color-dark)">{getUnitCount(selectedOrder)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-(--color-text-muted)">Payment Method</span>
                        <span className="font-semibold text-(--color-dark)">{selectedOrder.paymentMethod}</span>
                      </div>
                      <div className="border-t border-(--color-border) pt-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-(--color-dark)">Grand Total</span>
                          <span className="text-lg font-semibold text-(--color-dark)">
                            {formatCurrency(selectedOrder.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-5 xl:col-span-2">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                      Order Items
                    </h3>
                    <span className="text-sm font-medium text-(--color-text-muted)">
                      {getUnitCount(selectedOrder)} units total
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-[18px] border border-(--color-border) bg-[#fbfcfd] px-4 py-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-semibold text-(--color-dark)">{item.name}</p>
                            <p className="mt-1 text-sm text-(--color-text-muted)">
                              {item.variant}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="rounded-full bg-white px-3 py-1.5 text-(--color-text-muted)">
                              Qty {item.quantity}
                            </span>
                            <p className="font-semibold text-(--color-dark)">
                              {formatCurrency(item.price)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </div>
            </section>
          ) : (
            <section className="flex min-h-[420px] items-center justify-center rounded-[26px] border border-dashed border-(--color-border) bg-[#fbfcfd] p-8 text-center">
              <div className="max-w-[420px]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                  <FiPackage className="text-[28px]" />
                </div>
                <h2 className="mt-5 text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                  No matching orders yet
                </h2>
                <p className="mt-3 text-sm leading-7 text-(--color-text-muted)">
                  Switch to another order status to review available orders, or keep this state ready for live account data later.
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
