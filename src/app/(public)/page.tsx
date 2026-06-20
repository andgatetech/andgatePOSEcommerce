import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedStores from "@/components/home/FeaturedStores";
import PopularProductsSection from "./product/_components/PopularProductsSection";
import ProductPromoBanners from "./product/_components/ProductPromoBanners";
import DealsOfTheDay from "@/components/home/DealsOfTheDay";
import EditorialPromoGrid from "@/components/home/EditorialPromoGrid";
import TopProductsGrid from "@/components/home/TopProductsGrid";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import RecentlyViewedSection from "@/components/home/RecentlyViewedSection";
import CountdownPromoBanner from "@/components/home/CountdownPromoBanner";
import TrustStatsBar from "@/components/home/TrustStatsBar";
import HowItWorks from "@/components/home/HowItWorks";
import ImageStorySection from "@/components/home/ImageStorySection";
import { serverFetchJson } from "@/lib/serverFetch";
import { API_ROUTES } from "@/config/apiRoutes";
import { getSharedStores } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import type { Category, EcommerceProduct, Store, PaginatedResponse } from "@/types";

export const metadata: Metadata = {
  title: "Online Shopping in Bangladesh",
  description:
    "Shop fashion, beauty, electronics, grocery and daily essentials from local sellers on Hawkeri, a Bangladesh-focused online shopping marketplace.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: SITE_URL,
    siteName: "Hawkeri",
    title: "Online Shopping in Bangladesh | Hawkeri",
    description:
      "Discover local sellers, marketplace stores, COD-friendly shopping and daily products on Hawkeri.",
  },
};

async function getPageItems<T>(
  path: string,
  params: Record<string, string | number | undefined | null>,
): Promise<T[]> {
  const response = await serverFetchJson<PaginatedResponse<T>>(
    path,
    { ...params, page: 1 },
    { revalidate: 60 },
  );
  return response.data.items;
}

async function getHomeProducts(): Promise<{ items: EcommerceProduct[]; total: number }> {
  try {
    const response = await serverFetchJson<PaginatedResponse<EcommerceProduct>>(
      API_ROUTES.ECOMMERCE_CATALOG.PRODUCTS,
      { page: 1, per_page: 30, sort_field: "created_at", sort_direction: "desc" },
      { revalidate: 30 },
    );
    return { items: response.data.items, total: response.data.pagination?.total ?? response.data.items.length };
  } catch (err) {
    console.error("[HomePage] Failed to fetch products:", err);
    return { items: [], total: 0 };
  }
}

async function getFeaturedCategories(): Promise<Category[]> {
  try {
    return await getPageItems<Category>(
      API_ROUTES.ECOMMERCE_CATALOG.FEATURED_CATEGORIES,
      { limit: 10 },
    );
  } catch (err) {
    console.error("[HomePage] Failed to fetch featured categories:", err);
    return [];
  }
}

async function getPopularProducts(): Promise<EcommerceProduct[]> {
  try {
    return await getPageItems<EcommerceProduct>(
      API_ROUTES.ECOMMERCE_CATALOG.POPULAR_PRODUCTS,
      { limit: 12 },
    );
  } catch (err) {
    console.error("[HomePage] Failed to fetch popular products:", err);
    return [];
  }
}

async function getDealsOfTheDay(): Promise<EcommerceProduct[]> {
  try {
    return await getPageItems<EcommerceProduct>(
      API_ROUTES.ECOMMERCE_CATALOG.DEALS_OF_DAY,
      { limit: 10 },
    );
  } catch (err) {
    console.error("[HomePage] Failed to fetch deals of the day:", err);
    return [];
  }
}

export default async function HomePage() {
  const dedup = <T extends { id: number }>(arr: T[]) =>
    Array.from(new Map(arr.map((x) => [x.id, x])).values());

  const [rawProducts, featuredCategories, rawPopular, rawDeals, stores] = await Promise.all([
    getHomeProducts(),
    getFeaturedCategories(),
    getPopularProducts(),
    getDealsOfTheDay(),
    getSharedStores(),
  ]);
  const products = dedup(rawProducts.items);
  const popularProducts = dedup(rawPopular);
  const dealProducts = dedup(rawDeals);
  const topProducts = products.slice(16, 28).length >= 4
    ? products.slice(16, 28)
    : products.slice(0, 12);

  const trustStats = {
    stores: stores.length,
    products: rawProducts.total,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Hawkeri featured products",
            itemListElement: products.slice(0, 12).map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${SITE_URL}/product/${product.slug}`,
              name: product.product_name,
            })),
          }),
        }}
      />
      <h1 className="sr-only">Online Shopping in Bangladesh with Hawkeri</h1>
      {/* White bg */}
      <HeroBanner />
      {/* Primary-50 tint */}
      <div className="bg-primary-50/50">
        <TrustStatsBar stats={trustStats} />
      </div>
      <ImageStorySection />
      {/* White bg */}
      <FeaturedCategories categories={featuredCategories} />
      {/* Primary-50 tint */}
      <div className="bg-primary-50/30">
        <DealsOfTheDay products={dealProducts} />
      </div>
      <CountdownPromoBanner />
      {/* White bg */}
      <PopularProductsSection products={popularProducts} />
      {/* White bg */}
      <CategoryShowcase categories={featuredCategories} />
      {/* White bg */}
      <ProductPromoBanners />
      <EditorialPromoGrid />
      {/* Primary-50 tint */}
      <div className="bg-primary-50/30">
        <FeaturedStores stores={stores} />
      </div>
      {/* White bg */}
      <TopProductsGrid products={topProducts} />
      {/* Primary-50 tint */}
      <div className="bg-primary-50/30">
        <HowItWorks />
      </div>
      <RecentlyViewedSection />
      {/* White bg */}
      <ServiceHighlights />
    </main>
  );
}
