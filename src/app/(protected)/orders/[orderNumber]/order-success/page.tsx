import OrderSuccessView from "@/components/orders/OrderSuccessView";

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  return <OrderSuccessView orderNumber={decodeURIComponent(orderNumber)} />;
}
