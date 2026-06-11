import Container from "@/components/shared/Container";

const shimmer =
  "animate-pulse rounded-[12px] bg-[linear-gradient(90deg,#f0f2f5_0%,#e4e8ed_50%,#f0f2f5_100%)]";

type SkeletonBlockProps = {
  className?: string;
};

export function SkeletonBlock({ className = "" }: SkeletonBlockProps) {
  return <div className={[shimmer, className].filter(Boolean).join(" ")} />;
}

function SectionHeadingSkeleton({
  wide = false,
  compact = false,
}: {
  wide?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mb-4" : "mb-7"}>
      <SkeletonBlock className="h-7 w-32 rounded-full" />
      <SkeletonBlock className={`mt-3 h-8 ${wide ? "w-72" : "w-56"}`} />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[22px] border border-(--color-border) bg-white shadow-[0_10px_35px_rgba(19,45,69,0.06)]">
      <div className="relative p-0">
        <SkeletonBlock className="absolute right-3 top-3 z-10 h-9 w-9 rounded-full" />
        <SkeletonBlock className="aspect-square w-full rounded-[18px]" />
      </div>
      <div className="flex flex-1 flex-col px-4 pb-2 pt-3">
        <SkeletonBlock className="h-3 w-20 rounded-full" />
        <SkeletonBlock className="mt-3 h-5 w-full rounded-full" />
        <SkeletonBlock className="mt-2 h-5 w-4/5 rounded-full" />
        <SkeletonBlock className="mt-3 h-4 w-28 rounded-full" />
        <SkeletonBlock className="mt-2 h-4 w-20 rounded-full" />
        <SkeletonBlock className="mt-4 h-6 w-32 rounded-full" />
      </div>
      <div className="px-4 pb-4">
        <SkeletonBlock className="mt-3 h-11 w-full rounded-[12px]" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({
  count = 10,
  deal = false,
}: {
  count?: number;
  deal?: boolean;
}) {
  return (
    <div
      className={`grid gap-4 sm:grid-cols-2 ${
        deal ? "lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" : "xl:grid-cols-3 2xl:grid-cols-5"
      }`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

function ProductFilterSidebarSkeleton() {
  return (
    <aside className="hidden rounded-[24px] border border-(--color-border) bg-white p-5 shadow-[0_18px_50px_rgba(19,45,69,0.05)] lg:block">
      <div className="mb-5 flex items-center justify-between">
        <SkeletonBlock className="h-6 w-24" />
        <SkeletonBlock className="h-8 w-16 rounded-full" />
      </div>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="border-t border-(--color-border) py-4 first:border-t-0 first:pt-0">
          <SkeletonBlock className="h-4 w-28" />
          <div className="mt-3 space-y-2">
            <SkeletonBlock className="h-9 w-full rounded-full" />
            <SkeletonBlock className="h-9 w-5/6 rounded-full" />
          </div>
        </div>
      ))}
    </aside>
  );
}

function ProductToolbarSkeleton() {
  return (
    <div className="mb-5 rounded-[24px] border border-(--color-border) bg-white p-4 shadow-[0_18px_50px_rgba(19,45,69,0.05)] md:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <SkeletonBlock className="h-11 w-28 rounded-full lg:hidden" />
        <SkeletonBlock className="h-11 min-w-[220px] flex-1 rounded-full" />
        <SkeletonBlock className="h-11 w-40 rounded-full" />
        <SkeletonBlock className="h-11 w-28 rounded-full" />
        <SkeletonBlock className="ml-auto h-5 w-32 rounded-full" />
      </div>
    </div>
  );
}

export function ProductListingPageSkeleton({
  collection = "all",
}: {
  collection?: "all" | "popular" | "deals-of-day";
}) {
  const isDeal = collection === "deals-of-day";

  return (
    <section className="bg-(--color-bg) pb-10 pt-6 md:pb-12 md:pt-8 lg:pb-16 lg:pt-10">
      <Container>
        <div className="mb-6 rounded-[28px] border border-(--color-border) bg-[linear-gradient(135deg,#ffffff_0%,#f6fbff_100%)] p-6 shadow-[0_18px_60px_rgba(19,45,69,0.06)] md:p-8">
          <SkeletonBlock className="h-7 w-36 rounded-full" />
          <SkeletonBlock className="mt-4 h-10 w-full max-w-[420px]" />
          <SkeletonBlock className="mt-3 h-5 w-full max-w-[700px]" />
        </div>

        {collection !== "all" ? (
          <div className="mb-6 overflow-hidden rounded-[24px] border border-(--color-border) bg-white shadow-[0_18px_50px_rgba(19,45,69,0.05)]">
            <div
              className={`grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-7 ${
                isDeal
                  ? "bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_55%,#ecfeff_100%)]"
                  : "bg-[linear-gradient(135deg,#ffffff_0%,#f6fbff_100%)]"
              }`}
            >
              <div>
                <SkeletonBlock className="h-7 w-40 rounded-full" />
                <SkeletonBlock className="mt-3 h-10 w-full max-w-[460px]" />
                <SkeletonBlock className="mt-3 h-5 w-full max-w-[640px]" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:min-w-[360px]">
                {Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonBlock key={index} className="h-[92px] rounded-[16px]" />
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          <ProductFilterSidebarSkeleton />
          <div>
            <ProductToolbarSkeleton />
            <ProductGridSkeleton count={isDeal ? 10 : 10} deal={isDeal} />
            <SkeletonBlock className="mt-8 h-16 w-full rounded-[24px]" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ProductDetailPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <div className="border-b border-(--color-border) bg-white">
        <div className="mx-auto px-4 py-3 md:px-5 lg:px-7 xl:px-8">
          <SkeletonBlock className="h-5 w-full max-w-[420px]" />
        </div>
      </div>

      <div className="mx-auto px-4 py-6 md:px-5 md:py-8 lg:px-7 xl:px-8">
        <div className="overflow-hidden rounded-[22px] border border-(--color-border) bg-white shadow-[0_1px_3px_rgba(17,17,17,0.04)]">
          <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div className="lg:sticky lg:top-6 lg:self-start">
              <div className="flex flex-col-reverse gap-4 sm:flex-row">
                <div className="flex flex-row gap-3 sm:flex-col">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonBlock key={index} className="h-[64px] w-[64px] shrink-0 rounded-[10px] sm:h-[72px] sm:w-[72px]" />
                  ))}
                </div>
                <SkeletonBlock className="aspect-square flex-1 rounded-[16px]" />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-2">
                <SkeletonBlock className="h-7 w-24 rounded-full" />
                <SkeletonBlock className="h-7 w-28 rounded-full" />
              </div>
              <SkeletonBlock className="h-10 w-full max-w-[560px]" />
              <SkeletonBlock className="h-10 w-full max-w-[460px]" />
              <SkeletonBlock className="h-5 w-full max-w-[520px]" />
              <SkeletonBlock className="h-12 w-44" />
              <div className="grid grid-cols-2 gap-3 rounded-[14px] border border-(--color-border) bg-[#fafbfc] p-4 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonBlock key={index} className="h-14 rounded-[10px]" />
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <SkeletonBlock className="h-12 rounded-full" />
                <SkeletonBlock className="h-12 rounded-full" />
              </div>
              <SkeletonBlock className="h-28 rounded-[18px]" />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-[22px] border border-(--color-border) bg-white p-6">
            <SkeletonBlock className="h-8 w-44" />
            <SkeletonBlock className="mt-5 h-4 w-full" />
            <SkeletonBlock className="mt-3 h-4 w-full" />
            <SkeletonBlock className="mt-3 h-4 w-5/6" />
          </div>
          <SkeletonBlock className="h-[220px] rounded-[22px]" />
        </div>

        <section className="mt-8">
          <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeadingSkeleton wide />
            <SkeletonBlock className="h-12 w-36 rounded-full" />
          </div>
          <ProductGridSkeleton count={5} />
        </section>
      </div>
    </div>
  );
}

export function HomePageSkeleton() {
  return (
    <main>
      <section className="relative w-full py-4 md:py-6">
        <Container>
          <div className="relative overflow-hidden rounded-2xl bg-[#dcecf4] md:rounded-3xl">
            <div className="mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
              <div className="flex min-h-[340px] flex-col items-center md:min-h-[420px] md:flex-row lg:min-h-[480px]">
                <div className="z-10 w-full pb-6 pt-14 md:w-[48%] md:py-16 lg:py-20">
                  <div className="mb-5 flex items-center gap-3">
                    <SkeletonBlock className="h-4 w-28 rounded-full" />
                    <SkeletonBlock className="h-6 w-20 rounded-[4px]" />
                  </div>
                  <SkeletonBlock className="h-12 w-full max-w-[520px]" />
                  <SkeletonBlock className="mt-3 h-12 w-full max-w-[460px]" />
                  <SkeletonBlock className="mt-5 h-5 w-full max-w-[420px]" />
                  <SkeletonBlock className="mt-2 h-5 w-full max-w-[360px]" />
                  <div className="mt-7 flex flex-wrap gap-3">
                    <SkeletonBlock className="h-12 w-36 rounded-full" />
                    <SkeletonBlock className="h-12 w-44 rounded-full" />
                  </div>
                </div>
                <div className="relative flex w-full items-end justify-center self-end md:w-[52%] md:justify-end">
                  <SkeletonBlock className="h-[240px] w-full max-w-[520px] rounded-[28px] md:h-[320px] lg:h-[400px] xl:h-[440px]" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-8 md:pb-10">
        <Container>
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeadingSkeleton compact />
            <SkeletonBlock className="h-11 w-44 rounded-full" />
          </div>
          <div className="rounded-[20px] border border-(--color-border) bg-white p-3 shadow-[0_14px_36px_rgba(15,23,42,0.05)] md:p-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="rounded-[14px] border border-(--color-border) bg-[#f8fafc] p-2">
                  <SkeletonBlock className="mx-auto aspect-square w-full max-w-[92px] rounded-[12px]" />
                  <SkeletonBlock className="mx-auto mt-2 h-8 w-4/5" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-10 pt-2 md:pb-12">
        <Container>
          <div className="rounded-[20px] border border-(--color-primary-100) bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_54%,#f0fdfa_100%)] p-4 shadow-[0_16px_42px_rgba(15,23,42,0.05)] md:p-5">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <SectionHeadingSkeleton compact />
              <div className="flex gap-3">
                <SkeletonBlock className="h-10 w-36 rounded-full" />
                <SkeletonBlock className="h-10 w-32 rounded-full" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {Array.from({ length: 2 }).map((_, sectionIndex) => (
        <section key={sectionIndex} className="pb-8 md:pb-10 lg:pb-14">
          <Container>
            <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeadingSkeleton wide />
              <SkeletonBlock className="h-14 w-52 rounded-full" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </Container>
        </section>
      ))}
    </main>
  );
}

function DirectoryHeaderSkeleton({ tone = "primary" }: { tone?: "primary" | "cta" }) {
  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-(--color-border) bg-(--color-bg) shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
      <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
        <div className="px-5 py-6 sm:px-7 md:px-8 lg:py-8">
          <SkeletonBlock className="h-7 w-40 rounded-full" />
          <SkeletonBlock className="mt-4 h-10 w-full max-w-[420px]" />
          <SkeletonBlock className="mt-3 h-5 w-full max-w-[640px]" />
          <SkeletonBlock className="mt-2 h-5 w-full max-w-[520px]" />
        </div>
        <div
          className={`border-t border-(--color-border) p-5 text-white lg:border-l lg:border-t-0 ${
            tone === "cta"
              ? "bg-[linear-gradient(135deg,var(--color-cta-dark),var(--color-cta))]"
              : "bg-[linear-gradient(135deg,var(--color-primary-900),var(--color-primary))]"
          }`}
        >
          <div className="grid h-full grid-cols-3 gap-3 lg:grid-cols-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-lg bg-white/12 p-4 backdrop-blur">
                <SkeletonBlock className="h-8 w-16 bg-white/30" />
                <SkeletonBlock className="mt-2 h-3 w-24 bg-white/24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListingFilterBarSkeleton() {
  return (
    <div className="mb-6 rounded-lg border border-(--color-border) bg-(--color-bg) p-4 shadow-[0_8px_28px_rgba(15,23,42,0.05)] md:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
        <div>
          <SkeletonBlock className="h-6 w-40" />
          <SkeletonBlock className="mt-2 h-4 w-full max-w-[560px]" />
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <SkeletonBlock className="h-11 min-w-[220px] flex-1 rounded-full" />
          <SkeletonBlock className="h-11 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function DirectoryGridSkeleton({
  kind = "category",
  count = 16,
}: {
  kind?: "category" | "brand" | "store";
  count?: number;
}) {
  if (kind === "store") {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-lg border border-(--color-border) bg-(--color-bg) shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <SkeletonBlock className="h-[138px] w-full rounded-none" />
            <div className="relative px-5 pb-5 pt-4">
              <SkeletonBlock className="absolute -top-9 left-5 h-[60px] w-[60px] rounded-lg" />
              <div className="min-h-[68px] pt-7">
                <SkeletonBlock className="h-5 w-3/4" />
                <SkeletonBlock className="mt-2 h-3 w-1/2" />
              </div>
              <SkeletonBlock className="mt-3 h-10 w-full" />
              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-(--color-border) pt-4">
                <SkeletonBlock className="h-11 rounded-lg" />
                <SkeletonBlock className="h-11 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex min-h-[178px] flex-col rounded-lg border border-(--color-border) bg-(--color-bg) p-4 text-center shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
          <SkeletonBlock className="h-[92px] rounded-lg" />
          <div className="mt-3 flex flex-1 flex-col justify-between">
            <SkeletonBlock className="mx-auto h-5 w-5/6" />
            <SkeletonBlock className="mx-auto mt-3 h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DirectoryPageSkeleton({
  kind = "category",
  tone = "primary",
}: {
  kind?: "category" | "brand" | "store";
  tone?: "primary" | "cta";
}) {
  return (
    <section className="bg-(--color-bg-subtle) pb-8 pt-6 md:pb-10 md:pt-8 lg:pb-14 lg:pt-10">
      <Container className="max-w-[1680px]">
        <DirectoryHeaderSkeleton tone={tone} />
        <ListingFilterBarSkeleton />
        <DirectoryGridSkeleton kind={kind} />
        <SkeletonBlock className="mt-8 h-16 w-full rounded-lg" />
      </Container>
    </section>
  );
}

export function AuthPageSkeleton({ mode = "login" }: { mode?: "login" | "register" }) {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-6 py-10">
      <div className={`grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-(--color-border) bg-white shadow-[0_4px_30px_rgba(0,0,0,0.08)] md:grid-cols-5 ${mode === "register" ? "min-h-[620px]" : "min-h-[560px]"}`}>
        <div className="relative hidden flex-col justify-center overflow-hidden bg-(--color-primary) px-10 py-14 text-white md:col-span-3 md:flex lg:px-14">
          <SkeletonBlock className="mb-6 h-12 w-12 rounded-xl bg-white/20" />
          <SkeletonBlock className="h-9 w-56 bg-white/24" />
          <SkeletonBlock className="mt-2 h-9 w-44 bg-white/24" />
          <SkeletonBlock className="mt-5 h-4 w-full max-w-[360px] bg-white/20" />
          <div className="mt-8 space-y-4">
            {Array.from({ length: mode === "register" ? 4 : 3 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <SkeletonBlock className="h-9 w-9 rounded-lg bg-white/20" />
                <SkeletonBlock className="h-4 w-52 bg-white/20" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center px-8 py-10 md:col-span-2">
          <SkeletonBlock className="h-8 w-40" />
          <SkeletonBlock className="mt-2 h-4 w-64" />
          <div className="mt-8 space-y-4">
            {Array.from({ length: mode === "register" ? 4 : 2 }).map((_, index) => (
              <SkeletonBlock key={index} className="h-12 w-full rounded-lg" />
            ))}
          </div>
          <SkeletonBlock className="mt-6 h-12 w-full rounded-lg" />
          <SkeletonBlock className="mt-4 h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ContentPageSkeleton() {
  return (
    <section className="bg-(--color-bg) px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SkeletonBlock className="h-5 w-56" />
        <SkeletonBlock className="mt-8 h-12 w-full max-w-[520px]" />
        <SkeletonBlock className="mt-4 h-5 w-full max-w-[760px]" />
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="rounded-[22px] border border-(--color-border) bg-white p-6">
                <SkeletonBlock className="h-7 w-2/3" />
                <SkeletonBlock className="mt-4 h-4 w-full" />
                <SkeletonBlock className="mt-3 h-4 w-5/6" />
              </div>
            ))}
          </div>
          <SkeletonBlock className="h-[320px] rounded-[24px]" />
        </div>
      </div>
    </section>
  );
}

export function OrderTrackingSkeleton() {
  return (
    <section className="bg-(--color-bg) px-4 pb-8 pt-10 md:px-8 md:pb-10 lg:px-12 lg:pb-14 lg:pt-12">
      <div className="mx-auto">
        <SkeletonBlock className="mb-10 h-5 w-56" />
        <SkeletonBlock className="h-10 w-72" />
        <SkeletonBlock className="mt-3 h-5 w-full max-w-[680px]" />
        <div className="mt-8 rounded-[28px] border border-(--color-border) bg-(--color-bg) p-6 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-7 xl:p-8">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_210px]">
            <SkeletonBlock className="h-[76px] rounded-[16px]" />
            <SkeletonBlock className="h-[52px] self-end rounded-full" />
          </div>
          <SkeletonBlock className="mt-8 h-[320px] rounded-[24px]" />
        </div>
      </div>
    </section>
  );
}

export function OrderTrackingResultSkeleton() {
  return (
    <div className="mt-8">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonBlock key={index} className="h-[86px] rounded-[22px]" />
        ))}
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
        <div className="space-y-5">
          {Array.from({ length: 2 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-[260px] rounded-[24px]" />
          ))}
        </div>
        <div className="space-y-5">
          <SkeletonBlock className="h-[260px] rounded-[24px]" />
          <SkeletonBlock className="h-[220px] rounded-[24px]" />
        </div>
      </div>
    </div>
  );
}

export function CartContentSkeleton() {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px]">
      <div>
        <div className="mb-4 flex flex-col gap-3 rounded-[20px] border border-(--color-border) bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <SkeletonBlock className="h-7 w-36 rounded-full" />
          <SkeletonBlock className="h-[42px] w-36 rounded-full" />
        </div>
        <div className="overflow-hidden rounded-[22px] border border-(--color-border) bg-(--color-bg)">
          <div className="hidden grid-cols-[minmax(0,1.8fr)_0.55fr_0.6fr_0.55fr_0.35fr] items-center gap-4 bg-[#f4f6f8] px-4 py-3 md:grid">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonBlock key={index} className="h-4 w-20" />
            ))}
          </div>
          <div className="divide-y divide-(--color-border)">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="grid min-h-[146px] gap-4 px-4 py-4 md:grid-cols-[minmax(0,1.8fr)_0.55fr_0.6fr_0.55fr_0.35fr] md:items-center">
                <div className="flex gap-4">
                  <SkeletonBlock className="h-[96px] w-[96px] shrink-0 rounded-[20px] sm:h-[108px] sm:w-[108px]" />
                  <div className="min-w-0 flex-1 pt-1">
                    <SkeletonBlock className="h-5 w-4/5" />
                    <SkeletonBlock className="mt-3 h-4 w-2/3" />
                    <SkeletonBlock className="mt-3 h-4 w-1/2" />
                  </div>
                </div>
                <SkeletonBlock className="hidden h-6 w-24 md:block" />
                <SkeletonBlock className="hidden h-12 w-32 rounded-full md:block" />
                <SkeletonBlock className="hidden h-6 w-24 md:block" />
                <div className="flex justify-end gap-3 md:justify-start">
                  <SkeletonBlock className="h-10 w-10 rounded-full" />
                  <SkeletonBlock className="h-10 w-10 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <aside className="h-fit rounded-[22px] border border-(--color-border) bg-(--color-bg) p-4.5 max-sm:p-4 xl:sticky xl:top-16">
        <SkeletonBlock className="mb-5 h-11 rounded-full" />
        <div className="rounded-[20px] border border-(--color-border) p-4.5 max-sm:p-4">
          <SkeletonBlock className="h-6 w-36" />
          <div className="mt-6 space-y-4">
            <SkeletonBlock className="h-5 w-full" />
            <SkeletonBlock className="h-5 w-full" />
            <SkeletonBlock className="h-8 w-full" />
          </div>
        </div>
        <SkeletonBlock className="mt-7 h-[54px] w-full rounded-full" />
        <SkeletonBlock className="mt-3 h-[54px] w-full rounded-full" />
      </aside>
    </div>
  );
}

export function CartPageSkeleton() {
  return (
    <section className="bg-(--color-bg)">
      <div className="mx-auto px-4 py-6 md:px-5 lg:px-7 xl:px-8 xl:py-8">
        <SkeletonBlock className="mb-6 h-5 w-40" />
        <CartContentSkeleton />
      </div>
    </section>
  );
}

export function WishlistTableSkeleton({
  account = false,
  showHeading = true,
}: {
  account?: boolean;
  showHeading?: boolean;
}) {
  return (
    <div>
      {showHeading ? (
        <>
          {!account ? <SkeletonBlock className="mb-7 h-5 w-44" /> : null}
          <div className="mb-8">
            <SkeletonBlock className="h-10 w-64" />
            {account ? <SkeletonBlock className="mt-2 h-4 w-28" /> : null}
          </div>
        </>
      ) : null}
      <div className={`overflow-hidden border border-(--color-border) bg-(--color-bg) ${account ? "rounded-[24px]" : "rounded-[22px]"}`}>
        <div
          className={`hidden items-center gap-4 bg-[#f4f6f8] md:grid ${
            account
              ? "grid-cols-[2fr_0.7fr_0.8fr_0.95fr_1.15fr_0.45fr] px-6 py-4"
              : "grid-cols-[2.2fr_0.7fr_0.8fr_0.95fr_1.15fr_0.45fr] px-7 py-4"
          }`}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-4 w-20" />
          ))}
        </div>
        <div className="divide-y divide-(--color-border)">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`grid gap-4 px-4 py-4 md:items-center ${
                account
                  ? "md:grid-cols-[2fr_0.7fr_0.8fr_0.95fr_1.15fr_0.45fr] md:px-6"
                  : "md:grid-cols-[2.2fr_0.7fr_0.8fr_0.95fr_1.15fr_0.45fr] md:px-7"
              }`}
            >
              <div className="flex gap-4">
                <SkeletonBlock className={`${account ? "h-24 w-24" : "h-28 w-28"} shrink-0 rounded-[20px]`} />
                <div className="min-w-0 flex-1 pt-1">
                  {account ? <SkeletonBlock className="mb-3 h-6 w-24 rounded-full" /> : null}
                  <SkeletonBlock className="h-5 w-4/5" />
                  <SkeletonBlock className="mt-3 h-4 w-1/2" />
                </div>
              </div>
              <SkeletonBlock className="h-5 w-24" />
              <SkeletonBlock className="h-5 w-24" />
              <SkeletonBlock className="h-12 w-32 rounded-full" />
              <SkeletonBlock className="h-11 w-32 rounded-full" />
              <SkeletonBlock className="h-8 w-8 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OrderCardsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="rounded-[24px] border border-(--color-border) bg-[#fcfcfd] p-4 md:p-5">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-(--color-border) pb-4">
            <div>
              <SkeletonBlock className="h-6 w-72" />
              <SkeletonBlock className="mt-3 h-4 w-40" />
            </div>
            <SkeletonBlock className="h-10 w-32 rounded-full" />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <SkeletonBlock className="h-8 w-32 rounded-full" />
            <SkeletonBlock className="h-8 w-28 rounded-full" />
            <SkeletonBlock className="h-8 w-24 rounded-full" />
          </div>
          <div className="mt-5 space-y-3">
            {Array.from({ length: 2 }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid gap-3 py-2 lg:grid-cols-[minmax(0,1fr)_180px_90px_80px_120px_130px] lg:items-center">
                <SkeletonBlock className="h-5 w-full" />
                <SkeletonBlock className="h-5 w-28" />
                <SkeletonBlock className="h-14 w-14 rounded-[14px]" />
                <SkeletonBlock className="h-5 w-10" />
                <SkeletonBlock className="h-5 w-20" />
                <SkeletonBlock className="h-7 w-24 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function OrdersListSkeleton({ embedded = false }: { embedded?: boolean }) {
  return (
    <div className={embedded ? "space-y-6" : "space-y-8"}>
      {!embedded ? <SkeletonBlock className="h-5 w-40" /> : null}
      <div>
        <SkeletonBlock className="h-10 w-48" />
        <SkeletonBlock className="mt-3 h-5 w-full max-w-[680px]" />
      </div>
      <section className="rounded-[30px] border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-6 xl:p-7">
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-12 w-28 rounded-full" />
          ))}
        </div>
        <div className="mt-6">
          <OrderCardsSkeleton />
        </div>
      </section>
    </div>
  );
}

export function OrderDetailSkeleton() {
  return (
    <section className="bg-[#f7f8fa] py-6 text-[#0f172a]">
      <Container>
        <SkeletonBlock className="mb-5 h-5 w-64" />
        <div className="bg-white px-5 py-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5e7eb] pb-4">
            <div>
              <SkeletonBlock className="h-8 w-44" />
              <SkeletonBlock className="mt-2 h-4 w-40" />
            </div>
            <SkeletonBlock className="h-10 w-36 rounded-md" />
          </div>
          <SkeletonBlock className="mt-5 h-[68px] w-full rounded-md" />
          <div className="mt-5 border border-[#e5e7eb]">
            <div className="flex flex-wrap items-start justify-between gap-4 px-5 py-5">
              <div>
                <SkeletonBlock className="h-6 w-56" />
                <SkeletonBlock className="mt-2 h-4 w-72" />
              </div>
              <SkeletonBlock className="h-7 w-24 rounded" />
            </div>
            <div className="px-5 py-5">
              <SkeletonBlock className="h-6 w-80" />
              <div className="mt-5 overflow-x-auto">
                <div className="min-w-[820px] space-y-4">
                  <SkeletonBlock className="h-6 w-full rounded-none" />
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="grid grid-cols-[minmax(250px,1.4fr)_180px_110px_80px_130px_130px] items-center gap-0 py-2">
                      <SkeletonBlock className="h-5 w-4/5" />
                      <SkeletonBlock className="h-5 w-28" />
                      <SkeletonBlock className="h-14 w-14 rounded-[8px]" />
                      <SkeletonBlock className="mx-auto h-5 w-8" />
                      <SkeletonBlock className="ml-auto h-5 w-20" />
                      <SkeletonBlock className="mx-auto h-7 w-24 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-dashed border-[#d8dde5] px-5 py-5">
              <SkeletonBlock className="h-6 w-36" />
              <div className="mt-4 space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonBlock key={index} className="h-5 w-full" />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)]">
            <SkeletonBlock className="h-[220px] rounded-none" />
            <SkeletonBlock className="h-[220px] rounded-none" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CheckoutPageSkeleton() {
  return (
    <section className="bg-[#f6f8fb] px-4 py-8 md:px-8 lg:px-12 lg:py-10">
      <div className="mx-auto">
        <div className="rounded-[32px] border border-[rgba(20,33,43,0.08)] bg-white p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-center gap-4 pb-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <SkeletonBlock className="h-8 w-8 rounded-full" />
                <SkeletonBlock className="h-4 w-16" />
                {index < 2 ? <SkeletonBlock className="hidden h-px w-12 sm:block" /> : null}
              </div>
            ))}
          </div>
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-5">
              <SkeletonBlock className="h-6 w-36" />
              <SkeletonBlock className="h-[210px] w-full rounded-[18px]" />
              <SkeletonBlock className="h-6 w-36" />
              <div className="grid gap-3 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonBlock key={index} className="h-20 rounded-[16px]" />
                ))}
              </div>
              <SkeletonBlock className="h-40 rounded-[20px]" />
            </div>
            <div className="space-y-4 rounded-[24px] border border-[rgba(20,33,43,0.08)] p-5">
              <SkeletonBlock className="h-6 w-32" />
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex gap-3">
                  <SkeletonBlock className="h-14 w-14 rounded-[10px]" />
                  <div className="flex-1 space-y-2">
                    <SkeletonBlock className="h-4 w-3/4" />
                    <SkeletonBlock className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
              <SkeletonBlock className="mt-4 h-12 w-full rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AddressPanelSkeleton() {
  return (
    <div>
      <div className="mb-8">
        <SkeletonBlock className="h-10 w-56" />
        <SkeletonBlock className="mt-3 h-5 w-full max-w-[620px]" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <SkeletonBlock className="h-6 w-40" />
                  <SkeletonBlock className="mt-3 h-4 w-64" />
                  <SkeletonBlock className="mt-2 h-4 w-56" />
                </div>
                <SkeletonBlock className="h-8 w-24 rounded-full" />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <SkeletonBlock className="h-10 w-24 rounded-full" />
                <SkeletonBlock className="h-10 w-24 rounded-full" />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
          <SkeletonBlock className="h-7 w-44" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonBlock key={index} className="h-12 w-full rounded-[12px]" />
            ))}
          </div>
          <SkeletonBlock className="mt-5 h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProfilePanelSkeleton() {
  return (
    <div>
      <div className="mb-8">
        <SkeletonBlock className="h-10 w-48" />
        <SkeletonBlock className="mt-3 h-5 w-full max-w-[720px]" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-6 shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
          <div className="flex flex-col items-center text-center">
            <SkeletonBlock className="h-32 w-32 rounded-full" />
            <SkeletonBlock className="mt-5 h-7 w-40" />
            <SkeletonBlock className="mt-2 h-8 w-44 rounded-full" />
          </div>
          <div className="mt-8 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-[20px] border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_14px_30px_rgba(17,17,17,0.04)]">
                <div className="flex items-center gap-3">
                  <SkeletonBlock className="h-11 w-11 rounded-full" />
                  <div className="flex-1">
                    <SkeletonBlock className="h-3 w-20" />
                    <SkeletonBlock className="mt-2 h-4 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-6 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-7 xl:p-8">
          <div className="mb-8 flex items-center gap-3">
            <SkeletonBlock className="h-12 w-12 rounded-full" />
            <div className="flex-1">
              <SkeletonBlock className="h-7 w-56" />
              <SkeletonBlock className="mt-2 h-4 w-full max-w-[520px]" />
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <SkeletonBlock className="h-[76px] rounded-[16px] md:col-span-2" />
            <SkeletonBlock className="h-[76px] rounded-[16px]" />
            <SkeletonBlock className="h-[76px] rounded-[16px]" />
          </div>
          <div className="mt-10 rounded-[24px] border border-(--color-border) bg-[#f8fafc] p-5 md:p-6">
            <div className="flex items-center gap-3">
              <SkeletonBlock className="h-11 w-11 rounded-full" />
              <div className="flex-1">
                <SkeletonBlock className="h-6 w-44" />
                <SkeletonBlock className="mt-2 h-4 w-full max-w-[520px]" />
              </div>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <SkeletonBlock className="h-[76px] rounded-[16px] md:col-span-2" />
              <SkeletonBlock className="h-[76px] rounded-[16px]" />
              <SkeletonBlock className="h-[76px] rounded-[16px]" />
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <SkeletonBlock className="h-[52px] w-28 rounded-full" />
            <SkeletonBlock className="h-[52px] w-40 rounded-full" />
          </div>
        </section>
      </div>
    </div>
  );
}

export function AccountPageSkeleton() {
  return (
    <section className="bg-(--color-bg) pb-8 pt-10 md:pb-10 lg:pb-14 lg:pt-12">
      <Container>
        <SkeletonBlock className="mb-10 h-5 w-72" />
        <div className="grid gap-8 xl:grid-cols-[330px_minmax(0,1fr)]">
          <aside className="h-fit rounded-[28px] border border-(--color-border) bg-(--color-bg) p-4 shadow-[0_18px_40px_rgba(17,17,17,0.04)] xl:sticky xl:top-16">
            <div className="space-y-2">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 rounded-[16px] px-5 py-4">
                  <SkeletonBlock className="h-6 w-6 rounded-full" />
                  <SkeletonBlock className="h-5 w-32" />
                </div>
              ))}
            </div>
          </aside>
          <div className="min-w-0">
            <SkeletonBlock className="h-10 w-44" />
            <SkeletonBlock className="mt-8 h-5 w-full max-w-[760px]" />
            <SkeletonBlock className="mt-3 h-5 w-full max-w-[680px]" />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-[24px] border border-(--color-border) bg-(--color-bg) p-6 shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
                  <SkeletonBlock className="h-6 w-36" />
                  <SkeletonBlock className="mt-4 h-4 w-full" />
                  <SkeletonBlock className="mt-3 h-4 w-5/6" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
