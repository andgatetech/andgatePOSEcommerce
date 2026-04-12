import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductPageDataProvider from "@/app/(public)/product/_components/ProductPageDataProvider";
import { serverFetchJson } from "@/lib/serverFetch";
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
    return { title: "Brand Not Found | Hawkeri" };
  }

  return {
    title: `${brand.name} Products | Hawkeri`,
    description: `Browse products for the ${brand.name} brand on Hawkeri.`,
  };
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  return <ProductPageDataProvider initialBrand={brand.slug} />;
}
