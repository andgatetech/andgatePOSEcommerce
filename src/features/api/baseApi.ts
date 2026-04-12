import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout } from "@/features/auth/authSlice";
import { clearStoredAuth, isTokenExpired, loadStoredAuth } from "@/features/auth/authStorage";
import type { RootState } from "@/lib/store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Accept", "application/json");

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

  if (result.error && result.error.status === 401) {
    clearStoredAuth();
    api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Auth", "User", "Order", "Category", "Brand", "Store", "Product"],
  endpoints: () => ({}),
});
