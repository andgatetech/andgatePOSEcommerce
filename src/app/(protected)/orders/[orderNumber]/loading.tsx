const pulse = "animate-pulse rounded-[12px] bg-[linear-gradient(90deg,#f0f2f5_0%,#e4e8ed_50%,#f0f2f5_100%)]";

export default function OrderDetailLoading() {
  return (
    <section className="bg-[#f6f8fb] px-4 py-8 md:px-8 lg:px-12 lg:py-10">
      <div className="mx-auto">
        <div className="rounded-[32px] border border-[rgba(20,33,43,0.08)] bg-white">
          {/* Header */}
          <div className="border-b border-[rgba(20,33,43,0.08)] px-6 py-5 md:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className={`h-8 w-48 ${pulse}`} />
              <div className={`h-7 w-28 rounded-full ${pulse}`} />
            </div>
          </div>

          <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_380px]">
            {/* Left */}
            <div className="space-y-5 px-6 py-7 md:px-8">
              <div className="grid gap-4 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className={`h-28 rounded-[24px] ${pulse}`} />
                ))}
              </div>
              <div className={`h-64 rounded-[28px] ${pulse}`} />
            </div>

            {/* Right */}
            <div className="border-t border-[rgba(20,33,43,0.08)] px-6 py-7 md:px-8 xl:border-l xl:border-t-0">
              <div className="space-y-4">
                <div className={`h-48 rounded-[24px] ${pulse}`} />
                <div className={`h-36 rounded-[24px] ${pulse}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
