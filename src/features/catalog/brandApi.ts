import { baseApi } from "@/features/api/baseApi";
import { API_ROUTES } from "@/config/apiRoutes";
import type {
  Brand,
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

export const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<PaginatedPayload<Brand>, ListQueryParams>({
      query: (params) => ({
        url: API_ROUTES.ECOMMERCE_CATALOG.BRANDS,
        params: cleanParams(params),
      }),
      transformResponse: (response: PaginatedResponse<Brand>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Brand" as const, id })),
              { type: "Brand" as const, id: "LIST" },
            ]
          : [{ type: "Brand" as const, id: "LIST" }],
    }),
  }),
});

export const { useGetBrandsQuery } = brandApi;
