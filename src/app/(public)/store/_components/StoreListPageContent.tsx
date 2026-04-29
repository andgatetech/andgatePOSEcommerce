"use client";

import { useGetStoresQuery } from "@/features/catalog/storeApi";
import {
  buildInfiniteQueryKey,
  useInfinitePage,
  useInfinitePaginatedItems,
} from "@/hooks/useInfinitePaginatedItems";
import { useListQuery } from "@/hooks/useListQuery";
import type { ListQueryParams, PaginatedPayload, Store } from "@/types";
import { useMemo } from "react";
import StoreCard from "./StoreCard";
import StoreListToolbar from "./shared/StoreListToolbar";
import { sameStoreParams } from "./shared/storeListShared";
import ServiceHighlights from "@/components/home/ServiceHighlights";

interface StoreListPageContentProps {
  initialData: PaginatedPayload<Store> | null;
  initialParams: ListQueryParams;
  defaultPerPage: number;
  defaultSortField: string;
  defaultSortDirection: "asc" | "desc";
}

export default function StoreListPageContent({
  initialData,
  initialParams,
  defaultPerPage,
  defaultSortField,
  defaultSortDirection,
}: StoreListPageContentProps) {
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
    [params.search, params.per_page, params.sort_field, params.sort_direction],
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

  const isInitial = useMemo(
    () => sameStoreParams(queryParams, initialParams),
    [queryParams, initialParams],
  );

  const { currentData, isFetching, isError } = useGetStoresQuery(queryParams, {
    skip: isInitial && initialData !== null,
  });

  const payload: PaginatedPayload<Store> | null =
    isInitial && initialData ? initialData : (currentData ?? null);

  const { items, sentinelRef, isLoadingMore } = useInfinitePaginatedItems({
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
            Store
          </h1>
        </div>

        <StoreListToolbar
          search={search}
          sortValue={sortValue}
          onSearchChange={setSearch}
          onSortChange={setSort}
        />

        {isError && items.length === 0 ? (
          <p className="py-16 text-center text-sm text-(--color-text-muted)">
            Failed to load stores. Please try again.
          </p>
        ) : isFetching && items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-(--color-primary-100) border-t-(--color-primary)" />
            <p className="mt-4 text-sm font-medium tracking-[0.12em] text-(--color-text-muted) uppercase">
              Loading stores...
            </p>
          </div>
        ) : items.length === 0 ? (
          <p className="py-16 text-center text-sm text-(--color-text-muted)">
            No stores found.
          </p>
        ) : (
          <div className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-4 shadow-[0_24px_60px_rgba(17,17,17,0.06)] md:p-5 xl:p-6">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
              {items.map((store) => (
                <StoreCard key={store.id} store={store} view="grid" />
              ))}
            </div>
          </div>
        )}

        {items.length > 0 ? (
          <div ref={sentinelRef} className="h-8" aria-hidden />
        ) : null}

        {isLoadingMore ? (
          <div className="mt-6 flex justify-center">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-(--color-primary-100) border-t-(--color-primary)" />
          </div>
        ) : null}
      </div>

      <ServiceHighlights />
    </section>
  );
}
