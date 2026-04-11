"use client";

import SearchInput from "@/components/shared/SearchInput";
import SortSelect from "@/components/shared/SortSelect";
import { STORE_SORT_OPTIONS } from "./storeListShared";

interface StoreListToolbarProps {
  search: string;
  sortValue: { field: string; direction: "asc" | "desc" };
  onSearchChange: (value: string) => void;
  onSortChange: (field: string, direction: "asc" | "desc") => void;
}

export default function StoreListToolbar({
  search,
  sortValue,
  onSearchChange,
  onSortChange,
}: StoreListToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between w-full">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search stores..."
          className="sm:max-w-sm"
        />
        <SortSelect
          options={STORE_SORT_OPTIONS}
          value={sortValue}
          onChange={onSortChange}
        />
      </div>
    </div>
  );
}
