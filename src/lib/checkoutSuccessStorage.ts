import type { OrderMutationResult } from "@/types";

const CHECKOUT_SUCCESS_KEY_PREFIX = "hawkeri:checkout-success:";

function getCheckoutSuccessKey(orderNumber: string) {
  return `${CHECKOUT_SUCCESS_KEY_PREFIX}${orderNumber}`;
}

export function saveCheckoutSuccess(result: OrderMutationResult) {
  if (typeof window === "undefined" || !result.data) {
    return;
  }

  window.sessionStorage.setItem(
    getCheckoutSuccessKey(result.data.order_number),
    JSON.stringify(result),
  );
}

export function loadCheckoutSuccess(orderNumber: string): OrderMutationResult | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(getCheckoutSuccessKey(orderNumber));

  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as OrderMutationResult;
    return parsed?.data?.order_number === orderNumber ? parsed : null;
  } catch {
    return null;
  }
}
