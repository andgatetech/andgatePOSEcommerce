import Link from "next/link";
import {
  FiHeart,
  FiHome,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiTrash2,
} from "react-icons/fi";
import WishlistThumbnail from "./WishlistThumbnail";
import { wishlistMockItems } from "./wishlistMockData";
import { ROUTES } from "@/config/routes";

type WishlistContentProps = {
  variant?: "page" | "account";
};

function formatPrice(value: number) {
  return variantCurrency(value);
}

function variantCurrency(value: number) {
  return `৳${value.toFixed(2)}`;
}

function RatingStars() {
  return (
    <div className="flex items-center gap-1 text-[15px] leading-none">
      <span className="text-(--color-cta)">★</span>
      <span className="text-(--color-cta)">★</span>
      <span className="text-(--color-cta)">★</span>
      <span className="text-(--color-cta)">★</span>
      <span className="text-[#cfd6df]">★</span>
    </div>
  );
}

export default function WishlistContent({ variant = "page" }: WishlistContentProps) {
  const selectedCount = wishlistMockItems.filter((item) => item.selected).length;
  const isAccount = variant === "account";

  return (
    <div>
      {!isAccount ? (
        <div className="mb-7 flex items-center gap-3 text-sm text-(--color-text-muted)">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)"
          >
            <FiHome className="text-[17px]" />
            <span>Home</span>
          </Link>
          <span>&bull;</span>
          <span>Wishlist</span>
        </div>
      ) : null}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1
            className={`font-semibold tracking-[-0.04em] text-(--color-dark) ${
              isAccount ? "text-[34px]" : "text-[28px] max-sm:text-[24px]"
            }`}
          >
            {isAccount ? "Wishlist" : "Product Wishlist"}
          </h1>
          {isAccount ? (
            <p className="mt-2 text-sm text-(--color-text-muted)">
              {selectedCount} items selected. This panel is mock now and ready for future dynamic account data.
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {!isAccount ? (
            <p className="text-sm font-semibold text-(--color-dark)">{selectedCount} items is selected</p>
          ) : null}
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-full bg-(--color-primary) text-sm font-semibold text-(--color-bg) shadow-[0_10px_24px_rgba(44,95,138,0.18)] transition hover:bg-(--color-primary-dark) ${
              isAccount ? "min-h-[52px] px-7" : "min-h-[54px] px-7"
            }`}
          >
            <FiShoppingCart className="mr-2 text-[18px]" />
            {isAccount ? "Add Selected To Cart" : "Add to Cart"}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border border-(--color-border) bg-(--color-bg) ${
          isAccount
            ? "rounded-[24px] shadow-[0_18px_40px_rgba(17,17,17,0.04)]"
            : "rounded-[22px]"
        }`}
      >
        <div
          className={`hidden items-center gap-4 bg-[#f4f6f8] text-sm font-semibold text-(--color-dark) md:grid ${
            isAccount
              ? "grid-cols-[2fr_0.7fr_0.8fr_0.95fr_1.15fr_0.45fr] px-6 py-4"
              : "grid-cols-[0.34fr_2.2fr_0.7fr_0.8fr_0.95fr_1.15fr_0.45fr] px-7 py-4"
          }`}
        >
          {!isAccount ? (
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-(--color-border) accent-(--color-primary)"
              />
            </label>
          ) : null}
          <span>Product</span>
          <span>{isAccount ? "Stock" : "Stock Status"}</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Buy Action</span>
          <span>Remove</span>
        </div>

        <div className="divide-y divide-(--color-border)">
          {wishlistMockItems.map((item) => (
            <article
              key={item.id}
              className={`grid gap-4 px-4 py-4 md:items-center ${
                isAccount
                  ? "md:grid-cols-[2fr_0.7fr_0.8fr_0.95fr_1.15fr_0.45fr] md:px-6"
                  : "md:grid-cols-[0.34fr_2.2fr_0.7fr_0.8fr_0.95fr_1.15fr_0.45fr] md:px-7"
              }`}
            >
              {!isAccount ? (
                <label className="hidden md:inline-flex md:items-center">
                  <input
                    type="checkbox"
                    defaultChecked={item.selected}
                    className="h-4 w-4 rounded border-(--color-border) accent-(--color-primary)"
                  />
                </label>
              ) : null}

              <div className="flex gap-4">
                {!isAccount ? (
                  <label className="flex shrink-0 items-start pt-1.5 md:hidden">
                    <input
                      type="checkbox"
                      defaultChecked={item.selected}
                      className="h-4 w-4 rounded border-(--color-border) accent-(--color-primary)"
                    />
                  </label>
                ) : null}

                <WishlistThumbnail item={item} />

                <div className="min-w-0 pt-1">
                  {isAccount ? (
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-(--color-primary-100) px-3 py-1 text-xs font-semibold text-(--color-primary)">
                      <FiHeart className="text-[12px]" />
                      Saved Item
                    </div>
                  ) : null}
                  <h2 className="truncate text-base font-semibold tracking-[-0.02em] text-(--color-dark)">
                    {item.name}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-[#0f8f86]">{item.category}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-(--color-text-muted)">
                    <RatingStars />
                    <span>({item.ratingCount})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 md:block">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
                  Stock
                </span>
                <span className="text-base font-semibold text-(--color-dark)">{item.stockStatus}</span>
              </div>

              <div className="flex items-center gap-3 md:block">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
                  Price
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-base font-bold text-(--color-dark)">{formatPrice(item.price)}</span>
                  {item.originalPrice ? (
                    <span className="text-sm text-(--color-text-muted) line-through">
                      {formatPrice(item.originalPrice)}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center gap-3 md:block">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
                  Quantity
                </span>
                <div className="inline-flex items-center rounded-full border border-(--color-border) bg-(--color-bg) px-3 py-2">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100)"
                  >
                    <FiMinus size={15} />
                  </button>
                  <span className="min-w-10 text-center text-base font-semibold text-(--color-dark)">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-(--color-primary) text-(--color-primary) transition hover:bg-(--color-primary-100)"
                  >
                    <FiPlus size={15} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className={`inline-flex items-center justify-center rounded-full bg-(--color-cta) text-sm font-semibold text-(--color-bg) shadow-[0_12px_24px_rgba(216,137,31,0.24)] transition hover:bg-(--color-cta-hover) ${
                    isAccount ? "min-h-[44px] px-6" : "min-h-[46px] px-7"
                  }`}
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  className={`inline-flex items-center justify-center rounded-full bg-(--color-primary) text-sm font-semibold text-(--color-bg) shadow-[0_10px_24px_rgba(44,95,138,0.18)] transition hover:bg-(--color-primary-dark) ${
                    isAccount ? "min-h-[44px] px-5" : "min-h-[46px] px-6"
                  }`}
                >
                  <FiShoppingCart className="mr-2 text-[18px]" />
                  {isAccount ? "Add" : "Add To Cart"}
                </button>
              </div>

              <div className="flex items-center md:justify-center">
                <button
                  type="button"
                  className="text-(--color-dark) transition hover:text-(--color-danger)"
                >
                  <FiTrash2 size={24} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
