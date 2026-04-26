import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItemData, CartStock, CartStockImage, CartStoreRef } from "@/types";

const GUEST_CART_STORAGE_KEY = "andgate_guest_cart";

export type GuestCartProduct = {
  id: number;
  slug: string;
  sku: string;
  price: number | string;
  available_qty: number;
  variant_data: Record<string, string> | null;
  product_name: string;
  description: string;
  images: CartStockImage[];
  store: CartStoreRef;
};

type GuestCartState = {
  items: CartItemData[];
  isHydrated: boolean;
};

const initialState: GuestCartState = {
  items: [],
  isHydrated: false,
};

function normalizeQuantity(quantity: number, availableQty: number) {
  const fallbackQuantity = Number.isFinite(quantity) ? Math.floor(quantity) : 1;
  const maxQuantity = Number.isFinite(availableQty) && availableQty > 0 ? availableQty : fallbackQuantity;
  return Math.max(1, Math.min(fallbackQuantity, maxQuantity));
}

function getSubtotal(stock: CartStock, quantity: number) {
  return Number(stock.price) * quantity;
}

function toCartItem(product: GuestCartProduct, quantity: number): CartItemData {
  const stock: CartStock = {
    id: product.id,
    slug: product.slug,
    sku: product.sku,
    price: product.price,
    available_qty: product.available_qty,
    variant_data: product.variant_data,
    product_name: product.product_name,
    description: product.description,
    images: product.images,
  };
  const normalizedQuantity = normalizeQuantity(quantity, product.available_qty);

  return {
    id: product.id,
    quantity: normalizedQuantity,
    subtotal: getSubtotal(stock, normalizedQuantity),
    stock,
    store: product.store,
  };
}

function refreshSubtotal(item: CartItemData) {
  item.subtotal = getSubtotal(item.stock, item.quantity);
}

function sanitizeItems(value: unknown): CartItemData[] {
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is CartItemData => {
    if (!item || typeof item !== "object") return false;
    const candidate = item as CartItemData;
    return (
      Number.isFinite(candidate.id) &&
      Number.isFinite(candidate.quantity) &&
      Boolean(candidate.stock?.id) &&
      typeof candidate.stock?.product_name === "string"
    );
  });
}

export function loadGuestCartItems(): CartItemData[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(GUEST_CART_STORAGE_KEY);
    return raw ? sanitizeItems(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

export function saveGuestCartItems(items: CartItemData[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GUEST_CART_STORAGE_KEY, JSON.stringify(items));
}

const guestCartSlice = createSlice({
  name: "guestCart",
  initialState,
  reducers: {
    hydrateGuestCart(state, action: PayloadAction<CartItemData[]>) {
      state.items = action.payload.map((item) => {
        const quantity = normalizeQuantity(item.quantity, item.stock.available_qty);
        return {
          ...item,
          quantity,
          subtotal: getSubtotal(item.stock, quantity),
        };
      });
      state.isHydrated = true;
    },
    addGuestCartItem(
      state,
      action: PayloadAction<{ product: GuestCartProduct; quantity?: number }>,
    ) {
      const quantity = action.payload.quantity ?? 1;
      const existingItem = state.items.find((item) => item.stock.id === action.payload.product.id);

      if (existingItem) {
        existingItem.quantity = normalizeQuantity(
          existingItem.quantity + quantity,
          existingItem.stock.available_qty,
        );
        refreshSubtotal(existingItem);
        return;
      }

      state.items.push(toCartItem(action.payload.product, quantity));
    },
    updateGuestCartItem(state, action: PayloadAction<{ cart_id: number; quantity: number }>) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload.cart_id);
      if (!item) return;
      item.quantity = normalizeQuantity(action.payload.quantity, item.stock.available_qty);
      refreshSubtotal(item);
    },
    removeGuestCartItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearGuestCart(state) {
      state.items = [];
    },
  },
});

export const {
  hydrateGuestCart,
  addGuestCartItem,
  updateGuestCartItem,
  removeGuestCartItem,
  clearGuestCart,
} = guestCartSlice.actions;

export default guestCartSlice.reducer;
