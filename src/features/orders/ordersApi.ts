import { API_ROUTES } from "@/config/apiRoutes";
import { baseApi } from "@/features/api/baseApi";
import type {
  ApiResponse,
  CreateOrderRequest,
  EcommerceOrder,
  EcommerceOrderListData,
} from "@/types";

export interface GetOrdersParams {
  page?: number;
}

type OrdersListResponse = ApiResponse<EcommerceOrderListData>;
type OrderDetailResponse = ApiResponse<EcommerceOrder>;

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

    createOrder: builder.mutation<EcommerceOrder, CreateOrderRequest>({
      query: (body) => ({
        url: API_ROUTES.ECOMMERCE_ORDERS.ORDERS,
        method: "POST",
        body,
      }),
      transformResponse: (response: OrderDetailResponse) => response.data,
      invalidatesTags: (result) => [
        { type: "Order", id: "LIST" },
        { type: "Cart", id: "LIST" },
        ...(result ? [{ type: "Order" as const, id: result.order_number }] : []),
      ],
    }),

    cancelOrder: builder.mutation<EcommerceOrder, string>({
      query: (orderNumber) => ({
        url: API_ROUTES.ECOMMERCE_ORDERS.ORDER_CANCEL(orderNumber),
        method: "POST",
      }),
      transformResponse: (response: OrderDetailResponse) => response.data,
      invalidatesTags: (_result, _error, orderNumber) => [
        { type: "Order", id: orderNumber },
        { type: "Order", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCancelOrderMutation,
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetOrdersQuery,
} = ordersApi;
