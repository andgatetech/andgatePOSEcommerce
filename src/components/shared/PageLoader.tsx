import Footer from "./Footer";
import Navbar from "./Navbar";
import { getSharedBrands, getSharedCategories } from "@/lib/catalog";

type PageLoaderProps = {
  message?: string;
};

export default async function PageLoader({
  message = "Loading, please wait...",
}: PageLoaderProps) {
  const [categories, brands] = await Promise.all([
    getSharedCategories(),
    getSharedBrands(),
  ]);

  return (
    <div>
      <Navbar categories={categories} brands={brands} />
      <main className="flex min-h-[50vh] items-center justify-center px-4 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-(--color-primary-100) border-t-(--color-primary)" />
          <p className="text-sm font-medium tracking-[0.12em] text-(--color-text-muted) uppercase">
            {message}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
