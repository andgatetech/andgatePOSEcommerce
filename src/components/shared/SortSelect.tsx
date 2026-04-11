"use client";

export interface SortOption {
  label: string;
  field: string;
  direction: "asc" | "desc";
}

interface SortSelectProps {
  options: SortOption[];
  value: { field: string; direction: "asc" | "desc" };
  onChange: (field: string, direction: "asc" | "desc") => void;
  className?: string;
}

/** Encodes field+direction into a single option value (`field:direction`). */
function encode(option: { field: string; direction: "asc" | "desc" }): string {
  return `${option.field}:${option.direction}`;
}

export default function SortSelect({
  options,
  value,
  onChange,
  className = "",
}: SortSelectProps) {
  const current = encode(value);

  return (
    <select
      value={current}
      onChange={(e) => {
        const [field, direction] = e.target.value.split(":") as [string, "asc" | "desc"];
        onChange(field, direction);
      }}
      className={`h-11 rounded-full border border-(--color-border) bg-(--color-bg) px-4 text-sm text-(--color-dark) outline-none focus:border-(--color-primary-200) ${className}`}
      aria-label="Sort"
    >
      {options.map((option) => (
        <option key={encode(option)} value={encode(option)}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
