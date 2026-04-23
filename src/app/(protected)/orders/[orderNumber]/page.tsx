import type { Metadata } from "next";
import OrderDetailView from "@/components/orders/OrderDetailView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}): Promise<Metadata> {
  const { orderNumber } = await params;

  return {
    title: `Order ${decodeURIComponent(orderNumber)}`,
    description: "View your Hawkeri order details and delivery status.",
  };
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  return <OrderDetailView orderNumber={decodeURIComponent(orderNumber)} />;
}
