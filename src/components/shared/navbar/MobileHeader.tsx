"use client";

import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../Logo";

const mobileNavLinks = [
  { label: "About us", href: "/about" },
  { label: "My Account", href: "/my-account" },
  { label: "My Wishlist", href: "/wishlist" },
  { label: "Order Tracking", href: "/order-tracking" },
];

export default function MobileHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="xl:hidden bg-(--color-bg) border-b border-(--color-border) py-3 px-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Logo width={140} height={38} />
        <div className="flex items-center gap-x-4">
          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-xl text-(--color-primary)" />
          </Link>
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
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mt-3">
        <div className="flex items-center border border-(--color-border) rounded-full px-4 py-2 focus-within:border-(--color-primary) transition-all">
          <input
            type="text"
            placeholder="Search for the Items"
            className="flex-1 text-sm outline-none bg-transparent text-(--color-dark) placeholder:text-gray-400"
          />
          <FaSearch className="text-(--color-primary)" />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <nav className="mt-4 pb-4 border-t border-(--color-border) pt-4">
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
              <Link
                href="/login"
                className="text-(--color-dark) text-sm font-medium flex items-center gap-x-2 hover:text-(--color-cta) transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUser className="text-sm" />
                Account / Log in
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
