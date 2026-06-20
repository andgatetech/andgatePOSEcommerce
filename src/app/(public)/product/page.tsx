import type { Metadata } from "next";
import ProductPageDataProvider from "./_components/ProductPageDataProvider";
import { getSharedBrands, getSharedCategories } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

interface ProductListingPageProps {
  searchParams?: Promise<{
    category?: string;
    brand?: string;
    search?: string;
  }>;
}

function buildProductListingTitle({
  categoryName,
  brandName,
  search,
}: {
  categoryName?: string;
  brandName?: string;
  search?: string;
}) {
  if (brandName && categoryName) {
    return `${brandName} ${categoryName} Products`;
  }

  if (brandName) {
    return `${brandName} Products`;
  }

  if (categoryName) {
    return `${categoryName} Products`;
  }

  if (search) {
    return `Search results for "${search}"`;
  }

  return "Products";
}

function buildProductListingDescription({
  categoryName,
  brandName,
  search,
}: {
  categoryName?: string;
  brandName?: string;
  search?: string;
}) {
  if (brandName && categoryName) {
    return `Browse ${brandName} ${categoryName} products on Hawkeri.`;
  }

  if (brandName) {
    return `Browse ${brandName} products on Hawkeri.`;
  }

  if (categoryName) {
    return `Browse ${categoryName} products on Hawkeri.`;
  }

  if (search) {
    return `Search product listings for "${search}" on Hawkeri.`;
  }

  return "Browse products on Hawkeri.";
}

export async function generateMetadata({
  searchParams,
}: ProductListingPageProps): Promise<Metadata> {
  const resolvedSearchParams = (await searchParams) ?? {};
  const [categories, brands] = await Promise.all([
    getSharedCategories(),
    getSharedBrands(),
  ]);

  const categoryName = categories.find(
    (category) => category.slug === resolvedSearchParams.category,
  )?.name;
  const brandName = brands.find(
    (brand) => brand.slug === resolvedSearchParams.brand,
  )?.name;
  const search = resolvedSearchParams.search?.trim() || undefined;
  const query = new URLSearchParams();

  if (resolvedSearchParams.category) {
    query.set("category", resolvedSearchParams.category);
  }
  if (resolvedSearchParams.brand) {
    query.set("brand", resolvedSearchParams.brand);
  }
  if (search) {
    query.set("search", search);
  }

  const canonical = query.toString() ? `${SITE_URL}/product?${query.toString()}` : `${SITE_URL}/product`;

  return {
    title: `${buildProductListingTitle({ categoryName, brandName, search })} in Bangladesh`,
    description: `${buildProductListingDescription({ categoryName, brandName, search })} Shop fashion, beauty, electronics, grocery and daily essentials from local sellers in Bangladesh.`,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "en_BD",
      url: canonical,
      siteName: "Hawkeri",
      title: `${buildProductListingTitle({ categoryName, brandName, search })} in Bangladesh`,
      description: `${buildProductListingDescription({ categoryName, brandName, search })} Shop from local sellers on Hawkeri.`,
    },
  };
}

export default function ProductPage() {
  return <ProductPageDataProvider />;
}
