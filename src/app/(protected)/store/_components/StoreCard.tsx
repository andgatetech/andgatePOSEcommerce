import Link from "next/link";
import { FiMail, FiMapPin, FiMessageCircle, FiPhone, FiShoppingBag } from "react-icons/fi";
import type { StoreItem } from "./storeMockData";
import { ROUTE_BUILDERS } from "@/config/routes";

type StoreCardProps = {
  store: StoreItem;
  view?: "grid" | "list";
};

function StoreBanner({ banner }: { banner: StoreItem["banner"] }) {
  if (banner === "grocery") {
    return (
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#8fd8ff_0%,#69c8f2_100%)]">
        <div className="absolute right-10 top-4 h-16 w-16 rounded-full bg-[#ef5a3c]" />
        <div className="absolute right-8 top-28 h-24 w-24 rounded-full bg-[#9dd850]" />
        <div className="absolute right-28 top-9 h-14 w-8 rotate-[12deg] rounded-full bg-[#6fbf5f]" />
        <div className="absolute right-40 top-16 h-24 w-14 rounded-[18px] bg-[#f4c87a]" />
        <div className="absolute right-52 top-16 h-16 w-16 rounded-full bg-[#efe6cf]" />
        <div className="absolute right-16 top-12 h-12 w-12 rounded-full bg-[#f0d132]" />
      </div>
    );
  }

  if (banner === "ketchup") {
    return (
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#dff7f3_0%,#bde9e3_100%)]">
        <div className="absolute right-20 top-4 h-28 w-16 rotate-[18deg] rounded-[14px] bg-[#d64d33]" />
        <div className="absolute right-24 top-10 h-18 w-8 rounded bg-[#fff3df]" />
        <div className="absolute right-2 top-10 h-24 w-24 rounded-full bg-[#ec4c37]" />
        <div className="absolute right-32 top-20 h-20 w-20 rounded-full bg-[#f25f48]" />
        <div className="absolute left-0 bottom-0 h-10 w-full bg-[linear-gradient(180deg,transparent_0%,#80bb44_100%)]" />
      </div>
    );
  }

  if (banner === "corn") {
    return (
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#dffaf0_0%,#c7f3de_100%)]">
        <div className="absolute right-20 top-1 h-36 w-10 rotate-[18deg] rounded-full bg-[#9fd16f]" />
        <div className="absolute right-12 top-4 h-34 w-10 rounded-full bg-[#c9e889]" />
        <div className="absolute right-4 top-8 h-28 w-20 rounded-[18px] bg-[#ecc75b]" />
        <div className="absolute right-10 top-16 h-18 w-10 rounded-[12px] bg-[#f5dd81]" />
        <div className="absolute left-0 bottom-0 h-9 w-full bg-[linear-gradient(180deg,transparent_0%,#93c567_100%)]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#e5f8ff_0%,#c6e9ff_100%)]">
      <div className="absolute right-12 top-6 h-20 w-20 rounded-full bg-[#ef4f58]" />
      <div className="absolute right-28 top-16 h-16 w-16 rounded-full bg-[#7e3dbe]" />
      <div className="absolute right-20 top-20 h-14 w-14 rounded-full bg-[#5fbb4d]" />
      <div className="absolute left-0 bottom-0 h-10 w-full bg-[linear-gradient(180deg,transparent_0%,#7cb957_100%)]" />
    </div>
  );
}

function Stars({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-[16px] leading-none">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={index < rating ? "text-(--color-cta)" : "text-[#cfd6df]"}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-sm text-(--color-text-muted)">({reviewCount})</span>
    </div>
  );
}

export default function StoreCard({
  store,
  view = "grid",
}: StoreCardProps) {
  if (view === "list") {
    return (
      <article className="overflow-hidden rounded-[24px] border border-(--color-border) bg-(--color-bg) shadow-[0_12px_32px_rgba(17,17,17,0.04)]">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-[220px] md:h-auto md:w-[320px] md:shrink-0">
            <StoreBanner banner={store.banner} />
          </div>

          <div className="flex-1 px-5 py-5 md:px-6 md:py-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-4">
                  <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border-[4px] border-white bg-[#eef2f6] text-(--color-text-muted) shadow-[0_8px_20px_rgba(17,17,17,0.08)]">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c1.8-4 5-6 8-6s6.2 2 8 6" />
                    </svg>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-(--color-dark)">
                          {store.name}
                        </h2>
                        <p className="mt-1.5 text-sm text-(--color-text-muted)">
                          Trusted seller with quality products and dependable service.
                        </p>
                      </div>
                      <div className="md:hidden">
                        <Stars rating={store.rating} reviewCount={store.reviewCount} />
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 text-sm text-(--color-dark)">
                      <div className="flex items-start gap-2.5">
                        <FiPhone className="mt-0.5 shrink-0 text-[16px] text-(--color-primary)" />
                        <span>{store.phone}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <FiMail className="mt-0.5 shrink-0 text-[16px] text-(--color-primary)" />
                        <span>{store.email}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <FiMapPin className="mt-0.5 shrink-0 text-[16px] text-(--color-primary)" />
                        <span className="line-clamp-2">{store.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full max-w-[280px] flex-col items-start gap-5 md:items-end">
                <div className="hidden md:block">
                  <Stars rating={store.rating} reviewCount={store.reviewCount} />
                </div>

                <div className="grid w-full grid-cols-1 gap-3">
                  <button
                    type="button"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg) px-4 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
                  >
                    <FiMessageCircle className="mr-2 text-[16px]" />
                    Message
                  </button>
                  <Link
                    href={ROUTE_BUILDERS.storeDetail(store.slug)}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-(--color-primary) px-4 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
                  >
                    <FiShoppingBag className="mr-2 text-[16px]" />
                    Visit Store
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-[22px] border border-(--color-border) bg-(--color-bg)">
      <div className="relative h-[170px] overflow-hidden rounded-t-[22px]">
        <StoreBanner banner={store.banner} />
      </div>

      <div className="relative px-5 pb-5 pt-4">
        <div className="absolute -top-8 left-5 flex h-[60px] w-[60px] items-center justify-center rounded-full border-[4px] border-white bg-[#eef2f6] text-(--color-text-muted) shadow-[0_8px_20px_rgba(17,17,17,0.08)]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c1.8-4 5-6 8-6s6.2 2 8 6" />
          </svg>
        </div>

        <div className="flex items-start justify-between gap-4">
          <h2 className="pt-4 text-[15px] font-semibold tracking-[-0.02em] text-(--color-dark)">
            {store.name}
          </h2>
          <div className="pt-4">
            <Stars rating={store.rating} reviewCount={store.reviewCount} />
          </div>
        </div>

        <div className="mt-5 space-y-3 text-sm text-(--color-dark)">
          <div className="flex items-start gap-2.5">
            <FiPhone className="mt-0.5 shrink-0 text-[16px] text-(--color-primary)" />
            <span>{store.phone}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <FiMail className="mt-0.5 shrink-0 text-[16px] text-(--color-primary)" />
            <span>{store.email}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <FiMapPin className="mt-0.5 shrink-0 text-[16px] text-(--color-primary)" />
            <span className="line-clamp-2">{store.address}</span>
          </div>
        </div>

        <div className="mt-5 border-t border-(--color-border) pt-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg) px-4 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
            >
              <FiMessageCircle className="mr-2 text-[16px]" />
              Message
            </button>
            <Link
              href={ROUTE_BUILDERS.storeDetail(store.slug)}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-(--color-primary) px-4 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
            >
              <FiShoppingBag className="mr-2 text-[16px]" />
              Visit Store
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
