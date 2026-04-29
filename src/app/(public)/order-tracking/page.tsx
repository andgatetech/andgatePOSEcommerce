import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import OrderTrackingContent from "@/components/shared/order-tracking/OrderTrackingContent";

export const metadata: Metadata = {
  title: "Order Tracking",
  description: "Track a Hawkeri order by order number and phone number.",
};

export default function OrderTrackingPage() {
  return (
    <section className="bg-(--color-bg) pb-8 pt-10 md:pb-10 lg:pb-14 lg:pt-12">
      <Container>
        <OrderTrackingContent variant="public" />
      </Container>
    </section>
  );
}
