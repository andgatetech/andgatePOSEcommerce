import { API_ROUTES } from "@/config/apiRoutes";
import { baseApi } from "@/features/api/baseApi";
import type {
  ApiResponse,
  MyAccountData,
  UpdateMyAccountRequest,
} from "@/types";

type MyAccountResponse = ApiResponse<MyAccountData>;

export const myAccountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAccount: builder.query<MyAccountData, void>({
      query: () => API_ROUTES.ECOMMERCE_ACCOUNT.MY_ACCOUNT,
      transformResponse: (response: MyAccountResponse) => response.data,
      providesTags: [{ type: "User", id: "ME" }],
    }),

    updateMyAccount: builder.mutation<MyAccountData, UpdateMyAccountRequest>({
      query: (body) => ({
        url: API_ROUTES.ECOMMERCE_ACCOUNT.MY_ACCOUNT,
        method: "PUT",
        body,
      }),
      transformResponse: (response: MyAccountResponse) => response.data,
      invalidatesTags: [{ type: "User", id: "ME" }],
    }),
  }),
});

export const { useGetMyAccountQuery, useUpdateMyAccountMutation } = myAccountApi;
