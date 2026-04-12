"use client";

import ProductPageContent from "./ProductPage";
import { useProductData } from "@/lib/product-data-context";

export default function ProductPageDataProvider() {
  const { categories, brands } = useProductData();

  return <ProductPageContent categories={categories} brands={brands} />;
}
