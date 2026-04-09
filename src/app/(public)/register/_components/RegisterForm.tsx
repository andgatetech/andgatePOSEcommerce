"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone } from "react-icons/fi";
import { ROUTES } from "@/config/routes";
import { useRegisterMutation } from "@/features/api/authApi";
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
      form: [apiError.data.message],
    };
  }

  return {
    form: ["Unable to create your account right now."],
  };
}

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isHydrated, expiresAt } = useAppSelector((state) => state.auth);
  const [registerUser, { isLoading }] = useRegisterMutation();

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

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMobile = mobileNumber.trim();
    const nextErrors: FormErrors = {};

    if (!trimmedName) {
      nextErrors.name = ["Name is required."];
    }

    if (!trimmedEmail && !trimmedMobile) {
      nextErrors.email = ["Either email or mobile number is required."];
      nextErrors.mobile_number = ["Either mobile number or email is required."];
    }

    if (!password) {
      nextErrors.password = ["Password is required."];
    } else if (password.length < 8) {
      nextErrors.password = ["Password must be at least 8 characters."];
    }

    if (!acceptedTerms) {
      nextErrors.terms = ["You must accept the terms to continue."];
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      const response = await registerUser({
        name: trimmedName,
        password,
        ...(trimmedEmail ? { email: trimmedEmail } : {}),
        ...(trimmedMobile ? { mobile_number: trimmedMobile } : {}),
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
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-(--color-text) mb-1.5">
          Full Name
        </label>
        <div className="relative">
          <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--color-text-muted)" size={18} />
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="John Doe"
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-(--color-border) bg-white text-(--color-text) placeholder:text-(--color-text-muted) focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary-100) outline-none transition"
          />
        </div>
        {errors.name?.[0] ? (
          <p className="mt-1.5 text-sm text-red-600">{errors.name[0]}</p>
        ) : null}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-(--color-text) mb-1.5">
          Email Address
        </label>
        <div className="relative">
          <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--color-text-muted)" size={18} />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-(--color-border) bg-white text-(--color-text) placeholder:text-(--color-text-muted) focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary-100) outline-none transition"
          />
        </div>
        {errors.email?.[0] ? (
          <p className="mt-1.5 text-sm text-red-600">{errors.email[0]}</p>
        ) : null}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-(--color-text) mb-1.5">
          Phone Number
        </label>
        <div className="relative">
          <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--color-text-muted)" size={18} />
          <input
            id="phone"
            type="tel"
            value={mobileNumber}
            onChange={(event) => setMobileNumber(event.target.value)}
            placeholder="01700000000"
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-(--color-border) bg-white text-(--color-text) placeholder:text-(--color-text-muted) focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary-100) outline-none transition"
          />
        </div>
        {errors.mobile_number?.[0] ? (
          <p className="mt-1.5 text-sm text-red-600">{errors.mobile_number[0]}</p>
        ) : null}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-(--color-text) mb-1.5">
          Password
        </label>
        <div className="relative">
          <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--color-text-muted)" size={18} />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Min. 8 characters"
            className="w-full pl-11 pr-11 py-3 rounded-lg border border-(--color-border) bg-white text-(--color-text) placeholder:text-(--color-text-muted) focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary-100) outline-none transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-(--color-text-muted) hover:text-(--color-text) transition"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
        {errors.password?.[0] ? (
          <p className="mt-1.5 text-sm text-red-600">{errors.password[0]}</p>
        ) : null}
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2">
        <input
          id="terms"
          type="checkbox"
          checked={acceptedTerms}
          onChange={(event) => setAcceptedTerms(event.target.checked)}
          className="w-4 h-4 mt-0.5 rounded border-(--color-border) text-(--color-primary) accent-(--color-primary)"
        />
        <label htmlFor="terms" className="text-sm text-(--color-text-muted)">
          I agree to the{" "}
          <Link href={ROUTES.TERMS} className="text-(--color-primary) hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link href={ROUTES.PRIVACY_POLICY} className="text-(--color-primary) hover:underline">Privacy Policy</Link>
        </label>
      </div>
      {errors.terms?.[0] ? (
        <p className="-mt-2 text-sm text-red-600">{errors.terms[0]}</p>
      ) : null}
      {errors.form?.[0] ? (
        <p className="-mt-2 text-sm text-red-600">{errors.form[0]}</p>
      ) : null}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-lg bg-(--color-primary) text-white font-semibold hover:bg-(--color-primary-dark) active:bg-(--color-primary-900) transition cursor-pointer"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-2">
        <div className="flex-1 h-px bg-(--color-border)" />
        <span className="text-xs text-(--color-text-muted)">OR</span>
        <div className="flex-1 h-px bg-(--color-border)" />
      </div>

      {/* Google sign-up placeholder */}
      <button
        type="button"
        className="w-full py-3 rounded-lg border border-(--color-border) bg-white text-(--color-text) font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

      {/* Login link */}
      <p className="text-center text-sm text-(--color-text-muted)">
        Already have an account?{" "}
        <Link
          href={ROUTES.LOGIN}
          className="text-(--color-primary) hover:text-(--color-primary-dark) font-semibold transition"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
