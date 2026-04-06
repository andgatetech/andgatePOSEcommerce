"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiStar,
} from "react-icons/fi";

/* ─── MOCK DATA (replace with real API later) ─────────────────────── */
const product = {
  id: 1,
  slug: "seeds-of-change-organic-quinoa",
  title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
  badge: "Sale Off",
  rating: 4,
  reviewCount: 32,
  price: 38,
  oldPrice: 52,
  discountPercent: 26,
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia, corrupti reiciendis minima nisi modi, quasi, odio minus dolore impedit fuga eum eligendi.",
  sizes: ["50g", "60g", "80g", "100g", "150g"],
  images: [
    "/images/banner-5.png",
    "/images/banner-6.png",
    "/images/banner-7.png",
    "/images/banner-5.png",
  ],
  type: "Organic",
  sku: "FWM15VKT",
  mfg: "Jun 4.2024",
  tags: ["Snack", "Organic", "Brown"],
  life: "70 days",
  stock: "8 Items In Stock",
  vendor: "NestFood",
};

const relatedProducts = [
  {
    id: 2,
    title: "Perdue Simply Smart Organics Gluten Free",
    price: 24.85,
    oldPrice: 26.8,
    rating: 4,
    badge: "Hot",
    badgeColor: "bg-pink-500",
    image: "/images/banner-6.png",
  },
  {
    id: 3,
    title: "Signature Wood-Fired Mushroom and Caramelized",
    price: 12.85,
    oldPrice: 13.8,
    rating: 3,
    badge: "-12%",
    badgeColor: "bg-[var(--color-primary)]",
    image: "/images/banner-7.png",
  },
  {
    id: 4,
    title: "Simply Lemonade with Raspberry Juice",
    price: 15.85,
    oldPrice: 16.8,
    rating: 3,
    badge: "New",
    badgeColor: "bg-[var(--color-success)]",
    image: "/images/banner-5.png",
  },
  {
    id: 5,
    title: "Nestle Original Coffee-Mate Coffee Creamer",
    price: 32.85,
    oldPrice: 33.8,
    rating: 4,
    badge: "Hot",
    badgeColor: "bg-pink-500",
    image: "/images/banner-6.png",
  },
];

/* ── helpers ─────────────────────────────────────────────────────── */
function Stars({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <FiStar
            key={i}
            className={
              i < rating
                ? "fill-[var(--color-warning)] text-[var(--color-warning)]"
                : "fill-[var(--color-border)] text-[var(--color-border)]"
            }
            size={14}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-[13px]" style={{ color: "var(--color-text-muted)" }}>
          ({count} reviews)
        </span>
      )}
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function ProductDetailPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("60g");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* ── Breadcrumb ───────────────────────────────────────────── */}
      <div className="border-b border-[var(--color-border)] py-3">
        <div className="mx-auto max-w-[1680px] px-4 md:px-8 lg:px-12">
          <nav className="flex items-center gap-2 text-[13px]" style={{ color: "var(--color-text-muted)" }}>
            <Link href="/" className="flex items-center gap-1 hover:text-[var(--color-primary)]">
              Home
            </Link>
            <FiChevronRight size={12} />
            <Link href="/shop" className="hover:text-[var(--color-primary)]">
              Vegetables &amp; Tubers
            </Link>
            <FiChevronRight size={12} />
            <span style={{ color: "var(--color-primary-900)" }}>Seeds Of Change Organic</span>
          </nav>
        </div>
      </div>

      {/* ── Main Product Section ─────────────────────────────────── */}
      <div className="mx-auto max-w-[1680px] px-4 py-10 md:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-2 xl:gap-16">

          {/* LEFT — Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-[var(--color-primary-100)]">
              <div className="relative aspect-square w-full">
                <Image
                  src={product.images[activeImage]}
                  alt={product.title}
                  fill
                  unoptimized
                  className="object-cover transition duration-500"
                />
              </div>
              {/* Zoom icon */}
              <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md hover:shadow-lg transition">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative overflow-hidden rounded-[12px] border-2 transition ${
                    activeImage === i
                      ? "border-[var(--color-primary)] shadow-md"
                      : "border-[var(--color-border)] hover:border-[var(--color-primary-200)]"
                  }`}
                >
                  <div className="relative aspect-square w-full">
                    <Image src={img} alt={`Thumb ${i + 1}`} fill unoptimized className="object-cover" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Product Info */}
          <div className="flex flex-col gap-5">
            {/* Badge */}
            <span className="inline-flex w-fit rounded-[6px] bg-pink-100 px-3 py-1 text-[13px] font-semibold text-pink-500">
              {product.badge}
            </span>

            {/* Title */}
            <h1 className="text-[30px] font-bold leading-[1.2]" style={{ color: "var(--color-primary-900)" }}>
              {product.title}
            </h1>

            {/* Stars */}
            <Stars rating={product.rating} count={product.reviewCount} />

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-[40px] font-bold" style={{ color: "var(--color-primary)" }}>
                ৳{product.price}
              </span>
              <span className="rounded-[6px] bg-amber-100 px-3 py-1 text-[14px] font-semibold text-amber-600">
                {product.discountPercent}% Off
              </span>
              <span className="text-[18px] font-medium line-through" style={{ color: "var(--color-text-muted)" }}>
                ৳{product.oldPrice}
              </span>
            </div>

            {/* Short Description */}
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              {product.description}
            </p>

            <div className="h-px bg-[var(--color-border)]" />

            {/* Size / Weight */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[15px] font-semibold" style={{ color: "var(--color-primary-900)" }}>
                Size / Weight:
              </span>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-[8px] border px-4 py-2 text-[14px] font-medium transition ${
                    selectedSize === size
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                      : "border-[var(--color-border)] bg-white text-[var(--color-primary-900)] hover:border-[var(--color-primary)]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Qty + Add to Cart + Wishlist + Share */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center overflow-hidden rounded-[10px] border border-[var(--color-border)]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-[46px] w-[46px] items-center justify-center hover:bg-[var(--color-primary-100)] transition"
                  style={{ color: "var(--color-primary)" }}
                >
                  <FiMinus size={16} />
                </button>
                <span className="w-[50px] text-center text-[16px] font-semibold" style={{ color: "var(--color-primary-900)" }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-[46px] w-[46px] items-center justify-center hover:bg-[var(--color-primary-100)] transition"
                  style={{ color: "var(--color-primary)" }}
                >
                  <FiPlus size={16} />
                </button>
              </div>

              {/* Add to Cart */}
              <button className="flex h-[46px] flex-1 items-center justify-center gap-2 rounded-[10px] px-6 text-[15px] font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: "var(--color-primary)" }}>
                <FiShoppingCart size={18} />
                Add to cart
              </button>

              {/* Wishlist */}
              <button className="flex h-[46px] w-[46px] items-center justify-center rounded-[10px] border border-[var(--color-border)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                style={{ color: "var(--color-text-muted)" }}>
                <FiHeart size={18} />
              </button>

              {/* Share */}
              <button className="flex h-[46px] w-[46px] items-center justify-center rounded-[10px] border border-[var(--color-border)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                style={{ color: "var(--color-text-muted)" }}>
                <FiShare2 size={18} />
              </button>
            </div>

            <div className="h-px bg-[var(--color-border)]" />

            {/* Meta info */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[14px]">
              {[
                ["Type", product.type],
                ["SKU", product.sku],
                ["MFG", product.mfg],
                ["Tags", product.tags.join(", ")],
                ["LIFE", product.life],
                ["Stock", product.stock],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-2">
                  <span className="font-medium" style={{ color: "var(--color-primary-900)" }}>{label}:</span>
                  <span style={{ color: "var(--color-primary)" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs Section ─────────────────────────────────────────── */}
        <div className="mt-14 rounded-[18px] border border-[var(--color-border)] bg-white">
          {/* Tab Headers */}
          <div className="flex gap-1 border-b border-[var(--color-border)] px-6">
            {[
              { key: "description", label: "Description" },
              { key: "additional", label: "Additional info" },
              { key: "vendor", label: "Vendor" },
              { key: "reviews", label: "Reviews (3)" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-4 text-[15px] font-medium transition border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                    : "border-transparent hover:text-[var(--color-primary)]"
                }`}
                style={{ color: activeTab === tab.key ? "var(--color-primary)" : "var(--color-text-muted)" }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "description" && (
              <div className="space-y-4 text-[15px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                <p>
                  Uninhibited carnally hired played in whimpered dear gorilla koala depending and much yikes off far quetzal goodness and from for grimaced goodness unaccountably and meadowlark near unblushingly crucial scallop tightly neurotic hungrily some and dear furiously this apart.
                </p>
                <p>
                  Spluttered narrowly yikes left moth in yikes bowed this that grizzly much hello on spoon-fed that alas rethought much decently richly and wow against the frequent fluidly at formidable acceptably flapped besides and much circa far over the bucolically hey precarious goldfinch mastodon.
                </p>
                <div className="mt-6 space-y-2 border-t border-[var(--color-border)] pt-6">
                  {[
                    ["Type Of Packing", "Bottle"],
                    ["Color", "Green"],
                    ["Quality", "Organic"],
                    ["Quantity", "300 gr"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-4 text-[14px]">
                      <span className="w-[180px] shrink-0 font-medium" style={{ color: "var(--color-primary-900)" }}>• {k}</span>
                      <span style={{ color: "var(--color-text-muted)" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "additional" && (
              <div className="text-[15px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                <table className="w-full text-left">
                  <tbody className="divide-y divide-[var(--color-border)]">
                    {[["Weight", "0.5 kg"], ["Dimensions", "10 × 10 × 15 cm"], ["Color", "Green"], ["Material", "Organic"]].map(([k, v]) => (
                      <tr key={k} className="py-3">
                        <td className="py-3 font-medium w-[200px]" style={{ color: "var(--color-primary-900)" }}>{k}</td>
                        <td className="py-3" style={{ color: "var(--color-text-muted)" }}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "vendor" && (
              <div className="space-y-3 text-[15px]" style={{ color: "var(--color-text-muted)" }}>
                <p><span className="font-semibold" style={{ color: "var(--color-primary-900)" }}>Vendor Name:</span> {product.vendor}</p>
                <p><span className="font-semibold" style={{ color: "var(--color-primary-900)" }}>Address:</span> Dhaka, Bangladesh</p>
                <p><span className="font-semibold" style={{ color: "var(--color-primary-900)" }}>Member Since:</span> June 2023</p>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-5">
                {[
                  { name: "Rahim Uddin", rating: 5, comment: "Excellent product! Very fresh and well-packed.", date: "Jan 15, 2025" },
                  { name: "Karim Hossen", rating: 4, comment: "Good quality, but delivery took a bit longer than expected.", date: "Feb 2, 2025" },
                  { name: "Sadia Islam", rating: 4, comment: "Tasted great, will order again!", date: "Mar 10, 2025" },
                ].map((r, i) => (
                  <div key={i} className="border-b border-[var(--color-border)] pb-5 last:border-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold" style={{ color: "var(--color-primary-900)" }}>{r.name}</span>
                      <span className="text-[12px]" style={{ color: "var(--color-text-muted)" }}>{r.date}</span>
                    </div>
                    <Stars rating={r.rating} />
                    <p className="mt-2 text-[14px]" style={{ color: "var(--color-text-muted)" }}>{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ──────────────────────────────────────── */}
        <div className="mt-14">
          <div className="mb-6">
            <h2 className="text-[26px] font-bold" style={{ color: "var(--color-primary-900)" }}>
              Related products
            </h2>
            <div className="relative mt-3 h-[2px] w-full bg-[var(--color-border)]">
              <span className="absolute left-0 top-0 h-full w-[60px]" style={{ backgroundColor: "var(--color-primary)" }} />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/shop/${p.id}`} className="group relative overflow-hidden rounded-[16px] border border-[var(--color-border)] bg-white transition hover:shadow-[0_8px_30px_rgba(15,23,42,0.1)]">
                {/* Badge */}
                <span className={`absolute left-3 top-3 z-10 rounded-[6px] px-3 py-1 text-[12px] font-bold text-white ${p.badgeColor}`}>
                  {p.badge}
                </span>

                {/* Image */}
                <div className="relative h-[200px] overflow-hidden bg-[var(--color-primary-100)]">
                  <Image src={p.image} alt={p.title} fill unoptimized
                    className="object-cover transition duration-500 group-hover:scale-[1.04]" />
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="line-clamp-2 text-[15px] font-semibold leading-[1.4] transition group-hover:text-[var(--color-primary)]"
                    style={{ color: "var(--color-primary-900)" }}>
                    {p.title}
                  </h3>
                  <Stars rating={p.rating} />
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-end gap-2">
                      <span className="text-[17px] font-bold" style={{ color: "var(--color-primary)" }}>
                        ৳{p.price.toFixed(2)}
                      </span>
                      <span className="mb-px text-[13px] line-through" style={{ color: "var(--color-text-muted)" }}>
                        ৳{p.oldPrice}
                      </span>
                    </div>
                    <button className="flex items-center gap-1 rounded-[6px] bg-(--color-primary-100) px-3 py-2 text-[13px] font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-white">
                      <FiShoppingCart size={13} /> Add
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
