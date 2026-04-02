"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaHeadset,
  FaChevronDown,
  FaGlobe,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBolt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { HiOutlineCurrencyDollar } from "react-icons/hi";

const topRightLinks = [
  { label: "About us", href: "/about" },
  { label: "My Account", href: "/my-account" },
  { label: "My Wishlist", href: "/wishlist" },
  { label: "Order Tracking", href: "/order-tracking" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      {/* ========== Top Bar ========== */}
      <div className="bg-[#088178]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center xl:justify-between justify-center">
            {/* Left side */}
            <div className="xl:flex items-center gap-x-6 hidden">
              {/* Support */}
              <p className="flex items-center gap-x-2 text-white text-sm leading-[22px]">
                <span>
                  <FaHeadset className="text-lg text-white" />
                </span>
                Need Support ?
                <span>Call Us</span>
                <a
                  href="tel:4805550103"
                  className="bg-[#F5A623] py-px px-2 text-xs leading-[18px] rounded-[60px] text-gray-800 font-medium"
                >
                  01577-303608
                </a>
              </p>

             
            </div>

            {/* Center - Promo */}
            <div className="flex items-center gap-x-2 py-3 xl:py-0">
              <FaBolt className="text-[#F5A623] text-lg" />
              <p className="text-white text-sm leading-[22px]">
                Fashion Category
                <span className="bg-[#F5A623] text-gray-800 text-xs font-semibold py-px px-2 rounded-[60px] mx-1.5">
                  25% OFF
                </span>
                Today
              </p>
            </div>

            {/* Right side links */}
            <div className="xl:flex items-center hidden">
              {topRightLinks.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm leading-[22px] text-white py-3.5 ${
                    index < topRightLinks.length - 1
                      ? "pr-[19px] mr-[19px] relative after:absolute after:h-[30px] after:w-px after:bg-[#5ed9ba] after:right-0 after:top-1/2 after:-translate-y-1/2"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========== Main Header (Desktop) ========== */}
      <div className="py-4 hidden xl:block bg-white">
        <div className=" mx-auto px-4">
          <div className="flex items-center">
            {/* Logo */}
            <div>
              <Link suppressHydrationWarning href="/" className="text-2xl font-bold text-[#088178]">
                andgate
              </Link>
            </div>

            {/* Right side: Search + Account + Cart */}
            <div className="flex items-center w-full justify-end gap-x-[54px]">
              {/* Search Bar */}
              <div className="relative w-full 2xl:max-w-[800px] xl:max-w-[600px]">
                <div className="flex items-center border border-gray-300 rounded-full px-6 py-3">
                  <input
                    type="text"
                    placeholder="Search for the Items"
                    className="flex-1 text-base outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                  />
                  <FaSearch className="text-gray-500 text-lg" />
                </div>
              </div>

              {/* Account & Cart */}
              <ul className="flex items-center gap-x-6">
                {/* Account */}
                <li className="flex items-center gap-x-4 cursor-pointer relative group">
                  <span className="inline-flex items-center justify-center bg-[#F5A623] w-12 h-12 rounded-full">
                    <FaUser className="text-lg text-gray-800" />
                  </span>
                  <p className="flex flex-col text-gray-500 text-sm leading-[22px]">
                    Account
                    <span className="text-base leading-6 text-gray-900 font-medium">
                      log in
                    </span>
                  </p>
                  <FaChevronDown className="text-lg text-gray-800" />
                </li>

                {/* Cart */}
                <li className="flex items-center">
                  <Link
                    href="/cart"
                    className="flex items-center gap-x-4 cursor-pointer"
                  >
                    <span className="inline-flex items-center justify-center bg-[#F5A623] w-12 h-12 rounded-full">
                      <FaShoppingCart className="text-lg text-gray-800" />
                    </span>
                    <span className="flex flex-col items-start">
                      <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium mb-0.5">Cart</span>
                      <span className="text-[15px] leading-none text-gray-900 font-bold">0 Items</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ========== Mobile Header ========== */}
      <div className="xl:hidden bg-white border-b border-gray-300 py-3 px-4">
        <div className="flex items-center justify-between">
          <Link suppressHydrationWarning href="/" className="text-lg font-bold text-[#088178]">
            andgate
          </Link>
          <div className="flex items-center gap-x-4">
            <Link href="/cart" className="relative">
              <FaShoppingCart className="text-xl text-gray-700" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 cursor-pointer"
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
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search for the Items"
              className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
            />
            <FaSearch className="text-gray-500" />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <nav className="mt-4 pb-4 border-t border-gray-200 pt-4">
            <ul className="flex flex-col gap-y-3">
              {topRightLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-700 text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/my-account"
                  className="text-gray-700 text-sm font-medium flex items-center gap-x-2"
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
    </header>
  );
}
