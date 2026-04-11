"use client";

import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchInputProps) {
  return (
    <div
      className={`flex h-11 items-center gap-2 rounded-full border border-(--color-border) bg-(--color-bg) px-4 shadow-[0_4px_14px_rgba(17,17,17,0.04)] focus-within:border-(--color-primary-200) ${className}`}
    >
      <FiSearch className="text-base text-(--color-text-muted)" aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-full w-full bg-transparent text-sm text-(--color-dark) outline-none placeholder:text-(--color-text-muted)"
      />
    </div>
  );
}
