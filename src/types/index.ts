export interface User {
  id: number;
  name: string;
  email: string | null;
  mobile_number: string | null;
  status: "active" | "blocked" | "disabled";
  otp_verify: 0 | 1;
  created_at: string;
  updated_at: string;
}

export interface AuthData {
  user: User;
  token: string;
  expires_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  expiresAt: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  password: string;
  email?: string;
  mobile_number?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: Record<string, string[]> | null;
  meta: {
    timestamp: string;
    request_id: string | null;
  };
}

export type AuthResponse = ApiResponse<AuthData>;

export interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string | null;
  store?: {
    store_name: string;
    store_slug: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  image_url: string | null;
  store?: {
    store_name: string;
    store_slug: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Store {
  id: number;
  store_name: string;
  slug: string;
  store_location: string | null;
  store_number: string | null;
  store_contact: string | null;
  logo_path: string | null;
}

export type {
  Pagination,
  PaginatedPayload,
  PaginatedResponse,
  ListQueryParams,
} from "./pagination";

// ── Cart & Wishlist types ─────────────────────────────────────────────────────

export interface CartStockImage {
  id: number;
  url: string;
}

export interface CartStock {
  id: number;
  slug: string;
  sku: string;
  price: number | string;
  available_qty: number;
  variant_data: Record<string, string> | null;
  product_name: string;
  description: string;
  images: CartStockImage[];
}

export interface CartStoreRef {
  id: number;
  store_name: string;
  slug: string;
}

export interface CartItemData {
  id: number;
  quantity: number;
  subtotal: number;
  stock: CartStock;
  store: CartStoreRef;
}

export interface CartData {
  items: CartItemData[];
  item_count: number;
  cart_total: number;
}

export interface WishlistItemData {
  id: number;
  stock: CartStock;
  store: CartStoreRef;
  added_at: string;
}

export interface WishlistData {
  items: WishlistItemData[];
  count: number;
}

// ── Order types ───────────────────────────────────────────────────────────────

export type EcommerceOrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type EcommercePaymentStatus = "pending" | "paid" | "failed";
export type EcommerceAddressType = "home" | "office" | "other";

export interface EcommerceOrderShippingAddress {
  type?: EcommerceAddressType;
  label?: string | null;
  name: string;
  phone: string;
  email?: string | null;
  address_line: string;
  city: string;
  zone?: string;
  area?: string;
  postal_code: string;
}

export interface EcommerceSavedAddress extends EcommerceOrderShippingAddress {
  id: number;
  type: EcommerceAddressType;
  label: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface EcommerceAddressPayload {
  type: EcommerceAddressType;
  label?: string | null;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  address_line: string;
  city?: string | null;
  zone?: string | null;
  area?: string | null;
  postal_code?: string | null;
  is_default?: boolean;
}

export interface MyAddressData {
  addresses: EcommerceSavedAddress[];
  default_address: EcommerceSavedAddress | null;
}

export interface MyAccountData {
  user: User;
}

export interface UpdateMyAccountRequest {
  name?: string;
  email?: string | null;
  current_password?: string;
  new_password?: string;
  new_password_confirmation?: string;
}

export interface EcommerceOrderImage {
  url: string;
}

export interface EcommerceOrderItem {
  id: number;
  product_name: string;
  slug: string;
  sku: string;
  variant_data: Record<string, string> | null;
  description: string | null;
  images: EcommerceOrderImage[];
  unit_price: number;
  quantity: number;
  subtotal: number;
  store_id: number;
}

export interface EcommerceOrderSummary {
  order_number: string;
  status: EcommerceOrderStatus;
  item_count: number;
  subtotal: number;
  shipping_fee: number;
  total: number;
  payment_method: string;
  payment_status: EcommercePaymentStatus;
  created_at: string;
}

export interface EcommerceOrder extends EcommerceOrderSummary {
  shipping_address: EcommerceOrderShippingAddress;
  notes: string | null;
  items: EcommerceOrderItem[];
}

export interface EcommerceOrderTrackingData {
  order_number: string;
  status: EcommerceOrderStatus;
  payment_method: string;
  payment_status: EcommercePaymentStatus;
  item_count: number;
  subtotal: number;
  shipping_fee: number;
  total: number;
  shipping_address: EcommerceOrderShippingAddress;
  created_at: string;
  updated_at: string;
}

export interface EcommerceOrderListData {
  orders: EcommerceOrderSummary[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface CreateOrderRequest {
  items: {
    stock_id: number;
    quantity: number;
  }[];
  address_id?: number;
  payment_method: string;
  shipping_fee: number;
  notes?: string;
  shipping_address?: EcommerceAddressPayload;
}

export interface OrderMutationResult {
  success: boolean;
  message: string;
  data: EcommerceOrder | null;
}

// ── Ecommerce product types ───────────────────────────────────────────────────

export interface EcommerceProductImage {
  id: number;
  url: string;
}

export interface EcommerceProductSoldBy {
  store_name: string;
  store_slug: string;
}

export interface EcommerceProductCategory {
  name: string;
  slug: string;
  image_url: string | null;
}

export interface EcommerceProductBrand {
  name: string;
  slug: string;
  image_url: string | null;
}

export interface EcommerceProductVariant {
  slug: string;
  sku: string;
  price: string;
  quantity: string;
  variant_data: Record<string, string> | null;
  images: EcommerceProductImage[];
}

export interface EcommerceProduct {
  id: number;
  product_name: string;
  description: string;
  slug: string;
  sku: string;
  price: string;
  quantity: string;
  images: EcommerceProductImage[];
  variant_data: Record<string, string> | null;
  sold_by: EcommerceProductSoldBy;
  category: EcommerceProductCategory | null;
  brand: EcommerceProductBrand | null;
  other_variants?: EcommerceProductVariant[];
}

export interface ProductListParams {
  search?: string;
  category?: string;
  brand?: string;
  store?: string;
  min_price?: number;
  max_price?: number;
  sort_field?: "product_name" | "price" | "quantity" | "created_at";
  sort_direction?: "asc" | "desc";
  page?: number;
  per_page?: number;
}
