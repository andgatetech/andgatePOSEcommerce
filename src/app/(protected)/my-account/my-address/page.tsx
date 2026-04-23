import type { Metadata } from "next";
import MyAccountAddressPanel from "../_components/MyAccountAddressPanel";

export const metadata: Metadata = {
  title: "My Address",
  description: "Manage your saved Hawkeri delivery addresses.",
};

export default function MyAddressPage() {
  return (
    <section className="bg-(--color-bg) px-4 pb-8 pt-10 md:px-8 md:pb-10 lg:px-12 lg:pb-14 lg:pt-12">
      <div className="mx-auto max-w-[1200px]">
        <MyAccountAddressPanel />
      </div>
    </section>
  );
}
