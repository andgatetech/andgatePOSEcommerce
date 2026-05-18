import Link from "next/link";
import { FiWifi, FiRefreshCw, FiShoppingBag } from "react-icons/fi";

export const metadata = { title: "You're Offline" };

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f8fa] px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_8px_32px_rgba(19,45,69,0.10)]">
        <FiWifi className="text-[36px] text-(--color-primary)" />
      </div>

      <h1 className="mt-6 text-[28px] font-bold tracking-[-0.02em] text-(--color-primary-900)">
        You&apos;re offline
      </h1>
      <p className="mt-2 max-w-[300px] text-[15px] leading-6 text-(--color-text-muted)">
        It looks like you lost your internet connection. Check your network and try again.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
        >
          <FiRefreshCw className="text-base" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-(--color-border) bg-white px-6 py-3 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary-200) hover:text-(--color-primary)"
        >
          <FiShoppingBag className="text-base" />
          Go to homepage
        </Link>
      </div>

      <p className="mt-10 text-[13px] text-(--color-text-muted)">
        Some pages you visited recently may still be available offline.
      </p>
    </div>
  );
}
