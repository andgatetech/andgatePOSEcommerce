import type { ListQueryParams } from "@/types";
import type { SortOption } from "@/components/shared/SortSelect";

export const STORE_DEFAULT_PER_PAGE = 12;
export const STORE_DEFAULT_SORT_FIELD = "store_name";
export const STORE_DEFAULT_SORT_DIRECTION: "asc" | "desc" = "asc";

export const STORE_SORT_OPTIONS: SortOption[] = [
  { label: "Name (A-Z)", field: "store_name", direction: "asc" },
  { label: "Name (Z-A)", field: "store_name", direction: "desc" },
  { label: "Newest", field: "created_at", direction: "desc" },
  { label: "Oldest", field: "created_at", direction: "asc" },
  { label: "Location (A-Z)", field: "store_location", direction: "asc" },
  { label: "Location (Z-A)", field: "store_location", direction: "desc" },
];

export function sameStoreParams(a: ListQueryParams, b: ListQueryParams): boolean {
  return (
    (a.search ?? "") === (b.search ?? "") &&
    (a.page ?? 1) === (b.page ?? 1) &&
    (a.per_page ?? 0) === (b.per_page ?? 0) &&
    (a.sort_field ?? "") === (b.sort_field ?? "") &&
    (a.sort_direction ?? "") === (b.sort_direction ?? "")
  );
}
