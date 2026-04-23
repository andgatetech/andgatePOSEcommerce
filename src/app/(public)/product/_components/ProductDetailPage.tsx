"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiHome,
  FiCheck,
  FiCopy,
} from "react-icons/fi";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ROUTES, ROUTE_BUILDERS } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import { useAppSelector } from "@/lib/hooks";
import { useAddToCartMutation, useUpdateCartItemMutation } from "@/features/cart/cartApi";
import { useGetWishlistQuery, useToggleWishlistMutation } from "@/features/wishlist/wishlistApi";
import type { EcommerceProduct } from "@/types";

interface ProductDetailPageProps {
  product: EcommerceProduct;
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const shareMenuRef = useRef<HTMLDivElement | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedVariantSlug, setSelectedVariantSlug] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [toggleWishlist, { isLoading: isTogglingWishlist }] = useToggleWishlistMutation();
  const { data: wishlistData } = useGetWishlistQuery(undefined, { skip: !isAuthenticated });

  const isWishlisted = wishlistData?.items.some((item) => item.stock.id === product.id) ?? false;

  async function handleAddToCart() {
    if (!isAuthenticated) {
      const loginUrl = new URL(ROUTES.LOGIN, window.location.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      router.push(`${loginUrl.pathname}${loginUrl.search}`);
      return;
    }
    const result = await addToCart({ stock_id: product.id });
    if ("error" in result) {
      toast.error("Failed to add to cart.");
      return;
    }
    // If user selected qty > 1, update to the desired quantity
    if (quantity > 1 && "data" in result && result.data.data) {
      await updateCartItem({ cart_id: result.data.data.id, quantity });
    }
    toast.success(result.data?.message ?? "Added to cart!");
  }

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

  return (
    <div className="min-h-screen bg-(--color-bg)">
      {/* ── Breadcrumb ──────────────────────────────────────────────── */}
      <div className="border-b border-(--color-border) py-3">
        <div className="mx-auto px-4 md:px-8 lg:px-12">
          <nav
            className="flex items-center gap-2 text-[13px]"
            style={{ color: "var(--color-text-muted)" }}
          >
            <Link
              href={ROUTES.HOME}
              className="flex items-center gap-1 hover:text-()"
            >
              <FiHome size={13} />
              <span>Home</span>
            </Link>
            <FiChevronRight size={12} />
            {product.category && (
              <>
                <Link
                  href={ROUTE_BUILDERS.categoryDetail(product.category.slug)}
                  className="hover:text-()"
                >
                  {product.category.name}
                </Link>
                <FiChevronRight size={12} />
              </>
            )}
            <span
              className="line-clamp-1 max-w-[240px]"
              style={{ color: "var(--color-primary-900)" }}
            >
              {product.product_name}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Main Product Section ─────────────────────────────────────── */}
      <div className="mx-auto px-4 py-10 md:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-2 xl:gap-16">

          {/* LEFT – Image Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-[18px] border border-() bg-()">
              <div className="relative aspect-square w-full">
                {resolvedImages.length > 0 ? (
                  <Image
                    src={resolvedImages[activeImage] ?? resolvedImages[0]}
                    alt={product.product_name}
                    fill
                    unoptimized
                    className="object-cover transition duration-500"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-()">
                    No image available
                  </div>
                )}
              </div>
            </div>

            {resolvedImages.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {resolvedImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative overflow-hidden rounded-[12px] border-2 transition ${
                      activeImage === i
                        ? "border-() shadow-md"
                        : "border-() hover:border-()"
                    }`}
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={img}
                        alt={`Thumb ${i + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT – Product Info */}
          <div className="flex flex-col gap-5">
            {/* Category + Brand badges */}
            <div className="flex flex-wrap gap-2">
              {product.category && (
                <Link
                  href={ROUTE_BUILDERS.categoryDetail(product.category.slug)}
                  className="inline-flex rounded-[6px] bg-(--color-primary-100) px-3 py-1 text-[13px] font-semibold text-(--color-primary) hover:bg-(--color-primary-200) transition"
                >
                  {product.category.name}
                </Link>
              )}
              {product.brand && (
                <Link
                  href={ROUTE_BUILDERS.brandDetail(product.brand.slug)}
                  className="inline-flex rounded-[6px] bg-amber-50 px-3 py-1 text-[13px] font-semibold text-amber-700 hover:bg-amber-100 transition"
                >
                  {product.brand.name}
                </Link>
              )}
            </div>

            {/* Title */}
            <h1
              className="text-[28px] font-bold leading-[1.2] md:text-[32px]"
              style={{ color: "var(--color-primary-900)" }}
            >
              {product.product_name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span
                className="text-[38px] font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                ৳{displayPrice}
              </span>
              <span
                className={`rounded-[6px] px-3 py-1 text-[13px] font-semibold ${
                  stockCount > 0
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {stockCount > 0
                  ? `${stockCount} in stock`
                  : "Out of stock"}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {product.description}
              </p>
            )}

            <div className="h-px bg-()" />

            {/* Current variant attributes */}
            {variantEntries.length > 0 && (
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {variantEntries.map(([key, val]) => (
                  <div key={key} className="flex items-center gap-2 text-[14px]">
                    <span
                      className="font-semibold"
                      style={{ color: "var(--color-primary-900)" }}
                    >
                      {key}:
                    </span>
                    <span
                      className="rounded-[6px] border border-() bg-() px-3 py-1 font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Other variants */}
            {product.other_variants && product.other_variants.length > 0 && (
              <div>
                <p
                  className="mb-2 text-[15px] font-semibold"
                  style={{ color: "var(--color-primary-900)" }}
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
                        className={`rounded-[8px] border px-4 py-2 text-[14px] font-medium transition ${
                          isSelected
                            ? "border-() bg-() text-white"
                            : "border-() bg-white text-() hover:border-()"
                        }`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Qty + Add to Cart + Wishlist + Share */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center overflow-hidden rounded-[10px] border border-()">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-[46px] w-[46px] items-center justify-center hover:bg-() transition"
                  style={{ color: "var(--color-primary)" }}
                >
                  <FiMinus size={16} />
                </button>
                <span
                  className="w-[50px] text-center text-[16px] font-semibold"
                  style={{ color: "var(--color-primary-900)" }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) =>
                      stockCount > 0 ? Math.min(stockCount, q + 1) : q,
                    )
                  }
                  className="flex h-[46px] w-[46px] items-center justify-center hover:bg-() transition"
                  style={{ color: "var(--color-primary)" }}
                >
                  <FiPlus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={stockCount === 0 || isAddingToCart}
                className="flex h-[46px] flex-1 items-center justify-center gap-2 rounded-[10px] bg-(--color-primary) px-6 text-[15px] font-semibold text-white transition hover:bg-(--color-primary-dark) disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiShoppingCart size={18} />
                {isAddingToCart ? "Adding…" : "Add to cart"}
              </button>

              <button
                onClick={handleToggleWishlist}
                disabled={isTogglingWishlist}
                className={`flex h-[46px] w-[46px] items-center justify-center rounded-[10px] border transition hover:border-() hover:text-() disabled:opacity-50 ${
                  isWishlisted
                    ? "border-() text-()"
                    : "border-() text-()"
                }`}
              >
                <FiHeart size={18} className={isWishlisted ? "fill-()" : ""} />
              </button>

              <div ref={shareMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setShareMenuOpen((open) => !open)}
                  className="flex h-[46px] w-[46px] items-center justify-center rounded-[10px] border border-() transition hover:border-() hover:text-()"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <FiShare2 size={18} />
                </button>

                {shareMenuOpen ? (
                  <div className="absolute right-0 top-[calc(100%+10px)] z-30 min-w-[220px] rounded-[18px] border border-() bg-white p-2 shadow-[0_20px_45px_rgba(17,17,17,0.12)]">
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
                          className="rounded-full bg-() px-3 py-1 text-[11px] font-semibold text-() transition hover:bg-()"
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
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-() bg-white text-() transition hover:border-() hover:text-() disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="h-px bg-()" />

            {/* Meta info */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[14px]">
              {[
                product.category && ["Category", product.category.name],
                product.brand && ["Brand", product.brand.name],
                ["SKU", product.sku],
                ["Sold by", product.sold_by.store_name],
              ]
                .filter(Boolean)
                .map((row) => {
                  const [label, value] = row as [string, string];
                  return (
                    <div key={label} className="flex gap-2">
                      <span
                        className="font-medium"
                        style={{ color: "var(--color-primary-900)" }}
                      >
                        {label}:
                      </span>
                      <span style={{ color: "var(--color-primary)" }}>
                        {value}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* ── Tabs Section ─────────────────────────────────────────────── */}
        <div className="mt-14 rounded-[18px] border border-() bg-white">
          <div className="flex gap-1 border-b border-() px-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`-mb-px border-b-2 px-5 py-4 text-[15px] font-medium transition ${
                  activeTab === tab.key
                    ? "border-() text-()"
                    : "border-transparent hover:text-()"
                }`}
                style={{
                  color:
                    activeTab === tab.key
                      ? "var(--color-primary)"
                      : "var(--color-text-muted)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === "description" && (
              <div
                className="whitespace-pre-line text-[15px] leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {product.description || "No description available."}
              </div>
            )}

            {activeTab === "additional" && (
              <table className="w-full text-left text-[15px]">
                <tbody className="divide-y divide-()">
                  {[
                    product.category && ["Category", product.category.name],
                    product.brand && ["Brand", product.brand.name],
                    ["SKU", product.sku],
                    ["Stock", `${stockCount} units`],
                    ...(product.variant_data
                      ? Object.entries(product.variant_data)
                      : []),
                  ]
                    .filter(Boolean)
                    .map((row) => {
                      const [k, v] = row as [string, string];
                      return (
                        <tr key={k} className="py-3">
                          <td
                            className="w-[200px] py-3 font-medium"
                            style={{ color: "var(--color-primary-900)" }}
                          >
                            {k}
                          </td>
                          <td
                            className="py-3"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {v}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}

            {activeTab === "vendor" && (
              <div
                className="space-y-3 text-[15px]"
                style={{ color: "var(--color-text-muted)" }}
              >
                <p>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-primary-900)" }}
                  >
                    Store Name:
                  </span>{" "}
                  {product.sold_by.store_name}
                </p>
                <p>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-primary-900)" }}
                  >
                    Store Slug:
                  </span>{" "}
                  {product.sold_by.store_slug}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
