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
import { getSharedCategories } from "@/lib/catalog";
import type { EcommerceProduct, PaginatedResponse } from "@/types";

async function getProducts(): Promise<EcommerceProduct[]> {
  try {
    const response = await serverFetchJson<PaginatedResponse<EcommerceProduct>>(
      "/products",
      { page: 1, per_page: 30, sort_field: "created_at", sort_direction: "desc" },
      { revalidate: 30 },
    );
    return response.data.items;
  } catch (err) {
    console.error("[HomePage] Failed to fetch products:", err);
    return [];
  }
}

export default async function HomePage() {
  const [products, categories] = await Promise.all([getProducts(), getSharedCategories()]);
  const featuredCategories = categories.slice(0, 10);

  const popularProducts = products.slice(0, 12);
  const dealProducts = products.slice(12, 16).length >= 4
    ? products.slice(12, 16)
    : products.slice(0, 4);
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
