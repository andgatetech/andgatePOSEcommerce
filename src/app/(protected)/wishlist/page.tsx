import type { Metadata } from "next";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import WishlistPageContent from "./_components/WishlistPageContent";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "View and manage your saved Hawkeri products.",
};

export default function WishlistPage() {
  return (
    <>
      <WishlistPageContent />
      <ServiceHighlights className="bg-(--color-bg)" />
    </>
  );
}
