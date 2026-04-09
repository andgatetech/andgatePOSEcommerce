"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import AuthHydrator from "@/features/auth/AuthHydrator";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthHydrator />
      {children}
    </Provider>
  );
}
