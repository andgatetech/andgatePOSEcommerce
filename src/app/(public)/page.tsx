import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
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
import { serverFetchJson } from "@/lib/serverFetch";
import { API_ROUTES } from "@/config/apiRoutes";
import type { Category, EcommerceProduct, PaginatedResponse } from "@/types";

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

async function getHomeProducts(): Promise<EcommerceProduct[]> {
  try {
    const response = await serverFetchJson<PaginatedResponse<EcommerceProduct>>(
      API_ROUTES.ECOMMERCE_CATALOG.PRODUCTS,
      { page: 1, per_page: 30, sort_field: "created_at", sort_direction: "desc" },
      { revalidate: 30 },
    );
    return response.data.items;
  } catch (err) {
    console.error("[HomePage] Failed to fetch products:", err);
    return [];
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

  const [rawProducts, featuredCategories, rawPopular, rawDeals] = await Promise.all([
    getHomeProducts(),
    getFeaturedCategories(),
    getPopularProducts(),
    getDealsOfTheDay(),
  ]);
  const products = dedup(rawProducts);
  const popularProducts = dedup(rawPopular);
  const dealProducts = dedup(rawDeals);
  const topProducts = products.slice(16, 28).length >= 4
    ? products.slice(16, 28)
    : products.slice(0, 12);

  return (
    <main>
      <HeroBanner />
      <TrustStatsBar />
      <FeaturedCategories categories={featuredCategories} />
      <DealsOfTheDay products={dealProducts} />
      <CountdownPromoBanner />
      <PopularProductsSection products={popularProducts} />
      <ProductPromoBanners />
      <EditorialPromoGrid />
      <TopProductsGrid products={topProducts} />
      <HowItWorks />
      <RecentlyViewedSection />
      <ServiceHighlights />
    </main>
  );
}
