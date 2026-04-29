"use client";

import ProductPageContent from "./ProductPage";
import { useProductData } from "@/lib/product-data-context";
import { useGetCategoriesQuery } from "@/features/catalog/categoryApi";
import { useGetBrandsQuery } from "@/features/catalog/brandApi";
import type { ProductCollection } from "@/features/catalog/productApi";
import type { Category, Brand } from "@/types";

interface ProductPageDataProviderProps {
  initialCategory?: string;
  initialBrand?: string;
  initialStore?: string;
  categories?: Category[];
  brands?: Brand[];
  collection?: ProductCollection;
}

export default function ProductPageDataProvider({
  initialCategory,
  initialBrand,
  initialStore,
  categories: initialCategoriesProp,
  brands: initialBrandsProp,
  collection,
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

  const categories = initialCategoriesProp ?? (initialStore ? (storeCategories?.items ?? []) : globalData.categories);
  const brands = initialBrandsProp ?? (initialStore ? (storeBrands?.items ?? []) : globalData.brands);

  return (
    <ProductPageContent
      categories={categories}
      brands={brands}
      initialCategory={initialCategory}
      initialBrand={initialBrand}
      initialStore={initialStore}
      collection={collection}
    />
  );
}
