"use client";

import ProductPageContent from "./ProductPage";
import { useProductData } from "@/lib/product-data-context";
import { useGetCategoriesQuery } from "@/features/catalog/categoryApi";
import { useGetBrandsQuery } from "@/features/catalog/brandApi";

interface ProductPageDataProviderProps {
  initialCategory?: string;
  initialBrand?: string;
  initialStore?: string;
}

export default function ProductPageDataProvider({
  initialCategory,
  initialBrand,
  initialStore,
}: ProductPageDataProviderProps) {
  const globalData = useProductData();

  const { data: storeCategories } = useGetCategoriesQuery(
    { store: initialStore, per_page: 100, sort_field: "name", sort_direction: "asc" },
    { skip: !initialStore }
  );

  const { data: storeBrands } = useGetBrandsQuery(
    { store: initialStore, per_page: 100, sort_field: "name", sort_direction: "asc" },
    { skip: !initialStore }
  );

  const categories = initialStore ? (storeCategories?.items ?? []) : globalData.categories;
  const brands = initialStore ? (storeBrands?.items ?? []) : globalData.brands;

  return (
    <ProductPageContent
      categories={categories}
      brands={brands}
      initialCategory={initialCategory}
      initialBrand={initialBrand}
      initialStore={initialStore}
    />
  );
}
