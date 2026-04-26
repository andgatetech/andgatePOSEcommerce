import type { StockCheckItem } from "@/features/cart/cartApi";
import type { CartItemData } from "@/types";

export type StockIssue = {
  item: CartItemData;
  availableQuantity: number;
};

export function getStockQuantityMap(stocks?: StockCheckItem[]) {
  return new Map(stocks?.map((stock) => [stock.stock_id, Number(stock.quantity)]) ?? []);
}

export function getStockIssues(items: CartItemData[], stocks?: StockCheckItem[]): StockIssue[] {
  const quantityByStockId = getStockQuantityMap(stocks);

  return items
    .map((item) => {
      const availableQuantity = quantityByStockId.get(item.stock.id);

      if (availableQuantity === undefined || item.quantity <= availableQuantity) {
        return null;
      }

      return {
        item,
        availableQuantity,
      };
    })
    .filter((issue): issue is StockIssue => Boolean(issue));
}
