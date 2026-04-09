"use client"
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/features/auth/authSlice";
import { ROUTES } from "@/config/routes";
import { clearStoredAuth, isTokenExpired } from "@/features/auth/authStorage";
import PageLoader from "@/components/shared/PageLoader";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isHydrated, expiresAt } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!isAuthenticated || isTokenExpired(expiresAt)) {
      clearStoredAuth();
      dispatch(logout());
      const loginUrl = new URL(ROUTES.LOGIN, window.location.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      router.replace(`${loginUrl.pathname}${loginUrl.search}`);
    }
  }, [dispatch, expiresAt, isAuthenticated, isHydrated, pathname, router]);

  if (!isHydrated) {
    return <PageLoader />;
  }

  if (!isAuthenticated || isTokenExpired(expiresAt)) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
