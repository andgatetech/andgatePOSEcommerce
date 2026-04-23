import type { Metadata } from "next";
import MyAccountView from "./_components/MyAccountView";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your Hawkeri profile, orders, wishlist, and addresses.",
};

export default function MyAccountPage() {
  return <MyAccountView />;
}
