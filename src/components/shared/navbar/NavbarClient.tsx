"use client";

import { useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import MobileHeader from "./MobileHeader";
import CartDrawer from "./CartDrawer";
import { useAppSelector } from "@/lib/hooks";
import { useGetCartQuery } from "@/features/cart/cartApi";
import { isTokenExpired } from "@/features/auth/authStorage";

export default function NavbarClient() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated, expiresAt } = useAppSelector((state) => state.auth);
  const hasActiveSession = isAuthenticated && !isTokenExpired(expiresAt);
  const guestCart = useAppSelector((state) => state.guestCart);
  const { data } = useGetCartQuery(undefined, { skip: !hasActiveSession });

  const cartItems = hasActiveSession ? (data?.items ?? []) : guestCart.items;
  const cartCount = hasActiveSession
    ? (data?.item_count ?? 0)
    : guestCart.items.reduce((count, item) => count + item.quantity, 0);
  const displayedCartItems = hasMounted ? cartItems : [];
  const displayedCartCount = hasMounted ? cartCount : 0;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <MainHeader
        cartCount={displayedCartCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      <MobileHeader
        cartCount={displayedCartCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      <CartDrawer
        isOpen={isCartOpen}
        items={displayedCartItems}
        isAuthenticated={hasActiveSession}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}
