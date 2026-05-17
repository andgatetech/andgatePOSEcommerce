import TopBar from "./navbar/TopBar";
import SecondaryNav from "./navbar/SecondaryNav";
import NavbarClient from "./navbar/NavbarClient";
import type { Brand, Category, Store } from "@/types";

interface NavbarProps {
  categories: Category[];
  brands: Brand[];
  stores: Store[];
}

export default function Navbar({ categories, brands, stores }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30">
      <TopBar />
      <NavbarClient />
      <SecondaryNav categories={categories} brands={brands} stores={stores} />
    </header>
  );
}
