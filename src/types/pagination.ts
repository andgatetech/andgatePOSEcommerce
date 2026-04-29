import type { ApiResponse } from "./index";

export interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number | null;
  to: number | null;
  sort_field?: string;
  sort_direction?: "asc" | "desc";
  has_more_pages: boolean;
}

export interface PaginatedPayload<T> {
  items: T[];
  pagination: Pagination;
  filters_applied: Record<string, string | number | null | undefined>;
}

export type PaginatedResponse<T> = ApiResponse<PaginatedPayload<T>>;

export interface ListQueryParams {
  search?: string;
  store?: string;
  sort_field?: string;
  sort_direction?: "asc" | "desc";
  page?: number;
  per_page?: number;
}
