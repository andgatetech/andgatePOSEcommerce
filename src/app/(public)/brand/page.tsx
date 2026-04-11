import { serverFetchJson } from "@/lib/serverFetch";
import type {
  Brand,
  ListQueryParams,
  PaginatedPayload,
  PaginatedResponse,
} from "@/types";
import BrandGallery from "./_components/BrandGallery";

const DEFAULT_PER_PAGE = 20;
const DEFAULT_SORT_FIELD = "name";
const DEFAULT_SORT_DIRECTION: "asc" | "desc" = "asc";

interface BrandPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function readString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function readNumber(value: string | string[] | undefined, fallback: number): number {
  const raw = readString(value);
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export default async function BrandPage({ searchParams }: BrandPageProps) {
  const sp = await searchParams;

  const initialParams: ListQueryParams = {
    search: readString(sp.search) || undefined,
    page: readNumber(sp.page, 1),
    per_page: readNumber(sp.per_page, DEFAULT_PER_PAGE),
    sort_field: readString(sp.sort_field) ?? DEFAULT_SORT_FIELD,
    sort_direction:
      (readString(sp.sort_direction) as "asc" | "desc" | undefined) ?? DEFAULT_SORT_DIRECTION,
  };

  let initialData: PaginatedPayload<Brand> | null = null;
  try {
    const response = await serverFetchJson<PaginatedResponse<Brand>>(
      "/brands",
      initialParams as Record<string, string | number | undefined>,
    );
    initialData = response.data;
  } catch {
    initialData = null;
  }

  return (
    <BrandGallery
      initialData={initialData}
      initialParams={initialParams}
      defaultPerPage={DEFAULT_PER_PAGE}
      defaultSortField={DEFAULT_SORT_FIELD}
      defaultSortDirection={DEFAULT_SORT_DIRECTION}
    />
  );
}
