import type { Metadata } from "next";
import OrdersListView from "@/components/orders/OrdersListView";

export const metadata: Metadata = {
  title: "Orders",
  description: "View your Hawkeri order history and delivery status.",
};

export default function OrdersPage() {
  return <OrdersListView />;
}
