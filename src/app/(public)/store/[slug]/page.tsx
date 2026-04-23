import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FiChevronRight, FiHome, FiShoppingBag } from "react-icons/fi";
import ProductPageDataProvider from "@/app/(public)/product/_components/ProductPageDataProvider";
import { ROUTES } from "@/config/routes";
import { resolveStoreLogoUrl } from "@/lib/storeLogo";
import { serverFetchJson } from "@/lib/serverFetch";
import type { PaginatedResponse, Store, Category, Brand } from "@/types";

async function getStoreBySlug(slug: string): Promise<Store | null> {
  try {
    const response = await serverFetchJson<PaginatedResponse<Store>>("/stores", {
      per_page: 100,
      sort_field: "store_name",
      sort_direction: "asc",
    });

    return response.data.items.find((item) => item.slug === slug) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);

  if (!store) {
    return {
      title: "Store Not Found | Hawkeri",
    };
  }

  return {
    title: `${store.store_name} | Hawkeri`,
    description: `Browse ${store.store_name} on Hawkeri.`,
  };
}

export default async function StoreDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);

  if (!store) {
    notFound();
  }

  const logoUrl = resolveStoreLogoUrl(store.logo_path);

  let categories: Category[] = [];
  try {
    const categoriesResponse = await serverFetchJson<PaginatedResponse<Category>>("/categories", {
      store: slug,
      per_page: 100,
      sort_field: "name",
      sort_direction: "asc",
    });
    categories = categoriesResponse.data?.items ?? [];
  } catch {}

  let brands: Brand[] = [];
  try {
    const brandsResponse = await serverFetchJson<PaginatedResponse<Brand>>("/brands", {
      store: slug,
      per_page: 100,
      sort_field: "name",
      sort_direction: "asc",
    });
    brands = brandsResponse.data?.items ?? [];
  } catch {}

  return (
    <section className="bg-(--color-bg)">
      <div className="mx-auto px-4 py-8 md:px-5 lg:px-7 xl:px-8 xl:py-10">
        <div className="mb-7 flex items-center gap-3 text-sm text-(--color-text-muted)">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)"
          >
            <FiHome className="text-[17px]" />
            <span>Home</span>
          </Link>
          <span>&bull;</span>
          <Link href={ROUTES.STORE} className="transition hover:text-(--color-primary)">
            Store
          </Link>
          <FiChevronRight className="text-[14px]" />
          <span>{store.store_name}</span>
        </div>

        <div className="overflow-hidden rounded-[30px] border border-(--color-border) bg-white shadow-[0_18px_60px_rgba(19,45,69,0.06)]">
          <div className="grid gap-8 bg-[radial-gradient(circle_at_top_left,rgba(220,234,246,0.95),transparent_48%),linear-gradient(135deg,#ffffff_0%,#f8fbff_100%)] p-8 md:grid-cols-[1.2fr_0.8fr] lg:p-10">
            <div>
              <span className="inline-flex rounded-full border border-(--color-primary-200) bg-(--color-primary-100) px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-(--color-primary)">
                Ecommerce Store
              </span>
              <h1 className="mt-5 text-[30px] font-semibold tracking-[-0.03em] text-(--color-primary-900) md:text-[40px]">
                {store.store_name}
              </h1>



              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={ROUTES.STORE}
                  className="inline-flex items-center rounded-full border border-(--color-border) bg-white px-4 py-2 text-[13px] font-semibold text-(--color-primary-900) transition hover:border-(--color-primary-200) hover:text-(--color-primary)"
                >
                  <FiShoppingBag className="mr-2 text-[14px]" />
                  Back to all stores
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex min-h-[240px] w-full max-w-[340px] items-center justify-center rounded-[24px] border border-white/70 bg-white/75 p-6 shadow-[0_14px_38px_rgba(19,45,69,0.08)] backdrop-blur">
                {logoUrl ? (
                  <div className="relative h-[220px] w-full">
                    <Image
                      src={logoUrl}
                      alt={store.store_name}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-[220px] w-full items-center justify-center rounded-[18px] border border-dashed border-(--color-primary-200) bg-(--color-primary-100) px-6 text-center text-sm font-medium text-(--color-primary)">
                    {store.store_name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full border border-(--color-primary-200) bg-(--color-primary-100) px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-(--color-primary)">
                Store Products
              </span>
              <h2 className="mt-4 text-[24px] font-semibold tracking-[-0.03em] text-(--color-primary-900) md:text-[32px]">
                Products from {store.store_name}
              </h2>
            </div>
          </div>
        </div>

        <ProductPageDataProvider
          initialStore={store.slug}
          categories={categories}
          brands={brands}
        />
      </div>
    </section>
  );
}
