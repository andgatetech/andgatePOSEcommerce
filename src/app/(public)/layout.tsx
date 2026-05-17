import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import MobileBottomNav from "@/components/shared/MobileBottomNav";
import { getSharedBrands, getSharedCategories } from "@/lib/catalog";
import { ProductDataProvider } from "@/lib/product-data-context";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, brands] = await Promise.all([
    getSharedCategories(),
    getSharedBrands(),
  ]);

  return (
    <div>
      <Navbar categories={categories} brands={brands} />
      <ProductDataProvider categories={categories} brands={brands}>
        <main className="pb-16 xl:pb-0">{children}</main>
      </ProductDataProvider>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
