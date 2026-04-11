import { readFile } from "node:fs/promises";
import path from "node:path";
import type { PopularProduct } from "@/app/(public)/product/_components/PopularProductCard";

export async function getPopularProducts(): Promise<PopularProduct[]> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "home",
    "popular-products.json",
  );

  const fileContent = await readFile(filePath, "utf-8");
  return JSON.parse(fileContent) as PopularProduct[];
}
