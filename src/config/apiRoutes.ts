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
  ECOMMERCE_WISHLIST: {
    WISHLIST: "/wishlist",
    WISHLIST_TOGGLE: "/wishlist/toggle",
    WISHLIST_ITEM: (id: number) => `/wishlist/${id}` as const,
  },
} as const;
