import type { Metadata } from "next";
import CheckoutView from "./_components/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your cart, delivery address, and payment method before placing your order.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
