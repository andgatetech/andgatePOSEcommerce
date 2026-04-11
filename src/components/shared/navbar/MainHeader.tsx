"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import Logo from "../Logo";
import { ROUTES } from "@/config/routes";
import { useAppSelector } from "@/lib/hooks";
import { useAuthSession } from "@/features/auth/useAuthSession";

type MainHeaderProps = {
  cartCount: number;
  onCartClick: () => void;
};

export default function MainHeader({ cartCount, onCartClick }: MainHeaderProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const { isAuthenticated, isHydrated, user } = useAppSelector((state) => state.auth);
  const { logoutAndRedirect } = useAuthSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const showAuthenticatedMenu = isHydrated && isAuthenticated && !!user;
  const accountLabel = hasMounted && showAuthenticatedMenu ? user.name : "Login / Register";

  const accountMenuItems = [
    { label: "My Account", href: ROUTES.MY_ACCOUNT },
    { label: "My Wishlist", href: ROUTES.WISHLIST },
    { label: "Order Tracking", href: ROUTES.ORDER_TRACKING },
    { label: "Profile", href: ROUTES.MY_ACCOUNT },
  ];

  return (
    <div className="py-2.5 hidden xl:block bg-(--color-bg) shadow-sm">
      <div className="mx-auto px-4">
        <div className="flex items-center">
          {/* Logo */}
          <Logo width={180} height={48} />

          {/* Right: Search + Account + Cart */}
          <div className="flex items-center w-full justify-end gap-x-[54px]">
            {/* Search Bar */}
            <div className="relative w-full 2xl:max-w-[800px] xl:max-w-[600px]">
              <div className="flex items-center border border-(--color-border) rounded-full px-6 py-3 focus-within:border-(--color-primary) focus-within:ring-1 focus-within:ring-(--color-primary-light) transition-all">
                <input
                  type="text"
                  placeholder="Search for the Items"
                  className="flex-1 text-base outline-none bg-transparent text-(--color-dark) placeholder:text-gray-400"
                />
                <FaSearch className="text-(--color-primary) text-lg" />
              </div>
            </div>

            {/* Account & Cart */}
            <ul className="flex items-center gap-x-6">
              {/* Cart */}
              <li className="flex items-center">
                <button
                  type="button"
                  onClick={onCartClick}
                  className="flex items-center gap-x-4 cursor-pointer group text-left"
                >
                  <span className="inline-flex items-center justify-center bg-(--color-cta) w-10 h-10 rounded-full group-hover:bg-(--color-cta-hover) transition-colors">
                    <FaShoppingCart className="text-base text-white" />
                  </span>
                  <span className="flex flex-col items-start">
                    <span className="text-[11px] uppercase tracking-wider text-(--color-text-muted) font-medium mb-0.5">
                      Cart
                    </span>
                    <span className="text-[15px] leading-none text-(--color-dark) font-bold">
                      {cartCount} Items
                    </span>
                  </span>
                </button>
              </li>

              {/* Account */}
              <li className="relative flex items-center group">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen((current) => !current)}
                  className="flex items-center gap-x-4 cursor-pointer relative"
                >
                  <span className="inline-flex items-center justify-center bg-(--color-cta) w-10 h-10 rounded-full group-hover:bg-(--color-cta-hover) transition-colors">
                    <FaUser className="text-base text-white" />
                  </span>
                  <p className="flex flex-col text-(--color-text-muted) text-sm leading-[22px]">
                    <span className="text-base leading-6 text-(--color-dark) font-medium">
                      {accountLabel}
                    </span>
                  </p>
                  <FaChevronDown
                    className={`text-sm text-(--color-dark) transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`absolute right-0 top-[calc(100%+12px)] z-30 min-w-[220px] rounded-[18px] border border-(--color-border) bg-white p-2 shadow-[0_18px_40px_rgba(17,17,17,0.12)] transition ${
                    isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  {hasMounted && showAuthenticatedMenu ? (
                    <>
                      {accountMenuItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block rounded-[12px] px-4 py-3 text-sm font-medium text-(--color-dark) transition hover:bg-(--color-primary-100) hover:text-(--color-primary)"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setIsMenuOpen(false);
                          logoutAndRedirect();
                        }}
                        className="block w-full rounded-[12px] px-4 py-3 text-left text-sm font-medium text-(--color-dark) transition hover:bg-(--color-primary-100) hover:text-(--color-primary)"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href={ROUTES.LOGIN}
                        className="block rounded-[12px] px-4 py-3 text-sm font-medium text-(--color-dark) transition hover:bg-(--color-primary-100) hover:text-(--color-primary)"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href={ROUTES.REGISTER}
                        className="block rounded-[12px] px-4 py-3 text-sm font-medium text-(--color-dark) transition hover:bg-(--color-primary-100) hover:text-(--color-primary)"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
