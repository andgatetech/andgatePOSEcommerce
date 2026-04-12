"use client";

import ProductPageContent from "./ProductPage";
import { useProductData } from "@/lib/product-data-context";

interface ProductPageDataProviderProps {
  initialCategory?: string;
  initialBrand?: string;
}

export default function ProductPageDataProvider({
  initialCategory,
  initialBrand,
}: ProductPageDataProviderProps) {
  const { categories, brands } = useProductData();

  return (
    <ProductPageContent
      categories={categories}
      brands={brands}
      initialCategory={initialCategory}
      initialBrand={initialBrand}
    />
  );
}
