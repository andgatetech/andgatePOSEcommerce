"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/features/auth/authSlice";
import { ROUTES } from "@/config/routes";
import { clearStoredAuth, isTokenExpired } from "@/features/auth/authStorage";

export default function ProtectedLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isHydrated, expiresAt } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isHydrated) {
      return;
    }

    if (!isAuthenticated || isTokenExpired(expiresAt)) {
      clearStoredAuth();
      dispatch(logout());
      const loginUrl = new URL(ROUTES.LOGIN, window.location.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      router.replace(`${loginUrl.pathname}${loginUrl.search}`);
    }
  }, [mounted, dispatch, expiresAt, isAuthenticated, isHydrated, pathname, router]);

  const isReady = mounted && isHydrated && isAuthenticated && !isTokenExpired(expiresAt);

  if (!isReady) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-(--color-primary-100) border-t-(--color-primary)" />
          <p className="text-sm font-medium tracking-[0.12em] text-(--color-text-muted) uppercase">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
