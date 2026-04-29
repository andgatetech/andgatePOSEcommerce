import type { Metadata } from "next";
import ProductPageDataProvider from "../product/_components/ProductPageDataProvider";

export const metadata: Metadata = {
  title: "Popular Products",
  description: "Browse popular products on Hawkeri.",
  alternates: {
    canonical: "/popular-product",
  },
};

export default function PopularProductPage() {
  return <ProductPageDataProvider collection="popular" />;
}
