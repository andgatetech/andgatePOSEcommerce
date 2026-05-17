"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FaAppStoreIos,
  FaChevronRight,
  FaChevronUp,
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaBehance,
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

const shopLinks = [
  { label: "All Products", href: ROUTES.PRODUCT },
  { label: "Popular Products", href: ROUTES.POPULAR_PRODUCT },
  { label: "Deal of the Day", href: ROUTES.DEAL_OF_DAY },
  { label: "All Categories", href: ROUTES.CATEGORY },
  { label: "All Brands", href: ROUTES.BRAND },
  { label: "All Stores", href: ROUTES.STORE },
];

const socialLinks = [
  { label: "Facebook", icon: FaFacebookF, href: "#facebook" },
  { label: "Instagram", icon: FaInstagram, href: "#instagram" },
  { label: "LinkedIn", icon: FaLinkedinIn, href: "#linkedin" },
  { label: "Pinterest", icon: FaPinterestP, href: "#pinterest" },
  { label: "Behance", icon: FaBehance, href: "#behance" },
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
      <section className="bg-(--color-primary-100) border-y border-(--color-primary-200)">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">

            {/* Left copy */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-primary-200) px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-(--color-primary-dark)">
                <FiMail size={11} />
                Newsletter
              </span>
              <h3 className="mt-3 text-[24px] font-bold leading-snug tracking-tight text-(--color-primary-900) sm:text-[28px]">
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
                  <div className="flex h-[52px] overflow-hidden rounded-full border border-(--color-primary-200) bg-white shadow-sm focus-within:border-(--color-primary) focus-within:ring-2 focus-within:ring-(--color-primary)/20">
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
      <footer className="bg-(--color-primary-900) pt-12 pb-8 sm:pt-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main grid */}
          <div className="grid grid-cols-12 gap-8 border-b border-white/10 pb-10">

            {/* Brand column */}
            <div className="col-span-12 xl:col-span-4 flex flex-col gap-5">
              <div className="inline-flex w-fit items-center rounded-xl bg-white px-3 pb-4 pt-2">
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

              {/* Social */}
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={`Visit Hawkeri on ${social.label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-(--color-primary)"
                  >
                    <social.icon size={15} />
                  </Link>
                ))}
              </div>

              {/* App badges */}
              <div>
                <p className="mb-3 text-sm font-semibold text-white/70 uppercase tracking-wider">Download Our App</p>
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    href="#google-play"
                    aria-label="Get Hawkeri on Google Play"
                    className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 transition hover:bg-white/20"
                  >
                    <FaGooglePlay size={18} className="text-white" />
                    <div className="leading-tight text-white">
                      <span className="block text-[10px] text-white/60 uppercase tracking-wide">GET IT ON</span>
                      <span className="block text-sm font-semibold">Google Play</span>
                    </div>
                  </Link>
                  <Link
                    href="#app-store"
                    aria-label="Download Hawkeri on App Store"
                    className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 transition hover:bg-white/20"
                  >
                    <FaAppStoreIos size={18} className="text-white" />
                    <div className="leading-tight text-white">
                      <span className="block text-[10px] text-white/60 uppercase tracking-wide">DOWNLOAD ON</span>
                      <span className="block text-sm font-semibold">App Store</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Links columns */}
            <div className="col-span-6 sm:col-span-4 xl:col-span-2">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/50">Company</h3>
              <ul className="flex flex-col gap-2.5">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-(--color-secondary-200) transition hover:text-(--color-primary)"
                    >
                      <FaChevronRight size={9} className="shrink-0 text-white/30" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 sm:col-span-4 xl:col-span-2">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/50">Customer</h3>
              <ul className="flex flex-col gap-2.5">
                {accountLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-(--color-secondary-200) transition hover:text-(--color-primary)"
                    >
                      <FaChevronRight size={9} className="shrink-0 text-white/30" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 sm:col-span-4 xl:col-span-2">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/50">Shop</h3>
              <ul className="flex flex-col gap-2.5">
                {shopLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-(--color-secondary-200) transition hover:text-(--color-primary)"
                    >
                      <FaChevronRight size={9} className="shrink-0 text-white/30" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div className="col-span-12 sm:col-span-6 xl:col-span-2">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/50">Contact</h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <HiOutlineLocationMarker size={16} className="text-(--color-primary)" />
                  </span>
                  <span className="text-sm text-(--color-secondary-200)">Dhaka, Bangladesh</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <HiOutlinePhone size={16} className="text-(--color-primary)" />
                  </span>
                  <a href="tel:01577303608" className="text-sm text-(--color-secondary-200) transition hover:text-(--color-primary)">
                    01577-303608
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <HiOutlineMail size={16} className="text-(--color-primary)" />
                  </span>
                  <a href="mailto:andgatetech@gmail.com" className="break-all text-sm text-(--color-secondary-200) transition hover:text-(--color-primary)">
                    andgatetech@gmail.com
                  </a>
                </li>
              </ul>
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
