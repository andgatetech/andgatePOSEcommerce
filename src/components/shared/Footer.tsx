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

const aboutLinks = [
  { label: "About Us", href: "/about" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Careers", href: "/careers" },
  { label: "Latest News", href: "/news" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

const accountLinks = [
  { label: "Your Account", href: "/account" },
  { label: "Return Policies", href: "/return-policies" },
  { label: "Become a Vendor", href: "/become-vendor" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Affiliate Program", href: "/affiliate" },
  { label: "FAQs", href: "/faqs" },
];

const categoryLinks = [
  { label: "Healthcare", href: "/category/healthcare" },
  { label: "Fashion", href: "/category/fashion" },
  { label: "Organic", href: "/category/organic" },
  { label: "Beauty", href: "/category/beauty" },
  { label: "Groceries", href: "/category/groceries" },
  { label: "Electronics", href: "/category/electronics" },
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
      <section className="px-4 md:px-0 max-w-[932px] mx-auto text-center pb-6 rounded-[160px] -mb-[100px] relative z-10 bg-(--color-bg) shadow-lg">
        <div className="pt-10 pb-8 px-6">
          <h3 className="text-2xl md:text-3xl font-bold text-(--color-dark) mb-4">
            Subscribe to our newsletter
          </h3>
          <p className="text-(--color-text-muted) mb-6 text-base">
            Stay updated! Subscribe to our mailing list for news, updates, and
            exclusive offers.
          </p>
          <div className="flex items-center justify-center">
            <div className="flex items-center border border-(--color-border) rounded-full overflow-hidden w-full max-w-[420px] pl-4 py-1.5 pr-2.5 bg-(--color-bg) focus-within:border-(--color-primary) transition-all">
              <div className="text-(--color-text-muted) mr-2">
                <MdOutlineEmail size={22} />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-2 py-2 text-base outline-none bg-transparent text-(--color-dark)"
              />
              <button className="bg-(--color-primary) hover:bg-(--color-primary-light) text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors cursor-pointer whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className=" relative bg-(--color-primary-900) pt-40 pb-15 xl:rounded-tl-[30px] xl:rounded-tr-[30px]">
        <div className="mx-auto px-4 ml-2">
          {/* Footer Top Section */}
          <div className="pb-9 grid grid-cols-12 gap-6">
            {/* Brand Column */}
            <div className="col-span-12 md:col-span-12 xl:col-span-3 flex flex-col gap-y-6">
              <Logo width={180} height={48} />
              <p className="text-(--color-primary-200) text-base">
                AndGate POS — Your trusted partner for seamless Point of Sale
                and E-commerce solutions. Empowering businesses across
                Bangladesh.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-4">
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
                <div className="flex gap-x-2.5">
                  <Link
                    href="#"
                    className="bg-(--color-primary-dark) rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-(--color-primary) transition-colors border border-(--color-primary)">
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
                    className="bg-(--color-primary-dark) rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-(--color-primary) transition-colors border border-(--color-primary)">
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
            <div className="col-span-12 md:col-span-6 xl:col-span-2">
              <h5 className="text-white pb-6 border-b border-(--color-primary-dark) text-lg font-semibold">
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
            <div className="col-span-12 md:col-span-6 xl:col-span-2">
              <h5 className="text-white pb-6 border-b border-(--color-primary-dark) text-lg font-semibold">
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
            <div className="col-span-12 md:col-span-6 xl:col-span-2">
              <h5 className="text-white pb-6 border-b border-(--color-primary-dark) text-lg font-semibold">
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
            <div className="col-span-12 md:col-span-6 xl:col-span-3">
              <h5 className="text-white pb-6 border-b border-(--color-primary-dark) text-lg font-semibold">
                Contact Information
              </h5>
              <ul className="flex flex-col gap-y-1.5 py-4">
                <li className="flex items-center gap-x-3">
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
                <li className="flex items-center gap-x-3">
                  <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-(--color-primary-dark) shrink-0">
                    <HiOutlinePhone size={20} className="text-(--color-cta)" />
                  </span>
                  <p className="text-(--color-primary-200) font-medium text-sm">
                    Call Us: 01577-303608
                  </p>
                </li>
                <li className="flex items-center gap-x-3">
                  <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-(--color-primary-dark) shrink-0">
                    <HiOutlineMail size={20} className="text-(--color-cta)" />
                  </span>
                  <p className="text-(--color-primary-200) font-medium text-sm">
                    andgatetech@gmail.com
                  </p>
                </li>
                <li className="flex items-center gap-x-3">
                  <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-(--color-primary-dark) shrink-0">
                    <HiOutlinePrinter
                      size={20}
                      className="text-(--color-cta)"
                    />
                  </span>
                  <p className="text-(--color-primary-200) font-medium text-sm">
                    andgatetech@gmail.com
                  </p>
                </li>
              </ul>
              <div className="flex items-center gap-2 mt-2">
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
          <div className="text-center text-white pt-[22px] pb-px relative">
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
            <p className="text-(--color-primary-200) text-sm pt-4">
              © {new Date().getFullYear()} Copyright By Andgate Technologies
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-10 h-10 bg-(--color-primary) hover:bg-(--color-primary-light) text-white rounded-full flex items-center justify-center shadow-lg transition-all z-50 cursor-pointer">
          <FaChevronUp size={14} />
        </button>
      )}
    </>
  );
}
