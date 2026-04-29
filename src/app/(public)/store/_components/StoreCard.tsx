import Image from "next/image";
import Link from "next/link";
import { FiMail, FiMapPin, FiMessageCircle, FiShoppingBag } from "react-icons/fi";
import { ROUTE_BUILDERS } from "@/config/routes";
import { resolveStoreLogoUrl } from "@/lib/storeLogo";
import type { Store } from "@/types";

type StoreCardProps = {
  store: Store;
  view?: "grid" | "list";
};

function StoreBanner() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.92),transparent_28%),linear-gradient(135deg,#dceaf6_0%,#c7ddf4_45%,#eff6fc_100%)]">
      <div className="absolute -right-3 top-4 h-24 w-24 rounded-full bg-white/65 blur-md" />
      <div className="absolute right-16 top-8 h-20 w-20 rounded-full bg-[rgba(44,95,138,0.12)]" />
      <div className="absolute left-10 top-12 h-16 w-16 rounded-full bg-[rgba(15,143,134,0.12)]" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.68)_100%)]" />
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
        className="relative overflow-hidden rounded-full border-[4px] border-white bg-white shadow-[0_8px_20px_rgba(17,17,17,0.08)]"
        style={{ width: size, height: size }}
      >
        <Image
          src={logoUrl}
          alt={storeName}
          fill
          unoptimized
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-full border-[4px] border-white bg-[#eef2f6] text-(--color-text-muted) shadow-[0_8px_20px_rgba(17,17,17,0.08)]"
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
      <article className="overflow-hidden rounded-[24px] border border-(--color-border) bg-(--color-bg) shadow-[0_12px_32px_rgba(17,17,17,0.04)]">
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
                          Ecommerce-enabled storefront ready for browsing and ordering.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 text-sm text-(--color-dark)">
                      <div className="flex items-start gap-2.5">
                        <FiMapPin className="mt-0.5 shrink-0 text-[16px] text-(--color-primary)" />
                        <span className="line-clamp-2">{location}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <FiMail className="mt-0.5 shrink-0 text-[16px] text-(--color-primary)" />
                        <span className="break-all text-(--color-text-muted)">{store.slug}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full max-w-[280px] flex-col items-start gap-5 md:items-end">
                <div className="grid w-full grid-cols-1 gap-3">
                  <button
                    type="button"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg) px-4 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary) disabled:cursor-not-allowed disabled:opacity-50"
                    disabled
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
        <StoreBanner />
      </div>

      <div className="relative px-5 pb-5 pt-4">
        <div className="absolute -top-8 left-5">
          <StoreAvatar storeName={store.store_name} logoPath={store.logo_path} />
        </div>

        <div className="flex items-start justify-between gap-4">
          <h2 className="pt-4 text-[15px] font-semibold tracking-[-0.02em] text-(--color-dark)">
            {store.store_name}
          </h2>
          <span className="pt-4 text-[12px] font-medium uppercase tracking-[0.12em] text-(--color-text-muted)">
            Store
          </span>
        </div>

        <div className="mt-5 space-y-3 text-sm text-(--color-dark)">
          <div className="flex items-start gap-2.5">
            <FiMapPin className="mt-0.5 shrink-0 text-[16px] text-(--color-primary)" />
            <span className="line-clamp-2">{location}</span>
          </div>
        </div>

        <div className="mt-5 border-t border-(--color-border) pt-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg) px-4 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary) disabled:cursor-not-allowed disabled:opacity-50"
              disabled
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
