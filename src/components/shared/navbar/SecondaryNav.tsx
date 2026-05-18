"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { resolveImageUrl } from "@/lib/imageUrl";
import { resolveStoreLogoUrl } from "@/lib/storeLogo";
import {
  FaChevronDown,
  FaHeart,
  FaHome,
  FaPhoneAlt,
  FaStore,
  FaThLarge,
  FaFireAlt,
  FaWineBottle,
} from "react-icons/fa";
import { FiArrowRight, FiGrid, FiMapPin } from "react-icons/fi";
import { ROUTES, ROUTE_BUILDERS } from "@/config/routes";
import GeneratedImageFallback from "@/components/shared/GeneratedImageFallback";
import type { Brand, Category, Store } from "@/types";

const navLinks = [
  { label: "Home", href: ROUTES.HOME, hasDropdown: false, icon: FaHome },
  { label: "Categories", href: ROUTES.CATEGORY, hasDropdown: true, icon: FaThLarge },
  { label: "Daily Deals", href: ROUTES.DEAL_OF_DAY, hasDropdown: false, icon: FaFireAlt },
  { label: "Popular Picks", href: ROUTES.POPULAR_PRODUCT, hasDropdown: false, icon: FaHeart },
  { label: "Stores", href: ROUTES.STORE, hasDropdown: true, icon: FaStore },
  { label: "Brands", href: ROUTES.BRAND, hasDropdown: true, icon: FaWineBottle },
];

interface SecondaryNavProps {
  categories: Category[];
  brands: Brand[];
  stores: Store[];
}

export default function SecondaryNav({ categories, brands, stores }: SecondaryNavProps) {
  const [openMegaMenu, setOpenMegaMenu] = useState<"Categories" | "Stores" | "Brands" | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const featuredStores = useMemo(() => stores.slice(0, 8), [stores]);
  const featuredBrands = useMemo(() => brands.slice(0, 10), [brands]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpenMegaMenu(null);
      }
    }
    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div className="hidden border-y border-(--color-border) bg-(--color-bg) py-3 xl:block">
      <div className="mx-auto px-4">
        <div ref={wrapperRef} className="relative flex items-center gap-x-6">

          {/* ── Nav links ── */}
          <nav className="flex flex-1 items-center">
            <ul className="flex items-center">
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  className={link.hasDropdown ? "group static" : "relative group"}
                  onMouseEnter={() => {
                    if (link.hasDropdown) {
                      setOpenMegaMenu(link.label as "Categories" | "Stores" | "Brands");
                    }
                  }}
                  onMouseLeave={() => {
                    if (link.hasDropdown) {
                      setOpenMegaMenu(null);
                    }
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpenMegaMenu(null)}
                    className="flex items-center gap-x-1 px-3.5 py-3 text-[15px] font-medium text-(--color-dark) transition-colors hover:text-(--color-primary)"
                  >
                    {"icon" in link && link.icon ? (
                      <span className="mr-1 inline-flex items-center justify-center" aria-hidden="true">
                        <link.icon
                          className={`${link.label === "Daily Deals" ? "nav-fire-icon text-[18px]" : "text-[15px]"} text-(--color-cta)`}
                        />
                      </span>
                    ) : null}
                    {link.label}
                    {link.hasDropdown ? (
                      <FaChevronDown className="text-[10px] text-(--color-text-muted)" />
                    ) : null}
                  </Link>

                  {/* ── Category mega-menu ── */}
                  {link.label === "Categories" ? (
                    <div className={`absolute left-0 top-full z-50 w-full transition-all duration-300 ${openMegaMenu === "Categories" ? "visible translate-y-0 opacity-100" : "invisible translate-y-4 opacity-0"}`}>
                      <div className="mt-1 grid w-full grid-cols-[1fr_300px] gap-5 rounded-lg border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_30px_70px_rgba(17,17,17,0.08)]">
                        <div className="min-w-0">
                          <div className="mb-4 flex items-center justify-between gap-4">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-primary)">Shop by category</p>
                              <p className="mt-1 text-sm text-(--color-text-muted)">Start broad, then refine by brand, price, and product options.</p>
                            </div>
                            <Link
                              href={ROUTES.CATEGORY}
                              onClick={() => setOpenMegaMenu(null)}
                              className="inline-flex items-center gap-2 rounded-lg border border-(--color-border) px-3 py-2 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary-200) hover:text-(--color-primary)"
                            >
                              View all
                              <FiArrowRight className="text-sm" />
                            </Link>
                          </div>

                          {categories.length === 0 ? (
                            <p className="rounded-lg border border-dashed border-(--color-border) py-8 text-center text-sm text-(--color-text-muted)">No categories found.</p>
                          ) : (
                            <div className="grid grid-cols-6 gap-3">
                              {categories.slice(0, 12).map((category) => (
                                <Link
                                  key={category.id}
                                  href={ROUTE_BUILDERS.categoryDetail(category.slug)}
                                  onClick={() => setOpenMegaMenu(null)}
                                  className="group flex min-h-[116px] flex-col items-center rounded-lg border border-(--color-border) bg-(--color-bg-subtle) p-3 text-center transition hover:-translate-y-0.5 hover:border-(--color-primary-200) hover:bg-(--color-bg) hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
                                >
                                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-(--color-bg)">
                                    {resolveImageUrl(category.image_url) ? (
                                      <Image
                                        src={resolveImageUrl(category.image_url)!}
                                        alt=""
                                        width={42}
                                        height={42}
                                        className="h-auto w-auto max-h-[40px] max-w-[40px] object-contain"
                                      />
                                    ) : (
                                      <GeneratedImageFallback
                                        name={category.name}
                                        kind="category"
                                        className="h-11 w-11 rounded-lg border"
                                        iconClassName="text-[12px]"
                                        textClassName="text-[15px]"
                                      />
                                    )}
                                  </div>
                                  <span className="mt-3 line-clamp-2 text-[12px] font-semibold leading-snug text-(--color-dark) group-hover:text-(--color-primary)">
                                    {category.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col rounded-lg border border-(--color-primary-200) bg-(--color-primary-50) p-5">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-(--color-bg) text-(--color-primary) shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                            <FiGrid className="text-[22px]" />
                          </div>
                          <h3 className="mt-5 text-2xl font-bold leading-tight text-(--color-primary-900)">
                            Find products faster
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-(--color-text-muted)">
                            Browse category pages with product filters, prices, brands, and faceted options.
                          </p>
                          <div className="mt-auto pt-6">
                            <Link
                              href={ROUTES.PRODUCT}
                              onClick={() => setOpenMegaMenu(null)}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-(--color-primary) px-4 py-3 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
                            >
                              Browse Products
                              <FiArrowRight className="text-sm" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* ── Store mega-menu ── */}
                  {link.label === "Stores" ? (
                    <div className={`absolute left-0 top-full z-50 w-full transition-all duration-300 ${openMegaMenu === "Stores" ? "visible translate-y-0 opacity-100" : "invisible translate-y-4 opacity-0"}`}>
                      <div className="mt-1 grid w-full grid-cols-[1fr_300px] gap-5 rounded-lg border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_30px_70px_rgba(17,17,17,0.08)]">
                        <div className="min-w-0">
                          <div className="mb-4 flex items-center justify-between gap-4">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-primary)">Featured stores</p>
                              <p className="mt-1 text-sm text-(--color-text-muted)">Jump into active storefronts fast.</p>
                            </div>
                            <Link
                              href={ROUTES.STORE}
                              onClick={() => setOpenMegaMenu(null)}
                              className="inline-flex items-center gap-2 rounded-lg border border-(--color-border) px-3 py-2 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary-200) hover:text-(--color-primary)"
                            >
                              View all
                              <FiArrowRight className="text-sm" />
                            </Link>
                          </div>

                          {stores.length === 0 ? (
                            <p className="rounded-lg border border-dashed border-(--color-border) py-8 text-center text-sm text-(--color-text-muted)">No stores available.</p>
                          ) : (
                            <ul className="grid grid-cols-4 gap-3">
                              {featuredStores.map((store) => {
                                const logo = resolveStoreLogoUrl(store.logo_path);
                                return (
                                  <li key={store.id}>
                                    <Link
                                      href={ROUTE_BUILDERS.storeDetail(store.slug)}
                                      onClick={() => setOpenMegaMenu(null)}
                                      className="group/item flex min-h-[128px] flex-col rounded-lg border border-(--color-border) bg-(--color-bg-subtle) p-3 transition hover:-translate-y-0.5 hover:border-(--color-primary-200) hover:bg-(--color-bg) hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
                                    >
                                      <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-primary)">
                                        {logo ? (
                                          <Image
                                            src={logo}
                                            alt=""
                                            width={44}
                                            height={44}
                                            className="h-full w-full object-cover"
                                          />
                                        ) : (
                                        <FaStore className="text-base" />
                                        )}
                                      </div>
                                      <span className="line-clamp-2 text-[13px] font-semibold leading-snug text-(--color-dark) group-hover/item:text-(--color-primary)">
                                        {store.store_name}
                                      </span>
                                      <span className="mt-2 flex items-start gap-1 text-[11px] leading-snug text-(--color-text-muted)">
                                        <FiMapPin className="mt-0.5 shrink-0 text-[11px]" />
                                        <span className="line-clamp-2">{store.store_location || "Online store"}</span>
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>

                        <div className="flex flex-col rounded-lg border border-(--color-primary-200) bg-(--color-primary-50) p-5">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-(--color-bg) text-(--color-primary) shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                            <FaStore className="text-[22px]" />
                          </div>
                          <h3 className="mt-5 text-2xl font-bold leading-tight text-(--color-primary-900)">
                            Explore storefronts
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-(--color-text-muted)">
                            Compare sellers, locations, and product collections from one directory.
                          </p>
                          <div className="mt-auto pt-6">
                            <Link
                              href={ROUTES.STORE}
                              onClick={() => setOpenMegaMenu(null)}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-(--color-primary) px-4 py-3 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
                            >
                              Browse Stores
                              <FiArrowRight className="text-sm" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* ── Brand mega-menu ── */}
                  {link.label === "Brands" ? (
                    <div className={`absolute left-0 top-full z-50 w-full transition-all duration-300 ${openMegaMenu === "Brands" ? "visible translate-y-0 opacity-100" : "invisible translate-y-4 opacity-0"}`}>
                      <div className="mt-1 grid w-full grid-cols-[1fr_300px] gap-5 rounded-lg border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_30px_70px_rgba(17,17,17,0.08)]">
                        <div className="min-w-0">
                          <div className="mb-4 flex items-center justify-between gap-4">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-cta-dark)">Brand collections</p>
                              <p className="mt-1 text-sm text-(--color-text-muted)">Open curated brand product pages.</p>
                            </div>
                            <Link
                              href={ROUTES.BRAND}
                              onClick={() => setOpenMegaMenu(null)}
                              className="inline-flex items-center gap-2 rounded-lg border border-(--color-border) px-3 py-2 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary-200) hover:text-(--color-primary)"
                            >
                              View all
                              <FiArrowRight className="text-sm" />
                            </Link>
                          </div>

                          {brands.length === 0 ? (
                            <p className="rounded-lg border border-dashed border-(--color-border) py-8 text-center text-sm text-(--color-text-muted)">No brands available.</p>
                          ) : (
                            <ul className="grid grid-cols-5 gap-3">
                              {featuredBrands.map((brand) => {
                                const logo = resolveImageUrl(brand.image_url);
                                return (
                                  <li key={brand.id}>
                                    <Link
                                      href={ROUTE_BUILDERS.brandDetail(brand.slug)}
                                      onClick={() => setOpenMegaMenu(null)}
                                      className="group/item flex min-h-[122px] flex-col items-center rounded-lg border border-(--color-border) bg-(--color-bg-subtle) p-3 text-center transition hover:-translate-y-0.5 hover:border-(--color-cta-200) hover:bg-(--color-bg) hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
                                    >
                                      <div className="flex h-14 w-full items-center justify-center rounded-lg bg-(--color-bg)">
                                        {logo ? (
                                          <Image
                                            src={logo}
                                            alt=""
                                            width={64}
                                            height={44}
                                            className="h-auto w-auto max-h-[44px] max-w-[76px] object-contain"
                                          />
                                        ) : (
                                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-(--color-cta-100) text-(--color-cta-dark)">
                                            <FaWineBottle className="text-base" />
                                          </div>
                                        )}
                                      </div>
                                      <span className="mt-3 line-clamp-2 text-[13px] font-semibold leading-snug text-(--color-dark) group-hover/item:text-(--color-cta-dark)">
                                        {brand.name}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>

                        <div className="flex flex-col rounded-lg border border-(--color-cta-200) bg-(--color-cta-100) p-5">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-(--color-bg) text-(--color-cta-dark) shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                            <FaWineBottle className="text-[22px]" />
                          </div>
                          <h3 className="mt-5 text-2xl font-bold leading-tight text-(--color-cta-dark)">
                            Shop by brand
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-(--color-text-muted)">
                            Find familiar names and browse products grouped by brand.
                          </p>
                          <div className="mt-auto pt-6">
                            <Link
                              href={ROUTES.BRAND}
                              onClick={() => setOpenMegaMenu(null)}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-(--color-cta) px-4 py-3 text-sm font-semibold text-white transition hover:bg-(--color-cta-hover)"
                            >
                              Browse Brands
                              <FiArrowRight className="text-sm" />
                            </Link>
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

        </div>
      </div>
    </div>
  );
}
