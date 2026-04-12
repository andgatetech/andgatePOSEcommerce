import Image from "next/image";
import Link from "next/link";
import { FiChevronRight, FiHome } from "react-icons/fi";
import PopularProductCard from "./PopularProductCard";
import { ROUTES } from "@/config/routes";
import { resolveImageUrl } from "@/lib/imageUrl";
import type { EcommerceProduct } from "@/types";

type CollectionEntity = {
  name: string;
  slug: string;
  image_url: string | null;
};

interface ProductCollectionPageProps {
  entity: CollectionEntity;
  kind: "brand" | "category";
  products: EcommerceProduct[];
}

export default function ProductCollectionPage({
  entity,
  kind,
  products,
}: ProductCollectionPageProps) {
  const listingHref = kind === "brand" ? ROUTES.BRAND : ROUTES.CATEGORY;
  const listingLabel = kind === "brand" ? "Brand" : "Category";
  const eyebrow = kind === "brand" ? "Brand Collection" : "Category Collection";

  return (
    <section className="bg-(--color-bg)">
      <div className="mx-auto max-w-[1720px] px-4 py-8 md:px-8 lg:px-10 lg:py-10">
        <div className="mb-7 flex items-center gap-3 text-sm text-(--color-text-muted)">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)"
          >
            <FiHome className="text-[17px]" />
            <span>Home</span>
          </Link>
          <span>&bull;</span>
          <Link href={listingHref} className="transition hover:text-(--color-primary)">
            {listingLabel}
          </Link>
          <FiChevronRight className="text-[14px]" />
          <span>{entity.name}</span>
        </div>

        <div className="overflow-hidden rounded-[30px] border border-(--color-border) bg-white shadow-[0_18px_60px_rgba(19,45,69,0.06)]">
          <div className="grid gap-8 bg-[radial-gradient(circle_at_top_left,rgba(220,234,246,0.95),transparent_48%),linear-gradient(135deg,#ffffff_0%,#f8fbff_100%)] p-6 md:grid-cols-[1.3fr_0.7fr] md:p-8 lg:p-10">
            <div>
              <span className="inline-flex rounded-full border border-(--color-primary-200) bg-(--color-primary-100) px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-(--color-primary)">
                {eyebrow}
              </span>
              <h1 className="mt-5 text-[30px] font-semibold tracking-[-0.03em] text-(--color-primary-900) md:text-[40px]">
                {entity.name}
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex rounded-full bg-(--color-primary-900) px-4 py-2 text-[13px] font-semibold text-white">
                  {products.length} products
                </span>
                <Link
                  href={listingHref}
                  className="inline-flex rounded-full border border-(--color-border) bg-white px-4 py-2 text-[13px] font-semibold text-(--color-primary-900) transition hover:border-(--color-primary-200) hover:text-(--color-primary)"
                >
                  Back to all {kind}s
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex min-h-[220px] w-full max-w-[340px] items-center justify-center rounded-[24px] border border-white/70 bg-white/75 p-6 shadow-[0_14px_38px_rgba(19,45,69,0.08)] backdrop-blur">
                {resolveImageUrl(entity.image_url) ? (
                  <div className="relative h-[180px] w-full">
                    <Image
                      src={resolveImageUrl(entity.image_url)!}
                      alt={entity.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-[180px] w-full items-center justify-center rounded-[18px] border border-dashed border-(--color-primary-200) bg-(--color-primary-100) px-6 text-center text-sm font-medium text-(--color-primary)">
                    {entity.name}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-10">
            {products.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {products.map((product) => (
                  <PopularProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] border border-dashed border-(--color-border) bg-[linear-gradient(180deg,#fbfdff_0%,#f5f9fc_100%)] px-6 py-12 text-center">
                <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-(--color-primary-900)">
                  No products found
                </h2>
                <p className="mx-auto mt-3 max-w-[640px] text-sm leading-7 text-(--color-text-muted)">
                  There are currently no products listed under{" "}
                  <span className="font-semibold text-(--color-primary-900)">{entity.name}</span>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
