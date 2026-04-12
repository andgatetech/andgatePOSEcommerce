"use client";

import type { Brand, Category } from "@/types";

interface ProductFiltersSidebarProps {
  categories: Category[];
  brands: Brand[];
  selectedCategory?: string;
  selectedBrand?: string;
  minPrice?: number;
  maxPrice?: number;
  activeFilterCount: number;
  onCategoryChange: (value?: string) => void;
  onBrandChange: (value?: string) => void;
  onMinPriceChange: (value?: number) => void;
  onMaxPriceChange: (value?: number) => void;
  onClear: () => void;
  className?: string;
}

function readNumber(value: string): number | undefined {
  if (!value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export default function ProductFiltersSidebar({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  minPrice,
  maxPrice,
  activeFilterCount,
  onCategoryChange,
  onBrandChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClear,
  className = "",
}: ProductFiltersSidebarProps) {
  return (
    <aside
      className={`rounded-[24px] border border-(--color-border) bg-white p-5 shadow-[0_18px_50px_rgba(19,45,69,0.06)] lg:sticky lg:top-24 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-semibold text-(--color-primary-900)">Filters</h2>
        </div>
        <button
          type="button"
          onClick={onClear}
          disabled={activeFilterCount === 0}
          className="rounded-full border border-(--color-border) px-3 py-1.5 text-xs font-semibold text-(--color-primary-900) transition hover:border-(--color-primary-200) hover:text-(--color-primary) disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear all
        </button>
      </div>

      <div className="mt-6 space-y-6">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-(--color-primary-900)">
              Category
            </h3>
          </div>
          <div className="max-h-[260px] space-y-2 overflow-y-auto pr-1">
            {categories.map((category) => {
              const checked = selectedCategory === category.slug;
              return (
                <label
                  key={category.id}
                  className="flex cursor-pointer items-center gap-3 rounded-[14px] border border-transparent px-3 py-2 transition hover:border-(--color-primary-100) hover:bg-(--color-primary-100)"
                >
                  <input
                    type="radio"
                    name="product-category"
                    checked={checked}
                    onChange={() => onCategoryChange(category.slug)}
                    className="h-4 w-4 accent-[var(--color-primary)]"
                  />
                  <span className="text-sm text-(--color-dark)">{category.name}</span>
                </label>
              );
            })}
          </div>
          {selectedCategory ? (
            <button
              type="button"
              onClick={() => onCategoryChange(undefined)}
              className="mt-3 text-xs font-semibold text-(--color-primary) transition hover:opacity-75"
            >
              Remove category
            </button>
          ) : null}
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-(--color-primary-900)">
              Brand
            </h3>
          </div>
          <div className="max-h-[260px] space-y-2 overflow-y-auto pr-1">
            {brands.map((brand) => {
              const checked = selectedBrand === brand.slug;
              return (
                <label
                  key={brand.id}
                  className="flex cursor-pointer items-center gap-3 rounded-[14px] border border-transparent px-3 py-2 transition hover:border-(--color-primary-100) hover:bg-(--color-primary-100)"
                >
                  <input
                    type="radio"
                    name="product-brand"
                    checked={checked}
                    onChange={() => onBrandChange(brand.slug)}
                    className="h-4 w-4 accent-[var(--color-primary)]"
                  />
                  <span className="text-sm text-(--color-dark)">{brand.name}</span>
                </label>
              );
            })}
          </div>
          {selectedBrand ? (
            <button
              type="button"
              onClick={() => onBrandChange(undefined)}
              className="mt-3 text-xs font-semibold text-(--color-primary) transition hover:opacity-75"
            >
              Remove brand
            </button>
          ) : null}
        </section>

        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-(--color-primary-900)">
            Price Range
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-2 block text-xs font-medium text-(--color-text-muted)">Min</span>
              <input
                type="number"
                min="0"
                value={minPrice ?? ""}
                onChange={(e) => onMinPriceChange(readNumber(e.target.value))}
                placeholder="0"
                className="h-11 w-full rounded-[14px] border border-(--color-border) px-3 text-sm text-(--color-dark) outline-none focus:border-(--color-primary-200)"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-medium text-(--color-text-muted)">Max</span>
              <input
                type="number"
                min="0"
                value={maxPrice ?? ""}
                onChange={(e) => onMaxPriceChange(readNumber(e.target.value))}
                placeholder="50000"
                className="h-11 w-full rounded-[14px] border border-(--color-border) px-3 text-sm text-(--color-dark) outline-none focus:border-(--color-primary-200)"
              />
            </label>
          </div>
        </section>
      </div>
    </aside>
  );
}
