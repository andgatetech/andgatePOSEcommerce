"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useGetCategoriesQuery } from "@/features/catalog/categoryApi";
import {
  buildInfiniteQueryKey,
  useInfinitePage,
  useInfinitePaginatedItems,
} from "@/hooks/useInfinitePaginatedItems";
import { useListQuery } from "@/hooks/useListQuery";
import SearchInput from "@/components/shared/SearchInput";
import SortSelect, { type SortOption } from "@/components/shared/SortSelect";
import GeneratedImageFallback from "@/components/shared/GeneratedImageFallback";
import { ROUTE_BUILDERS } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import type { Category, ListQueryParams, PaginatedPayload } from "@/types";

const SORT_OPTIONS: SortOption[] = [
  { label: "Name (A–Z)", field: "name", direction: "asc" },
  { label: "Name (Z–A)", field: "name", direction: "desc" },
  { label: "Newest", field: "created_at", direction: "desc" },
  { label: "Oldest", field: "created_at", direction: "asc" },
];

interface CategoryGalleryProps {
  initialData: PaginatedPayload<Category> | null;
  initialParams: ListQueryParams;
  defaultPerPage: number;
  defaultSortField: string;
  defaultSortDirection: "asc" | "desc";
}

function sameParams(a: ListQueryParams, b: ListQueryParams): boolean {
  return (
    (a.search ?? "") === (b.search ?? "") &&
    (a.page ?? 1) === (b.page ?? 1) &&
    (a.per_page ?? 0) === (b.per_page ?? 0) &&
    (a.sort_field ?? "") === (b.sort_field ?? "") &&
    (a.sort_direction ?? "") === (b.sort_direction ?? "")
  );
}

export default function CategoryGallery({
  initialData,
  initialParams,
  defaultPerPage,
  defaultSortField,
  defaultSortDirection,
}: CategoryGalleryProps) {
  const { params, search, setSearch, setSort } = useListQuery({
    defaultPerPage,
    defaultSortField,
    defaultSortDirection,
  });

  const baseQueryParams = useMemo<ListQueryParams>(
    () => ({
      search: params.search,
      per_page: params.per_page,
      sort_field: params.sort_field,
      sort_direction: params.sort_direction,
    }),
    [
      params.search,
      params.per_page,
      params.sort_field,
      params.sort_direction,
    ],
  );
  const queryKey = useMemo(
    () => buildInfiniteQueryKey(baseQueryParams),
    [baseQueryParams],
  );
  const [page, setInfinitePage] = useInfinitePage(queryKey);
  const queryParams = useMemo<ListQueryParams>(
    () => ({
      ...baseQueryParams,
      page,
    }),
    [baseQueryParams, page],
  );

  // While the client params still equal the server-rendered first page, use the
  // SSR payload directly and skip the client fetch.
  const isInitial = useMemo(
    () => sameParams(queryParams, initialParams),
    [queryParams, initialParams],
  );

  const { currentData, isFetching, isError } = useGetCategoriesQuery(queryParams, {
    skip: isInitial && initialData !== null,
  });

  const payload: PaginatedPayload<Category> | null =
    isInitial && initialData ? initialData : (currentData ?? null);
  const {
    items,
    sentinelRef,
    isLoadingMore,
  } = useInfinitePaginatedItems({
    payload,
    queryKey,
    isFetching,
    setPage: setInfinitePage,
  });

  const sortValue = {
    field: params.sort_field ?? defaultSortField,
    direction: params.sort_direction ?? defaultSortDirection,
  };

  return (
    <section className="bg-(--color-bg) px-4 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8 lg:px-12 lg:pb-14 lg:pt-10">
      <div className="mx-auto">
        <div className="mb-4 flex justify-center">
          <h1 className="inline-flex rounded-full border border-(--color-primary-200) bg-(--color-primary-100) px-3 py-1 text-[14px] font-semibold tracking-normal text-(--color-primary-900) md:text-[15px]">
            Category
          </h1>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search categories..."
            className="sm:max-w-sm"
          />
          <SortSelect
            options={SORT_OPTIONS}
            value={sortValue}
            onChange={setSort}
          />
        </div>

        <div className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-4 shadow-[0_24px_60px_rgba(17,17,17,0.06)] md:p-5 xl:p-6">
          {isError && items.length === 0 ? (
            <p className="py-16 text-center text-sm text-(--color-text-muted)">
              Failed to load categories. Please try again.
            </p>
          ) : isFetching && items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-(--color-primary-100) border-t-(--color-primary)" />
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.12em] text-(--color-text-muted)">
                Loading categories...
              </p>
            </div>
          ) : items.length === 0 && !isFetching ? (
            <p className="py-16 text-center text-sm text-(--color-text-muted)">
              No categories found.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 xl:gap-x-3 xl:gap-y-7">
              {items.map((category) => (
                <Link
                  key={category.id}
                  href={ROUTE_BUILDERS.categoryDetail(category.slug)}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#F7F7F8] transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_rgba(44,95,138,0.14)] sm:h-[94px] sm:w-[94px] md:h-[102px] md:w-[102px]">
                    {resolveImageUrl(category.image_url) ? (
                      <Image
                        src={resolveImageUrl(category.image_url)!}
                        alt={category.name}
                        width={84}
                        height={84}
                        unoptimized
                        className="h-auto w-auto max-h-[68px] max-w-[68px] object-contain sm:max-h-[76px] sm:max-w-[76px] md:max-h-[84px] md:max-w-[84px]"
                      />
                    ) : (
                      <GeneratedImageFallback
                        name={category.name}
                        kind="category"
                        className="h-[68px] w-[68px] rounded-full border sm:h-[76px] sm:w-[76px] md:h-[84px] md:w-[84px]"
                        iconClassName="text-[16px] sm:text-[18px]"
                        textClassName="text-[18px] sm:text-[20px]"
                      />
                    )}
                  </div>
                  <h2 className="mt-3 max-w-[112px] text-[12px] font-semibold leading-[1.18] tracking-[-0.03em] text-(--color-dark) sm:text-[13px] md:max-w-[124px] md:text-[14px]">
                    {category.name}
                  </h2>
                </Link>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 ? (
          <div ref={sentinelRef} className="h-8" aria-hidden />
        ) : null}

        {isLoadingMore ? (
          <div className="mt-6 flex justify-center">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-(--color-primary-100) border-t-(--color-primary)" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
