import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import DealsOfTheDay from "@/components/home/DealsOfTheDay";
import TopProductsGrid from "@/components/home/TopProductsGrid";
import ServiceHighlights from "@/components/home/ServiceHighlights";

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <FeaturedCategories />
      <DealsOfTheDay />
      <TopProductsGrid />
      <ServiceHighlights />
    </main>
  );
}
