import Link from "next/link";
import { FaChevronDown, FaThLarge, FaPhoneAlt } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "/", hasDropdown: true },
  { label: "About Us", href: "/about", hasDropdown: false },
  { label: "Shop", href: "/shop", hasDropdown: true },
  { label: "Sellers", href: "/sellers", hasDropdown: true },
  { label: "Mega Menu", href: "/mega-menu", hasDropdown: true },
  { label: "Blog", href: "/blog", hasDropdown: true },
  { label: "Pages", href: "/pages", hasDropdown: true },
  { label: "Contact", href: "/contact", hasDropdown: false },
];

export default function SecondaryNav() {
  return (
    <div className="hidden xl:block bg-(--color-bg) border-y border-(--color-border) py-3">
      <div className=" mx-auto px-4">
        <div className="flex items-center gap-x-6">

          {/* Explore All Categories */}
          <button className="flex items-center gap-x-2 bg-(--color-primary) text-white text-sm font-medium px-4 py-3 whitespace-nowrap hover:bg-(--color-primary-dark) transition-colors cursor-pointer">
            <FaThLarge className="text-base" />
            <span>Explore All Categories</span>
            <FaChevronDown className="text-xs ml-1" />
          </button>

          {/* Nav Links */}
          <nav className="flex items-center flex-1">
            <ul className="flex items-center">
              {navLinks.map((link) => (
                <li key={link.label} className="relative group">
                  <Link
                    href={link.href}
                    className="flex items-center gap-x-1 text-sm font-medium text-(--color-dark) hover:text-(--color-primary) transition-colors px-3.5 py-3"
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <FaChevronDown className="text-[10px] text-(--color-text-muted)" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 24/7 Support */}
          <div className="flex items-center gap-x-2.5 whitespace-nowrap ml-auto">
            <span className="w-9 h-9 inline-flex items-center justify-center rounded-full border-2 border-(--color-primary) text-(--color-primary)">
              <FaPhoneAlt className="text-sm" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] text-(--color-text-muted) font-medium">24/7 Support</span>
              <a
                href="tel:01577303608"
                className="text-sm font-bold text-(--color-dark) hover:text-(--color-primary) transition-colors"
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
