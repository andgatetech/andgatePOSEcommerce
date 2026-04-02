"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaBehance,
  FaGooglePlay,
  FaAppStoreIos,
  FaChevronRight,
  FaChevronUp,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaCcApplePay,
} from "react-icons/fa";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlinePrinter,
} from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";

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
  { label: "Fahion", href: "/category/fahion" },
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
      {/* Newsletter Section - overlaps into footer */}
      <section className="px-4 md:px-0 max-w-[932px] mx-auto text-center pb-6 rounded-[164px] -mb-[100px] relative z-10 bg-white">
        <div className="pt-10 pb-8 px-6">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Subscribe to our newsletter
          </h3>
          <p className="text-gray-500 mb-6 text-base">
            Stay updated! Subscribe to our mailing list for news, updates, and
            exclusive offers.
          </p>
          <div className="flex items-center justify-center">
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-full max-w-[420px] pl-4 py-1.5 pr-2.5 bg-white">
              <div className="text-gray-400 mr-2">
                <MdOutlineEmail size={22} />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-2 py-2 text-base outline-none bg-transparent text-gray-700"
              />
              <button className="bg-[#088178] hover:bg-[#056d6e] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors cursor-pointer whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full relative bg-[#04535c] pt-40 pb-15 xl:rounded-tl-[22px] xl:rounded-tr-[22px]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Footer Top Section */}
          <div className="pb-9 grid grid-cols-12 gap-6">
            {/* Brand Column */}
            <div className="col-span-12 md:col-span-12 xl:col-span-3 flex flex-col gap-y-6">
              <div>
                <Link href="/" className="text-2xl font-bold text-[#caf8e4]">
                  andgatePOSEcommerce
                </Link>
              </div>
              <p className="text-[#caf8e4] text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-[rgba(145,158,171,0.16)] flex items-center justify-center hover:bg-[#088178] transition-colors">
                    <social.icon size={16} className="text-white" />
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-y-[15px]">
                <p className="text-base font-semibold text-[#caf8e4]">
                  Download Our App:
                </p>
                <div className="flex gap-x-2.5">
                  <Link
                    href="#"
                    className="bg-black rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors">
                    <FaGooglePlay size={20} className="text-white" />
                    <div className="text-xs leading-tight text-white">
                      <span className="block text-[10px] text-gray-300 uppercase">
                        GET IT ON
                      </span>
                      <span className="font-semibold text-sm">Google Play</span>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="bg-black rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors">
                    <FaAppStoreIos size={20} className="text-white" />
                    <div className="text-xs leading-tight text-white">
                      <span className="block text-[10px] text-gray-300">
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
              <h5 className="text-[#caf8e4] pb-6 border-b border-[rgba(145,158,171,0.24)] text-lg font-semibold">
                About
              </h5>
              <ul className="flex flex-col gap-y-1.5 pt-4">
                {aboutLinks.map((link) => (
                  <li
                    key={link.label}
                    className="py-1.5 flex items-center gap-x-2">
                    <span className="inline-flex items-center">
                      <FaChevronRight size={12} className="text-[#caf8e4]" />
                    </span>
                    <Link
                      href={link.href}
                      className="text-[#caf8e4] font-semibold hover:underline text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* My Account Column */}
            <div className="col-span-12 md:col-span-6 xl:col-span-2">
              <h5 className="text-[#caf8e4] pb-6 border-b border-[rgba(145,158,171,0.24)] text-lg font-semibold">
                My Account
              </h5>
              <ul className="flex flex-col gap-y-1.5 pt-4">
                {accountLinks.map((link) => (
                  <li
                    key={link.label}
                    className="py-1.5 flex items-center gap-x-2">
                    <span className="inline-flex items-center">
                      <FaChevronRight size={12} className="text-[#caf8e4]" />
                    </span>
                    <Link
                      href={link.href}
                      className="text-[#caf8e4] font-semibold hover:underline text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories Column */}
            <div className="col-span-12 md:col-span-6 xl:col-span-2">
              <h5 className="text-[#caf8e4] pb-6 border-b border-[rgba(145,158,171,0.24)] text-lg font-semibold">
                Categories
              </h5>
              <ul className="flex flex-col gap-y-1.5 pt-4">
                {categoryLinks.map((link, index) => (
                  <li key={index} className="py-1.5 flex items-center gap-x-2">
                    <span className="inline-flex items-center">
                      <FaChevronRight size={12} className="text-[#caf8e4]" />
                    </span>
                    <Link
                      href={link.href}
                      className="text-[#caf8e4] font-semibold hover:underline text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information Column */}
            <div className="col-span-12 md:col-span-6 xl:col-span-3">
              <h5 className="text-[#caf8e4] pb-6 border-b border-[rgba(145,158,171,0.24)] text-lg font-semibold">
                Contact Information&apos;s
              </h5>
              <ul className="flex flex-col gap-y-1.5 py-4">
                <li className="flex items-center gap-x-3">
                  <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.16)] shrink-0">
                    <HiOutlineLocationMarker
                      size={20}
                      className="text-[#caf8e4]"
                    />
                  </span>
                  <p className="text-[#caf8e4] font-semibold text-sm">
                    Dhaka, Bangladesh
                  </p>
                </li>
                <li className="flex items-center gap-x-3">
                  <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.16)] shrink-0">
                    <HiOutlinePhone size={20} className="text-[#caf8e4]" />
                  </span>
                  <p className="text-[#caf8e4] font-semibold text-sm">
                    Call Us: 01577-303608
                  </p>
                </li>
                <li className="flex items-center gap-x-3">
                  <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.16)] shrink-0">
                    <HiOutlineMail size={20} className="text-[#caf8e4]" />
                  </span>
                  <p className="text-[#caf8e4] font-semibold text-sm">
                    andgatetech@gmail.com
                  </p>
                </li>
                <li className="flex items-center gap-x-3">
                  <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.16)] shrink-0">
                    <HiOutlinePrinter size={20} className="text-[#caf8e4]" />
                  </span>
                  <p className="text-[#caf8e4] font-semibold text-sm">
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

          {/* Footer Bottom Section - curved top border via SVG */}
          <div className="text-center text-white pt-[22px] pb-px relative">
            {/* SVG curved line separator */}
            <svg
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl"
              viewBox="0 0 1000 22"
              fill="none"
              preserveAspectRatio="none">
              <path
                d="M0 22 C200 22, 350 0, 500 0 C650 0, 800 22, 1000 22"
                stroke="rgba(145,158,171,0.24)"
                strokeWidth="1"
                fill="none"
              />
            </svg>
            <p className="text-[#caf8e4] text-sm pt-4">
              {new Date().getFullYear()} Copyright By Andgate Technologies
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-10 h-10 bg-[#088178] hover:bg-[#056d6e] text-white rounded-full flex items-center justify-center shadow-lg transition-all z-50 cursor-pointer">
          <FaChevronUp size={14} />
        </button>
      )}
    </>
  );
}
