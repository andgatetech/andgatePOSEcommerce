"use client";

import { useEffect, useRef, useState } from "react";
import MainHeader from "./MainHeader";
import MobileHeader from "./MobileHeader";
import CartDrawer from "./CartDrawer";
import { useAppSelector } from "@/lib/hooks";
import { useGetCartQuery } from "@/features/cart/cartApi";
import { isTokenExpired } from "@/features/auth/authStorage";

export default function NavbarClient() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartTriggerRef = useRef<HTMLElement | null>(null);
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

  function openCart() {
    cartTriggerRef.current = document.activeElement as HTMLElement | null;
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
    window.requestAnimationFrame(() => cartTriggerRef.current?.focus());
  }

  return (
    <>
      <MainHeader
        cartCount={displayedCartCount}
        isCartOpen={isCartOpen}
        onCartClick={openCart}
      />
      <MobileHeader
        cartCount={displayedCartCount}
        isCartOpen={isCartOpen}
        onCartClick={openCart}
      />
      <CartDrawer
        isOpen={isCartOpen}
        items={displayedCartItems}
        isAuthenticated={hasActiveSession}
        onClose={closeCart}
      />
    </>
  );
}
