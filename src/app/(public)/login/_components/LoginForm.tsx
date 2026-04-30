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
import GoogleSignInButton from "@/features/auth/GoogleSignInButton";

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

  const redirectAfterAuth = () => {
    const callbackUrl = searchParams.get("callbackUrl");
    router.replace(callbackUrl || ROUTES.HOME);
  };

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
      redirectAfterAuth();
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

      <GoogleSignInButton
        intent="login"
        text="signin_with"
        onAuthenticated={redirectAfterAuth}
        onError={(message) => setErrors({ login: [message] })}
      />

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
