"use client";

import { createContext, useContext } from "react";
import type { Brand, Category } from "@/types";

interface ProductDataContextValue {
  categories: Category[];
  brands: Brand[];
}

const ProductDataContext = createContext<ProductDataContextValue | null>(null);

interface ProductDataProviderProps {
  categories: Category[];
  brands: Brand[];
  children: React.ReactNode;
}

export function ProductDataProvider({
  categories,
  brands,
  children,
}: ProductDataProviderProps) {
  return (
    <ProductDataContext.Provider value={{ categories, brands }}>
      {children}
    </ProductDataContext.Provider>
  );
}

export function useProductData() {
  const value = useContext(ProductDataContext);

  if (!value) {
    throw new Error("useProductData must be used within ProductDataProvider");
  }

  return value;
}
