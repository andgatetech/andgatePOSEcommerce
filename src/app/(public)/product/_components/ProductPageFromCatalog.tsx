"use client";

import ProductPageContent from "./ProductPage";
import { useCatalogContext } from "@/lib/catalog-context";

export default function ProductPageFromCatalog() {
  const { categories, brands } = useCatalogContext();

  return <ProductPageContent categories={categories} brands={brands} />;
}
