import type { Metadata } from "next";
import ProductPageDataProvider from "../product/_components/ProductPageDataProvider";

export const metadata: Metadata = {
  title: "Deals Of The Day",
  description: "Browse today's active deals on Hawkeri.",
  alternates: {
    canonical: "/deal-of-day",
  },
};

export default function DealOfDayPage() {
  return <ProductPageDataProvider collection="deals-of-day" />;
}
