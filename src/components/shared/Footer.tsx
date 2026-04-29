"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaAppStoreIos,
  FaBehance,
  FaCcAmex,
  FaCcApplePay,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaChevronRight,
  FaChevronUp,
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlinePrinter,
} from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import Logo from "./Logo";
import { ROUTES } from "@/config/routes";

const aboutLinks = [
  { label: "About Us", href: ROUTES.ABOUT },
  { label: "Terms & Conditions", href: ROUTES.TERMS },
  { label: "Careers", href: ROUTES.CAREERS },
  { label: "Latest News", href: ROUTES.BLOG },
  { label: "Contact Us", href: ROUTES.CONTACT },
  { label: "Privacy Policy", href: ROUTES.PRIVACY_POLICY },
];

const accountLinks = [
  { label: "Your Account", href: ROUTES.MY_ACCOUNT },
  { label: "Return Policies", href: ROUTES.RETURN_POLICIES },
  { label: "Become a Vendor", href: ROUTES.BECOME_VENDOR },
  { label: "Wishlist", href: ROUTES.WISHLIST },
  { label: "Affiliate Program", href: ROUTES.AFFILIATE },
  { label: "FAQs", href: ROUTES.FAQS },
];

const categoryLinks = [
  { label: "Healthcare", href: ROUTES.CATEGORY },
  { label: "Fashion", href: ROUTES.CATEGORY },
  { label: "Organic", href: ROUTES.CATEGORY },
  { label: "Beauty", href: ROUTES.CATEGORY },
  { label: "Groceries", href: ROUTES.CATEGORY },
  { label: "Electronics", href: ROUTES.CATEGORY },
];

const socialLinks = [
  { icon: FaFacebookF, href: "#" },
  { icon: FaInstagram, href: "#" },
  { icon: FaLinkedinIn, href: "#" },
  { icon: FaPinterestP, href: "#" },
  { icon: FaBehance, href: "#" },
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Newsletter Section */}
      <section className="mx-4 max-w-[932px] rounded-[28px] border border-(--color-border) bg-(--color-bg) pb-5 text-center shadow-[0_18px_50px_rgba(19,45,69,0.08)] sm:mx-6 md:mx-auto md:rounded-[80px] lg:rounded-[160px] -mb-12 sm:-mb-16 md:-mb-20 lg:-mb-[100px] relative z-10">
        <div className="px-4 pb-6 pt-7 sm:px-6 sm:pb-8 sm:pt-9 md:px-8 md:pt-10">
          <h3 className="text-[22px] font-bold leading-tight text-(--color-dark) sm:text-2xl md:text-3xl">
            Subscribe to our newsletter
          </h3>
          <p className="mx-auto mt-3 mb-5 max-w-[620px] text-sm leading-6 text-(--color-text-muted) sm:mb-6 sm:text-base">
            Stay updated! Subscribe to our mailing list for news, updates, and
            exclusive offers.
          </p>
          <div className="flex items-center justify-center">
            <div className="flex w-full max-w-[460px] flex-col gap-3 rounded-[22px] border border-(--color-border) bg-(--color-bg) p-2 transition-all focus-within:border-(--color-primary) sm:flex-row sm:items-center sm:rounded-full sm:gap-0 sm:py-1.5 sm:pl-4 sm:pr-2.5">
              <div className="hidden text-(--color-text-muted) sm:mr-2 sm:block">
                <MdOutlineEmail size={22} />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="min-h-[44px] flex-1 rounded-full bg-transparent px-3 text-sm text-(--color-dark) outline-none sm:min-h-0 sm:px-2 sm:py-2 sm:text-base"
              />
              <button className="min-h-[44px] cursor-pointer rounded-full bg-(--color-primary) px-6 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-light) sm:min-h-0 sm:py-2.5">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-(--color-primary-900) pt-24 pb-10 sm:pt-28 md:pt-32 lg:pt-40 lg:pb-15 xl:rounded-tl-[30px] xl:rounded-tr-[30px]">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Top Section */}
          <div className="grid grid-cols-12 gap-8 pb-8 sm:gap-7 lg:pb-9">
            {/* Brand Column */}
            <div className="col-span-12 flex flex-col gap-y-5 sm:gap-y-6 md:col-span-12 xl:col-span-3">
              <Logo width={180} height={48} />
              <p className="max-w-[520px] text-sm leading-7 text-(--color-primary-200) sm:text-base">
                Hawkeri is your trusted destination for seamless online
                shopping and modern ecommerce experiences across Bangladesh.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-(--color-primary-dark) flex items-center justify-center hover:bg-(--color-cta) transition-colors">
                    <social.icon size={16} className="text-white" />
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-y-[15px]">
                <p className="text-base font-semibold text-white">
                  Download Our App:
                </p>
                <div className="flex flex-col gap-2.5 min-[420px]:flex-row min-[420px]:flex-wrap">
                  <Link
                    href="#"
                    className="flex min-h-[48px] items-center gap-2 rounded-lg border border-(--color-primary) bg-(--color-primary-dark) px-3 py-2 transition-colors hover:bg-(--color-primary) min-[420px]:w-auto">
                    <FaGooglePlay size={20} className="text-white" />
                    <div className="text-xs leading-tight text-white">
                      <span className="block text-[10px] text-(--color-primary-200) uppercase">
                        GET IT ON
                      </span>
                      <span className="font-semibold text-sm">Google Play</span>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="flex min-h-[48px] items-center gap-2 rounded-lg border border-(--color-primary) bg-(--color-primary-dark) px-3 py-2 transition-colors hover:bg-(--color-primary) min-[420px]:w-auto">
                    <FaAppStoreIos size={20} className="text-white" />
                    <div className="text-xs leading-tight text-white">
                      <span className="block text-[10px] text-(--color-primary-200)">
                        Download on the
                      </span>
                      <span className="font-semibold text-sm">App Store</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* About Column */}
            <div className="col-span-12 sm:col-span-6 xl:col-span-2">
              <h5 className="border-b border-(--color-primary-dark) pb-4 text-base font-semibold text-white sm:pb-5 sm:text-lg">
                About
              </h5>
              <ul className="flex flex-col gap-y-1.5 pt-4">
                {aboutLinks.map((link) => (
                  <li
                    key={link.label}
                    className="py-1.5 flex items-center gap-x-2">
                    <span className="inline-flex items-center">
                      <FaChevronRight
                        size={10}
                        className="text-(--color-cta)"
                      />
                    </span>
                    <Link
                      href={link.href}
                      className="text-(--color-primary-200) font-medium hover:text-(--color-cta) transition-all text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* My Account Column */}
            <div className="col-span-12 sm:col-span-6 xl:col-span-2">
              <h5 className="border-b border-(--color-primary-dark) pb-4 text-base font-semibold text-white sm:pb-5 sm:text-lg">
                My Account
              </h5>
              <ul className="flex flex-col gap-y-1.5 pt-4">
                {accountLinks.map((link) => (
                  <li
                    key={link.label}
                    className="py-1.5 flex items-center gap-x-2">
                    <span className="inline-flex items-center">
                      <FaChevronRight
                        size={10}
                        className="text-(--color-cta)"
                      />
                    </span>
                    <Link
                      href={link.href}
                      className="text-(--color-primary-200) font-medium hover:text-(--color-cta) transition-all text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories Column */}
            <div className="col-span-12 sm:col-span-6 xl:col-span-2">
              <h5 className="border-b border-(--color-primary-dark) pb-4 text-base font-semibold text-white sm:pb-5 sm:text-lg">
                Categories
              </h5>
              <ul className="flex flex-col gap-y-1.5 pt-4">
                {categoryLinks.map((link, index) => (
                  <li key={index} className="py-1.5 flex items-center gap-x-2">
                    <span className="inline-flex items-center">
                      <FaChevronRight
                        size={10}
                        className="text-(--color-cta)"
                      />
                    </span>
                    <Link
                      href={link.href}
                      className="text-(--color-primary-200) font-medium hover:text-(--color-cta) transition-all text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information Column */}
            <div className="col-span-12 sm:col-span-6 xl:col-span-3">
              <h5 className="border-b border-(--color-primary-dark) pb-4 text-base font-semibold text-white sm:pb-5 sm:text-lg">
                Contact Information
              </h5>
              <ul className="flex flex-col gap-y-2 py-4">
                <li className="flex items-start gap-x-3">
                  <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-(--color-primary-dark) shrink-0">
                    <HiOutlineLocationMarker
                      size={20}
                      className="text-(--color-cta)"
                    />
                  </span>
                  <p className="text-(--color-primary-200) font-medium text-sm">
                    Dhaka, Bangladesh
                  </p>
                </li>
                <li className="flex items-start gap-x-3">
                  <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-(--color-primary-dark) shrink-0">
                    <HiOutlinePhone size={20} className="text-(--color-cta)" />
                  </span>
                  <p className="text-(--color-primary-200) font-medium text-sm">
                    Call Us: 01577-303608
                  </p>
                </li>
                <li className="flex items-start gap-x-3">
                  <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-(--color-primary-dark) shrink-0">
                    <HiOutlineMail size={20} className="text-(--color-cta)" />
                  </span>
                  <p className="break-all text-sm font-medium text-(--color-primary-200)">
                    andgatetech@gmail.com
                  </p>
                </li>
                <li className="flex items-start gap-x-3">
                  <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-(--color-primary-dark) shrink-0">
                    <HiOutlinePrinter
                      size={20}
                      className="text-(--color-cta)"
                    />
                  </span>
                  <p className="break-all text-sm font-medium text-(--color-primary-200)">
                    andgatetech@gmail.com
                  </p>
                </li>
              </ul>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="bg-white rounded-md px-2 py-1.5">
                  <FaCcVisa size={30} className="text-[#1A1F71]" />
                </span>
                <span className="bg-white rounded-md px-2 py-1.5">
                  <FaCcMastercard size={30} className="text-[#EB001B]" />
                </span>
                <span className="bg-white rounded-md px-2 py-1.5">
                  <FaCcAmex size={30} className="text-[#006FCF]" />
                </span>
                <span className="bg-white rounded-md px-2 py-1.5">
                  <FaCcPaypal size={30} className="text-[#003087]" />
                </span>
                <span className="bg-white rounded-md px-2 py-1.5">
                  <FaCcApplePay size={30} className="text-black" />
                </span>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="relative pt-[22px] pb-px text-center text-white">
            <svg
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl"
              viewBox="0 0 1000 22"
              fill="none"
              preserveAspectRatio="none">
              <path
                d="M0 22 C200 22, 350 0, 500 0 C650 0, 800 22, 1000 22"
                stroke="rgba(176, 204, 222, 0.3)"
                strokeWidth="1"
                fill="none"
              />
            </svg>
            <p className="px-4 pt-4 text-xs leading-6 text-(--color-primary-200) sm:text-sm">
              © {new Date().getFullYear()} Copyright By Hawkeri
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-(--color-primary) text-white shadow-lg transition-all hover:bg-(--color-primary-light) sm:bottom-6 sm:right-6">
          <FaChevronUp size={14} />
        </button>
      )}
    </>
  );
}
