import { API_ROUTES } from "@/config/apiRoutes";
import { baseApi } from "@/features/api/baseApi";
import type {
  ListQueryParams,
  PaginatedPayload,
  PaginatedResponse,
  Store,
} from "@/types";

export const storeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query<PaginatedPayload<Store>, ListQueryParams>({
      query: (params) => ({
        url: API_ROUTES.ECOMMERCE_CATALOG.STORES,
        params,
      }),
      transformResponse: (response: PaginatedResponse<Store>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Store" as const, id })),
              { type: "Store" as const, id: "LIST" },
            ]
          : [{ type: "Store" as const, id: "LIST" }],
    }),
  }),
});

export const { useGetStoresQuery } = storeApi;
