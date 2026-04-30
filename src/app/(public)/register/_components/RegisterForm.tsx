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
        accepted_terms: true,
        ...(trimmedEmail ? { email: trimmedEmail } : {}),
        ...(trimmedMobile ? { mobile_number: trimmedMobile } : {}),
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

      <GoogleSignInButton
        intent="register"
        text="signup_with"
        onAuthenticated={redirectAfterAuth}
        onError={(message) => setErrors({ form: [message] })}
      />

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
