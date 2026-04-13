import { baseApi } from "@/features/api/baseApi";
import { API_ROUTES } from "@/config/apiRoutes";
import type { CartData, CartItemData } from "@/types";

interface CartResponse {
  success: boolean;
  message: string;
  data: CartData;
}

interface CartItemResponse {
  success: boolean;
  message: string;
  data: CartItemData | null;
}

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartData, void>({
      query: () => API_ROUTES.ECOMMERCE_CART.CART,
      transformResponse: (response: CartResponse) => response.data,
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation<CartItemResponse, { stock_id: number }>({
      query: (body) => ({
        url: API_ROUTES.ECOMMERCE_CART.CART,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation<CartItemResponse, { cart_id: number; quantity: number }>({
      query: ({ cart_id, quantity }) => ({
        url: API_ROUTES.ECOMMERCE_CART.CART_ITEM(cart_id),
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    removeCartItem: builder.mutation<CartItemResponse, number>({
      query: (cart_id) => ({
        url: API_ROUTES.ECOMMERCE_CART.CART_ITEM(cart_id),
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation<{ success: boolean; message: string; data: null }, void>({
      query: () => ({
        url: API_ROUTES.ECOMMERCE_CART.CART_CLEAR,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApi;
