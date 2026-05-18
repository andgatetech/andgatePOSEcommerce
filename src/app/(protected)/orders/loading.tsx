const pulse = "animate-pulse rounded-[12px] bg-[linear-gradient(90deg,#f0f2f5_0%,#e4e8ed_50%,#f0f2f5_100%)]";

export default function OrdersLoading() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <div className={`mb-6 h-8 w-32 ${pulse}`} />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-[20px] border border-[rgba(20,33,43,0.08)] bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2">
                <div className={`h-5 w-40 ${pulse}`} />
                <div className={`h-4 w-24 ${pulse}`} />
              </div>
              <div className={`h-7 w-20 rounded-full ${pulse}`} />
            </div>
            <div className="mt-4 flex gap-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className={`h-14 w-14 rounded-[10px] ${pulse}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
