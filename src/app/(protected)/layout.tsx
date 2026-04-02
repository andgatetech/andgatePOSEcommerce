"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/features/api/authApi";
import { useAppDispatch } from "@/lib/hooks";
import { setCredentials, logout } from "@/features/auth/authSlice";
import { ROUTES } from "@/config/routes";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: user, isLoading, error } = useGetMeQuery();

  useEffect(() => {
    if (user) {
      dispatch(setCredentials(user));
    }

    if (error) {
      dispatch(logout());
      router.push(ROUTES.LOGIN);
    }
  }, [user, error, dispatch, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return null;
  }

  return (
    <div>
      {/* Protected Navbar/Sidebar will go here */}
      <main>{children}</main>
    </div>
  );
}
