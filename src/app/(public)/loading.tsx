const pulse = "animate-pulse rounded-[12px] bg-[linear-gradient(90deg,#f0f2f5_0%,#e4e8ed_50%,#f0f2f5_100%)]";

export default function PublicLoading() {
  return (
    <div>
      {/* Navbar skeleton */}
      <div className="border-b border-[rgba(20,33,43,0.07)] bg-white px-4 md:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className={`h-8 w-32 ${pulse}`} />
          <div className={`hidden h-10 flex-1 max-w-md md:block ${pulse}`} />
          <div className="flex items-center gap-3">
            <div className={`h-9 w-9 rounded-full ${pulse}`} />
            <div className={`h-9 w-9 rounded-full ${pulse}`} />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className={`mb-6 h-8 w-48 ${pulse}`} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-[20px] border border-[rgba(20,33,43,0.07)] p-4">
              <div className={`aspect-square w-full rounded-[14px] ${pulse}`} />
              <div className={`h-4 w-3/4 ${pulse}`} />
              <div className={`h-4 w-1/2 ${pulse}`} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
