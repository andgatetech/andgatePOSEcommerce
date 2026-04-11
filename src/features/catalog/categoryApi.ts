import { baseApi } from "@/features/api/baseApi";
import { API_ROUTES } from "@/config/apiRoutes";
import type {
  Category,
  ListQueryParams,
  PaginatedPayload,
  PaginatedResponse,
} from "@/types";

function cleanParams(params: ListQueryParams): Record<string, string | number> {
  const out: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    out[key] = value as string | number;
  }
  return out;
}

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<PaginatedPayload<Category>, ListQueryParams>({
      query: (params) => ({
        url: API_ROUTES.ECOMMERCE_CATALOG.CATEGORIES,
        params: cleanParams(params),
      }),
      transformResponse: (response: PaginatedResponse<Category>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Category" as const, id })),
              { type: "Category" as const, id: "LIST" },
            ]
          : [{ type: "Category" as const, id: "LIST" }],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
