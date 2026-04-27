"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import {
  FiHeart,
  FiShare2,
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiHome,
  FiCheck,
  FiCopy,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiAward,
} from "react-icons/fi";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ROUTES, ROUTE_BUILDERS } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import { useAppSelector } from "@/lib/hooks";
import GeneratedImageFallback from "@/components/shared/GeneratedImageFallback";
import { useCheckStockQuery } from "@/features/cart/cartApi";
import { useGetWishlistQuery, useToggleWishlistMutation } from "@/features/wishlist/wishlistApi";
import AddToCartButton from "./AddToCartButton";
import type { EcommerceProduct } from "@/types";

interface ProductDetailPageProps {
  product: EcommerceProduct;
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const pathname = usePathname();
  const shareMenuRef = useRef<HTMLDivElement | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [quantityInput, setQuantityInput] = useState("1");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedVariantSlug, setSelectedVariantSlug] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [toggleWishlist, { isLoading: isTogglingWishlist }] = useToggleWishlistMutation();
  const { data: wishlistData } = useGetWishlistQuery(undefined, { skip: !isAuthenticated });

  const isWishlisted = wishlistData?.items.some((item) => item.stock.id === product.id) ?? false;

  async function handleToggleWishlist() {
    if (!isAuthenticated) {
      toast.error("Please login to save items.");
      return;
    }
    const result = await toggleWishlist({ stock_id: product.id });
    if ("error" in result) {
      toast.error("Failed to update wishlist.");
    } else if ("data" in result) {
      toast.success(result.data.data.added ? "Added to wishlist." : "Removed from wishlist.");
    }
  }

  const resolvedImages = product.images
    .map((img) => resolveImageUrl(img.url))
    .filter(Boolean) as string[];

  const displayPrice = parseFloat(product.price).toLocaleString("en-BD");
  const stockCount = parseFloat(product.quantity);

  const {
    data: stockCheckData,
    isFetching: isCheckingStock,
  } = useCheckStockQuery(
    { stock_id: product.id },
    { refetchOnMountOrArgChange: true },
  );
  const realTimeStock = stockCheckData?.stocks?.[0]?.quantity;
  const effectiveStockCount = realTimeStock ?? stockCount;

  const variantEntries = product.variant_data
    ? Object.entries(product.variant_data)
    : [];

  const tabs = [
    { key: "description", label: "Description" },
    { key: "additional", label: "Additional Info" },
    { key: "vendor", label: "Vendor" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    setShareUrl(`${window.location.origin}${pathname}`);
  }, [pathname]);

  useEffect(() => {
    if (!copied) return;
    const timeoutId = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!shareMenuRef.current?.contains(event.target as Node)) {
        setShareMenuOpen(false);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (realTimeStock !== undefined && quantity > realTimeStock) {
      setQuantity(Math.max(1, realTimeStock));
    }
  }, [realTimeStock]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setQuantityInput(String(quantity));
  }, [quantity]);

  function handleQuantityInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantityInput(event.target.value.replace(/[^0-9]/g, ""));
  }

  function commitQuantityInput() {
    const parsed = parseInt(quantityInput, 10);
    const maxAllowed = Math.max(1, effectiveStockCount);
    let next: number;
    if (!Number.isFinite(parsed) || parsed < 1) {
      next = 1;
    } else if (effectiveStockCount > 0 && parsed > effectiveStockCount) {
      next = maxAllowed;
      toast.error(`Only ${effectiveStockCount} available.`);
    } else {
      next = parsed;
    }
    setQuantity(next);
    setQuantityInput(String(next));
  }

  function handleQuantityKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  }

  const shareTitle = product.product_name;
  const shareText = `${product.product_name} from ${product.sold_by.store_name}`;
  const shareImage = resolvedImages[0] ?? "";
  const canNativeShare = typeof navigator !== "undefined" && "share" in navigator;

  async function handleNativeShare() {
    if (typeof navigator === "undefined" || !navigator.share || !shareUrl) return;

    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      });
    } catch {
      // Ignore cancelled native share actions.
    }
  }

  async function handleCopyLink() {
    if (typeof navigator === "undefined" || !navigator.clipboard || !shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setShareMenuOpen(false);
  }

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);
  const shareLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      icon: FaWhatsapp,
      className: "bg-[#ecfff4] text-[#128c4a] hover:bg-[#dcf8e7]",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FaFacebookF,
      className: "bg-[#eef4ff] text-[#1877f2] hover:bg-[#dfeaff]",
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      icon: FaXTwitter,
      className: "bg-[#f4f4f5] text-[#111111] hover:bg-[#e8e8ea]",
    },
  ];

  const trustSignals = [
    {
      icon: FiTruck,
      title: "Free Delivery",
      subtitle: "On orders over ৳2,000",
    },
    {
      icon: FiRefreshCw,
      title: "Easy Returns",
      subtitle: "7-day return policy",
    },
    {
      icon: FiShield,
      title: "Secure Payment",
      subtitle: "100% protected checkout",
    },
    {
      icon: FiAward,
      title: "Authentic Product",
      subtitle: "Verified by Andgate",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      {/* ── Breadcrumb ──────────────────────────────────────────────── */}
      <div className="border-b border-(--color-border) bg-white">
        <div className="mx-auto px-4 py-3 md:px-5 lg:px-7 xl:px-8">
          <nav
            className="flex items-center gap-2 text-[13px]"
            style={{ color: "var(--color-text-muted)" }}
          >
            <Link
              href={ROUTES.HOME}
              className="flex items-center gap-1 transition hover:text-(--color-primary)"
            >
              <FiHome size={13} />
              <span>Home</span>
            </Link>
            <FiChevronRight size={12} />
            {product.category && (
              <>
                <Link
                  href={ROUTE_BUILDERS.categoryDetail(product.category.slug)}
                  className="transition hover:text-(--color-primary)"
                >
                  {product.category.name}
                </Link>
                <FiChevronRight size={12} />
              </>
            )}
            <span
              className="line-clamp-1 max-w-[240px] font-medium"
              style={{ color: "var(--color-primary-900)" }}
            >
              {product.product_name}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Main Product Section ─────────────────────────────────────── */}
      <div className="mx-auto px-4 py-6 md:px-5 md:py-8 lg:px-7 xl:px-8">
        <div className="overflow-hidden rounded-[22px] border border-(--color-border) bg-white shadow-[0_1px_3px_rgba(17,17,17,0.04)]">
          <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">

            {/* LEFT – Image Gallery */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              <div className="flex flex-col-reverse gap-4 sm:flex-row">
                {/* Thumbnail rail */}
                {resolvedImages.length > 1 && (
                  <div className="flex flex-row gap-3 sm:flex-col">
                    {resolvedImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        aria-label={`View image ${i + 1}`}
                        className={`relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-[10px] border-2 bg-white transition sm:h-[72px] sm:w-[72px] ${
                          activeImage === i
                            ? "border-(--color-primary) shadow-[0_4px_12px_rgba(44,95,138,0.18)]"
                            : "border-(--color-border) hover:border-(--color-primary-200)"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.product_name} thumbnail ${i + 1}`}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main image */}
                <div className="group relative flex-1 overflow-hidden rounded-[16px] border border-(--color-border) bg-[#fafbfc]">
                  <div className="relative aspect-square w-full">
                    {resolvedImages.length > 0 ? (
                      <Image
                        src={resolvedImages[activeImage] ?? resolvedImages[0]}
                        alt={product.product_name}
                        fill
                        unoptimized
                        priority
                        className="object-contain p-6 transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <GeneratedImageFallback
                        name={product.product_name}
                        kind="product"
                        showLabel
                        className="h-full w-full border-0"
                        iconClassName="text-[34px]"
                        textClassName="text-[44px]"
                      />
                    )}
                  </div>

                  {/* Stock pill overlay */}
                  <div className="pointer-events-none absolute left-4 top-4">
                    {effectiveStockCount > 0 ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-(--color-success) shadow-sm backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-(--color-success)" />
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-(--color-danger) shadow-sm backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-(--color-danger)" />
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT – Product Info */}
            <div className="flex flex-col gap-5">
              {/* Category + Brand badges */}
              <div className="flex flex-wrap gap-2">
                {product.category && (
                  <Link
                    href={ROUTE_BUILDERS.categoryDetail(product.category.slug)}
                    className="inline-flex rounded-full bg-(--color-primary-100) px-3 py-1 text-[12px] font-semibold text-(--color-primary) transition hover:bg-(--color-primary-200)"
                  >
                    {product.category.name}
                  </Link>
                )}
                {product.brand && (
                  <Link
                    href={ROUTE_BUILDERS.brandDetail(product.brand.slug)}
                    className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-[12px] font-semibold text-amber-700 transition hover:bg-amber-100"
                  >
                    {product.brand.name}
                  </Link>
                )}
              </div>

              {/* Title */}
              <h1
                className="text-[26px] font-bold leading-[1.25] tracking-tight md:text-[30px] lg:text-[32px]"
                style={{ color: "var(--color-primary-900)" }}
              >
                {product.product_name}
              </h1>

              {/* SKU + Sold by inline */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]" style={{ color: "var(--color-text-muted)" }}>
                <span>
                  SKU: <span className="font-medium" style={{ color: "var(--color-primary-900)" }}>{product.sku}</span>
                </span>
                <span className="hidden h-3 w-px bg-(--color-border) sm:block" />
                <span>
                  Sold by: <span className="font-medium" style={{ color: "var(--color-primary)" }}>{product.sold_by.store_name}</span>
                </span>
              </div>

              {/* Price card */}
              <div className="rounded-[14px] border border-(--color-border) bg-[#fafbfc] p-4">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span
                    className="text-[36px] font-bold leading-none md:text-[40px]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    ৳{displayPrice}
                  </span>
                  <span
                    className="text-[13px] font-medium"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    incl. of all taxes
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[13px]">
                  {isCheckingStock ? (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1 font-semibold text-gray-600">
                      Checking stock...
                    </span>
                  ) : effectiveStockCount > 0 ? (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1 font-semibold text-(--color-success)">
                      <FiCheck size={13} />
                      {effectiveStockCount} units available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-2.5 py-1 font-semibold text-(--color-danger)">
                      Currently unavailable
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <p
                  className="text-[15px] leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {product.description.length > 220
                    ? `${product.description.slice(0, 220).trim()}...`
                    : product.description}
                </p>
              )}

              {/* Current variant attributes */}
              {variantEntries.length > 0 && (
                <div className="rounded-[12px] border border-(--color-border) bg-white p-4">
                  <p
                    className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em]"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Specifications
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {variantEntries.map(([key, val]) => (
                      <div key={key} className="flex items-center gap-2 text-[14px]">
                        <span
                          className="font-medium"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {key}:
                        </span>
                        <span
                          className="rounded-md bg-(--color-primary-100) px-2.5 py-0.5 font-semibold"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other variants */}
              {product.other_variants && product.other_variants.length > 0 && (
                <div>
                  <p
                    className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.1em]"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Other Variants
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.other_variants.map((variant) => {
                      const label = variant.variant_data
                        ? Object.values(variant.variant_data).join(" / ")
                        : variant.sku;
                      const isSelected = selectedVariantSlug === variant.slug;
                      return (
                        <Link
                          key={variant.slug}
                          href={ROUTE_BUILDERS.productDetail(variant.slug)}
                          onClick={() => setSelectedVariantSlug(variant.slug)}
                          className={`rounded-[10px] border-2 px-4 py-2 text-[14px] font-medium transition ${
                            isSelected
                              ? "border-(--color-primary) bg-(--color-primary) text-white shadow-[0_4px_12px_rgba(44,95,138,0.18)]"
                              : "border-(--color-border) bg-white hover:border-(--color-primary-200) hover:bg-(--color-primary-100)"
                          }`}
                          style={!isSelected ? { color: "var(--color-primary-900)" } : undefined}
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity label */}
              <div className="flex items-center gap-3 pt-1">
                <span
                  className="text-[13px] font-semibold uppercase tracking-[0.1em]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Quantity
                </span>
                <div className="h-px flex-1 bg-(--color-border)" />
              </div>

              {/* Qty + Add to Cart + Wishlist + Share */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex h-[46px] items-center rounded-full border border-(--color-border) bg-white px-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100) disabled:opacity-40"
                  >
                    <FiMinus size={15} />
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={quantityInput}
                    onChange={handleQuantityInputChange}
                    onBlur={commitQuantityInput}
                    onKeyDown={handleQuantityKeyDown}
                    disabled={effectiveStockCount === 0}
                    aria-label="Quantity"
                    style={{ width: `${Math.max(quantityInput.length + 1, 3)}ch` }}
                    className="mx-1 rounded bg-transparent text-center text-base font-semibold text-(--color-primary-900) outline-none focus:ring-1 focus:ring-(--color-primary) disabled:opacity-40 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) =>
                        effectiveStockCount > 0 ? Math.min(effectiveStockCount, q + 1) : q,
                      )
                    }
                    disabled={effectiveStockCount === 0 || quantity >= effectiveStockCount}
                    aria-label="Increase quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100) disabled:opacity-40"
                  >
                    <FiPlus size={15} />
                  </button>
                </div>

                <AddToCartButton
                  stockId={product.id}
                  stockCount={effectiveStockCount}
                  product={{
                    id: product.id,
                    slug: product.slug,
                    sku: product.sku,
                    price: product.price,
                    available_qty: effectiveStockCount,
                    variant_data: product.variant_data,
                    product_name: product.product_name,
                    description: product.description,
                    images: product.images,
                    store: {
                      id: 0,
                      store_name: product.sold_by.store_name,
                      slug: product.sold_by.store_slug,
                    },
                  }}
                  quantity={quantity}
                />

                <button
                  onClick={handleToggleWishlist}
                  disabled={isTogglingWishlist}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  className={`flex h-[46px] w-[46px] items-center justify-center rounded-[10px] border-2 transition disabled:opacity-50 ${
                    isWishlisted
                      ? "border-(--color-danger) bg-red-50 text-(--color-danger)"
                      : "border-(--color-border) bg-white text-(--color-text-muted) hover:border-(--color-danger) hover:text-(--color-danger)"
                  }`}
                >
                  <FiHeart size={18} className={isWishlisted ? "fill-current" : ""} />
                </button>

                <div ref={shareMenuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setShareMenuOpen((open) => !open)}
                    aria-label="Share product"
                    className="flex h-[46px] w-[46px] items-center justify-center rounded-[10px] border-2 border-(--color-border) bg-white transition hover:border-(--color-primary) hover:text-(--color-primary)"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <FiShare2 size={18} />
                  </button>

                  {shareMenuOpen ? (
                    <div className="absolute right-0 top-[calc(100%+10px)] z-30 min-w-[240px] rounded-[16px] border border-(--color-border) bg-white p-2 shadow-[0_20px_45px_rgba(17,17,17,0.12)]">
                      <div className="flex items-center justify-between gap-2 px-2 py-1.5">
                        <p
                          className="text-[12px] font-semibold uppercase tracking-[0.12em]"
                          style={{ color: "var(--color-primary-900)" }}
                        >
                          Share
                        </p>
                        {canNativeShare ? (
                          <button
                            type="button"
                            onClick={handleNativeShare}
                            className="rounded-full bg-(--color-primary-100) px-3 py-1 text-[11px] font-semibold text-(--color-primary) transition hover:bg-(--color-primary-200)"
                          >
                            More
                          </button>
                        ) : null}
                      </div>

                      <div className="mt-1 grid grid-cols-4 gap-2 px-2 pb-2">
                        {shareLinks.map(({ label, href, icon: Icon, className }) => (
                          <a
                            key={label}
                            href={shareUrl ? href : undefined}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Share on ${label}`}
                            className={`flex h-11 w-11 items-center justify-center rounded-full transition ${className} ${!shareUrl ? "pointer-events-none opacity-50" : ""}`}
                            onClick={() => setShareMenuOpen(false)}
                          >
                            <Icon className="text-[16px]" />
                          </a>
                        ))}
                        <button
                          type="button"
                          onClick={handleCopyLink}
                          disabled={!shareUrl}
                          aria-label="Copy link"
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-border) bg-white transition hover:border-(--color-primary) hover:text-(--color-primary) disabled:cursor-not-allowed disabled:opacity-50"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Trust signals */}
              <div className="mt-2 grid grid-cols-2 gap-3 rounded-[14px] border border-(--color-border) bg-[#fafbfc] p-4 sm:grid-cols-4">
                {trustSignals.map(({ icon: Icon, title, subtitle }) => (
                  <div key={title} className="flex items-start gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-[12px] font-semibold leading-tight"
                        style={{ color: "var(--color-primary-900)" }}
                      >
                        {title}
                      </p>
                      <p
                        className="mt-0.5 text-[11px] leading-tight"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs Section ─────────────────────────────────────────────── */}
        <div className="mt-6 overflow-hidden rounded-[22px] border border-(--color-border) bg-white shadow-[0_1px_3px_rgba(17,17,17,0.04)] md:mt-8">
          <div className="flex gap-1 overflow-x-auto border-b border-(--color-border) px-4 md:px-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative -mb-px shrink-0 px-5 py-4 text-[14px] font-semibold transition md:text-[15px] ${
                  activeTab === tab.key
                    ? "text-(--color-primary)"
                    : "hover:text-(--color-primary-900)"
                }`}
                style={{
                  color:
                    activeTab === tab.key
                      ? "var(--color-primary)"
                      : "var(--color-text-muted)",
                }}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-(--color-primary)" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            {activeTab === "description" && (
              <div
                className="whitespace-pre-line text-[15px] leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {product.description || "No description available."}
              </div>
            )}

            {activeTab === "additional" && (
              <div className="overflow-hidden rounded-[12px] border border-(--color-border)">
                <table className="w-full text-left text-[14px] md:text-[15px]">
                  <tbody>
                    {[
                      product.category && ["Category", product.category.name],
                      product.brand && ["Brand", product.brand.name],
                      ["SKU", product.sku],
                      ["Stock", `${effectiveStockCount} units`],
                      ...(product.variant_data
                        ? Object.entries(product.variant_data)
                        : []),
                    ]
                      .filter(Boolean)
                      .map((row, i) => {
                        const [k, v] = row as [string, string];
                        return (
                          <tr
                            key={k}
                            className={i % 2 === 0 ? "bg-[#fafbfc]" : "bg-white"}
                          >
                            <td
                              className="w-[180px] px-4 py-3 font-semibold md:w-[220px] md:px-6"
                              style={{ color: "var(--color-primary-900)" }}
                            >
                              {k}
                            </td>
                            <td
                              className="px-4 py-3 md:px-6"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              {v}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "vendor" && (
              <div className="rounded-[12px] border border-(--color-border) bg-[#fafbfc] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--color-primary-100) text-[18px] font-bold text-(--color-primary)">
                    {product.sold_by.store_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="space-y-2 text-[14px] md:text-[15px]">
                    <p
                      className="text-[16px] font-bold"
                      style={{ color: "var(--color-primary-900)" }}
                    >
                      {product.sold_by.store_name}
                    </p>
                    <p style={{ color: "var(--color-text-muted)" }}>
                      <span
                        className="font-semibold"
                        style={{ color: "var(--color-primary-900)" }}
                      >
                        Store:
                      </span>{" "}
                      {product.sold_by.store_slug}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
