import { baseApi } from "./baseApi";
import { API_ROUTES } from "@/config/apiRoutes";
import {
  LoginRequest,
  RegisterRequest,
  GoogleAuthRequest,
  AuthResponse,
} from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: API_ROUTES.ECOMMERCE_AUTH.LOGIN,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: API_ROUTES.ECOMMERCE_AUTH.REGISTER,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    googleAuth: builder.mutation<AuthResponse, GoogleAuthRequest>({
      query: (data) => ({
        url: API_ROUTES.ECOMMERCE_AUTH.GOOGLE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGoogleAuthMutation,
} = authApi;
