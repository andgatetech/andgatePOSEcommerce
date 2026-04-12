"use client";

import { useMemo } from "react";
import { useGetProductsQuery } from "@/features/catalog/productApi";
import { useListQuery } from "@/hooks/useListQuery";
import ProductFiltersSidebar from "@/components/shared/ProductFiltersSidebar";
import SortSelect, { type SortOption } from "@/components/shared/SortSelect";
import Pagination from "@/components/shared/Pagination";
import PopularProductCard from "./PopularProductCard";
import ProductPageSkeleton from "./ProductPageSkeleton";
import type { Brand, Category, ProductListParams } from "@/types";

const SORT_OPTIONS: SortOption[] = [
  { label: "Newest", field: "created_at", direction: "desc" },
  { label: "Oldest", field: "created_at", direction: "asc" },
  { label: "Price: Low to High", field: "price", direction: "asc" },
  { label: "Price: High to Low", field: "price", direction: "desc" },
  { label: "Name (A-Z)", field: "product_name", direction: "asc" },
  { label: "Name (Z-A)", field: "product_name", direction: "desc" },
];

type ProductExtraParams = {
  category?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
};

const DEFAULT_PER_PAGE = 12;
const DEFAULT_SORT_FIELD = "created_at";
const DEFAULT_SORT_DIRECTION: "asc" | "desc" = "desc";

interface ProductPageContentProps {
  categories: Category[];
  brands: Brand[];
  initialCategory?: string;
  initialBrand?: string;
}

export default function ProductPageContent({
  categories,
  brands,
  initialCategory,
  initialBrand,
}: ProductPageContentProps) {
  const {
    params,
    setSort,
    setPage,
    setPerPage,
    extraParams,
    setExtraParams,
    resetExtraParams,
  } = useListQuery<ProductExtraParams>({
    defaultPerPage: DEFAULT_PER_PAGE,
    defaultSortField: DEFAULT_SORT_FIELD,
    defaultSortDirection: DEFAULT_SORT_DIRECTION,
    extraParams: [
      { key: "category", defaultValue: initialCategory },
      { key: "brand", defaultValue: initialBrand },
      { key: "min_price", type: "number" },
      { key: "max_price", type: "number" },
    ],
  });

  const queryParams = useMemo<ProductListParams>(
    () => ({
      search: params.search,
      page: params.page,
      per_page: params.per_page,
      sort_field: params.sort_field as ProductListParams["sort_field"],
      sort_direction: params.sort_direction,
      category: extraParams.category,
      brand: extraParams.brand,
      min_price: extraParams.min_price,
      max_price: extraParams.max_price,
    }),
    [params, extraParams],
  );

  const { data, isFetching, isError } = useGetProductsQuery(queryParams);

  const products = data?.items ?? [];
  const pagination = data?.pagination;

  const sortValue = {
    field: params.sort_field ?? DEFAULT_SORT_FIELD,
    direction: params.sort_direction ?? DEFAULT_SORT_DIRECTION,
  };

  return (
    <section className="bg-(--color-bg) px-4 pb-10 pt-6 md:px-8 md:pb-12 md:pt-8 lg:px-12 lg:pb-16 lg:pt-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          <ProductFiltersSidebar
            categories={categories}
            brands={brands}
            selectedCategory={extraParams.category}
            selectedBrand={extraParams.brand}
            minPrice={extraParams.min_price}
            maxPrice={extraParams.max_price}
            activeFilterCount={[
              extraParams.category,
              extraParams.brand,
              extraParams.min_price,
              extraParams.max_price,
            ].filter((value) => value !== undefined && value !== "").length}
            onCategoryChange={(value) => setExtraParams({ category: value })}
            onBrandChange={(value) => setExtraParams({ brand: value })}
            onMinPriceChange={(value) => setExtraParams({ min_price: value })}
            onMaxPriceChange={(value) => setExtraParams({ max_price: value })}
            onClear={resetExtraParams}
          />

          <div>
            <div className="mb-5 rounded-[24px] border border-(--color-border) bg-white p-4 shadow-[0_18px_50px_rgba(19,45,69,0.05)] md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <SortSelect options={SORT_OPTIONS} value={sortValue} onChange={setSort} />
                  <select
                    value={String(params.per_page ?? DEFAULT_PER_PAGE)}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                    className="h-11 rounded-full border border-(--color-border) bg-(--color-bg) px-4 text-sm text-(--color-dark) outline-none focus:border-(--color-primary-200)"
                    aria-label="Products per page"
                  >
                    {[12, 24, 36, 48].map((option) => (
                      <option key={option} value={option}>
                        Show {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {isError && !data ? (
              <div className="rounded-[24px] border border-(--color-border) bg-white px-6 py-16 text-center shadow-[0_18px_50px_rgba(19,45,69,0.05)]">
                <p className="text-sm text-(--color-text-muted)">
                  Failed to load products. Please try again.
                </p>
              </div>
            ) : isFetching && !data ? (
              <ProductPageSkeleton />
            ) : products.length === 0 && !isFetching ? (
              <div className="rounded-[24px] border border-(--color-border) bg-white px-6 py-16 text-center shadow-[0_18px_50px_rgba(19,45,69,0.05)]">
                <h2 className="text-[22px] font-semibold text-(--color-primary-900)">No products found</h2>
                <p className="mx-auto mt-3 max-w-[560px] text-sm leading-7 text-(--color-text-muted)">
                  Try a different search term or clear the filters to see more results.
                </p>
                <button
                  type="button"
                  onClick={resetExtraParams}
                  className="mt-5 rounded-full bg-(--color-primary) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {products.map((product) => (
                  <PopularProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {isFetching && products.length > 0 ? (
              <div className="mt-6">
                <ProductPageSkeleton />
              </div>
            ) : null}

            {pagination ? (
              <div className="mt-8">
                <Pagination pagination={pagination} onPageChange={setPage} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
