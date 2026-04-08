import Link from "next/link";
import {
  FiChevronRight,
  FiEdit2,
  FiHeart,
  FiHome,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";
import { cartMockItems, type CartItem } from "@/components/shared/navbar/cartMockData";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import { ROUTES } from "@/config/routes";

type CartPageItem = CartItem & {
  availability: number;
  ratingCount: number;
};

const cartItems: CartPageItem[] = cartMockItems.map((item) => ({
  ...item,
  availability: 2,
  ratingCount: 118,
}));

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

function CartThumbnail({ item }: { item: CartItem }) {
  return (
    <div className="relative h-[108px] w-[108px] overflow-hidden rounded-[20px] bg-[#f7f7f9] max-sm:h-[88px] max-sm:w-[88px]">
      {item.thumbnail === "melon" ? (
        <>
          <div className="absolute left-4 top-4 h-11 w-11 rounded-full border-4 border-[#438e3f] bg-[#8fd25b]" />
          <div className="absolute left-10 top-7 h-14 w-14 rounded-full border-4 border-[#3b9c3e] bg-[#ef4f58]" />
          <div className="absolute left-[42px] top-[29px] h-10 w-10 rounded-full border-[3px] border-[#fff5e4] bg-[#f65b63]" />
          <div className="absolute left-4 top-[60px] h-8 w-14 -rotate-10 rounded-[999px_999px_10px_10px] border-[3px] border-[#3b9c3e] bg-[#f65b63]" />
          <div className="absolute left-7 top-[63px] h-5 w-9 -rotate-10 rounded-[999px_999px_8px_8px] border-2 border-[#fff5e4] bg-[#ff6c74]" />
        </>
      ) : null}

      {item.thumbnail === "avocado" ? (
        <>
          <div className="absolute left-4 top-4 h-12 w-10 rotate-14 rounded-[999px] bg-[#447d39]" />
          <div className="absolute left-8 top-5 h-13 w-10 rotate-10 rounded-[999px] bg-[#5c9e4d]" />
          <div className="absolute left-3 top-[46px] h-8 w-16 -rotate-18 rounded-[999px] bg-[#7fb95b]" />
          <div className="absolute left-6 top-[50px] h-6 w-11 -rotate-18 rounded-[999px] bg-[#fff0c7]" />
          <div className="absolute left-10 top-[54px] h-4 w-4 rounded-full bg-[#b56b2d]" />
        </>
      ) : null}

      {item.thumbnail === "pouch" ? (
        <>
          <div className="absolute left-8 top-2 h-24 w-11 -skew-y-4 rounded-[7px] bg-[#4f8c35]" />
          <div className="absolute left-9 top-5 h-4 w-8 rounded-sm bg-[#376427]" />
          <div className="absolute left-8 top-11 h-5 w-11 bg-[#2f4f1f]" />
          <div className="absolute left-3 top-[52px] h-6 w-[74px] bg-[#d93025]" />
          <div className="absolute left-6 top-[56px] text-[9px] font-semibold text-white">
            Out of Stock
          </div>
          <div className="absolute left-11 top-11 h-10 w-3 bg-[#88c668]" />
        </>
      ) : null}
    </div>
  );
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

export default function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  return (
    <section className="bg-(--color-bg)">
      <div className="mx-auto  px-4 py-6 md:px-5 lg:px-7 xl:px-8 xl:py-8">
        <div className="mb-7 flex items-center gap-3 text-sm text-(--color-text-muted)">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)"
          >
            <FiHome className="text-[17px]" />
            <span>Home</span>
          </Link>
          <span>&bull;</span>
          <span>Cart</span>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-(--color-dark) max-sm:text-[24px]">
            Cart <span className="text-(--color-text-muted)">({cartItems.length} item)</span>
          </h1>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px]">
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4 text-sm">
              <label className="inline-flex items-center gap-2.5 font-semibold text-(--color-dark)">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-(--color-border) accent-(--color-primary)"
                />
                Select All
              </label>

              <button
                type="button"
                className="inline-flex items-center gap-2 font-semibold text-(--color-danger) transition hover:opacity-80"
              >
                <FiTrash2 />
                Remove All
              </button>
            </div>

            <div className="overflow-hidden rounded-[22px] border border-(--color-border) bg-(--color-bg)">
            <div className="hidden grid-cols-[minmax(0,1.8fr)_0.55fr_0.6fr_0.55fr_0.35fr] items-center gap-4 bg-[#f4f6f8] px-4 py-3 text-sm font-semibold text-(--color-dark) md:grid">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total Price</span>
              <span>Action</span>
            </div>

            <div className="divide-y divide-(--color-border)">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="grid min-h-[146px] gap-4 px-4 py-3.5 md:grid-cols-[minmax(0,1.8fr)_0.55fr_0.6fr_0.55fr_0.35fr] md:items-center md:px-4"
                >
                  <div className="flex gap-4">
                    <label className="flex shrink-0 items-start pt-1.5">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 rounded border-(--color-border) accent-(--color-primary)"
                      />
                    </label>

                    <CartThumbnail item={item} />

                    <div className="min-w-0 pt-1">
                      <h2 className="truncate text-base font-semibold tracking-[-0.02em] text-(--color-dark) max-sm:text-[15px]">
                        {item.name}
                      </h2>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-(--color-text-muted)">
                        <span>{item.variant}</span>
                        <button
                          type="button"
                          className="inline-flex items-center text-(--color-primary) transition hover:opacity-80"
                        >
                          <FiEdit2 />
                        </button>
                      </div>

                      <p className="mt-2 text-sm text-(--color-dark)">
                        Available: <span className="text-(--color-text-muted)">{item.availability}</span>
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-sm text-(--color-text-muted)">
                        <RatingStars />
                        <span>({item.ratingCount})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:block">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
                      Price
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-(--color-dark)">
                        {formatPrice(item.price)}
                      </span>
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

                  <div className="flex items-center gap-3 md:block">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-muted) md:hidden">
                      Total
                    </span>
                    <span className="text-base font-bold text-(--color-dark)">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-(--color-dark)">
                    <button
                      type="button"
                      className="transition hover:text-(--color-primary)"
                    >
                      <FiHeart size={24} />
                    </button>
                    <button
                      type="button"
                      className="transition hover:text-(--color-danger)"
                    >
                      <FiTrash2 size={24} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

              <div className="h-3 bg-(--color-bg)" />
            </div>
          </div>

          <aside className="h-fit rounded-[22px] border border-(--color-border) bg-(--color-bg) p-4.5 max-sm:p-4">
            <div className="mb-5 rounded-full bg-[#eef6ef] px-4.5 py-3 text-sm font-semibold text-(--color-dark)">
              <span className="text-(--color-primary)">Spend $60.00</span> for{" "}
              <span className="text-[#0d7a74]">Free Shipping</span>
            </div>

            <div className="rounded-[20px] border border-(--color-border) p-4.5 max-sm:p-4">
              <h2 className="text-base font-semibold tracking-[-0.02em] text-(--color-dark)">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-(--color-text-muted)">Sub-Total</span>
                  <span className="font-medium text-(--color-dark)">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-(--color-text-muted)">VAT (20%)</span>
                  <span className="font-medium text-(--color-dark)">{formatPrice(vat)}</span>
                </div>
                <div className="border-t border-(--color-border) pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-(--color-dark)">Total</span>
                    <span className="text-base font-bold text-(--color-dark)">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              <Link
                href={ROUTES.CHECKOUT}
                className="flex min-h-[54px] items-center justify-center rounded-full bg-(--color-primary) px-6 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
              >
                <FiShoppingBag className="mr-2" />
                Proceed to checkout
              </Link>

              <Link
                href={ROUTES.SHOP}
                className="flex min-h-[54px] items-center justify-center rounded-full border border-(--color-primary) bg-(--color-primary-100) px-6 text-sm font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-(--color-bg)"
              >
                Continue Shopping
                <FiChevronRight className="ml-2" />
              </Link>
            </div>
          </aside>
        </div>

        <ServiceHighlights className="mt-10" />
      </div>
    </section>
  );
}
