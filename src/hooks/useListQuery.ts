"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ListQueryParams } from "@/types";

export interface ExtraListQueryParamConfig {
  key: string;
  type?: "string" | "number";
  defaultValue?: string | number;
}

export interface UseListQueryOptions {
  defaultPerPage?: number;
  defaultSortField?: string;
  defaultSortDirection?: "asc" | "desc";
  searchDebounceMs?: number;
  extraParams?: ExtraListQueryParamConfig[];
}

export interface UseListQueryResult<
  TExtra extends Record<string, string | number | undefined> = Record<
    string,
    string | number | undefined
  >,
> {
  /** Params to pass to the RTK Query hook. Reflects debounced search. */
  params: ListQueryParams & TExtra;
  /** Raw (non-debounced) search input value for controlled <input>. */
  search: string;
  setSearch: (value: string) => void;
  setSort: (field: string, direction: "asc" | "desc") => void;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  extraParams: TExtra;
  setExtraParams: (patch: Partial<TExtra>) => void;
  resetExtraParams: () => void;
}

function readExtraParams(
  searchParams: URLSearchParams,
  configs: ExtraListQueryParamConfig[],
): Record<string, string | number | undefined> {
  const out: Record<string, string | number | undefined> = {};

  configs.forEach(({ key, type = "string", defaultValue }) => {
    const raw = searchParams.get(key);

    if (raw === null || raw === "") {
      out[key] = defaultValue;
      return;
    }

    if (type === "number") {
      const parsed = Number(raw);
      out[key] = Number.isFinite(parsed) ? parsed : defaultValue;
      return;
    }

    out[key] = raw;
  });

  return out;
}

/**
 * Shared list-query state hook.
 *
 * - Syncs `page`, `search`, `sort_field`, `sort_direction`, `per_page` to the URL.
 * - Debounces search before pushing it to the URL.
 * - Resets page to 1 on search/sort change.
 * - Strips default/empty values so the URL stays clean.
 */
export function useListQuery<
  TExtra extends Record<string, string | number | undefined> = Record<
    string,
    string | number | undefined
  >,
>(options: UseListQueryOptions = {}): UseListQueryResult<TExtra> {
  const {
    defaultPerPage = 15,
    defaultSortField = "name",
    defaultSortDirection = "asc",
    searchDebounceMs = 350,
    extraParams: extraParamConfigs = [],
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") ?? "";
  const urlPage = Number(searchParams.get("page") ?? "1") || 1;
  const urlPerPage = Number(searchParams.get("per_page") ?? String(defaultPerPage)) || defaultPerPage;
  const urlSortField = searchParams.get("sort_field") ?? defaultSortField;
  const urlSortDirection =
    (searchParams.get("sort_direction") as "asc" | "desc" | null) ?? defaultSortDirection;
  const urlExtraParams = useMemo(
    () => readExtraParams(searchParams, extraParamConfigs),
    [searchParams, extraParamConfigs],
  );

  // `search` is the raw controlled input value. It's seeded from the URL but
  // diverges from it briefly while the user is typing (debounce window).
  const [search, setSearchState] = useState<string>(urlSearch);
  const didMountRef = useRef(false);

  // Keep local state in sync if URL changes externally (back/forward nav).
  useEffect(() => {
    setSearchState(urlSearch);
  }, [urlSearch]);

  const pushUrl = useCallback(
    (next: {
      search?: string;
      page?: number;
      per_page?: number;
      sort_field?: string;
      sort_direction?: "asc" | "desc";
      extraParams?: Record<string, string | number | undefined>;
    }) => {
      const qs = new URLSearchParams();
      const mergedSearch = next.search ?? urlSearch;
      const mergedPage = next.page ?? urlPage;
      const mergedPerPage = next.per_page ?? urlPerPage;
      const mergedSortField = next.sort_field ?? urlSortField;
      const mergedSortDirection = next.sort_direction ?? urlSortDirection;
      const mergedExtraParams = {
        ...urlExtraParams,
        ...(next.extraParams ?? {}),
      };

      if (mergedSearch) qs.set("search", mergedSearch);
      if (mergedPage > 1) qs.set("page", String(mergedPage));
      if (mergedPerPage !== defaultPerPage) qs.set("per_page", String(mergedPerPage));
      if (mergedSortField !== defaultSortField) qs.set("sort_field", mergedSortField);
      if (mergedSortDirection !== defaultSortDirection)
        qs.set("sort_direction", mergedSortDirection);
      extraParamConfigs.forEach(({ key, defaultValue }) => {
        const value = mergedExtraParams[key];
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          value === defaultValue
        ) {
          return;
        }
        qs.set(key, String(value));
      });

      const query = qs.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [
      router,
      pathname,
      urlSearch,
      urlPage,
      urlPerPage,
      urlSortField,
      urlSortDirection,
      urlExtraParams,
      defaultPerPage,
      defaultSortField,
      defaultSortDirection,
      extraParamConfigs,
    ],
  );

  // Debounce search -> URL. Skip the first mount so hydration doesn't fire a
  // redundant replace().
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (search === urlSearch) return;
    const id = window.setTimeout(() => {
      pushUrl({ search, page: 1 });
    }, searchDebounceMs);
    return () => window.clearTimeout(id);
  }, [search, urlSearch, searchDebounceMs, pushUrl]);

  const setSearch = useCallback((value: string) => {
    setSearchState(value);
  }, []);

  const setSort = useCallback(
    (field: string, direction: "asc" | "desc") => {
      pushUrl({ sort_field: field, sort_direction: direction, page: 1 });
    },
    [pushUrl],
  );

  const setPage = useCallback(
    (page: number) => {
      pushUrl({ page });
    },
    [pushUrl],
  );

  const setPerPage = useCallback(
    (perPage: number) => {
      pushUrl({ per_page: perPage, page: 1 });
    },
    [pushUrl],
  );

  const setExtraParams = useCallback(
    (patch: Partial<TExtra>) => {
      pushUrl({
        page: 1,
        extraParams: patch as Record<string, string | number | undefined>,
      });
    },
    [pushUrl],
  );

  const resetExtraParams = useCallback(() => {
    const cleared = Object.fromEntries(
      extraParamConfigs.map(({ key, defaultValue }) => [key, defaultValue]),
    ) as Record<string, string | number | undefined>;
    pushUrl({ page: 1, extraParams: cleared });
  }, [extraParamConfigs, pushUrl]);

  const params = useMemo<ListQueryParams & TExtra>(
    () => ({
      search: urlSearch || undefined,
      page: urlPage,
      per_page: urlPerPage,
      sort_field: urlSortField,
      sort_direction: urlSortDirection,
      ...(urlExtraParams as TExtra),
    }),
    [urlSearch, urlPage, urlPerPage, urlSortField, urlSortDirection, urlExtraParams],
  );

  return {
    params,
    search,
    setSearch,
    setSort,
    setPage,
    setPerPage,
    extraParams: urlExtraParams as TExtra,
    setExtraParams,
    resetExtraParams,
  };
}
