"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { isTokenExpired } from "@/features/auth/authStorage";
import {
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartItemMutation,
} from "@/features/cart/cartApi";
import { removeGuestCartItem } from "@/features/cart/guestCartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function GuestCartMerger() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, expiresAt, user } = useAppSelector((state) => state.auth);
  const { items: guestItems, isHydrated: isGuestCartHydrated } = useAppSelector(
    (state) => state.guestCart,
  );
  const hasActiveSession = isAuthenticated && !isTokenExpired(expiresAt);
  const mergeStartedForUser = useRef<number | null>(null);

  const { data: serverCart, isFetching } = useGetCartQuery(undefined, {
    skip: !hasActiveSession || !isGuestCartHydrated || guestItems.length === 0,
  });
  const [addToCart] = useAddToCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  useEffect(() => {
    if (!hasActiveSession) {
      mergeStartedForUser.current = null;
    }
  }, [hasActiveSession]);

  useEffect(() => {
    if (
      !hasActiveSession ||
      !isGuestCartHydrated ||
      guestItems.length === 0 ||
      isFetching ||
      !serverCart ||
      !user?.id ||
      mergeStartedForUser.current === user.id
    ) {
      return;
    }

    mergeStartedForUser.current = user.id;
    const serverCartSnapshot = serverCart;

    async function mergeGuestCart() {
      const mergedIds: number[] = [];
      const totalItems = guestItems.length;

      try {
        for (const guestItem of guestItems) {
          const serverItem = serverCartSnapshot.items.find(
            (item) => item.stock.id === guestItem.stock.id,
          );
          const availableQty =
            serverItem?.stock.available_qty ?? guestItem.stock.available_qty;
          const desiredQuantity = Math.max(
            1,
            Math.min((serverItem?.quantity ?? 0) + guestItem.quantity, availableQty),
          );

          const addResult = await addToCart({ stock_id: guestItem.stock.id }).unwrap();
          const cartId = addResult.data?.id ?? serverItem?.id;

          if (!cartId) {
            throw new Error("Merged cart item did not return a cart id.");
          }

          await updateCartItem({ cart_id: cartId, quantity: desiredQuantity }).unwrap();

          // Track success before dispatching — dispatch happens in finally
          mergedIds.push(guestItem.id);
        }
      } catch {
        // Allow retry for unmerged items
        mergeStartedForUser.current = null;
      } finally {
        // Only remove items that were fully merged — failed items stay in guest cart
        mergedIds.forEach((id) => dispatch(removeGuestCartItem(id)));
      }

      if (mergedIds.length === totalItems && totalItems > 0) {
        toast.success("Guest cart merged with your account.");
      } else if (mergedIds.length > 0) {
        toast.success(`${mergedIds.length} of ${totalItems} cart items merged.`);
        toast.error("Some items could not be merged. They remain in your cart.");
      } else if (totalItems > 0) {
        toast.error("Cart merge failed. Items kept — please try again.");
      }
    }

    void mergeGuestCart();
  }, [
    addToCart,
    dispatch,
    guestItems,
    hasActiveSession,
    isFetching,
    isGuestCartHydrated,
    serverCart,
    updateCartItem,
    user?.id,
  ]);

  return null;
}
