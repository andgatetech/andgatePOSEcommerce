"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  hydrateGuestCart,
  loadGuestCartItems,
  saveGuestCartItems,
} from "./guestCartSlice";

export default function GuestCartHydrator() {
  const dispatch = useAppDispatch();
  const { items, isHydrated } = useAppSelector((state) => state.guestCart);

  useEffect(() => {
    dispatch(hydrateGuestCart(loadGuestCartItems()));

    function handleStorage(event: StorageEvent) {
      if (event.key === "andgate_guest_cart") {
        dispatch(hydrateGuestCart(loadGuestCartItems()));
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [dispatch]);

  useEffect(() => {
    if (!isHydrated) return;
    saveGuestCartItems(items);
  }, [isHydrated, items]);

  return null;
}
