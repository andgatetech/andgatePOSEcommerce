"use client";

import { useGetStoresQuery } from "@/features/catalog/storeApi";
import { useListQuery } from "@/hooks/useListQuery";
import type { ListQueryParams, PaginatedPayload, Store } from "@/types";
import { useMemo } from "react";
import Container from "@/components/shared/Container";
import ListingFilterBar from "@/components/shared/ListingFilterBar";
import Pagination from "@/components/shared/Pagination";
import StoreCard from "./StoreCard";
import { sameStoreParams, STORE_SORT_OPTIONS } from "./shared/storeListShared";
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
  const { params, search, setSearch, setSort, setPage } = useListQuery({
    defaultPerPage,
    defaultSortField,
    defaultSortDirection,
  });

  const queryParams = useMemo<ListQueryParams>(
    () => ({
      search: params.search,
      page: params.page,
      per_page: params.per_page,
      sort_field: params.sort_field,
      sort_direction: params.sort_direction,
    }),
    [params.search, params.page, params.per_page, params.sort_field, params.sort_direction],
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
  const items = payload?.items ?? [];
  const pagination = payload?.pagination ?? null;
  const sortValue = {
    field: params.sort_field ?? defaultSortField,
    direction: params.sort_direction ?? defaultSortDirection,
  };
  const totalStores = payload?.pagination.total ?? items.length;

  return (
    <section className="bg-(--color-bg-subtle) pb-8 pt-6 md:pb-10 md:pt-8 lg:pb-14 lg:pt-10">
      <Container className="max-w-[1680px]">
        <div className="mb-6 overflow-hidden rounded-lg border border-(--color-border) bg-(--color-bg) shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
          <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
            <div className="px-5 py-6 sm:px-7 md:px-8 lg:py-8">
              <span className="inline-flex rounded-full bg-(--color-primary-50) px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-(--color-primary)">
                Store Directory
              </span>
              <div className="mt-4 max-w-3xl">
                <h1 className="text-3xl font-bold leading-tight tracking-normal text-(--color-dark) md:text-4xl">
                  Shop trusted local storefronts
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-(--color-text-muted) md:text-base">
                  Browse sellers, compare locations, and jump into each storefront to discover products ready for checkout.
                </p>
              </div>
            </div>
            <div className="border-t border-(--color-border) bg-[linear-gradient(135deg,var(--color-primary-900),var(--color-primary))] p-5 text-white lg:border-l lg:border-t-0">
              <div className="grid h-full grid-cols-3 gap-3 lg:grid-cols-1">
                <div className="rounded-lg bg-white/12 p-4 backdrop-blur">
                  <p className="text-2xl font-bold leading-none">{totalStores}</p>
                  <p className="mt-1 text-xs font-medium text-white/78">Stores listed</p>
                </div>
                <div className="rounded-lg bg-white/12 p-4 backdrop-blur">
                  <p className="text-2xl font-bold leading-none">{items.length}</p>
                  <p className="mt-1 text-xs font-medium text-white/78">Visible now</p>
                </div>
                <div className="rounded-lg bg-white/12 p-4 backdrop-blur">
                  <p className="text-2xl font-bold leading-none">24/7</p>
                  <p className="mt-1 text-xs font-medium text-white/78">Online browsing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ListingFilterBar
          title="Find the right store"
          subtitle="Search seller names, then sort by name, newest, or location."
          search={search}
          searchPlaceholder="Search stores..."
          sortOptions={STORE_SORT_OPTIONS}
          sortValue={sortValue}
          defaultSortValue={{ field: defaultSortField, direction: defaultSortDirection }}
          totalCount={totalStores}
          visibleCount={items.length}
          resultLabel="stores"
          onSearchChange={setSearch}
          onSortChange={setSort}
        />

        {isError && items.length === 0 ? (
          <div className="rounded-lg border border-(--color-border) bg-(--color-bg) px-5 py-16 text-center shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold text-(--color-dark)">Failed to load stores</p>
            <p className="mt-1 text-sm text-(--color-text-muted)">Please try again in a moment.</p>
          </div>
        ) : isFetching && items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-(--color-border) bg-(--color-bg) py-16 shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-(--color-primary-100) border-t-(--color-primary)" />
            <p className="mt-4 text-sm font-medium tracking-[0.12em] text-(--color-text-muted) uppercase">
              Loading stores...
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-lg border border-(--color-border) bg-(--color-bg) px-5 py-16 text-center shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold text-(--color-dark)">No stores found</p>
            <p className="mt-1 text-sm text-(--color-text-muted)">Try a different search term or sort option.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
            {items.map((store) => (
              <StoreCard key={store.id} store={store} view="grid" />
            ))}
          </div>
        )}

        {items.length > 0 ? (
          <Pagination
            pagination={pagination!}
            onPageChange={setPage}
            className="mt-8 rounded-lg border border-(--color-border) bg-(--color-bg) px-4 py-4 shadow-[0_8px_28px_rgba(15,23,42,0.05)]"
          />
        ) : null}
      </Container>

      <ServiceHighlights />
    </section>
  );
}
