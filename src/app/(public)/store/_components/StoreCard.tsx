import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiMapPin, FiMessageCircle, FiShoppingBag } from "react-icons/fi";
import { ROUTE_BUILDERS } from "@/config/routes";
import { resolveStoreLogoUrl } from "@/lib/storeLogo";
import type { Store } from "@/types";

type StoreCardProps = {
  store: Store;
  view?: "grid" | "list";
};

function StoreBanner() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#eef7ff_0%,#d7eafa_46%,#fff7eb_100%)]">
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(90deg,rgba(4,108,169,0.12)_1px,transparent_1px),linear-gradient(0deg,rgba(4,108,169,0.10)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.78)_100%)]" />
    </div>
  );
}

function StoreAvatar({
  storeName,
  logoPath,
  size = 60,
}: {
  storeName: string;
  logoPath: string | null;
  size?: number;
}) {
  const logoUrl = resolveStoreLogoUrl(logoPath);

  if (logoUrl) {
    return (
      <div
        className="relative overflow-hidden rounded-lg border-[4px] border-white bg-white shadow-[0_8px_20px_rgba(17,17,17,0.08)]"
        style={{ width: size, height: size }}
      >
        <Image
          src={logoUrl}
          alt={storeName}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-lg border-[4px] border-white bg-[#eef2f6] text-(--color-text-muted) shadow-[0_8px_20px_rgba(17,17,17,0.08)]"
      style={{ width: size, height: size }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c1.8-4 5-6 8-6s6.2 2 8 6" />
      </svg>
    </div>
  );
}

export default function StoreCard({
  store,
  view = "grid",
}: StoreCardProps) {
  const location = store.store_location || "Location not provided";

  if (view === "list") {
    return (
      <article className="overflow-hidden rounded-lg border border-(--color-border) bg-(--color-bg) shadow-[0_12px_32px_rgba(17,17,17,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-(--color-primary-200) hover:shadow-[0_18px_42px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-[220px] md:h-auto md:w-[320px] md:shrink-0">
            <StoreBanner />
          </div>

          <div className="flex-1 px-5 py-5 md:px-6 md:py-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-4">
                  <StoreAvatar storeName={store.store_name} logoPath={store.logo_path} />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-(--color-dark)">
                          {store.store_name}
                        </h2>
                        <p className="mt-1.5 text-sm text-(--color-text-muted)">
                          Verified storefront ready for product browsing and checkout.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 text-sm text-(--color-dark)">
                      <div className="flex items-start gap-2.5">
                        <FiMapPin className="mt-0.5 shrink-0 text-[16px] text-(--color-primary)" />
                        <span className="line-clamp-2">{location}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <FiShoppingBag className="mt-0.5 shrink-0 text-[16px] text-(--color-primary)" />
                        <span className="break-all text-(--color-text-muted)">/{store.slug}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full max-w-[280px] flex-col items-start gap-5 md:items-end">
                <div className="grid w-full grid-cols-1 gap-3">
                  <button
                    type="button"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-(--color-border) bg-(--color-bg) px-4 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary) disabled:cursor-not-allowed disabled:opacity-50"
                    disabled
                  >
                    <FiMessageCircle className="mr-2 text-[16px]" />
                    Message
                  </button>
                  <Link
                    href={ROUTE_BUILDERS.storeDetail(store.slug)}
                    className="inline-flex min-h-[46px] items-center justify-center rounded-lg bg-(--color-primary) px-4 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
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
    <article className="group overflow-hidden rounded-lg border border-(--color-border) bg-(--color-bg) shadow-[0_8px_28px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-(--color-primary-200) hover:shadow-[0_18px_42px_rgba(15,23,42,0.08)]">
      <div className="relative h-[138px] overflow-hidden">
        <StoreBanner />
        <div className="absolute left-4 top-4 rounded-full bg-white/88 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-(--color-primary-900) shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
          Store
        </div>
      </div>

      <div className="relative px-5 pb-5 pt-4">
        <div className="absolute -top-9 left-5">
          <StoreAvatar storeName={store.store_name} logoPath={store.logo_path} />
        </div>

        <div className="min-h-[68px] pt-7">
          <h2 className="line-clamp-2 text-[16px] font-semibold leading-snug tracking-normal text-(--color-dark)">
            {store.store_name}
          </h2>
          <p className="mt-1 text-xs font-medium text-(--color-text-muted)">/{store.slug}</p>
        </div>

        <div className="mt-3 min-h-[42px] space-y-3 text-sm text-(--color-dark)">
          <div className="flex items-start gap-2.5">
            <FiMapPin className="mt-0.5 shrink-0 text-[16px] text-(--color-primary)" />
            <span className="line-clamp-2">{location}</span>
          </div>
        </div>

        <div className="mt-5 border-t border-(--color-border) pt-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-(--color-border) bg-(--color-bg) px-3 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary) disabled:cursor-not-allowed disabled:opacity-50"
              disabled
            >
              <FiMessageCircle className="mr-2 text-[16px]" />
              Message
            </button>
            <Link
              href={ROUTE_BUILDERS.storeDetail(store.slug)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-(--color-primary) px-3 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
            >
              Visit
              <FiArrowUpRight className="ml-2 text-[16px]" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
