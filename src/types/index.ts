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
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  image_url: string | null;
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
