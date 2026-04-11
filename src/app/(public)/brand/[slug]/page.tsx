import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductCollectionPage from "@/components/product/ProductCollectionPage";
import { serverFetchJson } from "@/lib/serverFetch";
import { getPopularProducts } from "@/lib/mockProducts";
import type { Brand, PaginatedResponse } from "@/types";

interface BrandDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getBrandBySlug(slug: string): Promise<Brand | null> {
  try {
    const response = await serverFetchJson<PaginatedResponse<Brand>>("/brands", {
      per_page: 100,
      sort_field: "name",
      sort_direction: "asc",
    });

    return response.data.items.find((brand) => brand.slug === slug) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: BrandDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    return {
      title: "Brand Not Found | Hawkeri",
    };
  }

  return {
    title: `${brand.name} | Hawkeri`,
    description: `Browse products for the ${brand.name} brand on Hawkeri.`,
  };
}

export default async function BrandDetailPage({
  params,
}: BrandDetailPageProps) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const products = (await getPopularProducts()).filter(
    (product) => product.brand.toLowerCase() === brand.name.toLowerCase(),
  );

  return <ProductCollectionPage entity={brand} kind="brand" products={products} />;
}
