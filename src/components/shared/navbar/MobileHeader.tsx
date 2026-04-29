"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaHome,
  FaFireAlt,
  FaHeart,
  FaShoppingBag,
  FaStore,
  FaThLarge,
  FaWineBottle,
} from "react-icons/fa";
import Logo from "../Logo";
import ProductSearchBox from "../ProductSearchBox";
import { ROUTES } from "@/config/routes";
import { useAppSelector } from "@/lib/hooks";
import { useAuthSession } from "@/features/auth/useAuthSession";
import CartIconAnimation from "@/app/(protected)/cart/_components/CartIconAnimation";

const mobileQuickLinks = [
  { label: "Home", href: ROUTES.HOME, icon: FaHome },
  { label: "Deals", href: ROUTES.DEAL_OF_DAY, icon: FaFireAlt },
  { label: "Categories", href: ROUTES.CATEGORY, icon: FaThLarge },
  { label: "Popular", href: ROUTES.POPULAR_PRODUCT, icon: FaHeart },
  { label: "Store", href: ROUTES.STORE, icon: FaStore },
  { label: "Fresh", href: ROUTES.PRODUCT, icon: FaShoppingBag },
  { label: "Brands", href: ROUTES.BRAND, icon: FaWineBottle },
];

const mobileNavLinks = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Daily Deals", href: ROUTES.DEAL_OF_DAY },
  { label: "Popular Picks", href: ROUTES.POPULAR_PRODUCT },
  { label: "Fresh Finds", href: ROUTES.PRODUCT },
  { label: "Explore All Categories", href: ROUTES.CATEGORY },
  { label: "Store", href: ROUTES.STORE },
  { label: "Brands", href: ROUTES.BRAND },
  { label: "Order Tracking", href: ROUTES.ORDER_TRACKING },
];

type MobileHeaderProps = {
  cartCount: number;
  onCartClick: () => void;
};

export default function MobileHeader({ cartCount, onCartClick }: MobileHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, isHydrated, user } = useAppSelector((state) => state.auth);
  const { logoutAndRedirect } = useAuthSession();
  const showAuthenticatedMenu = isHydrated && isAuthenticated && !!user;
  const accountLabel = hasMounted && showAuthenticatedMenu ? user.name : "Login / Register";

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const accountMenuItems = [
    { label: "My Account", href: ROUTES.MY_ACCOUNT },
    { label: "My Wishlist", href: ROUTES.WISHLIST },
    { label: "Order Tracking", href: ROUTES.ORDER_TRACKING },
    { label: "Profile", href: ROUTES.MY_ACCOUNT },
  ];

  return (
    <div className="xl:hidden bg-(--color-bg) border-b border-(--color-border) py-3 px-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Logo width={140} height={38} />
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-(--color-dark) cursor-pointer"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
          <button type="button" onClick={onCartClick} className="relative">
            <CartIconAnimation variant="mobile" count={cartCount} />
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mt-3">
        <ProductSearchBox
          compact
          placeholder="Search products"
          inputClassName="text-sm"
        />
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <nav className="mt-4 pb-4 border-t border-(--color-border) pt-4">
          <Link
            href={ROUTES.CATEGORY}
            className="mb-4 flex items-center justify-center rounded-[10px] bg-(--color-primary) px-4 py-3 text-sm font-semibold text-(--color-bg) transition-colors hover:bg-(--color-primary-dark)"
            onClick={() => setMobileMenuOpen(false)}
          >
            Explore All Categories
          </Link>
          <ul className="flex flex-col gap-y-3">
            {mobileNavLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-(--color-dark) text-sm font-medium hover:text-(--color-cta) transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="text-(--color-dark) text-sm font-medium flex w-full items-center justify-between gap-x-2 hover:text-(--color-cta) transition-colors"
                onClick={() => setAccountMenuOpen((current) => !current)}
              >
                <span className="flex items-center gap-x-2">
                  <FaUser className="text-sm" />
                  {accountLabel}
                </span>
                <FaChevronDown className={`text-xs transition-transform ${accountMenuOpen ? "rotate-180" : ""}`} />
              </button>
            </li>
            {accountMenuOpen ? (
              <li className="rounded-[16px] border border-(--color-border) bg-white p-2">
                {hasMounted && showAuthenticatedMenu ? (
                  <>
                    {accountMenuItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block rounded-[10px] px-3 py-2 text-(--color-dark) text-sm font-medium hover:bg-(--color-primary-100) hover:text-(--color-cta) transition-colors"
                        onClick={() => {
                          setAccountMenuOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <button
                      type="button"
                      className="block w-full rounded-[10px] px-3 py-2 text-left text-(--color-dark) text-sm font-medium hover:bg-(--color-primary-100) hover:text-(--color-cta) transition-colors"
                      onClick={() => {
                        setAccountMenuOpen(false);
                        setMobileMenuOpen(false);
                        logoutAndRedirect();
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href={ROUTES.LOGIN}
                      className="block rounded-[10px] px-3 py-2 text-(--color-dark) text-sm font-medium hover:bg-(--color-primary-100) hover:text-(--color-cta) transition-colors"
                      onClick={() => {
                        setAccountMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Login
                    </Link>
                    <Link
                      href={ROUTES.REGISTER}
                      className="block rounded-[10px] px-3 py-2 text-(--color-dark) text-sm font-medium hover:bg-(--color-primary-100) hover:text-(--color-cta) transition-colors"
                      onClick={() => {
                        setAccountMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Register
                    </Link>
                  </>
                )}
              </li>
            ) : null}
          </ul>
        </nav>
      )}

      <nav
        aria-label="Quick access"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-(--color-border) bg-(--color-bg)/95 px-2 py-2 shadow-[0_-10px_30px_rgba(17,17,17,0.08)] backdrop-blur xl:hidden"
      >
        <ul className="grid grid-cols-5 gap-1">
          {mobileQuickLinks.slice(0, 5).map((link) => {
            const isActive =
              link.href === ROUTES.HOME ? pathname === link.href : pathname.startsWith(link.href);

            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-[14px] px-2 py-2 text-[11px] font-semibold transition-colors ${
                    isActive
                      ? "bg-(--color-primary) text-(--color-bg)"
                      : "text-(--color-dark) hover:bg-(--color-primary-100) hover:text-(--color-primary)"
                  }`}
                >
                  <link.icon className="text-sm" />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
