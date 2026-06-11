"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { useGetCategoriesQuery } from "@/features/catalog/categoryApi";
import { useListQuery } from "@/hooks/useListQuery";
import Container from "@/components/shared/Container";
import GeneratedImageFallback from "@/components/shared/GeneratedImageFallback";
import { DirectoryGridSkeleton } from "@/components/shared/Skeletons";
import ListingFilterBar from "@/components/shared/ListingFilterBar";
import Pagination from "@/components/shared/Pagination";
import type { SortOption } from "@/components/shared/SortSelect";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import { ROUTE_BUILDERS } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import type { Category, ListQueryParams, PaginatedPayload } from "@/types";

const SORT_OPTIONS: SortOption[] = [
  { label: "Name (A-Z)", field: "name", direction: "asc" },
  { label: "Name (Z-A)", field: "name", direction: "desc" },
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
    () => sameParams(queryParams, initialParams),
    [queryParams, initialParams],
  );

  const { currentData, isFetching, isError } = useGetCategoriesQuery(queryParams, {
    skip: isInitial && initialData !== null,
  });

  const payload: PaginatedPayload<Category> | null =
    isInitial && initialData ? initialData : (currentData ?? null);
  const items = payload?.items ?? [];
  const pagination = payload?.pagination ?? null;
  const totalCategories = pagination?.total ?? items.length;
  const sortValue = {
    field: params.sort_field ?? defaultSortField,
    direction: params.sort_direction ?? defaultSortDirection,
  };

  return (
    <section className="bg-(--color-bg-subtle) pb-8 pt-6 md:pb-10 md:pt-8 lg:pb-14 lg:pt-10">
      <Container className="max-w-[1680px]">
        <div className="mb-6 overflow-hidden rounded-lg border border-(--color-border) bg-(--color-bg) shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
          <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
            <div className="px-5 py-6 sm:px-7 md:px-8 lg:py-8">
              <span className="inline-flex rounded-full bg-(--color-primary-50) px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-(--color-primary)">
                Category Directory
              </span>
              <div className="mt-4 max-w-3xl">
                <h1 className="text-3xl font-bold leading-tight tracking-normal text-(--color-dark) md:text-4xl">
                  Shop products by category
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-(--color-text-muted) md:text-base">
                  Start with the right department, then refine products by brand, price, availability, and faceted options.
                </p>
              </div>
            </div>
            <div className="border-t border-(--color-border) bg-[linear-gradient(135deg,var(--color-primary-900),var(--color-primary))] p-5 text-white lg:border-l lg:border-t-0">
              <div className="grid h-full grid-cols-3 gap-3 lg:grid-cols-1">
                <div className="rounded-lg bg-white/12 p-4 backdrop-blur">
                  <p className="text-2xl font-bold leading-none">{totalCategories}</p>
                  <p className="mt-1 text-xs font-medium text-white/78">Categories listed</p>
                </div>
                <div className="rounded-lg bg-white/12 p-4 backdrop-blur">
                  <p className="text-2xl font-bold leading-none">{items.length}</p>
                  <p className="mt-1 text-xs font-medium text-white/78">Visible now</p>
                </div>
                <div className="rounded-lg bg-white/12 p-4 backdrop-blur">
                  <p className="text-2xl font-bold leading-none">A-Z</p>
                  <p className="mt-1 text-xs font-medium text-white/78">Easy sorting</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ListingFilterBar
          title="Find a category"
          subtitle="Search category names and reorder departments by name or launch date."
          search={search}
          searchPlaceholder="Search categories..."
          sortOptions={SORT_OPTIONS}
          sortValue={sortValue}
          defaultSortValue={{ field: defaultSortField, direction: defaultSortDirection }}
          totalCount={totalCategories}
          visibleCount={items.length}
          resultLabel="categories"
          onSearchChange={setSearch}
          onSortChange={setSort}
        />

        {isError && items.length === 0 ? (
          <div className="rounded-lg border border-(--color-border) bg-(--color-bg) px-5 py-16 text-center shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold text-(--color-dark)">Failed to load categories</p>
            <p className="mt-1 text-sm text-(--color-text-muted)">Please try again in a moment.</p>
          </div>
        ) : isFetching && items.length === 0 ? (
          <DirectoryGridSkeleton kind="category" />
        ) : items.length === 0 && !isFetching ? (
          <div className="rounded-lg border border-(--color-border) bg-(--color-bg) px-5 py-16 text-center shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold text-(--color-dark)">No categories found</p>
            <p className="mt-1 text-sm text-(--color-text-muted)">Try a different search term or sort option.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
            {items.map((category) => (
              <Link
                key={category.id}
                href={ROUTE_BUILDERS.categoryDetail(category.slug)}
                className="group flex min-h-[178px] flex-col rounded-lg border border-(--color-border) bg-(--color-bg) p-4 text-center shadow-[0_8px_28px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-(--color-primary-200) hover:shadow-[0_18px_42px_rgba(15,23,42,0.08)]"
              >
                <div className="flex h-[92px] items-center justify-center rounded-lg bg-[#f7f9fb]">
                  {resolveImageUrl(category.image_url) ? (
                    <Image
                      src={resolveImageUrl(category.image_url)!}
                      alt={category.name}
                      width={92}
                      height={92}
                      className="h-auto w-auto max-h-[72px] max-w-[96px] object-contain transition duration-200 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <GeneratedImageFallback
                      name={category.name}
                      kind="category"
                      className="h-[72px] w-[72px] rounded-lg border"
                      iconClassName="text-[16px]"
                      textClassName="text-[18px]"
                    />
                  )}
                </div>
                <div className="mt-3 flex flex-1 flex-col justify-between">
                  <h2 className="line-clamp-2 text-[13px] font-semibold leading-snug tracking-normal text-(--color-dark) md:text-sm">
                    {category.name}
                  </h2>
                  <span className="mt-3 inline-flex items-center justify-center text-xs font-semibold text-(--color-primary)">
                    View products
                    <FiArrowUpRight className="ml-1.5 text-[14px]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {items.length > 0 && pagination ? (
          <Pagination
            pagination={pagination}
            onPageChange={setPage}
            className="mt-8 rounded-lg border border-(--color-border) bg-(--color-bg) px-4 py-4 shadow-[0_8px_28px_rgba(15,23,42,0.05)]"
          />
        ) : null}
      </Container>
      <ServiceHighlights />
    </section>
  );
}
