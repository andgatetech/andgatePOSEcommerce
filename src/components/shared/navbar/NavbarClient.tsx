"use client";

import { useState } from "react";
import MainHeader from "./MainHeader";
import MobileHeader from "./MobileHeader";
import CartDrawer from "./CartDrawer";
import { cartMockItems } from "./cartMockData";

export default function NavbarClient() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <MainHeader
        cartCount={cartMockItems.length}
        onCartClick={() => setIsCartOpen(true)}
      />
      <MobileHeader
        cartCount={cartMockItems.length}
        onCartClick={() => setIsCartOpen(true)}
      />
      <CartDrawer
        isOpen={isCartOpen}
        items={cartMockItems}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}
