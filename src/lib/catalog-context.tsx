"use client";

import { createContext, useContext } from "react";
import type { Brand, Category } from "@/types";

interface CatalogContextValue {
  categories: Category[];
  brands: Brand[];
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

interface CatalogProviderProps {
  categories: Category[];
  brands: Brand[];
  children: React.ReactNode;
}

export function CatalogProvider({
  categories,
  brands,
  children,
}: CatalogProviderProps) {
  return (
    <CatalogContext.Provider value={{ categories, brands }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalogContext() {
  const value = useContext(CatalogContext);

  if (!value) {
    throw new Error("useCatalogContext must be used within CatalogProvider");
  }

  return value;
}
