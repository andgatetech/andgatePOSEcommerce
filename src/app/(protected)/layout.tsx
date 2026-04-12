import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getSharedBrands, getSharedCategories } from "@/lib/catalog";
import ProtectedLayoutClient from "./ProtectedLayoutClient";

export default async function ProtectedLayout({
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
      <main>
        <ProtectedLayoutClient>{children}</ProtectedLayoutClient>
      </main>
      <Footer />
    </div>
  );
}
