import { API_ROUTES } from "@/config/apiRoutes";
import { baseApi } from "@/features/api/baseApi";
import type { ApiResponse, EcommerceOrderTrackingData } from "@/types";

type OrderTrackingResponse = ApiResponse<EcommerceOrderTrackingData>;

export const orderTrackingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderTracking: builder.query<EcommerceOrderTrackingData, string>({
      query: (orderNumber) => API_ROUTES.ECOMMERCE_ORDERS.ORDER_TRACKING(orderNumber),
      transformResponse: (response: OrderTrackingResponse) => response.data,
    }),
  }),
});

export const { useLazyGetOrderTrackingQuery } = orderTrackingApi;
