const pulse = "animate-pulse rounded-[12px] bg-[linear-gradient(90deg,#f0f2f5_0%,#e4e8ed_50%,#f0f2f5_100%)]";

export default function CheckoutLoading() {
  return (
    <section className="bg-[#f6f8fb] px-4 py-8 md:px-8 lg:px-12 lg:py-10">
      <div className="mx-auto">
        <div className="rounded-[32px] border border-[rgba(20,33,43,0.08)] bg-white p-6 md:p-8">
          {/* Stepper */}
          <div className="flex items-center justify-center gap-4 pb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`h-8 w-8 rounded-full ${pulse}`} />
                <div className={`h-4 w-16 ${pulse}`} />
                {i < 2 && <div className={`h-px w-12 ${pulse}`} />}
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            {/* Left — address + payment */}
            <div className="space-y-5">
              <div className={`h-6 w-36 ${pulse}`} />
              <div className={`h-40 w-full rounded-[20px] ${pulse}`} />
              <div className={`h-6 w-36 ${pulse}`} />
              <div className="grid gap-3 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className={`h-20 rounded-[16px] ${pulse}`} />
                ))}
              </div>
            </div>

            {/* Right — order summary */}
            <div className="space-y-4 rounded-[24px] border border-[rgba(20,33,43,0.08)] p-5">
              <div className={`h-5 w-32 ${pulse}`} />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`h-14 w-14 rounded-[10px] ${pulse}`} />
                  <div className="flex-1 space-y-2">
                    <div className={`h-4 w-3/4 ${pulse}`} />
                    <div className={`h-4 w-1/2 ${pulse}`} />
                  </div>
                </div>
              ))}
              <div className={`mt-4 h-12 w-full rounded-full ${pulse}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
