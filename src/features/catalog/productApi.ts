import { baseApi } from "@/features/api/baseApi";
import { API_ROUTES } from "@/config/apiRoutes";
import type {
  EcommerceProduct,
  ProductListParams,
  PaginatedPayload,
  PaginatedResponse,
  ApiResponse,
} from "@/types";

function cleanParams(
  params: ProductListParams,
): Record<string, string | number> {
  const out: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    out[key] = value as string | number;
  }
  return out;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      PaginatedPayload<EcommerceProduct>,
      ProductListParams
    >({
      query: (params) => ({
        url: API_ROUTES.ECOMMERCE_CATALOG.PRODUCTS,
        params: cleanParams(params),
      }),
      transformResponse: (
        response: PaginatedResponse<EcommerceProduct>,
      ) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "Product" as const, id: "LIST" },
            ]
          : [{ type: "Product" as const, id: "LIST" }],
    }),

    getProductBySlug: builder.query<EcommerceProduct | null, string>({
      query: (slug) => `${API_ROUTES.ECOMMERCE_CATALOG.PRODUCTS}/${slug}`,
      transformResponse: (response: ApiResponse<EcommerceProduct | null>) =>
        response.data,
      providesTags: (result) =>
        result ? [{ type: "Product" as const, id: result.id }] : [],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductBySlugQuery } = productApi;
