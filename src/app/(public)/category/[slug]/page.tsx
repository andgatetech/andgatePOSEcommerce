import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductCollectionPage from "@/components/product/ProductCollectionPage";
import { getPopularProducts } from "@/lib/mockProducts";
import { serverFetchJson } from "@/lib/serverFetch";
import type { Category, PaginatedResponse } from "@/types";

interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await serverFetchJson<PaginatedResponse<Category>>("/categories", {
      per_page: 100,
      sort_field: "name",
      sort_direction: "asc",
    });

    return response.data.items.find((category) => category.slug === slug) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: CategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | Hawkeri",
    };
  }

  return {
    title: `${category.name} | Hawkeri`,
    description: `Browse products in the ${category.name} category on Hawkeri.`,
  };
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = (await getPopularProducts()).filter(
    (product) => product.category.toLowerCase() === category.name.toLowerCase(),
  );

  return (
    <ProductCollectionPage
      entity={category}
      kind="category"
      products={products}
    />
  );
}
