import { API_ROUTES } from "@/config/apiRoutes";
import { baseApi } from "@/features/api/baseApi";
import type {
  ApiResponse,
  CreateOrderRequest,
  EcommerceOrder,
  EcommerceOrderListData,
  OrderMutationResult,
} from "@/types";

export interface GetOrdersParams {
  page?: number;
}

type OrdersListResponse = ApiResponse<EcommerceOrderListData>;
type OrderDetailResponse = ApiResponse<EcommerceOrder>;
type OrderMutationResponse = ApiResponse<EcommerceOrder | null>;

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<EcommerceOrderListData, GetOrdersParams | void>({
      query: (params) => ({
        url: API_ROUTES.ECOMMERCE_ORDERS.ORDERS,
        params: params?.page ? { page: params.page } : undefined,
      }),
      transformResponse: (response: OrdersListResponse) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.orders.map((order) => ({ type: "Order" as const, id: order.order_number })),
              { type: "Order" as const, id: "LIST" },
            ]
          : [{ type: "Order" as const, id: "LIST" }],
    }),

    getOrder: builder.query<EcommerceOrder, string>({
      query: (orderNumber) => API_ROUTES.ECOMMERCE_ORDERS.ORDER_DETAIL(orderNumber),
      transformResponse: (response: OrderDetailResponse) => response.data,
      providesTags: (_result, _error, orderNumber) => [{ type: "Order", id: orderNumber }],
    }),

    createOrder: builder.mutation<OrderMutationResult, CreateOrderRequest>({
      query: (body) => ({
        url: API_ROUTES.ECOMMERCE_ORDERS.ORDERS,
        method: "POST",
        body,
      }),
      transformResponse: (response: OrderMutationResponse) => ({
        success: response.success,
        message: response.message,
        data: response.data,
      }),
      invalidatesTags: (result) =>
        result?.success
          ? [
              { type: "Order", id: "LIST" },
              { type: "Cart", id: "LIST" },
              ...(result.data ? [{ type: "Order" as const, id: result.data.order_number }] : []),
            ]
          : [],
    }),

    cancelOrder: builder.mutation<OrderMutationResult, string>({
      query: (orderNumber) => ({
        url: API_ROUTES.ECOMMERCE_ORDERS.ORDER_CANCEL(orderNumber),
        method: "POST",
      }),
      transformResponse: (response: OrderMutationResponse) => ({
        success: response.success,
        message: response.message,
        data: response.data,
      }),
      invalidatesTags: (result, _error, orderNumber) =>
        result?.success
          ? [
              { type: "Order", id: orderNumber },
              { type: "Order", id: "LIST" },
            ]
          : [],
    }),
  }),
});

export const {
  useCancelOrderMutation,
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetOrdersQuery,
} = ordersApi;
