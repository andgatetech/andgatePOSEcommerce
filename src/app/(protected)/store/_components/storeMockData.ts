export type StoreItem = {
  id: number;
  slug: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
  reviewCount: number;
  banner: "grocery" | "ketchup" | "corn" | "berries";
};

export const storeMockData: StoreItem[] = [
  {
    id: 1,
    slug: "fresh-harvest-market",
    name: "Fresh Harvest Market",
    phone: "(555) 123-4567",
    email: "alex@example.com",
    address: "1234 Elm Street, Springfield, CA, 90210, United States",
    rating: 4,
    reviewCount: 189,
    banner: "grocery",
  },
  {
    id: 2,
    slug: "red-tomato-farms",
    name: "Red Tomato Farms",
    phone: "(555) 123-4567",
    email: "alex@example.com",
    address: "1234 Elm Street, Springfield, CA, 90210, United States",
    rating: 4,
    reviewCount: 189,
    banner: "ketchup",
  },
  {
    id: 3,
    slug: "golden-kernel-store",
    name: "Golden Kernel Store",
    phone: "(555) 123-4567",
    email: "alex@example.com",
    address: "1234 Elm Street, Springfield, CA, 90210, United States",
    rating: 4,
    reviewCount: 189,
    banner: "corn",
  },
  {
    id: 4,
    slug: "berry-basket-hub",
    name: "Berry Basket Hub",
    phone: "(555) 123-4567",
    email: "alex@example.com",
    address: "1234 Elm Street, Springfield, CA, 90210, United States",
    rating: 4,
    reviewCount: 189,
    banner: "berries",
  },
];
