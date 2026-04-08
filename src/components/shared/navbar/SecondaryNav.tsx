"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FaChevronDown,
  FaFireAlt,
  FaHome,
  FaMedal,
  FaPhoneAlt,
  FaRegCircle,
  FaStore,
  FaThLarge,
  FaWineBottle,
} from "react-icons/fa";
import {
  GiBread,
  GiCarrot,
  GiDogBowl,
  GiFruitBowl,
  GiLipstick,
  GiMilkCarton,
  GiCoffin,
  GiShrimp,
} from "react-icons/gi";
import { LuPlus } from "react-icons/lu";
import { ROUTES } from "@/config/routes";

const navLinks = [
  { label: "Deal", href: ROUTES.DEALS, hasDropdown: false, icon: FaFireAlt },
  { label: "Top Picks", href: ROUTES.TOP_PICKS, hasDropdown: false, icon: FaMedal },
  { label: "Home", href: ROUTES.HOME, hasDropdown: false, icon: FaHome },
  { label: "Store", href: ROUTES.STORE, hasDropdown: false, icon: FaStore },
  { label: "Brand", href: ROUTES.BRAND, hasDropdown: true, icon: FaWineBottle },
];

const categories = [
  { label: "Milks and Diaries", href: ROUTES.CATEGORY, icon: GiMilkCarton },
  { label: "Wines & Drinks", href: ROUTES.CATEGORY, icon: FaWineBottle },
  { label: "Clothing & beauty", href: ROUTES.CATEGORY, icon: GiLipstick },
  { label: "Fresh Seafood", href: ROUTES.CATEGORY, icon: GiShrimp },
  { label: "Pet Foods & Toy", href: ROUTES.CATEGORY, icon: GiDogBowl },
  { label: "Fast food", href: ROUTES.CATEGORY, icon: FaRegCircle },
  { label: "Baking material", href: ROUTES.CATEGORY, icon: GiCoffin },
  { label: "Vegetables", href: ROUTES.CATEGORY, icon: GiCarrot },
  { label: "Fresh Fruit", href: ROUTES.CATEGORY, icon: GiFruitBowl },
  { label: "Bread and Juice", href: ROUTES.CATEGORY, icon: GiBread },
];

const brandMenuColumns = [
  [
    "Andgate Tech",
    "FreshWave",
    "Nordic Cool",
    "VoltGrid",
    "LumenMax",
    "UrbanSteel",
  ],
  [
    "Solaris",
    "CleanFlow",
    "Kitchen Pro",
    "Bright Home",
    "Cool Master",
    "Prime Build",
  ],
  [
    "PowerHub",
    "SafeWire",
    "Pure Basin",
    "Thermo X",
    "AquaForm",
    "Daily Fresh",
  ],
];

export default function SecondaryNav() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

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
          <button
            type="button"
            onClick={() => setIsCategoryOpen((open) => !open)}
            className="flex items-center gap-x-2 rounded-[8px] bg-(--color-primary) px-5 py-3 text-sm font-semibold whitespace-nowrap text-(--color-bg) transition-colors hover:bg-(--color-primary-dark)"
          >
            <FaThLarge className="text-base" />
            <span>Explore All Categories</span>
            <FaChevronDown
              className={`ml-1 text-xs transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}
            />
          </button>

          <nav className="flex flex-1 items-center">
            <ul className="flex items-center">
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  className={link.label === "Brand" ? "group static" : "relative group"}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-x-1 px-3.5 py-3 text-sm font-medium text-(--color-dark) transition-colors hover:text-(--color-primary)"
                  >
                    {"icon" in link && link.icon ? (
                      <span className="mr-1 inline-flex items-center justify-center">
                        <link.icon
                          className={`text-sm text-(--color-cta) ${
                            link.label === "Deal" ? "nav-fire-icon" : ""
                          }`}
                        />
                      </span>
                    ) : null}
                    {link.label}
                    {link.hasDropdown ? (
                      <FaChevronDown className="text-[10px] text-(--color-text-muted)" />
                    ) : null}
                  </Link>

                  {link.label === "Brand" ? (
                    <div className="invisible absolute left-0 top-full z-50 w-full translate-y-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="mt-1 flex w-full rounded-[18px] border border-(--color-border) bg-(--color-bg) p-7 shadow-[0_30px_70px_rgba(17,17,17,0.08)]">
                        <div className="grid flex-1 grid-cols-3 gap-8 pr-8">
                          {brandMenuColumns.map((column, index) => (
                            <div key={index}>
                              <ul className="flex flex-col gap-y-3.5">
                                {column.map((item) => (
                                  <li key={item}>
                                    <Link
                                      href={ROUTES.BRAND}
                                      className="text-[14px] font-medium text-(--color-text-muted) transition-colors hover:text-(--color-primary)"
                                    >
                                      {item}
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
                              Explore trusted mock brands now. Later this block can be powered by dynamic brand data.
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

          {isCategoryOpen ? (
            <div className="absolute left-0 top-[calc(100%+16px)] z-40 w-[480px] rounded-[18px] border border-(--color-primary-200) bg-(--color-bg) p-6 shadow-[0_24px_60px_rgba(17,17,17,0.08)]">
              <div className="grid grid-cols-2 gap-2.5">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.label}
                      href={category.href}
                      onClick={() => setIsCategoryOpen(false)}
                      className="flex min-h-[50px] items-center gap-2.5 rounded-[10px] border border-(--color-border) bg-(--color-bg) px-3.5 py-2.5 text-(--color-dark) transition-colors hover:border-(--color-primary-200) hover:bg-(--color-primary-100)"
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--color-primary-100) text-[21px] text-(--color-success)">
                        <Icon />
                      </span>
                      <span className="text-[14px] font-semibold tracking-[-0.02em]">
                        {category.label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-5 flex justify-center">
                <Link
                  href={ROUTES.CATEGORY}
                  onClick={() => setIsCategoryOpen(false)}
                  className="inline-flex items-center gap-3 rounded-full px-4 py-2 text-[15px] font-semibold text-(--color-dark) transition-colors hover:text-(--color-primary)"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-(--color-success) text-(--color-success)">
                    <LuPlus className="text-[20px]" />
                  </span>
                  <span>See all</span>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
