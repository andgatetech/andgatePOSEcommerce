import { Suspense } from "react";
import type { Metadata } from "next";
import ServiceHighlights from "@/components/home/ServiceHighlights";
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
        <Suspense>
          <OrderTrackingContent variant="public" />
        </Suspense>
      </Container>
      <ServiceHighlights className="pt-8 md:pt-10 lg:pt-12" />
    </section>
  );
}
