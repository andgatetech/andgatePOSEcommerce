import type { MetadataRoute } from "next";
import { API_ROUTES } from "@/config/apiRoutes";
import { PUBLIC_ROUTES } from "@/config/routes";
import { serverFetchJson } from "@/lib/serverFetch";
import { SITE_URL } from "@/lib/site";
import type {
  Brand,
  Category,
  EcommerceProduct,
  PaginatedResponse,
  Store,
} from "@/types";

const staticRoutes = PUBLIC_ROUTES.filter((route) => !["/login", "/register"].includes(route));

function absoluteUrl(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

async function getItems<T>(path: string, perPage: number): Promise<T[]> {
  try {
    const response = await serverFetchJson<PaginatedResponse<T>>(
      path,
      { page: 1, per_page: perPage },
      { revalidate: 3600 },
    );
    return response.data.items;
  } catch (error) {
    console.error(`[Sitemap] Failed to fetch ${path}:`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, brands, stores, products] = await Promise.all([
    getItems<Category>(API_ROUTES.ECOMMERCE_CATALOG.CATEGORIES, 100),
    getItems<Brand>(API_ROUTES.ECOMMERCE_CATALOG.BRANDS, 100),
    getItems<Store>(API_ROUTES.ECOMMERCE_CATALOG.STORES, 100),
    getItems<EcommerceProduct>(API_ROUTES.ECOMMERCE_CATALOG.PRODUCTS, 200),
  ]);

  const now = new Date();
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));

  entries.push(
    ...categories.map((category) => ({
      url: absoluteUrl(`/category/${category.slug}`),
      lastModified: category.updated_at ? new Date(category.updated_at) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...brands.map((brand) => ({
      url: absoluteUrl(`/brand/${brand.slug}`),
      lastModified: brand.updated_at ? new Date(brand.updated_at) : now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...stores.map((store) => ({
      url: absoluteUrl(`/store/${store.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/product/${product.slug}`),
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  );

  return entries;
}

