import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import MobileBottomNav from "@/components/shared/MobileBottomNav";
import { getSharedBrands, getSharedCategories, getSharedStores } from "@/lib/catalog";
import { ProductDataProvider } from "@/lib/product-data-context";
import ProtectedLayoutClient from "./ProtectedLayoutClient";

export default async function ProtectedLayout({
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
        <main className="pb-16 xl:pb-0">
          <ProtectedLayoutClient>{children}</ProtectedLayoutClient>
        </main>
      </ProductDataProvider>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
