"use client";

export default function ProductPageSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[22px] border border-(--color-border) bg-white shadow-[0_10px_35px_rgba(19,45,69,0.06)]"
        >
          <div className="p-4 pb-3">
            <div className="mb-3 ml-auto h-9 w-9 animate-pulse rounded-full bg-[#eef2f5]" />
            <div className="h-[176px] animate-pulse rounded-[18px] bg-[linear-gradient(180deg,#eef4f8_0%,#f8fbfd_100%)]" />
          </div>

          <div className="px-4 pb-4">
            <div className="h-3 w-20 animate-pulse rounded-full bg-[#eef2f5]" />
            <div className="mt-3 h-5 w-full animate-pulse rounded-full bg-[#eef2f5]" />
            <div className="mt-2 h-5 w-4/5 animate-pulse rounded-full bg-[#eef2f5]" />
            <div className="mt-3 h-4 w-24 animate-pulse rounded-full bg-[#eef2f5]" />
            <div className="mt-4 h-6 w-28 animate-pulse rounded-full bg-[#e3edf5]" />
            <div className="mt-4 h-11 w-full animate-pulse rounded-[12px] bg-[#dbe9f4]" />
          </div>
        </div>
      ))}
    </div>
  );
}
