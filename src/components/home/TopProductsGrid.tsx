import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";
import { productColumns } from "@/components/home/topProductsData";
import { ROUTES } from "@/config/routes";

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < rating ? "var(--color-warning)" : "var(--color-border)" }}>
      ★
    </span>
  ));
}

export default function TopProductsGrid() {
  return (
    <section className="px-4 pb-12 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[640px]">
            <span className="inline-flex rounded-full border border-(--color-primary-200) bg-(--color-primary-100) px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-(--color-primary)">
              Top Product Picks
            </span>
            <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.03em] text-(--color-primary-900) md:text-[38px]">
              Best Sellers Across Categories
            </h2>
          </div>

          <Link
            href={ROUTES.SHOP}
            className="inline-flex items-center gap-3 self-start rounded-full bg-(--color-primary) px-5 py-3 text-[15px] font-semibold text-white shadow-[0_14px_28px_rgba(44,95,138,0.24)] transition hover:bg-(--color-primary-dark)"
          >
            Explore Collection
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-(--color-primary-900)">
              <FiArrowUpRight className="text-[18px]" />
            </span>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {productColumns.map((col) => (
            <div key={col.id}>
              {/* Column Header */}
              <div className="mb-6">
                <h3
                  className="text-[22px] font-semibold"
                  style={{ color: "var(--color-primary-900)" }}
                >
                  {col.label}
                </h3>
                {/* Underline: full gray line + short accent */}
                <div className="relative mt-3 h-[2px] w-full bg-(--color-border)">
                  <span
                    className="absolute left-0 top-0 h-full w-[60px]"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                </div>
              </div>

              {/* Product List */}
              <ul className="flex flex-col divide-y divide-(--color-border)">
                {col.products.map((product) => (
                  <li
                    key={product.id}
                    className="group flex items-center gap-4 py-4"
                  >
                    {/* Thumbnail */}
                    <div
                      className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-[12px]"
                      style={{ backgroundColor: "var(--color-primary-100)" }}
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        unoptimized
                        className="object-cover transition duration-300 group-hover:scale-[1.05]"
                      />
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      {/* Title */}
                      <p
                        className="line-clamp-2 text-[14px] font-semibold leading-[1.4] transition-colors duration-200 group-hover:text-(--color-primary)"
                        style={{ color: "var(--color-primary-900)" }}
                      >
                        {product.title}
                      </p>

                      {/* Stars */}
                      <div className="mt-1 flex items-center gap-1 text-[13px] leading-none">
                        <div className="flex">{renderStars(product.rating)}</div>
                        <span style={{ color: "var(--color-text-muted)" }}>
                          ({product.rating}.0)
                        </span>
                      </div>

                      {/* Price + Add Button */}
                      <div className="mt-[6px] flex items-center justify-between gap-2">
                        <div className="flex items-end gap-2">
                          <span
                            className="text-[16px] font-bold"
                            style={{ color: "var(--color-primary)" }}
                          >
                            ৳{product.price.toFixed(2)}
                          </span>
                          <span
                            className="mb-px text-[13px] line-through"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            ৳{product.oldPrice}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="inline-flex items-center gap-[5px] rounded-[6px] bg-(--color-primary) px-3 py-[7px] text-[13px] font-semibold text-white transition hover:bg-(--color-primary-dark)"
                        >
                          <FiShoppingCart className="text-[12px]" />
                          Add
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
