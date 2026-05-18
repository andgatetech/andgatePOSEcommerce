"use client";

import { useEffect, useMemo, useState } from "react";
import { FiSliders, FiX } from "react-icons/fi";
import { useGetBrandsQuery } from "@/features/catalog/brandApi";
import { useGetCategoriesQuery } from "@/features/catalog/categoryApi";
import { useGetProductsQuery } from "@/features/catalog/productApi";
import {
  buildInfiniteQueryKey,
  useInfinitePage,
  useInfinitePaginatedItems,
} from "@/hooks/useInfinitePaginatedItems";
import { useListQuery } from "@/hooks/useListQuery";
import Container from "@/components/shared/Container";
import ProductFiltersSidebar from "@/components/shared/ProductFiltersSidebar";
import SearchInput from "@/components/shared/SearchInput";
import SortSelect, { type SortOption } from "@/components/shared/SortSelect";
import PopularProductCard from "./PopularProductCard";
import ProductPageSkeleton from "./ProductPageSkeleton";
import type { ProductListParams } from "@/types";

const SORT_OPTIONS: SortOption[] = [
  { label: "Newest", field: "created_at", direction: "desc" },
  { label: "Oldest", field: "created_at", direction: "asc" },
  { label: "Price: Low → High", field: "price", direction: "asc" },
  { label: "Price: High → Low", field: "price", direction: "desc" },
  { label: "Name (A–Z)", field: "product_name", direction: "asc" },
  { label: "Name (Z–A)", field: "product_name", direction: "desc" },
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

export default function ProductCatalogPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    params,
    search,
    setSearch,
    setSort,
    setPerPage,
    extraParams,
    setExtraParams,
    resetExtraParams,
  } = useListQuery<ProductExtraParams>({
    defaultPerPage: DEFAULT_PER_PAGE,
    defaultSortField: DEFAULT_SORT_FIELD,
    defaultSortDirection: DEFAULT_SORT_DIRECTION,
    extraParams: [
      { key: "category" },
      { key: "brand" },
      { key: "min_price", type: "number" },
      { key: "max_price", type: "number" },
    ],
  });

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const baseQueryParams = useMemo<ProductListParams>(
    () => ({
      search: params.search,
      per_page: params.per_page,
      sort_field: params.sort_field as ProductListParams["sort_field"],
      sort_direction: params.sort_direction,
      category: extraParams.category,
      brand: extraParams.brand,
      min_price: extraParams.min_price,
      max_price: extraParams.max_price,
    }),
    [
      params.search,
      params.per_page,
      params.sort_field,
      params.sort_direction,
      extraParams.category,
      extraParams.brand,
      extraParams.min_price,
      extraParams.max_price,
    ],
  );

  const queryKey = useMemo(
    () => buildInfiniteQueryKey(baseQueryParams),
    [baseQueryParams],
  );
  const [page, setInfinitePage] = useInfinitePage(queryKey);
  const queryParams = useMemo<ProductListParams>(
    () => ({ ...baseQueryParams, page }),
    [baseQueryParams, page],
  );

  const { currentData, isFetching, isError } = useGetProductsQuery(queryParams);
  const { data: categoriesData } = useGetCategoriesQuery({
    per_page: 100,
    sort_field: "name",
    sort_direction: "asc",
  });
  const { data: brandsData } = useGetBrandsQuery({
    per_page: 100,
    sort_field: "name",
    sort_direction: "asc",
  });

  const {
    items: products,
    pagination,
    sentinelRef,
    isLoadingMore,
  } = useInfinitePaginatedItems({
    payload: currentData ?? null,
    queryKey,
    isFetching,
    setPage: setInfinitePage,
  });

  const total = pagination?.total ?? 0;

  const activeFilterCount = [
    extraParams.category,
    extraParams.brand,
    extraParams.min_price,
    extraParams.max_price,
  ].filter((v) => v !== undefined && v !== "").length;

  const sortValue = {
    field: params.sort_field ?? DEFAULT_SORT_FIELD,
    direction: params.sort_direction ?? DEFAULT_SORT_DIRECTION,
  };

  const activeChips = useMemo(() => {
    const chips: Array<{ key: string; label: string; onRemove: () => void }> = [];
    if (extraParams.category) {
      const cat = categoriesData?.items.find((c) => c.slug === extraParams.category);
      chips.push({
        key: "category",
        label: cat?.name ?? extraParams.category,
        onRemove: () => setExtraParams({ category: undefined }),
      });
    }
    if (extraParams.brand) {
      const brand = brandsData?.items.find((b) => b.slug === extraParams.brand);
      chips.push({
        key: "brand",
        label: brand?.name ?? extraParams.brand,
        onRemove: () => setExtraParams({ brand: undefined }),
      });
    }
    if (extraParams.min_price !== undefined) {
      chips.push({
        key: "min_price",
        label: `Min ৳${extraParams.min_price}`,
        onRemove: () => setExtraParams({ min_price: undefined }),
      });
    }
    if (extraParams.max_price !== undefined) {
      chips.push({
        key: "max_price",
        label: `Max ৳${extraParams.max_price}`,
        onRemove: () => setExtraParams({ max_price: undefined }),
      });
    }
    return chips;
  }, [extraParams, categoriesData, brandsData, setExtraParams]);

  const filterProps = {
    categories: categoriesData?.items ?? [],
    brands: brandsData?.items ?? [],
    selectedCategory: extraParams.category,
    selectedBrand: extraParams.brand,
    minPrice: extraParams.min_price,
    maxPrice: extraParams.max_price,
    activeFilterCount,
    onCategoryChange: (value?: string) => setExtraParams({ category: value }),
    onBrandChange: (value?: string) => setExtraParams({ brand: value }),
    onMinPriceChange: (value?: number) => setExtraParams({ min_price: value }),
    onMaxPriceChange: (value?: number) => setExtraParams({ max_price: value }),
    onClear: resetExtraParams,
  };

  return (
    <section className="bg-(--color-bg) pb-10 pt-6 md:pb-12 md:pt-8 lg:pb-16 lg:pt-10">
      <Container>
        <div className="mb-6 rounded-[28px] border border-(--color-border) bg-[linear-gradient(135deg,#ffffff_0%,#f6fbff_100%)] p-6 shadow-[0_18px_60px_rgba(19,45,69,0.06)] md:p-8">
          <span className="inline-flex rounded-full border border-(--color-primary-200) bg-(--color-primary-100) px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-(--color-primary)">
            All Products
          </span>
          <h1 className="mt-4 text-[30px] font-semibold tracking-[-0.03em] text-(--color-primary-900) md:text-[40px]">
            Browse Our Collection
          </h1>
          <p className="mt-3 max-w-[720px] text-sm leading-7 text-(--color-text-muted)">
            Filter by category, brand, and price range to find exactly what you need.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          {/* Desktop sticky sidebar */}
          <div className="filter-scrollbar-none hidden overscroll-contain lg:sticky lg:top-[154px] lg:block lg:max-h-[calc(100vh-178px)] lg:self-start lg:overflow-y-auto xl:top-[176px] xl:max-h-[calc(100vh-200px)]">
            <ProductFiltersSidebar {...filterProps} />
          </div>

          <div>
            {/* Toolbar */}
            <div className="mb-5 rounded-[24px] border border-(--color-border) bg-white p-4 shadow-[0_18px_50px_rgba(19,45,69,0.05)] md:p-5">
              <div className="flex flex-wrap items-center gap-3">
                {/* Mobile filter button — hidden on desktop */}
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  aria-label={`Open filters${activeFilterCount > 0 ? `, ${activeFilterCount} active` : ""}`}
                  className="relative inline-flex min-h-[44px] items-center gap-2 rounded-full border border-(--color-border) bg-(--color-bg) px-4 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary-200) hover:text-(--color-primary) lg:hidden"
                >
                  <FiSliders className="text-base" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--color-primary) px-1 text-[10px] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <SearchInput
                  value={search}
                  onChange={setSearch}
                  placeholder="Search products..."
                  className="min-w-0 flex-1"
                />

                <SortSelect options={SORT_OPTIONS} value={sortValue} onChange={setSort} />

                <select
                  value={String(params.per_page ?? DEFAULT_PER_PAGE)}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                  className="h-11 rounded-full border border-(--color-border) bg-(--color-bg) px-4 text-sm text-(--color-dark) outline-none focus:border-(--color-primary-200)"
                  aria-label="Products per page"
                >
                  {[12, 24, 36, 48].map((n) => (
                    <option key={n} value={n}>
                      Show {n}
                    </option>
                  ))}
                </select>

                <span className="ml-auto whitespace-nowrap text-sm text-(--color-text-muted)">
                  {total} product{total !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Active filter chips */}
              {activeChips.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-(--color-text-muted)">Active:</span>
                  {activeChips.map((chip) => (
                    <button
                      key={chip.key}
                      type="button"
                      onClick={chip.onRemove}
                      className="inline-flex items-center gap-1.5 rounded-full border border-(--color-primary-200) bg-(--color-primary-100) px-3 py-1 text-xs font-semibold text-(--color-primary) transition hover:bg-(--color-primary-200)"
                    >
                      {chip.label}
                      <FiX className="text-[11px]" />
                    </button>
                  ))}
                  {activeChips.length > 1 && (
                    <button
                      type="button"
                      onClick={resetExtraParams}
                      className="text-xs font-semibold text-(--color-text-muted) transition hover:text-(--color-danger)"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Product grid / states */}
            {isError && products.length === 0 ? (
              <div className="rounded-[24px] border border-(--color-border) bg-white px-6 py-16 text-center shadow-[0_18px_50px_rgba(19,45,69,0.05)]">
                <p className="text-sm text-(--color-text-muted)">
                  Failed to load products. Please try again.
                </p>
              </div>
            ) : isFetching && products.length === 0 ? (
              <ProductPageSkeleton />
            ) : products.length === 0 && !isFetching ? (
              <div className="rounded-[24px] border border-(--color-border) bg-white px-6 py-16 text-center shadow-[0_18px_50px_rgba(19,45,69,0.05)]">
                <h2 className="text-[22px] font-semibold text-(--color-primary-900)">
                  No products found
                </h2>
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
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
                {products.map((product) => (
                  <PopularProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {products.length > 0 && (
              <div ref={sentinelRef} className="h-8" aria-hidden />
            )}

            {isLoadingMore && (
              <div className="mt-6 flex justify-center">
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-(--color-primary-100) border-t-(--color-primary)" />
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Product filters"
            className="filter-drawer fixed inset-x-0 bottom-0 z-50 flex max-h-[88vh] flex-col rounded-t-[28px] bg-white shadow-[0_-20px_60px_rgba(17,17,17,0.18)] lg:hidden"
          >
            {/* Drag handle */}
            <div className="flex justify-center pb-1 pt-3">
              <div className="h-1 w-10 rounded-full bg-(--color-border)" />
            </div>

            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-(--color-border) px-5 py-3">
              <h2 className="flex items-center gap-2 text-[16px] font-bold text-(--color-primary-900)">
                Filters
                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-(--color-primary) px-2 py-0.5 text-xs font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </h2>
              <div className="flex items-center gap-3">
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={resetExtraParams}
                    className="text-xs font-semibold text-(--color-primary) transition hover:opacity-75"
                  >
                    Clear all
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close filters"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-(--color-border) text-(--color-dark) transition hover:bg-(--color-primary-50)"
                >
                  <FiX className="text-base" />
                </button>
              </div>
            </div>

            {/* Scrollable filter body */}
            <div className="filter-scrollbar-none flex-1 overflow-y-auto">
              <ProductFiltersSidebar
                {...filterProps}
                hideHeader
                className="rounded-none border-none bg-transparent shadow-none"
              />
            </div>

            {/* Apply / show results button */}
            <div className="border-t border-(--color-border) p-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-full rounded-[14px] bg-(--color-primary) py-3.5 text-sm font-bold text-white transition hover:bg-(--color-primary-dark)"
              >
                {total > 0
                  ? `Show ${total} product${total !== 1 ? "s" : ""}`
                  : "Apply Filters"}
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
