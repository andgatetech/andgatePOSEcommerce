import TopBar from "./navbar/TopBar";
import SecondaryNav from "./navbar/SecondaryNav";
import NavbarClient from "./navbar/NavbarClient";
import type { Brand, Category } from "@/types";

interface NavbarProps {
  categories: Category[];
  brands: Brand[];
}

export default function Navbar({ categories, brands }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30">
      <TopBar />
      <NavbarClient />
      <SecondaryNav categories={categories} brands={brands} />
    </header>
  );
}
