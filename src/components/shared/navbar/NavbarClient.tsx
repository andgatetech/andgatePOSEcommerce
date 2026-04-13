"use client";

import { useState } from "react";
import MainHeader from "./MainHeader";
import MobileHeader from "./MobileHeader";
import CartDrawer from "./CartDrawer";
import { useAppSelector } from "@/lib/hooks";
import { useGetCartQuery } from "@/features/cart/cartApi";

export default function NavbarClient() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data } = useGetCartQuery(undefined, { skip: !isAuthenticated });

  const cartItems = data?.items ?? [];
  const cartCount = data?.item_count ?? 0;

  return (
    <>
      <MainHeader
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      <MobileHeader
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}
