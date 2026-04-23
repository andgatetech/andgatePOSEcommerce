"use client";

import { useMemo } from "react";
import StoreCard from "./StoreCard";
import StoreListToolbar from "./shared/StoreListToolbar";
import { sameStoreParams } from "./shared/storeListShared";
import Pagination from "@/components/shared/Pagination";
import { useGetStoresQuery } from "@/features/catalog/storeApi";
import { useListQuery } from "@/hooks/useListQuery";
import type { ListQueryParams, PaginatedPayload, Store } from "@/types";

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

  const isInitial = useMemo(
    () => sameStoreParams(params, initialParams),
    [params, initialParams],
  );

  const { data, isFetching, isError } = useGetStoresQuery(params, {
    skip: isInitial && initialData !== null,
  });

  const payload: PaginatedPayload<Store> | null =
    isInitial && initialData ? initialData : (data ?? null);

  const items = payload?.items ?? [];
  const pagination = payload?.pagination;
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

        {isError && !payload ? (
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

        {pagination && (
          <div className="mt-8">
            <Pagination pagination={pagination} onPageChange={setPage} />
          </div>
        )}
      </div>
    </section>
  );
}
