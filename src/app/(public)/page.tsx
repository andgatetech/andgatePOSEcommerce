import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import PopularProductsSection from "./product/_components/PopularProductsSection";
import ProductPromoBanners from "./product/_components/ProductPromoBanners";
import DealsOfTheDay from "@/components/home/DealsOfTheDay";
import EditorialPromoGrid from "@/components/home/EditorialPromoGrid";
import TopProductsGrid from "@/components/home/TopProductsGrid";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import CountdownPromoBanner from "@/components/home/CountdownPromoBanner";

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <FeaturedCategories />
      <PopularProductsSection />
      <ProductPromoBanners />
      <DealsOfTheDay />
      <EditorialPromoGrid />
      <TopProductsGrid />
      <ServiceHighlights />
      <CountdownPromoBanner />
    </main>
  );
}
