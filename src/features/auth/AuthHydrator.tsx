"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setCredentials, logout, setHydrated } from "@/features/auth/authSlice";
import { loadStoredAuth } from "@/features/auth/authStorage";

export default function AuthHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedAuth = loadStoredAuth();

    if (storedAuth) {
      dispatch(setCredentials(storedAuth));
    } else {
      dispatch(logout());
    }

    dispatch(setHydrated(true));
  }, [dispatch]);

  return null;
}
