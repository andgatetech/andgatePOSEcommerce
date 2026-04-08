export type CartItem = {
  id: number;
  name: string;
  variant: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  thumbnail: "melon" | "avocado" | "pouch";
  status?: "default" | "out-of-stock";
};

export const cartMockItems: CartItem[] = [
  {
    id: 1,
    name: "Fresh Basket Fruits",
    variant: "Color: Black, Size: 250 ML",
    price: 27.49,
    originalPrice: 39.99,
    quantity: 1,
    thumbnail: "melon",
  },
  {
    id: 2,
    name: "Daily Avocado Pack",
    variant: "Color: Green, Size: 250 ML",
    price: 18.99,
    originalPrice: 24.99,
    quantity: 1,
    thumbnail: "avocado",
  },
  {
    id: 3,
    name: "Nature Pouch Mix",
    variant: "Color: Olive, Size: 1 KG",
    price: 14.99,
    originalPrice: 19.99,
    quantity: 1,
    thumbnail: "pouch",
    status: "out-of-stock",
  },
];
