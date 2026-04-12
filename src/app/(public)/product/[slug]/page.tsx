import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailPage from "@/app/(public)/product/_components/ProductDetailPage";
import { resolveImageUrl } from "@/lib/imageUrl";
import { serverFetchJson } from "@/lib/serverFetch";
import type { ApiResponse, EcommerceProduct } from "@/types";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

function trimDescription(description?: string | null, maxLength = 160) {
  const normalized = description?.replace(/\s+/g, " ").trim();
  if (!normalized) return undefined;
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

async function getProduct(slug: string): Promise<EcommerceProduct | null> {
  try {
    const response = await serverFetchJson<ApiResponse<EcommerceProduct | null>>(
      `/products/${slug}`,
      undefined,
      { revalidate: 60 },
    );
    return response.success ? response.data : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Product Not Found | Hawkeri" };
  }

  const description = trimDescription(product.description);
  const image = resolveImageUrl(product.images[0]?.url ?? null) ?? undefined;
  const title = `${product.product_name} | ${product.sold_by.store_name}`;
  const canonical = `/product/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: product.product_name,
      description,
      url: canonical,
      images: image ? [{ url: image, alt: product.product_name }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: product.product_name,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
