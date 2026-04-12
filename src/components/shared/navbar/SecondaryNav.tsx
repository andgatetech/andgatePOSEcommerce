"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { resolveImageUrl } from "@/lib/imageUrl";
import {
  FaChevronDown,
  FaFireAlt,
  FaHome,
  FaMedal,
  FaPhoneAlt,
  FaStar,
  FaStore,
  FaThLarge,
  FaWineBottle,
} from "react-icons/fa";
import { FiArrowRight, FiGrid } from "react-icons/fi";
import { ROUTES, ROUTE_BUILDERS } from "@/config/routes";
import type { Brand, Category } from "@/types";

const navLinks = [
  { label: "Deal", href: ROUTES.DEALS, hasDropdown: false, icon: FaFireAlt },
  { label: "Top Picks", href: ROUTES.TOP_PICKS, hasDropdown: false, icon: FaMedal },
  { label: "Trending", href: ROUTES.TRENDING, hasDropdown: false, icon: FaStar },
  { label: "Home", href: ROUTES.HOME, hasDropdown: false, icon: FaHome },
  { label: "Store", href: ROUTES.STORE, hasDropdown: false, icon: FaStore },
  { label: "Brand", href: ROUTES.BRAND, hasDropdown: true, icon: FaWineBottle },
];

interface SecondaryNavProps {
  categories: Category[];
  brands: Brand[];
}

export default function SecondaryNav({ categories, brands }: SecondaryNavProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const brandColumns = useMemo(() => {
    const col: typeof brands[] = [[], [], []];
    brands.forEach((brand, i) => col[i % 3].push(brand));
    return col;
  }, [brands]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    }
    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div className="hidden border-y border-(--color-border) bg-(--color-bg) py-3 xl:block">
      <div className="mx-auto px-4">
        <div ref={wrapperRef} className="relative flex items-center gap-x-6">

          {/* ── Explore All Categories button ── */}
          <button
            type="button"
            onClick={() => setIsCategoryOpen((open) => !open)}
            className="flex items-center gap-x-2 rounded-[6px] bg-(--color-primary) px-3 py-2 text-[13px] font-semibold whitespace-nowrap text-(--color-bg) transition-colors hover:bg-(--color-primary-dark)"
          >
            <FaThLarge className="text-base" />
            <span>Explore All Categories</span>
            <FaChevronDown
              className={`ml-1 text-xs transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* ── Nav links ── */}
          <nav className="flex flex-1 items-center">
            <ul className="flex items-center">
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  className={link.label === "Brand" ? "group static" : "relative group"}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-x-1 px-3.5 py-3 text-[15px] font-medium text-(--color-dark) transition-colors hover:text-(--color-primary)"
                  >
                    {"icon" in link && link.icon ? (
                      <span className="mr-1 inline-flex items-center justify-center">
                        <link.icon
                          className={`${link.label === "Deal" ? "nav-fire-icon text-[18px]" : "text-[15px]"} text-(--color-cta)`}
                        />
                      </span>
                    ) : null}
                    {link.label}
                    {link.hasDropdown ? (
                      <FaChevronDown className="text-[10px] text-(--color-text-muted)" />
                    ) : null}
                  </Link>

                  {/* ── Brand mega-menu ── */}
                  {link.label === "Brand" ? (
                    <div className="invisible absolute left-0 top-full z-50 w-full translate-y-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="mt-1 flex w-full rounded-[18px] border border-(--color-border) bg-(--color-bg) p-7 shadow-[0_30px_70px_rgba(17,17,17,0.08)]">
                        <div className="grid flex-1 grid-cols-3 gap-8 pr-8">
                          {brandColumns.map((column, index) => (
                            <div key={index}>
                              <ul className="flex flex-col gap-y-3.5">
                                {column.map((brand) => (
                                  <li key={brand.id}>
                                    <Link
                                      href={ROUTE_BUILDERS.brandDetail(brand.slug)}
                                      className="text-[14px] font-medium text-(--color-text-muted) transition-colors hover:text-(--color-primary)"
                                    >
                                      {brand.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div className="relative w-[330px] overflow-hidden rounded-[18px] border border-(--color-primary-200) bg-(--color-primary-100) p-7">
                          <div className="relative z-10 flex h-full flex-col items-start">
                            <span className="mb-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
                              Featured Brands
                            </span>
                            <h3 className="mb-3 text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] text-(--color-primary-900)">
                              Premium
                              <br />
                              Brand Zone
                            </h3>
                            <p className="mb-7 max-w-[180px] text-sm leading-6 text-(--color-text-muted)">
                              Discover top-quality brands trusted by thousands of customers.
                            </p>
                            <Link
                              href={ROUTES.BRAND}
                              className="mt-auto inline-flex items-center justify-center rounded-full bg-(--color-primary) px-5 py-2.5 text-sm font-semibold text-(--color-bg) transition-colors hover:bg-(--color-primary-dark)"
                            >
                              View All Brands
                            </Link>
                          </div>
                          <div className="absolute -bottom-10 -right-6 h-[180px] w-[180px] rounded-full bg-[color-mix(in_srgb,var(--color-cta)_26%,white)] blur-2xl" />
                          <div className="absolute right-5 top-5 flex h-16 w-16 items-center justify-center rounded-full bg-(--color-bg) text-(--color-primary) shadow-[0_10px_30px_rgba(17,17,17,0.08)]">
                            <FaWineBottle className="text-[28px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Phone ── */}
          <div className="ml-auto flex items-center gap-x-2.5 whitespace-nowrap">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-(--color-primary) text-(--color-primary)">
              <FaPhoneAlt className="text-sm" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-medium text-(--color-text-muted)">24/7 Support</span>
              <a
                href="tel:01577303608"
                className="text-sm font-bold text-(--color-dark) transition-colors hover:text-(--color-primary)"
              >
                01577-303608
              </a>
            </div>
          </div>

          {/* ── Category dropdown panel ── */}
          {isCategoryOpen && (
            <div className="absolute left-0 top-[calc(100%+12px)] z-40 w-[440px] overflow-hidden rounded-[20px] border border-(--color-border) bg-(--color-bg) shadow-[0_32px_80px_rgba(17,17,17,0.10)]">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-(--color-border) px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-(--color-primary-100) text-(--color-primary)">
                    <FiGrid className="text-base" />
                  </span>
                  <span className="text-[15px] font-semibold tracking-[-0.02em] text-(--color-dark)">
                    All Categories
                  </span>
                </div>
                <Link
                  href={ROUTES.CATEGORY}
                  onClick={() => setIsCategoryOpen(false)}
                  className="flex items-center gap-1 text-[13px] font-medium text-(--color-primary) transition-opacity hover:opacity-75"
                >
                  View all
                  <FiArrowRight className="text-sm" />
                </Link>
              </div>

              {/* Category grid */}
              <div className="p-4">
                {categories.length === 0 ? (
                  <p className="py-8 text-center text-sm text-(--color-text-muted)">
                    No categories found.
                  </p>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={ROUTE_BUILDERS.categoryDetail(category.slug)}
                        onClick={() => setIsCategoryOpen(false)}
                        className="group flex flex-col items-center gap-2.5 rounded-[14px] px-2 py-4 text-center transition-colors hover:bg-(--color-primary-100)"
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F3F4F6] transition-transform duration-200 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(44,95,138,0.12)]">
                          {resolveImageUrl(category.image_url) ? (
                            <Image
                              src={resolveImageUrl(category.image_url)!}
                              alt={category.name}
                              width={40}
                              height={40}
                              unoptimized
                              className="h-auto w-auto max-h-[36px] max-w-[36px] object-contain"
                            />
                          ) : (
                            <span className="text-xl text-(--color-primary-200)">
                              <FiGrid />
                            </span>
                          )}
                        </div>
                        <span className="line-clamp-2 text-[12px] font-semibold leading-[1.3] tracking-[-0.02em] text-(--color-dark)">
                          {category.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer CTA */}
              <div className="border-t border-(--color-border) bg-[#fafafa] px-6 py-3.5">
                <Link
                  href={ROUTES.CATEGORY}
                  onClick={() => setIsCategoryOpen(false)}
                  className="flex items-center justify-center gap-2 text-[13px] font-semibold text-(--color-primary) transition-opacity hover:opacity-75"
                >
                  <span>Browse all categories</span>
                  <FiArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
