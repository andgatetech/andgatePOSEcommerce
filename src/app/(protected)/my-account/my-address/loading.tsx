import { AddressPanelSkeleton } from "@/components/shared/Skeletons";

export default function MyAddressLoading() {
  return (
    <section className="bg-(--color-bg) px-4 pb-8 pt-10 md:px-8 md:pb-10 lg:px-12 lg:pb-14 lg:pt-12">
      <div className="mx-auto max-w-[1200px]">
        <AddressPanelSkeleton />
      </div>
    </section>
  );
}
