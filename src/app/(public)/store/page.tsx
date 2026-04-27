import type { Metadata } from "next";
import StoreListPageContent from "./_components/StoreListPageContent";
import {
  STORE_DEFAULT_PER_PAGE,
  STORE_DEFAULT_SORT_DIRECTION,
  STORE_DEFAULT_SORT_FIELD,
} from "./_components/shared/storeListShared";
import { serverFetchJson } from "@/lib/serverFetch";
import type { ListQueryParams, PaginatedPayload, PaginatedResponse, Store } from "@/types";

export const metadata: Metadata = {
  title: "Store",
  description: "Browse stores selling on Hawkeri.",
};

interface StorePageProps {
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

export default async function StorePage({ searchParams }: StorePageProps) {
  const sp = await searchParams;

  const initialParams: ListQueryParams = {
    search: readString(sp.search) || undefined,
    page: 1,
    per_page: readNumber(sp.per_page, STORE_DEFAULT_PER_PAGE),
    sort_field: readString(sp.sort_field) ?? STORE_DEFAULT_SORT_FIELD,
    sort_direction:
      (readString(sp.sort_direction) as "asc" | "desc" | undefined) ?? STORE_DEFAULT_SORT_DIRECTION,
  };

  let initialData: PaginatedPayload<Store> | null = null;
  try {
    const response = await serverFetchJson<PaginatedResponse<Store>>(
      "/stores",
      initialParams as Record<string, string | number | undefined>,
    );
    initialData = response.data;
  } catch {
    initialData = null;
  }

  return (
    <StoreListPageContent
      initialData={initialData}
      initialParams={initialParams}
      defaultPerPage={STORE_DEFAULT_PER_PAGE}
      defaultSortField={STORE_DEFAULT_SORT_FIELD}
      defaultSortDirection={STORE_DEFAULT_SORT_DIRECTION}
    />
  );
}
