"use client";

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { PaginatedPayload, Pagination } from "@/types";

type ItemId = string | number;

interface IdentifiableItem {
  id: ItemId;
}

interface InfiniteItemState<TItem> {
  queryKey: string;
  items: TItem[];
  pagination: Pagination | null;
}

interface UseInfinitePaginatedItemsOptions<TItem extends IdentifiableItem> {
  payload: PaginatedPayload<TItem> | null;
  queryKey: string;
  isFetching: boolean;
  setPage: Dispatch<SetStateAction<number>>;
  rootMargin?: string;
}

export function buildInfiniteQueryKey(params: object): string {
  const query = new URLSearchParams();

  (Object.entries(params) as [string, unknown][])
    .sort(([left], [right]) => left.localeCompare(right))
    .forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      query.set(key, String(value));
    });

  return query.toString();
}

export function useInfinitePage(queryKey: string): [
  number,
  Dispatch<SetStateAction<number>>,
] {
  const [state, setState] = useState({ queryKey, page: 1 });
  const page = state.queryKey === queryKey ? state.page : 1;

  useEffect(() => {
    if (state.queryKey !== queryKey) {
      setState({ queryKey, page: 1 });
    }
  }, [queryKey, state.queryKey]);

  const setPage = useCallback<Dispatch<SetStateAction<number>>>(
    (nextPage) => {
      setState((previous) => {
        const currentPage = previous.queryKey === queryKey ? previous.page : 1;
        const resolvedPage =
          typeof nextPage === "function" ? nextPage(currentPage) : nextPage;

        return {
          queryKey,
          page: Math.max(1, resolvedPage),
        };
      });
    },
    [queryKey],
  );

  return [page, setPage];
}

export function useInfinitePaginatedItems<TItem extends IdentifiableItem>({
  payload,
  queryKey,
  isFetching,
  setPage,
  rootMargin = "480px 0px",
}: UseInfinitePaginatedItemsOptions<TItem>) {
  const [state, setState] = useState<InfiniteItemState<TItem>>({
    queryKey,
    items: [],
    pagination: null,
  });
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isCurrentQuery = state.queryKey === queryKey;
  const items = isCurrentQuery ? state.items : [];
  const pagination = isCurrentQuery ? state.pagination : null;
  const hasMore = Boolean(pagination?.has_more_pages);

  useEffect(() => {
    if (!isCurrentQuery) {
      setState({ queryKey, items: [], pagination: null });
    }
  }, [isCurrentQuery, queryKey]);

  useEffect(() => {
    if (!payload) return;

    setState((previous) => {
      const previousItems = previous.queryKey === queryKey ? previous.items : [];
      const baseItems =
        payload.pagination.current_page <= 1 ? [] : previousItems;
      const seenIds = new Set(baseItems.map((item) => item.id));
      const nextItems = [...baseItems];

      payload.items.forEach((item) => {
        if (seenIds.has(item.id)) return;
        seenIds.add(item.id);
        nextItems.push(item);
      });

      return {
        queryKey,
        items: nextItems,
        pagination: payload.pagination,
      };
    });
  }, [payload, queryKey]);

  const loadNextPage = useCallback(() => {
    if (isFetching || !pagination?.has_more_pages) return;

    const nextPage = pagination.current_page + 1;
    setPage((currentPage) =>
      currentPage >= nextPage ? currentPage : nextPage,
    );
  }, [isFetching, pagination, setPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !hasMore || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadNextPage();
        }
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadNextPage, rootMargin]);

  return {
    items,
    pagination,
    hasMore,
    sentinelRef,
    isLoadingMore: isFetching && items.length > 0,
  };
}
