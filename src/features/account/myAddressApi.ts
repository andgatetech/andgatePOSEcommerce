import { API_ROUTES } from "@/config/apiRoutes";
import { baseApi } from "@/features/api/baseApi";
import type { ApiResponse, EcommerceAddressPayload, EcommerceSavedAddress, MyAddressData } from "@/types";

type MyAddressResponse = ApiResponse<MyAddressData>;
type MyAddressItemResponse = ApiResponse<{ address: EcommerceSavedAddress }>;

export const myAddressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAddresses: builder.query<MyAddressData, void>({
      query: () => API_ROUTES.ECOMMERCE_ACCOUNT.MY_ADDRESS,
      transformResponse: (response: MyAddressResponse) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.addresses.map((address) => ({ type: "MyAddress" as const, id: address.id })),
              { type: "MyAddress" as const, id: "LIST" },
            ]
          : [{ type: "MyAddress" as const, id: "LIST" }],
    }),

    createMyAddress: builder.mutation<EcommerceSavedAddress, EcommerceAddressPayload>({
      query: (body) => ({
        url: API_ROUTES.ECOMMERCE_ACCOUNT.MY_ADDRESS,
        method: "POST",
        body,
      }),
      transformResponse: (response: MyAddressItemResponse) => response.data.address,
      invalidatesTags: [{ type: "MyAddress", id: "LIST" }],
    }),

    updateMyAddress: builder.mutation<
      EcommerceSavedAddress,
      { id: number; address: Partial<EcommerceAddressPayload> }
    >({
      query: ({ id, address }) => ({
        url: `${API_ROUTES.ECOMMERCE_ACCOUNT.MY_ADDRESS}/${id}`,
        method: "PUT",
        body: address,
      }),
      transformResponse: (response: MyAddressItemResponse) => response.data.address,
      invalidatesTags: (_result, _error, { id }) => [
        { type: "MyAddress", id },
        { type: "MyAddress", id: "LIST" },
      ],
    }),

    setDefaultMyAddress: builder.mutation<EcommerceSavedAddress, number>({
      query: (id) => ({
        url: `${API_ROUTES.ECOMMERCE_ACCOUNT.MY_ADDRESS}/${id}/default`,
        method: "PATCH",
      }),
      transformResponse: (response: MyAddressItemResponse) => response.data.address,
      invalidatesTags: (_result, _error, id) => [
        { type: "MyAddress", id },
        { type: "MyAddress", id: "LIST" },
      ],
    }),

    deleteMyAddress: builder.mutation<null, number>({
      query: (id) => ({
        url: `${API_ROUTES.ECOMMERCE_ACCOUNT.MY_ADDRESS}/${id}`,
        method: "DELETE",
      }),
      transformResponse: () => null,
      invalidatesTags: (_result, _error, id) => [
        { type: "MyAddress", id },
        { type: "MyAddress", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateMyAddressMutation,
  useDeleteMyAddressMutation,
  useGetMyAddressesQuery,
  useSetDefaultMyAddressMutation,
  useUpdateMyAddressMutation,
} = myAddressApi;
