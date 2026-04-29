import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import PopularProductsSection from "./product/_components/PopularProductsSection";
import ProductPromoBanners from "./product/_components/ProductPromoBanners";
import DealsOfTheDay from "@/components/home/DealsOfTheDay";
import EditorialPromoGrid from "@/components/home/EditorialPromoGrid";
import TopProductsGrid from "@/components/home/TopProductsGrid";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import CountdownPromoBanner from "@/components/home/CountdownPromoBanner";
import { serverFetchJson } from "@/lib/serverFetch";
import { API_ROUTES } from "@/config/apiRoutes";
import type { Category, EcommerceProduct, PaginatedResponse } from "@/types";

function shuffleItems<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function getRandomPageItems<T>(
  path: string,
  params: Record<string, string | number | undefined | null>,
): Promise<T[]> {
  const firstResponse = await serverFetchJson<PaginatedResponse<T>>(
    path,
    { ...params, page: 1 },
    { cache: "no-store" },
  );
  const lastPage = Math.max(1, firstResponse.data.pagination.last_page);
  const randomPage = Math.floor(Math.random() * lastPage) + 1;
  const response =
    randomPage === 1
      ? firstResponse
      : await serverFetchJson<PaginatedResponse<T>>(
          path,
          { ...params, page: randomPage },
          { cache: "no-store" },
        );

  return shuffleItems(response.data.items);
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
    return await getRandomPageItems<Category>(
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
    return await getRandomPageItems<EcommerceProduct>(
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
    return await getRandomPageItems<EcommerceProduct>(
      API_ROUTES.ECOMMERCE_CATALOG.DEALS_OF_DAY,
      { limit: 4 },
    );
  } catch (err) {
    console.error("[HomePage] Failed to fetch deals of the day:", err);
    return [];
  }
}

export default async function HomePage() {
  const [products, featuredCategories, popularProducts, dealProducts] = await Promise.all([
    getHomeProducts(),
    getFeaturedCategories(),
    getPopularProducts(),
    getDealsOfTheDay(),
  ]);
  const topProducts = products.slice(16, 28).length >= 4
    ? products.slice(16, 28)
    : products.slice(0, 12);

  return (
    <main>
      <HeroBanner />
      <FeaturedCategories categories={featuredCategories} />
      <PopularProductsSection products={popularProducts} />
      <ProductPromoBanners />
      <DealsOfTheDay products={dealProducts} />
      <EditorialPromoGrid />
      <TopProductsGrid products={topProducts} />
      <ServiceHighlights />
      <CountdownPromoBanner />
    </main>
  );
}
