import OrderDetailView from "@/components/orders/OrderDetailView";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  return <OrderDetailView orderNumber={decodeURIComponent(orderNumber)} />;
}
