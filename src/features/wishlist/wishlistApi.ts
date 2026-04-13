import { baseApi } from "@/features/api/baseApi";
import { API_ROUTES } from "@/config/apiRoutes";
import type { WishlistData, WishlistItemData } from "@/types";

interface WishlistResponse {
  success: boolean;
  message: string;
  data: WishlistData;
}

interface WishlistToggleResponse {
  success: boolean;
  message: string;
  data: { added: boolean };
}

interface WishlistItemResponse {
  success: boolean;
  message: string;
  data: WishlistItemData | null;
}

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<WishlistData, void>({
      query: () => API_ROUTES.ECOMMERCE_WISHLIST.WISHLIST,
      transformResponse: (response: WishlistResponse) => response.data,
      providesTags: ["Wishlist"],
    }),

    toggleWishlist: builder.mutation<WishlistToggleResponse, { stock_id: number }>({
      query: (body) => ({
        url: API_ROUTES.ECOMMERCE_WISHLIST.WISHLIST_TOGGLE,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeWishlistItem: builder.mutation<WishlistItemResponse, number>({
      query: (wishlist_id) => ({
        url: API_ROUTES.ECOMMERCE_WISHLIST.WISHLIST_ITEM(wishlist_id),
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useToggleWishlistMutation,
  useRemoveWishlistItemMutation,
} = wishlistApi;
