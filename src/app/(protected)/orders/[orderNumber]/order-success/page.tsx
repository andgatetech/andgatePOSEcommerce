import type { Metadata } from "next";
import OrderSuccessView from "@/components/orders/OrderSuccessView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}): Promise<Metadata> {
  const { orderNumber } = await params;

  return {
    title: `Order Success ${decodeURIComponent(orderNumber)}`,
    description: "Your Hawkeri order was placed successfully.",
  };
}

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  return <OrderSuccessView orderNumber={decodeURIComponent(orderNumber)} />;
}
