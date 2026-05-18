"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
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
  hideHeader?: boolean;
}

function readNumber(value: string): number | undefined {
  if (!value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-(--color-border) last:border-0 py-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between"
        aria-expanded={open}
      >
        <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-(--color-text-muted)">
          {title}
        </h3>
        <FaChevronDown
          className={`text-[10px] text-(--color-text-muted) transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
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
  hideHeader = false,
}: ProductFiltersSidebarProps) {
  return (
    <aside
      className={`filter-scrollbar-none rounded-[24px] border border-(--color-border) bg-white p-5 shadow-[0_18px_50px_rgba(19,45,69,0.06)] ${className}`}
    >
      {!hideHeader && (
        <div className="mb-1 flex items-center justify-between gap-3">
          <h2 className="text-[17px] font-bold text-(--color-primary-900)">Filters</h2>
          <button
            type="button"
            onClick={onClear}
            disabled={activeFilterCount === 0}
            className="rounded-full border border-(--color-border) px-3 py-1.5 text-xs font-semibold text-(--color-primary-900) transition hover:border-(--color-primary-200) hover:text-(--color-primary) disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear all
          </button>
        </div>
      )}

      <FilterSection title="Category" defaultOpen>
        <div className="filter-scrollbar-none max-h-[220px] space-y-0.5 overflow-y-auto">
          {categories.length === 0 ? (
            <p className="px-3 py-2 text-xs text-(--color-text-muted)">No categories available</p>
          ) : (
            categories.map((category) => {
              const checked = selectedCategory === category.slug;
              return (
                <label
                  key={category.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-[10px] px-3 py-2 transition-colors ${
                    checked
                      ? "bg-(--color-primary-100)"
                      : "hover:bg-(--color-primary-50)"
                  }`}
                >
                  <input
                    type="radio"
                    name="product-category"
                    checked={checked}
                    onChange={() => onCategoryChange(category.slug)}
                    onClick={() => { if (checked) onCategoryChange(undefined); }}
                    className="h-4 w-4 flex-shrink-0 accent-(--color-primary)"
                  />
                  <span
                    className={`text-sm leading-tight ${
                      checked
                        ? "font-semibold text-(--color-primary)"
                        : "text-(--color-dark)"
                    }`}
                  >
                    {category.name}
                  </span>
                </label>
              );
            })
          )}
        </div>
      </FilterSection>

      <FilterSection title="Brand" defaultOpen>
        <div className="filter-scrollbar-none max-h-[220px] space-y-0.5 overflow-y-auto">
          {brands.length === 0 ? (
            <p className="px-3 py-2 text-xs text-(--color-text-muted)">No brands available</p>
          ) : (
            brands.map((brand) => {
              const checked = selectedBrand === brand.slug;
              return (
                <label
                  key={brand.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-[10px] px-3 py-2 transition-colors ${
                    checked
                      ? "bg-(--color-primary-100)"
                      : "hover:bg-(--color-primary-50)"
                  }`}
                >
                  <input
                    type="radio"
                    name="product-brand"
                    checked={checked}
                    onChange={() => onBrandChange(brand.slug)}
                    onClick={() => { if (checked) onBrandChange(undefined); }}
                    className="h-4 w-4 flex-shrink-0 accent-(--color-primary)"
                  />
                  <span
                    className={`text-sm leading-tight ${
                      checked
                        ? "font-semibold text-(--color-primary)"
                        : "text-(--color-dark)"
                    }`}
                  >
                    {brand.name}
                  </span>
                </label>
              );
            })
          )}
        </div>
      </FilterSection>

      <FilterSection title="Price Range" defaultOpen>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="mb-1.5 block text-xs font-medium text-(--color-text-muted)">
              Min (৳)
            </span>
            <input
              type="number"
              min="0"
              value={minPrice ?? ""}
              onChange={(e) => onMinPriceChange(readNumber(e.target.value))}
              placeholder="0"
              className="h-10 w-full rounded-[12px] border border-(--color-border) bg-(--color-bg-subtle) px-3 text-sm text-(--color-dark) outline-none transition focus:border-(--color-primary) focus:bg-white"
            />
          </div>
          <div>
            <span className="mb-1.5 block text-xs font-medium text-(--color-text-muted)">
              Max (৳)
            </span>
            <input
              type="number"
              min="0"
              value={maxPrice ?? ""}
              onChange={(e) => onMaxPriceChange(readNumber(e.target.value))}
              placeholder="Any"
              className="h-10 w-full rounded-[12px] border border-(--color-border) bg-(--color-bg-subtle) px-3 text-sm text-(--color-dark) outline-none transition focus:border-(--color-primary) focus:bg-white"
            />
          </div>
        </div>
      </FilterSection>
    </aside>
  );
}
