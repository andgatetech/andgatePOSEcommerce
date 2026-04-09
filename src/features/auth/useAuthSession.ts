"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/features/auth/authSlice";
import { clearStoredAuth } from "@/features/auth/authStorage";
import { ROUTES } from "@/config/routes";

export function useAuthSession() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  function logoutAndRedirect(pathname = ROUTES.LOGIN) {
    clearStoredAuth();
    dispatch(logout());
    router.push(pathname);
  }

  return {
    logoutAndRedirect,
  };
}
