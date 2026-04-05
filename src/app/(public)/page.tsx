import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import DealsOfTheDay from "@/components/home/DealsOfTheDay";

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <FeaturedCategories />
      <DealsOfTheDay />
    </main>
  );
}
