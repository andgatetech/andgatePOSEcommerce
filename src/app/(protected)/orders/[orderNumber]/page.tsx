import type { Metadata } from "next";
import OrderDetailView from "../../../../components/orders/OrderDetailView";

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
  searchParams,
}: {
  params: Promise<{ orderNumber: string }>;
  searchParams: Promise<{ store_order_id?: string | string[] }>;
}) {
  const { orderNumber } = await params;
  const { store_order_id: storeOrderIdParam } = await searchParams;
  const storeOrderId = Array.isArray(storeOrderIdParam) ? storeOrderIdParam[0] : storeOrderIdParam;

  return <OrderDetailView orderNumber={decodeURIComponent(orderNumber)} selectedStoreOrderId={storeOrderId} />;
}
