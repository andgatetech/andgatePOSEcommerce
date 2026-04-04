import Link from "next/link";
import {
  FaChevronDown,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import Logo from "../Logo";

export default function MainHeader() {
  return (
    <div className="py-2.5 hidden xl:block bg-(--color-bg) shadow-sm">
      <div className="mx-auto px-4">
        <div className="flex items-center">
          {/* Logo */}
          <Logo width={180} height={48} />

          {/* Right: Search + Account + Cart */}
          <div className="flex items-center w-full justify-end gap-x-[54px]">
            {/* Search Bar */}
            <div className="relative w-full 2xl:max-w-[800px] xl:max-w-[600px]">
              <div className="flex items-center border border-(--color-border) rounded-full px-6 py-3 focus-within:border-(--color-primary) focus-within:ring-1 focus-within:ring-(--color-primary-light) transition-all">
                <input
                  type="text"
                  placeholder="Search for the Items"
                  className="flex-1 text-base outline-none bg-transparent text-(--color-dark) placeholder:text-gray-400"
                />
                <FaSearch className="text-(--color-primary) text-lg" />
              </div>
            </div>

            {/* Account & Cart */}
            <ul className="flex items-center gap-x-6">
              {/* Account */}
              <li className="flex items-center group">
                <Link
                  href="/login"
                  className="flex items-center gap-x-4 cursor-pointer relative"
                >
                  <span className="inline-flex items-center justify-center bg-(--color-cta) w-10 h-10 rounded-full group-hover:bg-(--color-cta-hover) transition-colors">
                    <FaUser className="text-base text-white" />
                  </span>
                  <p className="flex flex-col text-(--color-text-muted) text-sm leading-[22px]">
                    Account
                    <span className="text-base leading-6 text-(--color-dark) font-medium">
                      Log in
                    </span>
                  </p>
                  <FaChevronDown className="text-sm text-(--color-dark)" />
                </Link>
              </li>

              {/* Cart */}
              <li className="flex items-center">
                <Link
                  href="/cart"
                  className="flex items-center gap-x-4 cursor-pointer group">
                  <span className="inline-flex items-center justify-center bg-(--color-cta) w-10 h-10 rounded-full group-hover:bg-(--color-cta-hover) transition-colors">
                    <FaShoppingCart className="text-base text-white" />
                  </span>
                  <span className="flex flex-col items-start">
                    <span className="text-[11px] uppercase tracking-wider text-(--color-text-muted) font-medium mb-0.5">
                      Cart
                    </span>
                    <span className="text-[15px] leading-none text-(--color-dark) font-bold">
                      0 Items
                    </span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
