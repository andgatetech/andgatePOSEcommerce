const pulse = "animate-pulse rounded-[12px] bg-[linear-gradient(90deg,#f0f2f5_0%,#e4e8ed_50%,#f0f2f5_100%)]";

export default function ProductDetailLoading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      {/* Breadcrumb */}
      <div className={`mb-6 h-4 w-56 ${pulse}`} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
        {/* Images */}
        <div className="space-y-3">
          <div className={`aspect-square w-full rounded-[24px] ${pulse}`} />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`h-16 w-16 rounded-[12px] ${pulse}`} />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className={`h-6 w-24 ${pulse}`} />
          <div className={`h-8 w-3/4 ${pulse}`} />
          <div className={`h-8 w-3/4 ${pulse}`} />
          <div className={`h-7 w-32 ${pulse}`} />
          <div className={`h-12 w-full rounded-full ${pulse}`} />
          <div className={`h-12 w-full rounded-full ${pulse}`} />
          <div className="space-y-2 pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`h-4 w-full ${pulse}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
