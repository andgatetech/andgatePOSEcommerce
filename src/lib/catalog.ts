import { cache } from "react";
import { serverFetchJson } from "@/lib/serverFetch";
import type { Brand, Category, PaginatedResponse } from "@/types";

export const getSharedCategories = cache(async (): Promise<Category[]> => {
  try {
    const response = await serverFetchJson<PaginatedResponse<Category>>(
      "/categories",
      { page: 1, per_page: 12, sort_field: "name", sort_direction: "asc" },
      { revalidate: 30 },
    );

    return response.data.items;
  } catch (err) {
    console.error("[Catalog] Failed to fetch categories:", err);
    return [];
  }
});

export const getSharedBrands = cache(async (): Promise<Brand[]> => {
  try {
    const response = await serverFetchJson<PaginatedResponse<Brand>>(
      "/brands",
      { page: 1, per_page: 18, sort_field: "name", sort_direction: "asc" },
      { revalidate: 30 },
    );

    return response.data.items;
  } catch (err) {
    console.error("[Catalog] Failed to fetch brands:", err);
    return [];
  }
});
