import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review and update products in your Hawkeri cart.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
