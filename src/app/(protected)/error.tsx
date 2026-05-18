"use client";

import ErrorView from "@/components/shared/ErrorView";

export default function ProtectedError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorView error={error} reset={reset} showSignIn />;
}
