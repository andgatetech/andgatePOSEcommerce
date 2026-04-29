export const ROUTES = {
  HOME: "/",

  ABOUT: "/about",
  AFFILIATE: "/affiliate",
  BECOME_VENDOR: "/become-vendor",
  BRAND: "/brand",
  CAREERS: "/careers",
  CATEGORY: "/category",
  CONTACT: "/contact",
  FAQS: "/faqs",
  LOGIN: "/login",
  ORDER_TRACKING: "/order-tracking",
  PRIVACY_POLICY: "/privacy-policy",
  REGISTER: "/register",
  RETURN_POLICIES: "/return-policies",
  TERMS: "/terms",

  CART: "/cart",
  CHECKOUT: "/checkout",
  MY_ACCOUNT: "/my-account",
  MY_ADDRESS: "/my-account/my-address",
  ORDERS: "/orders",
  STORE: "/store",
  WISHLIST: "/wishlist",

  PRODUCT: "/product",
  POPULAR_PRODUCT: "/popular-product",
  DEAL_OF_DAY: "/deal-of-day",

  // Temporary fallbacks until dedicated pages are added.
  BLOG: "/about",
  DEALS: "/deal-of-day",
  SHOP: "/category",
  TOP_PICKS: "/popular-product",
  TRENDING: "/product",
} as const;

export const ROUTE_BUILDERS = {
  storeDetail: (slug: string) => `${ROUTES.STORE}/${slug}`,
  categoryDetail: (slug: string) => `${ROUTES.CATEGORY}/${slug}`,
  brandDetail: (slug: string) => `${ROUTES.BRAND}/${slug}`,
  productDetail: (slug: string) => `${ROUTES.PRODUCT}/${slug}`,
  orderDetail: (orderNumber: string) => `${ROUTES.ORDERS}/${orderNumber}`,
  orderSuccess: (orderNumber: string) => `${ROUTES.ORDERS}/${orderNumber}/order-success`,
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.ABOUT,
  ROUTES.AFFILIATE,
  ROUTES.BECOME_VENDOR,
  ROUTES.BRAND,
  ROUTES.CAREERS,
  ROUTES.CATEGORY,
  ROUTES.CONTACT,
  ROUTES.FAQS,
  ROUTES.LOGIN,
  ROUTES.ORDER_TRACKING,
  ROUTES.PRIVACY_POLICY,
  ROUTES.PRODUCT,
  ROUTES.POPULAR_PRODUCT,
  ROUTES.DEAL_OF_DAY,
  ROUTES.REGISTER,
  ROUTES.RETURN_POLICIES,
  ROUTES.TERMS,
  ROUTES.STORE,
];

export const PROTECTED_ROUTES = [
  ROUTES.CART,
  ROUTES.CHECKOUT,
  ROUTES.MY_ACCOUNT,
  ROUTES.MY_ADDRESS,
  ROUTES.ORDERS,
  ROUTES.WISHLIST,
];

export const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];
