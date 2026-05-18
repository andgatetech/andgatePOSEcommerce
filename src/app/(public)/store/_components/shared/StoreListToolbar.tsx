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
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search stores..."
          className="w-full md:max-w-md"
        />
      </div>
      <SortSelect
        options={STORE_SORT_OPTIONS}
        value={sortValue}
        onChange={onSortChange}
        className="w-full md:w-auto"
      />
    </div>
  );
}
