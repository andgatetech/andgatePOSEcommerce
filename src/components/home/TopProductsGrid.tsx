import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart, FiArrowUpRight } from "react-icons/fi";
import { ROUTES, ROUTE_BUILDERS } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import GeneratedImageFallback from "@/components/shared/GeneratedImageFallback";
import type { EcommerceProduct } from "@/types";

const columnLabels = ["Top Selling", "Trending Products", "Recently Added", "Top Rated"];

interface TopProductsGridProps {
  products: EcommerceProduct[];
}

export default function TopProductsGrid({ products }: TopProductsGridProps) {
  if (products.length === 0) return null;

  // Split products evenly into 4 columns (3 per column ideally)
  const perColumn = Math.max(1, Math.ceil(products.length / 4));
  const columns = columnLabels.map((label, i) => ({
    id: label.toLowerCase().replace(/\s+/g, "-"),
    label,
    products: products.slice(i * perColumn, (i + 1) * perColumn),
  })).filter((col) => col.products.length > 0);

  return (
    <section id="best-sellers" className="px-4 pb-12 md:px-8 lg:px-12">
      <div className="mx-auto">
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
          {columns.map((col) => (
            <div key={col.id}>
              <div className="mb-6">
                <h3
                  className="text-[22px] font-semibold"
                  style={{ color: "var(--color-primary-900)" }}
                >
                  {col.label}
                </h3>
                <div className="relative mt-3 h-[2px] w-full bg-(--color-border)">
                  <span
                    className="absolute left-0 top-0 h-full w-[60px]"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                </div>
              </div>

              <ul className="flex flex-col divide-y divide-(--color-border)">
                {col.products.map((product) => {
                  const image = resolveImageUrl(product.images[0]?.url ?? null);
                  const price = parseFloat(product.price);

                  return (
                    <li key={product.id} className="group">
                      <Link
                        href={ROUTE_BUILDERS.productDetail(product.slug)}
                        className="flex items-center gap-4 py-4"
                      >
                        <div
                          className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-[12px]"
                          style={{ backgroundColor: "var(--color-primary-100)" }}
                        >
                          {image ? (
                            <Image
                              src={image}
                              alt={product.product_name}
                              fill
                              unoptimized
                              className="object-cover transition duration-300 group-hover:scale-[1.05]"
                            />
                          ) : (
                            <GeneratedImageFallback
                              name={product.product_name}
                              kind="product"
                              className="h-full w-full border-0"
                              iconClassName="text-[15px]"
                              textClassName="text-[18px]"
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className="line-clamp-2 text-[14px] font-semibold leading-[1.4] transition-colors duration-200 group-hover:text-(--color-primary)"
                            style={{ color: "var(--color-primary-900)" }}
                          >
                            {product.product_name}
                          </p>

                          {product.sold_by && (
                            <p className="mt-1 text-[12px] text-(--color-text-muted)">
                              By <span className="text-(--color-primary)">{product.sold_by.store_name}</span>
                            </p>
                          )}

                          <div className="mt-[6px] flex items-center justify-between gap-2">
                            <span
                              className="text-[16px] font-bold"
                              style={{ color: "var(--color-primary)" }}
                            >
                              ৳{price.toLocaleString("en-BD", { minimumFractionDigits: 2 })}
                            </span>

                            <span className="inline-flex items-center gap-[5px] rounded-[6px] bg-(--color-primary) px-3 py-[7px] text-[13px] font-semibold text-white">
                              <FiShoppingCart className="text-[12px]" />
                              Add
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
