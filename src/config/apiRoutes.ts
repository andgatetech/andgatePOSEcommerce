export const API_ROUTES = {
  ECOMMERCE_AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  ECOMMERCE_CATALOG: {
    CATEGORIES: "/categories",
    BRANDS: "/brands",
    STORES: "/stores",
    PRODUCTS: "/products",
  },
  ECOMMERCE_CART: {
    CART: "/cart",
    CART_CLEAR: "/cart/clear",
    CART_ITEM: (id: number) => `/cart/${id}` as const,
  },
  ECOMMERCE_ORDERS: {
    ORDERS: "/orders",
    ORDER_DETAIL: (orderNumber: string) => `/orders/${orderNumber}` as const,
    ORDER_CANCEL: (orderNumber: string) => `/orders/${orderNumber}/cancel` as const,
    ORDER_TRACKING: (orderNumber: string) => `/order-tracking/${orderNumber}` as const,
  },
  ECOMMERCE_ACCOUNT: {
    MY_ADDRESS: "/my-address",
    MY_ACCOUNT: "/my-account",
  },
  ECOMMERCE_WISHLIST: {
    WISHLIST: "/wishlist",
    WISHLIST_TOGGLE: "/wishlist/toggle",
    WISHLIST_ITEM: (id: number) => `/wishlist/${id}` as const,
  },
} as const;
