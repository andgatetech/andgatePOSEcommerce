import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductCollectionPage from "@/app/(public)/product/_components/ProductCollectionPage";
import { serverFetchJson } from "@/lib/serverFetch";
import type {
  Category,
  EcommerceProduct,
  PaginatedResponse,
  ApiResponse,
} from "@/types";

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
    return (
      response.data.items.find((category) => category.slug === slug) ?? null
    );
  } catch {
    return null;
  }
}

async function getProductsByCategory(
  categorySlug: string,
): Promise<EcommerceProduct[]> {
  try {
    const response = await serverFetchJson<ApiResponse<{ items: EcommerceProduct[] }>>(
      "/products",
      {
        category: categorySlug,
        per_page: 50,
        sort_field: "product_name",
        sort_direction: "asc",
      },
    );
    return response.data.items;
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: CategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found | Hawkeri" };
  }

  return {
    title: `${category.name} Products | Hawkeri`,
    description: `Browse products in the ${category.name} category on Hawkeri.`,
  };
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <ProductCollectionPage entity={category} kind="category" products={products} />
  );
}
