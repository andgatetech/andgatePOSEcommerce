"use client";

import Link from "next/link";
import { FiAlertTriangle, FiHome, FiRefreshCw } from "react-icons/fi";

interface ErrorViewProps {
  error: Error & { digest?: string };
  reset: () => void;
  showSignIn?: boolean;
}

export default function ErrorView({ error, reset, showSignIn = false }: ErrorViewProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff3f3] text-[#d2435b]">
        <FiAlertTriangle className="text-[28px]" />
      </div>

      <h1 className="mt-5 text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-[420px] text-sm leading-7 text-(--color-text-muted)">
        An unexpected error occurred. You can try again or return to the homepage.
        {error.digest && (
          <span className="mt-2 block text-xs text-(--color-text-muted) opacity-60">
            Error ID: {error.digest}
          </span>
        )}
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
        >
          <FiRefreshCw className="text-[14px]" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-white px-6 py-3 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
        >
          <FiHome className="text-[14px]" />
          Go to homepage
        </Link>
        {showSignIn && (
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-white px-6 py-3 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
          >
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}
