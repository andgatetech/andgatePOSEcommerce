export interface User {
  id: number;
  name: string;
  email: string | null;
  mobile_number: string | null;
  status: "active" | "blocked" | "disabled";
  otp_verify: 0 | 1;
  has_password: boolean;
  email_verified_at: string | null;
  terms_accepted_at: string | null;
  registration_provider: "password" | "google" | string;
  last_login_provider: "password" | "google" | string | null;
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
  accepted_terms: true;
}

export interface GoogleAuthRequest {
  credential: string;
  intent: "login" | "register";
  accepted_terms?: true;
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
  FacetGroup,
  FacetValue,
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
  | "partially_processing"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type EcommercePaymentStatus = "pending" | "partial" | "paid" | "refunded" | "failed";
export type EcommerceAddressType = "home" | "office" | "other";

export interface EcommerceOrderShippingAddress {
  type?: EcommerceAddressType;
  label?: string | null;
  name: string;
  phone: string;
  email?: string | null;
  address_line: string;
  city: string;
  zone?: string | null;
  area?: string | null;
  postal_code?: string | null;
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
  store_order_id?: number;
  stock_id?: number;
  product_name: string;
  slug?: string;
  sku?: string;
  variant_data: Record<string, string> | null;
  description?: string | null;
  images?: EcommerceOrderImage[];
  unit_price?: number;
  quantity: number;
  subtotal: number;
  store_id?: number;
}

export type EcommerceOrderType = "parent_order" | "store_order";

export interface EcommerceOrderStatusSummary {
  pending: number;
  confirmed: number;
  packed: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  returned: number;
  total: number;
}

export interface EcommerceOrderPaymentSummary {
  pending: number;
  partial: number;
  paid: number;
  refunded: number;
  failed: number;
  total: number;
  paid_amount: number;
  due_amount: number;
}

export interface EcommerceOrderTransaction {
  id?: number;
  amount?: number | string;
  status?: EcommercePaymentStatus | string;
  payment_method?: string | null;
  note?: string | null;
  created_at?: string;
  [key: string]: unknown;
}

export interface EcommerceOrderStoreRef {
  id: number;
  store_name: string;
  slug?: string;
}

export interface EcommerceOrderSourceRef {
  id: number;
  name: string;
  slug?: string;
  type?: string;
}

export interface EcommerceStoreOrder {
  type?: EcommerceOrderType;
  id: number;
  store_order_id?: number;
  ecommerce_order_id?: number;
  parent_order_id?: number;
  order_number?: string;
  store_id?: number;
  store?: EcommerceOrderStoreRef;
  source?: EcommerceOrderSourceRef;
  store_name?: string;
  status: EcommerceOrderStatus;
  payment_method?: string | null;
  payment_status: EcommercePaymentStatus;
  items_count?: number;
  subtotal: number;
  shipping_fee: number;
  total: number;
  paid_amount?: number;
  due_amount?: number;
  payment_note?: string | null;
  reserved_at?: string | null;
  packed_at?: string | null;
  shipped_at?: string | null;
  delivered_at?: string | null;
  cancelled_at?: string | null;
  returned_at?: string | null;
  paid_at?: string | null;
  items?: EcommerceOrderItem[];
  transactions?: EcommerceOrderTransaction[];
  shipping_address?: EcommerceOrderShippingAddress;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface EcommerceCheckoutSummary {
  subtotal: number;
  shipping_fee: number;
  total: number;
}

export interface EcommerceOrderSummary extends EcommerceStoreOrder {
  order_number: string;
  created_at: string;
  item_count?: number;
}

export interface EcommerceOrder {
  order_number: string;
  is_multi_store?: boolean;
  store_order_count?: number;
  checkout_summary?: EcommerceCheckoutSummary;
  shipping_address: EcommerceOrderShippingAddress;
  notes: string | null;
  created_at: string;
  updated_at?: string;
  orders: EcommerceStoreOrder[];
  type?: EcommerceOrderType;
  id?: number;
  parent_order_id?: number;
  status?: EcommerceOrderStatus;
  status_source?: string;
  status_summary?: EcommerceOrderStatusSummary;
  item_count?: number;
  subtotal?: number;
  shipping_fee?: number;
  total?: number;
  payment_method?: string | null;
  payment_status?: EcommercePaymentStatus;
  payment_status_source?: string;
  payment_summary?: EcommerceOrderPaymentSummary;
  store_orders?: EcommerceStoreOrder[];
  items?: EcommerceOrderItem[];
}

export interface EcommerceOrderTrackingData extends EcommerceOrder {
  order_number: string;
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
  shipping_fee?: number;
  store_shipping_fees?: {
    store_id: number;
    amount: number;
  }[];
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

export interface EcommerceProductPromotion {
  id: number;
  section: "popular_product" | "deal_of_day";
  display_order: number;
  original_price: string | null;
  deal_price: string | null;
  discount_percent: number | null;
  starts_at: string | null;
  ends_at: string | null;
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
  promotion?: EcommerceProductPromotion | null;
  other_variants?: EcommerceProductVariant[];
}

export interface ProductListParams {
  search?: string;
  category?: string;
  brand?: string;
  store?: string;
  min_price?: number;
  max_price?: number;
  stock_status?: "in_stock" | "out_of_stock";
  has_options?: "yes" | "no";
  facets?: string;
  sort_field?: "product_name" | "price" | "quantity" | "created_at";
  sort_direction?: "asc" | "desc";
  page?: number;
  per_page?: number;
  limit?: number;
}
