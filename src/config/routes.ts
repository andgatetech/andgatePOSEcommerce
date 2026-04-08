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
  ORDERS: "/orders",
  STORE: "/store",
  WISHLIST: "/wishlist",

  // Temporary fallbacks until dedicated pages are added.
  BLOG: "/about",
  DEALS: "/category",
  SHOP: "/category",
  TOP_PICKS: "/category",
} as const;

export const ROUTE_BUILDERS = {
  storeDetail: (slug: string) => `${ROUTES.STORE}/${slug}`,
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
  ROUTES.REGISTER,
  ROUTES.RETURN_POLICIES,
  ROUTES.TERMS,
];

export const PROTECTED_ROUTES = [
  ROUTES.CART,
  ROUTES.CHECKOUT,
  ROUTES.MY_ACCOUNT,
  ROUTES.ORDERS,
  ROUTES.STORE,
  ROUTES.WISHLIST,
];

export const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];
