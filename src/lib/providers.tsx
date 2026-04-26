"use client";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./store";
import AuthHydrator from "@/features/auth/AuthHydrator";
import GuestCartHydrator from "@/features/cart/GuestCartHydrator";
import GuestCartMerger from "@/features/cart/GuestCartMerger";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthHydrator />
      <GuestCartHydrator />
      <GuestCartMerger />
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 500,
          },
        }}
      />
    </Provider>
  );
}
