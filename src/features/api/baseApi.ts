import {
  createApi,
  fetchBaseQuery,
  retry,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout } from "@/features/auth/authSlice";
import { clearStoredAuth, isTokenExpired, loadStoredAuth } from "@/features/auth/authStorage";
import type { RootState } from "@/lib/store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { endpoint, getState }) => {
    headers.set("Accept", "application/json");

    if (endpoint === "checkStock") {
      return headers;
    }

    const state = getState() as RootState;
    const token = state.auth.token ?? loadStoredAuth()?.token;
    const expiresAt = state.auth.expiresAt ?? loadStoredAuth()?.expires_at ?? null;

    if (token && !isTokenExpired(expiresAt)) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401) {
      clearStoredAuth();
      api.dispatch(logout());
    }
    // Stop retry loop for all client errors (4xx) — only 5xx and network errors are retryable
    if (typeof result.error.status === "number" && result.error.status < 500) {
      retry.fail(result.error);
    }
  }

  return result;
};

// Retries up to 2 times on network errors and 5xx responses with exponential backoff.
// 4xx errors bail immediately via retry.fail() above.
const baseQueryWithRetry = retry(baseQueryWithAuth, { maxRetries: 2 });

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Auth", "User", "Order", "Category", "Brand", "Store", "Product", "Cart", "Wishlist", "MyAddress"],
  endpoints: () => ({}),
});
