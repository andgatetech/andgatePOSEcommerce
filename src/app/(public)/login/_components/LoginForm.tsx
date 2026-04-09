"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { ROUTES } from "@/config/routes";
import { useLoginMutation } from "@/features/api/authApi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCredentials } from "@/features/auth/authSlice";
import { saveStoredAuth, isTokenExpired } from "@/features/auth/authStorage";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ApiResponse, AuthData } from "@/types";

type FormErrors = Record<string, string[]>;

function getApiErrors(error: unknown): FormErrors {
  const apiError = error as FetchBaseQueryError & {
    data?: ApiResponse<null>;
  };

  if (apiError?.data?.errors) {
    return apiError.data.errors;
  }

  if (apiError?.data?.message) {
    return {
      login: [apiError.data.message],
    };
  }

  return {
    login: ["Unable to sign in right now."],
  };
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isHydrated, expiresAt } = useAppSelector((state) => state.auth);
  const [loginUser, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (isAuthenticated && !isTokenExpired(expiresAt)) {
      const callbackUrl = searchParams.get("callbackUrl");
      router.replace(callbackUrl || ROUTES.HOME);
    }
  }, [expiresAt, isAuthenticated, isHydrated, router, searchParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedLogin = login.trim();
    const nextErrors: FormErrors = {};

    if (!trimmedLogin) {
      nextErrors.login = ["Email or mobile number is required."];
    }

    if (!password) {
      nextErrors.password = ["Password is required."];
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      const response = await loginUser({
        login: trimmedLogin,
        password,
      }).unwrap();
      const authData: AuthData = response.data;

      saveStoredAuth(authData);
      dispatch(setCredentials(authData));

      const callbackUrl = searchParams.get("callbackUrl");
      router.replace(callbackUrl || ROUTES.HOME);
    } catch (error) {
      setErrors(getApiErrors(error));
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Email or Mobile */}
      <div>
        <label htmlFor="login" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
          Email or Mobile Number
        </label>
        <div className="relative">
          <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
          <input
            id="login"
            type="text"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            placeholder="you@example.com or 01700000000"
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-100)] outline-none transition"
          />
        </div>
        {errors.login?.[0] ? (
          <p className="mt-1.5 text-sm text-red-600">{errors.login[0]}</p>
        ) : null}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="password" className="block text-sm font-medium text-[var(--color-text)]">
            Password
          </label>
          <Link
            href="#"
            className="text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium transition"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            className="w-full pl-11 pr-11 py-3 rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-100)] outline-none transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
        {errors.password?.[0] ? (
          <p className="mt-1.5 text-sm text-red-600">{errors.password[0]}</p>
        ) : null}
      </div>

      {/* Remember me */}
      <div className="flex items-center gap-2">
        <input
          id="remember"
          type="checkbox"
          className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] accent-[var(--color-primary)]"
        />
        <label htmlFor="remember" className="text-sm text-[var(--color-text-muted)]">
          Remember me
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] active:bg-[var(--color-primary-900)] transition cursor-pointer"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-2">
        <div className="flex-1 h-px bg-[var(--color-border)]" />
        <span className="text-xs text-[var(--color-text-muted)]">OR</span>
        <div className="flex-1 h-px bg-[var(--color-border)]" />
      </div>

      {/* Google sign-in placeholder */}
      <button
        type="button"
        className="w-full py-3 rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-text)] font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

      {/* Register link */}
      <p className="text-center text-sm text-[var(--color-text-muted)]">
        Don&apos;t have an account?{" "}
        <Link
          href={ROUTES.REGISTER}
          className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold transition"
        >
          Create Account
        </Link>
      </p>
    </form>
  );
}
