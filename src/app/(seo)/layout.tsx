import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import MobileBottomNav from "@/components/shared/MobileBottomNav";
import PwaInstallButton from "@/components/shared/PwaInstallButton";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { getSharedBrands, getSharedCategories, getSharedStores } from "@/lib/catalog";
import { ProductDataProvider } from "@/lib/product-data-context";

export default async function SeoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, brands, stores] = await Promise.all([
    getSharedCategories(),
    getSharedBrands(),
    getSharedStores(),
  ]);

  return (
    <div>
      <Navbar categories={categories} brands={brands} stores={stores} />
      <ProductDataProvider categories={categories} brands={brands}>
        <main className="pb-16 xl:pb-0">{children}</main>
      </ProductDataProvider>
      <Footer />
      <MobileBottomNav />
      <PwaInstallButton />
      <ScrollToTop />
    </div>
  );
}
