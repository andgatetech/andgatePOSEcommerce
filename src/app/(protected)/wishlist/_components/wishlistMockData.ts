export type WishlistItem = {
  id: number;
  name: string;
  category: string;
  stockStatus: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  ratingCount: number;
  thumbnail: "coffee" | "monitor" | "vitamin";
  selected?: boolean;
};

export const wishlistMockItems: WishlistItem[] = [
  {
    id: 1,
    name: "Veggie Bloom Tomatoes",
    category: "Healthcare",
    stockStatus: "2 In Stock",
    price: 27.49,
    originalPrice: 29.95,
    quantity: 1,
    ratingCount: 118,
    thumbnail: "coffee",
    selected: true,
  },
  {
    id: 2,
    name: "Veggie Bloom Tomatoes",
    category: "Healthcare",
    stockStatus: "2 In Stock",
    price: 27.49,
    originalPrice: 29.95,
    quantity: 1,
    ratingCount: 118,
    thumbnail: "monitor",
    selected: true,
  },
  {
    id: 3,
    name: "Veggie Bloom Tomatoes",
    category: "Healthcare",
    stockStatus: "2 In Stock",
    price: 27.49,
    originalPrice: 29.95,
    quantity: 1,
    ratingCount: 118,
    thumbnail: "vitamin",
    selected: false,
  },
];
