"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa";
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import { FiCheck, FiMail, FiArrowRight } from "react-icons/fi";
import Logo from "./Logo";
import { ROUTES } from "@/config/routes";

const companyLinks = [
  { label: "About Us", href: ROUTES.ABOUT },
  { label: "Contact Us", href: ROUTES.CONTACT },
  { label: "Privacy Policy", href: ROUTES.PRIVACY_POLICY },
  { label: "Terms & Conditions", href: ROUTES.TERMS },
  { label: "Return Policies", href: ROUTES.RETURN_POLICIES },
];

const accountLinks = [
  { label: "My Account", href: ROUTES.MY_ACCOUNT },
  { label: "Order Tracking", href: ROUTES.ORDER_TRACKING },
  { label: "Wishlist", href: ROUTES.WISHLIST },
  { label: "Affiliate Program", href: ROUTES.AFFILIATE },
  { label: "FAQs", href: ROUTES.FAQS },
];

const deliveryPartners = [
  { name: "Pathao", logo: "/images/delivery/pathao.svg" },
  { name: "REDX", logo: "/images/delivery/redx.svg" },
  { name: "Steadfast", logo: "/images/delivery/steadfast.svg" },
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      inputRef.current?.focus();
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  }

  return (
    <>
      {/* ── Newsletter ── */}
      <section className="border-y border-(--color-primary-200) bg-[linear-gradient(135deg,var(--color-primary-100)_0%,#ffffff_54%,var(--color-cta-100)_100%)]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-7 rounded-[28px] border border-white bg-white/62 p-5 shadow-[0_18px_48px_rgba(2,58,92,0.08)] backdrop-blur lg:flex-row lg:items-center lg:gap-16 lg:p-7">

            {/* Left copy */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-(--color-primary-dark) shadow-sm">
                <FiMail size={11} />
                Newsletter
              </span>
              <h3 className="mt-3 text-[25px] font-extrabold leading-snug tracking-[-0.03em] text-(--color-primary-900) sm:text-[30px]">
                Get exclusive deals &amp;<br className="hidden sm:block" />
                <span className="text-(--color-primary)"> flash sale alerts.</span>
              </h3>
              <p className="mt-2 text-sm leading-6 text-(--color-text-muted)">
                Join 10,000+ smart shoppers. No spam — unsubscribe anytime.
              </p>
            </div>

            {/* Right form */}
            <div className="w-full max-w-md lg:w-auto lg:flex-1">
              {status === "success" ? (
                <div className="flex items-center gap-3 rounded-2xl bg-(--color-primary) px-6 py-5 text-white">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <FiCheck size={18} className="text-white" />
                  </span>
                  <div>
                    <p className="font-semibold">You&apos;re subscribed!</p>
                    <p className="text-sm text-white/75">Check your inbox for confirmation.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} noValidate>
                  <div className="flex h-[54px] overflow-hidden rounded-full border border-(--color-primary-200) bg-white shadow-[0_12px_30px_rgba(2,58,92,0.10)] focus-within:border-(--color-primary) focus-within:ring-2 focus-within:ring-(--color-primary)/20">
                    <div className="relative flex flex-1 items-center">
                      <FiMail size={15} className="pointer-events-none absolute left-4 text-(--color-text-muted)" />
                      <input
                        ref={inputRef}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        disabled={status === "loading"}
                        className="h-full w-full bg-transparent pl-10 pr-3 text-sm text-(--color-dark) placeholder:text-(--color-text-muted) outline-none disabled:opacity-60"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex h-full shrink-0 cursor-pointer items-center gap-2 rounded-full bg-(--color-primary) px-5 text-sm font-bold text-white transition hover:bg-(--color-primary-dark) disabled:opacity-60 m-1"
                    >
                      {status === "loading" ? "Subscribing…" : (
                        <>Subscribe <FiArrowRight size={14} /></>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-(--color-primary-900) pt-10 pb-8 sm:pt-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main grid */}
          <div className="grid grid-cols-12 gap-8 border-b border-white/10 pb-10">

            {/* Brand column */}
            <div className="col-span-12 flex flex-col gap-5 lg:col-span-5">
              <div className="inline-flex w-fit items-center rounded-2xl bg-white px-4 pb-4 pt-2 shadow-[0_16px_34px_rgba(0,0,0,0.16)]">
                <Logo
                  width={120}
                  height={60}
                  variant="default"
                  src="/images/HawkeriFooter.png"
                  className="translate-x-1"
                />
              </div>
              <p className="max-w-[380px] text-sm leading-7 text-(--color-secondary-200)">
                Hawkeri is your trusted destination for seamless online shopping
                and modern ecommerce experiences across Bangladesh.
              </p>
              <div className="grid max-w-[430px] grid-cols-2 gap-3">
                <Link
                  href={ROUTES.STORE}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:border-(--color-primary) hover:bg-white/10"
                >
                  Browse Stores
                </Link>
                <Link
                  href={ROUTES.BRAND}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:border-(--color-primary) hover:bg-white/10"
                >
                  Browse Brands
                </Link>
              </div>
            </div>

            {/* Links columns */}
            <div className="col-span-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:col-span-4 lg:col-span-2">
              <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">Company</h3>
              <ul className="flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-(--color-secondary-200) transition hover:text-white"
                    >
                      <FaChevronRight size={9} className="shrink-0 text-white/30 transition group-hover:text-(--color-primary)" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:col-span-4 lg:col-span-2">
              <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">Customer</h3>
              <ul className="flex flex-col gap-3">
                {accountLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-(--color-secondary-200) transition hover:text-white"
                    >
                      <FaChevronRight size={9} className="shrink-0 text-white/30 transition group-hover:text-(--color-primary)" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div className="col-span-12 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:col-span-6 lg:col-span-3">
              <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">Contact</h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <HiOutlineLocationMarker size={16} className="text-(--color-primary)" />
                  </span>
                  <span className="text-sm leading-6 text-(--color-secondary-200)">
                    House: 34, Road: 3, Block: B, Aftabnagar, Badda, Dhaka, Bangladesh
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <HiOutlinePhone size={16} className="text-(--color-primary)" />
                  </span>
                  <a href="tel:+8801577303608" className="text-sm text-(--color-secondary-200) transition hover:text-(--color-primary)">
                    +880 1577303608
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <HiOutlineMail size={16} className="text-(--color-primary)" />
                  </span>
                  <a href="mailto:support@andgatetech.net" className="break-all text-sm text-(--color-secondary-200) transition hover:text-(--color-primary)">
                    support@andgatetech.net
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Delivery partners */}
          <div className="flex flex-col items-start justify-between gap-5 border-b border-white/10 py-6 lg:flex-row lg:items-center">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                Supported Delivery Partners
              </h3>
              <p className="mt-2 text-sm leading-6 text-(--color-secondary-200)">
                We support deliveries through Pathao, REDX, and Steadfast.
              </p>
            </div>
            <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:justify-end">
              {deliveryPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex h-12 w-[122px] items-center justify-center rounded-xl border border-white/10 bg-white px-4 shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                >
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={94}
                    height={28}
                    loading="lazy"
                    className="max-h-7 max-w-[94px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-3 pt-6 sm:flex-row">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Hawkeri. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href={ROUTES.PRIVACY_POLICY} className="text-xs text-white/40 transition hover:text-white/70">Privacy</Link>
              <Link href={ROUTES.TERMS} className="text-xs text-white/40 transition hover:text-white/70">Terms</Link>
              <Link href={ROUTES.RETURN_POLICIES} className="text-xs text-white/40 transition hover:text-white/70">Returns</Link>
            </div>
          </div>

        </div>
      </footer>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-24 right-4 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-(--color-primary) text-white shadow-lg transition hover:bg-(--color-primary-dark) sm:bottom-6 sm:right-6"
        >
          <FaChevronUp size={14} />
        </button>
      )}
    </>
  );
}
