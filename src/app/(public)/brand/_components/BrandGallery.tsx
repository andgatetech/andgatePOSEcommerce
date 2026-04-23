"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useGetBrandsQuery } from "@/features/catalog/brandApi";
import { useListQuery } from "@/hooks/useListQuery";
import SearchInput from "@/components/shared/SearchInput";
import Pagination from "@/components/shared/Pagination";
import SortSelect, { type SortOption } from "@/components/shared/SortSelect";
import { ROUTE_BUILDERS } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import type { Brand, ListQueryParams, PaginatedPayload } from "@/types";

const SORT_OPTIONS: SortOption[] = [
  { label: "Name (A–Z)", field: "name", direction: "asc" },
  { label: "Name (Z–A)", field: "name", direction: "desc" },
  { label: "Newest", field: "created_at", direction: "desc" },
  { label: "Oldest", field: "created_at", direction: "asc" },
];

interface BrandGalleryProps {
  initialData: PaginatedPayload<Brand> | null;
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

export default function BrandGallery({
  initialData,
  initialParams,
  defaultPerPage,
  defaultSortField,
  defaultSortDirection,
}: BrandGalleryProps) {
  const { params, search, setSearch, setSort, setPage } = useListQuery({
    defaultPerPage,
    defaultSortField,
    defaultSortDirection,
  });

  const isInitial = useMemo(
    () => sameParams(params, initialParams),
    [params, initialParams],
  );

  const { data, isFetching, isError } = useGetBrandsQuery(params, {
    skip: isInitial && initialData !== null,
  });

  const payload: PaginatedPayload<Brand> | null =
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
            Brand
          </h1>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search brands..."
            className="sm:max-w-sm"
          />
          <SortSelect
            options={SORT_OPTIONS}
            value={sortValue}
            onChange={setSort}
          />
        </div>

        <div className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-4 shadow-[0_24px_60px_rgba(17,17,17,0.06)] md:p-5 xl:p-6">
          {isError && !payload ? (
            <p className="py-16 text-center text-sm text-(--color-text-muted)">
              Failed to load brands. Please try again.
            </p>
          ) : items.length === 0 && !isFetching ? (
            <p className="py-16 text-center text-sm text-(--color-text-muted)">
              No brands found.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 xl:gap-x-3 xl:gap-y-7">
              {items.map((brand) => (
                <Link
                  key={brand.id}
                  href={ROUTE_BUILDERS.brandDetail(brand.slug)}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#F7F7F8] transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_rgba(44,95,138,0.14)] sm:h-[94px] sm:w-[94px] md:h-[102px] md:w-[102px]">
                    {resolveImageUrl(brand.image_url) ? (
                      <Image
                        src={resolveImageUrl(brand.image_url)!}
                        alt={brand.name}
                        width={84}
                        height={84}
                        unoptimized
                        className="h-auto w-auto max-h-[68px] max-w-[68px] object-contain sm:max-h-[76px] sm:max-w-[76px] md:max-h-[84px] md:max-w-[84px]"
                      />
                    ) : (
                      <div
                        className="h-[68px] w-[68px] rounded-full bg-[#ECECEE] sm:h-[76px] sm:w-[76px] md:h-[84px] md:w-[84px]"
                        aria-hidden
                      />
                    )}
                  </div>
                  <h2 className="mt-3 max-w-[112px] text-[12px] font-semibold leading-[1.18] tracking-[-0.03em] text-(--color-dark) sm:text-[13px] md:max-w-[124px] md:text-[14px]">
                    {brand.name}
                  </h2>
                </Link>
              ))}
            </div>
          )}
        </div>

        {pagination && (
          <div className="mt-8">
            <Pagination pagination={pagination} onPageChange={setPage} />
          </div>
        )}
      </div>
    </section>
  );
}
