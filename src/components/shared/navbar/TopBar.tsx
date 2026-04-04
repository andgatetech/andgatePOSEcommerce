import Link from "next/link";
import { FaHeadset, FaBolt } from "react-icons/fa";

const topRightLinks = [
  { label: "About us", href: "/about" },
  { label: "My Account", href: "/my-account" },
  { label: "My Wishlist", href: "/wishlist" },
  { label: "Order Tracking", href: "/order-tracking" },
];

export default function TopBar() {
  return (
    <div className="bg-(--color-primary-dark)">
      <div className="mx-auto px-4">
        <div className="flex items-center xl:justify-between justify-center">

          {/* Left — Support */}
          <div className="xl:flex items-center gap-x-6 hidden">
            <p className="flex items-center gap-x-2 text-white text-sm leading-[22px]">
              <span>
                <FaHeadset className="text-lg text-(--color-primary-200)" />
              </span>
              Need Support ?
              <span>Call Us</span>
              <a
                href="tel:01577303608"
                className="bg-(--color-cta) py-px px-2 text-xs leading-[18px] rounded-[60px] text-white font-medium hover:bg-(--color-cta-hover) transition-colors"
              >
                01577-303608
              </a>
            </p>
          </div>

          {/* Center — Promo */}
          <div className="flex items-center gap-x-2 py-3 xl:py-0">
            <FaBolt className="text-(--color-cta) text-lg" />
            <p className="text-white text-sm leading-[22px]">
              Fashion Category
              <span className="bg-(--color-cta) text-white text-xs font-semibold py-px px-2 rounded-[60px] mx-1.5">
                25% OFF
              </span>
              Today
            </p>
          </div>

          {/* Right — Quick Links */}
          <div className="xl:flex items-center hidden">
            {topRightLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm leading-[22px] text-(--color-primary-200) hover:text-white transition-colors py-3.5 ${
                  index < topRightLinks.length - 1
                    ? "pr-[19px] mr-[19px] relative after:absolute after:h-[30px] after:w-px after:bg-(--color-primary) after:right-0 after:top-1/2 after:-translate-y-1/2"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
