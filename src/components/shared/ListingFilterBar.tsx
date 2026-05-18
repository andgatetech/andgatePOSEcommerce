"use client";

import { FiSliders, FiX } from "react-icons/fi";
import SearchInput from "./SearchInput";
import SortSelect, { type SortOption } from "./SortSelect";

type ListingFilterBarProps = {
  title: string;
  subtitle: string;
  search: string;
  searchPlaceholder: string;
  sortOptions: SortOption[];
  sortValue: { field: string; direction: "asc" | "desc" };
  defaultSortValue: { field: string; direction: "asc" | "desc" };
  totalCount: number;
  visibleCount: number;
  resultLabel: string;
  tone?: "primary" | "cta";
  onSearchChange: (value: string) => void;
  onSortChange: (field: string, direction: "asc" | "desc") => void;
};

function encode(value: { field: string; direction: "asc" | "desc" }) {
  return `${value.field}:${value.direction}`;
}

export default function ListingFilterBar({
  title,
  subtitle,
  search,
  searchPlaceholder,
  sortOptions,
  sortValue,
  defaultSortValue,
  totalCount,
  visibleCount,
  resultLabel,
  tone = "primary",
  onSearchChange,
  onSortChange,
}: ListingFilterBarProps) {
  const activeSearch = search.trim();
  const sortLabel = sortOptions.find((option) => encode(option) === encode(sortValue))?.label ?? "Custom";
  const hasCustomSort = encode(sortValue) !== encode(defaultSortValue);
  const hasActiveFilters = activeSearch.length > 0 || hasCustomSort;
  const iconTone =
    tone === "cta"
      ? "bg-(--color-cta-100) text-(--color-cta-dark)"
      : "bg-(--color-primary-50) text-(--color-primary)";

  function resetFilters() {
    onSearchChange("");
    onSortChange(defaultSortValue.field, defaultSortValue.direction);
  }

  return (
    <div className="mb-5 rounded-lg border border-(--color-border) bg-(--color-bg) p-4 shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconTone}`}>
            <FiSliders className="text-lg" />
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-(--color-dark)">{title}</h2>
            <p className="mt-1 text-sm leading-5 text-(--color-text-muted)">{subtitle}</p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[minmax(260px,440px)_180px_auto] md:items-center xl:min-w-[720px]">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            className="w-full"
          />
          <SortSelect
            options={sortOptions}
            value={sortValue}
            onChange={onSortChange}
            className="w-full"
          />
          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-(--color-border) px-4 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary-200) hover:text-(--color-primary) disabled:cursor-not-allowed disabled:opacity-45"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-(--color-border) pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-(--color-text-muted)">
          Showing <span className="font-semibold text-(--color-dark)">{visibleCount}</span> of{" "}
          <span className="font-semibold text-(--color-dark)">{totalCount}</span> {resultLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-(--color-neutral-100) px-3 py-1 text-xs font-semibold text-(--color-neutral-dark)">
            Sort: {sortLabel}
          </span>
          {activeSearch ? (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="inline-flex items-center gap-1.5 rounded-full bg-(--color-primary-50) px-3 py-1 text-xs font-semibold text-(--color-primary) transition hover:bg-(--color-primary-100)"
            >
              Search: {activeSearch}
              <FiX className="text-sm" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
