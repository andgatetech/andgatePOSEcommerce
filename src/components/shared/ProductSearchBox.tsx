"use client";

import { ROUTE_BUILDERS, ROUTES } from "@/config/routes";
import { useGetProductsQuery } from "@/features/catalog/productApi";
import { resolveImageUrl } from "@/lib/imageUrl";
import GeneratedImageFallback from "@/components/shared/GeneratedImageFallback";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface ProductSearchBoxProps {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  compact?: boolean;
}

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export default function ProductSearchBox({
  className = "",
  inputClassName = "",
  placeholder = "Search for products",
  compact = false,
}: ProductSearchBoxProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const debouncedQuery = useDebouncedValue(query.trim(), 280);
  const shouldSearch = debouncedQuery.length >= 2;

  const { data, isFetching } = useGetProductsQuery(
    {
      search: debouncedQuery,
      per_page: 6,
      page: 1,
      sort_field: "created_at",
      sort_direction: "desc",
    },
    { skip: !shouldSearch },
  );

  const items = data?.items ?? [];
  const resultHref = query.trim()
    ? `${ROUTES.PRODUCT}?search=${encodeURIComponent(query.trim())}`
    : ROUTES.PRODUCT;
  const showPanel = isOpen && query.trim().length > 0;
  const helperText =
    query.trim().length < 2
      ? "Type at least 2 letters"
      : isFetching
        ? "Searching products..."
        : `${items.length} products found`;

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div
        className={`flex items-center gap-3 rounded-full border border-(--color-border) bg-white ${compact ? "px-4 py-2.5" : "px-5 py-3.5"} shadow-[0_10px_30px_rgba(19,45,69,0.06)] transition`}>
        <FaSearch className="shrink-0 text-(--color-primary)" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          style={{ outline: "none" }}
          className={`min-w-0 flex-1 border-0 bg-transparent text-(--color-dark) outline-none ring-0 shadow-none placeholder:text-(--color-text-muted) ${inputClassName}`}
        />
      </div>

      {showPanel ? (
        <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-40 overflow-hidden rounded-[24px] border border-[rgba(44,95,138,0.14)] bg-white shadow-[0_26px_70px_rgba(17,17,17,0.14)]">
          <div className="flex items-center justify-between border-b border-(--color-border) px-4 py-3">
            <p className="text-xs font-medium text-(--color-text-muted)">
              {helperText}
            </p>
            <Link
              href={resultHref}
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-(--color-primary-100) px-3 py-1.5 text-xs font-semibold text-(--color-primary) transition hover:bg-(--color-primary-200)">
              See more
            </Link>
          </div>

          <div className="max-h-[430px] overflow-y-auto p-3">
            {query.trim().length < 2 ? (
              <div className="px-3 py-5 text-sm text-(--color-text-muted)">
                Type at least 2 letters.
              </div>
            ) : isFetching ? (
              <div className="space-y-3 p-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-[18px] px-3 py-2">
                    <div className="h-14 w-14 animate-pulse rounded-[14px] bg-[#edf2f6]" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 animate-pulse rounded-full bg-[#edf2f6]" />
                      <div className="h-3 w-1/2 animate-pulse rounded-full bg-[#edf2f6]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : items.length > 0 ? (
              <div className="space-y-2">
                {items.map((product) => {
                  const image = resolveImageUrl(product.images[0]?.url ?? null);
                  const price = Number(product.price).toLocaleString("en-BD");

                  return (
                    <Link
                      key={product.id}
                      href={ROUTE_BUILDERS.productDetail(product.slug)}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-[18px] px-3 py-3 transition hover:bg-(--color-primary-100)">
                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,var(--color-primary-100),#ffffff)]">
                        {image ? (
                          <Image
                            src={image}
                            alt={product.product_name}
                            fill
                            unoptimized
                            className="object-contain p-2.5"
                          />
                        ) : (
                          <GeneratedImageFallback
                            name={product.product_name}
                            kind="product"
                            className="h-full w-full border-0"
                            iconClassName="text-[12px]"
                            textClassName="text-[16px]"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-(--color-primary-900)">
                          {product.product_name}
                        </p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-(--color-text-muted)">
                          <span className="truncate">
                            {product.category?.name ?? "Uncategorized"}
                          </span>
                          <span>&bull;</span>
                          <span className="font-semibold text-(--color-primary)">
                            ৳{price}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="px-3 py-5 text-sm text-(--color-text-muted)">
                No products found.
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
