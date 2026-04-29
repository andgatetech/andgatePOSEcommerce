"use client";

import Link from "next/link";
import { type ComponentType, useEffect, useState } from "react";
import {
  FiGrid,
  FiHeart,
  FiHome,
  FiLogOut,
  FiMapPin,
  FiPackage,
  FiTruck,
  FiUser,
} from "react-icons/fi";
import OrdersListView from "@/components/orders/OrdersListView";
import Container from "@/components/shared/Container";
import AccountWishlistPanel from "./AccountWishlistPanel";
import MyAccountAddressPanel from "./MyAccountAddressPanel";
import MyAccountOrderTrackingPanel from "./MyAccountOrderTrackingPanel";
import MyAccountProfilePanel from "./MyAccountProfilePanel";
import { ROUTES } from "@/config/routes";
import { useAuthSession } from "@/features/auth/useAuthSession";

type AccountTab = "dashboard" | "orders" | "tracking" | "wishlist" | "address" | "account" | "logout";

const accountNavItems: Array<{
  id: AccountTab;
  label: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  { id: "dashboard", label: "Dashboard", icon: FiGrid },
  { id: "orders", label: "Orders", icon: FiPackage },
  { id: "tracking", label: "Order Tracking", icon: FiTruck },
  { id: "wishlist", label: "Wishlist", icon: FiHeart },
  { id: "address", label: "My Address", icon: FiMapPin },
  { id: "account", label: "My Account", icon: FiUser },
  { id: "logout", label: "Log Out", icon: FiLogOut },
];

function DashboardPanel() {
  return (
    <div>
      <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">
        Dashboard
      </h1>
      <p className="mt-8 max-w-3xl text-[17px] leading-9 text-(--color-dark)">
        From your account dashboard, you can easily check and view your{" "}
        <span className="text-(--color-primary)">recent orders</span>, manage your{" "}
        <span className="text-(--color-primary)">shipping and billing addresses</span> and edit
        your <span className="text-(--color-primary)">password and account details</span>.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-6 shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
          <h2 className="text-lg font-semibold text-(--color-dark)">Recent Orders</h2>
          <p className="mt-3 text-sm leading-7 text-(--color-text-muted)">
            Review recent orders, payment status, and delivery progress from your account workspace.
          </p>
        </div>
        <div className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-6 shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
          <h2 className="text-lg font-semibold text-(--color-dark)">Saved Address</h2>
          <p className="mt-3 text-sm leading-7 text-(--color-text-muted)">
            Keep one default shipping address saved for faster checkout and easier account management.
          </p>
        </div>
        <div className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-6 shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
          <h2 className="text-lg font-semibold text-(--color-dark)">Account Overview</h2>
          <p className="mt-3 text-sm leading-7 text-(--color-text-muted)">
            Update your profile, email, and password details from the account settings panel.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MyAccountView() {
  const [activeTab, setActiveTab] = useState<AccountTab>("dashboard");
  const { logoutAndRedirect } = useAuthSession();

  useEffect(() => {
    if (activeTab === "logout") {
      logoutAndRedirect();
    }
  }, [activeTab, logoutAndRedirect]);

  function renderPanel() {
    switch (activeTab) {
      case "wishlist":
        return <AccountWishlistPanel />;
      case "orders":
        return <OrdersListView embedded />;
      case "tracking":
        return <MyAccountOrderTrackingPanel />;
      case "address":
        return <MyAccountAddressPanel />;
      case "account":
        return <MyAccountProfilePanel />;
      case "dashboard":
      default:
        return <DashboardPanel />;
    }
  }

  return (
    <section className="bg-(--color-bg) pb-8 pt-10 md:pb-10 lg:pb-14 lg:pt-12">
      <Container>
        <div className="mb-10 flex flex-wrap items-center gap-3 text-sm text-(--color-text-muted)">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)"
          >
            <FiHome className="text-[17px]" />
            <span>Home</span>
          </Link>
          <span>&bull;</span>
          <span className="text-(--color-dark)">User Dashboard</span>
          <span>&bull;</span>
          <span>{activeTab === "dashboard" ? "Dashboard" : accountNavItems.find((item) => item.id === activeTab)?.label}</span>
        </div>

        <div className="grid gap-8 xl:grid-cols-[330px_minmax(0,1fr)]">
          <aside className="h-fit rounded-[28px] border border-(--color-border) bg-(--color-bg) p-4 shadow-[0_18px_40px_rgba(17,17,17,0.04)] xl:sticky xl:top-16">
            <div className="space-y-2">
              {accountNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`flex w-full items-center gap-4 rounded-[16px] px-5 py-4 text-left text-[15px] font-semibold transition-colors ${
                      isActive
                        ? "bg-(--color-primary) text-(--color-bg)"
                        : "text-(--color-dark) hover:bg-(--color-primary-100) hover:text-(--color-primary)"
                    }`}
                  >
                    <Icon className="text-[22px]" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0">{renderPanel()}</div>
        </div>
      </Container>
    </section>
  );
}
