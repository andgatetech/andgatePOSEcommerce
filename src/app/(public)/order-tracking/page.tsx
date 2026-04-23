import type { Metadata } from "next";
import OrderTrackingContent from "@/components/shared/order-tracking/OrderTrackingContent";

export const metadata: Metadata = {
  title: "Order Tracking",
  description: "Track a Hawkeri order by order number and phone number.",
};

export default function OrderTrackingPage() {
  return (
    <section className="bg-(--color-bg) px-4 pb-8 pt-10 md:px-8 md:pb-10 lg:px-12 lg:pb-14 lg:pt-12">
      <div className="mx-auto">
        <OrderTrackingContent variant="public" />
      </div>
    </section>
  );
}
