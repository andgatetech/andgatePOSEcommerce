"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiGrid, FiShoppingCart, FiUser } from "react-icons/fi";
import { useAppSelector } from "@/lib/hooks";
import { ROUTES } from "@/config/routes";

const NAV_ITEMS = [
  { href: ROUTES.HOME, icon: FiHome, label: "Home" },
  { href: ROUTES.CATEGORY, icon: FiGrid, label: "Categories" },
  { href: ROUTES.CART, icon: FiShoppingCart, label: "Cart", isCart: true },
  { href: ROUTES.MY_ACCOUNT, icon: FiUser, label: "Account" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const serverItemCount = useAppSelector((s) =>
    isAuthenticated ? 0 : s.guestCart.items.reduce((n, i) => n + i.quantity, 0)
  );

  return (
    <nav
      className="xl:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-(--color-border) bg-white safe-area-inset-bottom"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch h-16">
        {NAV_ITEMS.map(({ href, icon: Icon, label, isCart }) => {
          const active =
            href === ROUTES.HOME ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors ${
                active
                  ? "text-(--color-primary)"
                  : "text-(--color-text-muted) hover:text-(--color-primary)"
              }`}
            >
              <span className="relative">
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                {isCart && serverItemCount > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-(--color-cta) px-1 text-[10px] font-bold text-white leading-none">
                    {serverItemCount > 99 ? "99+" : serverItemCount}
                  </span>
                )}
              </span>
              <span className={active ? "font-semibold" : ""}>{label}</span>
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-(--color-primary)" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
