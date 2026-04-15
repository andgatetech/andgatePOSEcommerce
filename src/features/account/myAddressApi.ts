import { API_ROUTES } from "@/config/apiRoutes";
import { baseApi } from "@/features/api/baseApi";
import type { ApiResponse, EcommerceOrderShippingAddress, MyAddressData } from "@/types";

type MyAddressResponse = ApiResponse<MyAddressData>;

export const myAddressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAddress: builder.query<MyAddressData, void>({
      query: () => API_ROUTES.ECOMMERCE_ACCOUNT.MY_ADDRESS,
      transformResponse: (response: MyAddressResponse) => response.data,
      providesTags: [{ type: "MyAddress", id: "DEFAULT" }],
    }),

    updateMyAddress: builder.mutation<
      MyAddressData,
      { shipping_address: EcommerceOrderShippingAddress }
    >({
      query: (body) => ({
        url: API_ROUTES.ECOMMERCE_ACCOUNT.MY_ADDRESS,
        method: "PUT",
        body,
      }),
      transformResponse: (response: MyAddressResponse) => response.data,
      invalidatesTags: [{ type: "MyAddress", id: "DEFAULT" }],
    }),
  }),
});

export const { useGetMyAddressQuery, useUpdateMyAddressMutation } = myAddressApi;
