"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { Pagination as PaginationType } from "@/types";

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
  className?: string;
}

/** Build a compact page list: 1 ... (n-1) n (n+1) ... last */
function buildPages(current: number, last: number): (number | "...")[] {
  if (last <= 7) {
    return Array.from({ length: last }, (_, i) => i + 1);
  }
  const pages: (number | "...")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(last - 1, current + 1);
  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < last - 1) pages.push("...");
  pages.push(last);
  return pages;
}

export default function Pagination({
  pagination,
  onPageChange,
  className = "",
}: PaginationProps) {
  const { current_page, last_page, has_more_pages } = pagination;

  if (last_page <= 1) return null;

  const pages = buildPages(current_page, last_page);
  const canPrev = current_page > 1;
  const canNext = has_more_pages;

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-center gap-1.5 ${className}`}
    >
      <button
        type="button"
        onClick={() => canPrev && onPageChange(current_page - 1)}
        disabled={!canPrev}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-(--color-border) text-(--color-dark) transition disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:border-(--color-primary-200) hover:enabled:text-(--color-primary)"
        aria-label="Previous page"
      >
        <FiChevronLeft />
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-1.5 text-sm text-(--color-text-muted)"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === current_page ? "page" : undefined}
            className={`flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-semibold transition ${
              page === current_page
                ? "bg-(--color-primary) text-white"
                : "border border-(--color-border) text-(--color-dark) hover:border-(--color-primary-200) hover:text-(--color-primary)"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => canNext && onPageChange(current_page + 1)}
        disabled={!canNext}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-(--color-border) text-(--color-dark) transition disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:border-(--color-primary-200) hover:enabled:text-(--color-primary)"
        aria-label="Next page"
      >
        <FiChevronRight />
      </button>
    </nav>
  );
}
