import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { ROUTES, ROUTE_BUILDERS } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import GeneratedImageFallback from "@/components/shared/GeneratedImageFallback";
import Container from "@/components/shared/Container";
import AddToCartButton from "@/app/(public)/product/_components/AddToCartButton";
import type { EcommerceProduct } from "@/types";

const columnLabels = ["Top Selling", "Trending Products", "Recently Added", "Top Rated"];

interface TopProductsGridProps {
  products: EcommerceProduct[];
}

export default function TopProductsGrid({ products }: TopProductsGridProps) {
  const unique = Array.from(new Map(products.map((p) => [p.id, p])).values());
  if (unique.length === 0) return null;

  const perColumn = Math.max(1, Math.ceil(unique.length / 4));
  const columns = columnLabels.map((label, i) => ({
    id: label.toLowerCase().replace(/\s+/g, "-"),
    label,
    products: unique.slice(i * perColumn, (i + 1) * perColumn),
  })).filter((col) => col.products.length > 0);

  return (
    <section id="best-sellers" className="pb-12">
      <Container>
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
                  const displayPrice = product.promotion?.deal_price ?? product.price;
                  const price = parseFloat(displayPrice);
                  const stockCount = parseFloat(product.quantity);

                  return (
                    <li key={product.id} className="group">
                      <div className="flex items-center gap-4 py-4">
                        <Link href={ROUTE_BUILDERS.productDetail(product.slug)} className="shrink-0">
                          <div
                            className="relative h-[80px] w-[80px] overflow-hidden rounded-[12px] bg-[#f7f8fa]"
                          >
                            {image ? (
                              <Image
                                src={image}
                                alt={product.product_name}
                                fill
                                sizes="80px"
                                className="object-contain p-2 transition duration-300 group-hover:scale-[1.05]"
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
                        </Link>

                        <div className="min-w-0 flex-1">
                          <Link href={ROUTE_BUILDERS.productDetail(product.slug)}>
                            <p
                              className="line-clamp-2 text-[14px] font-semibold leading-[1.4] transition-colors duration-200 group-hover:text-(--color-primary)"
                              style={{ color: "var(--color-primary-900)" }}
                            >
                              {product.product_name}
                            </p>
                          </Link>

                          {product.sold_by && (
                            <p className="mt-1 text-[12px] text-(--color-text-muted)">
                              By{" "}
                              <Link
                                href={ROUTE_BUILDERS.storeDetail(product.sold_by.store_slug)}
                                className="text-(--color-primary) transition hover:text-(--color-primary-900)"
                              >
                                {product.sold_by.store_name}
                              </Link>
                            </p>
                          )}

                          <div className="mt-[6px] flex items-center justify-between gap-2">
                            <span
                              className="text-[16px] font-bold"
                              style={{ color: "var(--color-primary)" }}
                            >
                              ৳{price.toLocaleString("en-BD", { minimumFractionDigits: 2 })}
                            </span>

                            <AddToCartButton
                              stockId={product.id}
                              stockCount={stockCount}
                              product={{
                                id: product.id,
                                slug: product.slug,
                                sku: product.sku,
                                price: displayPrice,
                                available_qty: stockCount,
                                variant_data: product.variant_data,
                                product_name: product.product_name,
                                description: product.description,
                                images: product.images,
                                store: {
                                  id: 0,
                                  store_name: product.sold_by.store_name,
                                  slug: product.sold_by.store_slug,
                                },
                              }}
                              className="max-w-[132px]"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
