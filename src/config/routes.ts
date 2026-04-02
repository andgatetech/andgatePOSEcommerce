export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  ORDERS: "/orders",
  CART: "/cart",
  CHECKOUT: "/checkout",
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.ABOUT,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
];

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
  ROUTES.ORDERS,
  ROUTES.CART,
  ROUTES.CHECKOUT,
];

// Routes where logged-in users should be redirected away from (e.g., login/register)
export const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];
