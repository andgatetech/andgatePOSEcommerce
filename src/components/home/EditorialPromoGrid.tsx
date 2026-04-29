import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiGift, FiMonitor, FiSmartphone } from "react-icons/fi";
import { ROUTES } from "@/config/routes";
import Container from "@/components/shared/Container";

export default function EditorialPromoGrid() {
  return (
    <section className="pb-12 md:pb-14 lg:pb-16">
      <Container>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[660px]">
            <span className="inline-flex rounded-full border border-(--color-primary-200) bg-(--color-primary-100) px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-(--color-primary)">
              Curated Promo Grid
            </span>
            <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.03em] text-(--color-primary-900) md:text-[38px]">
              Fresh Finds For Every Scroll
            </h2>
          </div>

          <Link
            href={ROUTES.CATEGORY}
            className="inline-flex items-center gap-3 self-start rounded-full bg-(--color-primary) px-5 py-3 text-[15px] font-semibold text-white shadow-[0_14px_28px_rgba(44,95,138,0.24)] transition hover:bg-(--color-primary-dark)"
          >
            Explore Collection
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-(--color-primary-900)">
              <FiArrowUpRight className="text-[18px]" />
            </span>
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-12 lg:grid-rows-[220px_180px_190px]">
          <article className="group relative min-h-[360px] overflow-hidden rounded-[30px] bg-[#f3eadf] lg:col-span-5 lg:row-span-3">
            <div className="absolute inset-0">
              <Image
                src="/images/banner/female.jpg"
                alt="Featured promo"
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="absolute inset-x-5 bottom-5 z-10 rounded-[26px] bg-white/55 p-5 backdrop-blur-[2px] md:p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-(--color-primary-900)/78">
                Glow Skin Edit
              </p>
              <div className="mt-3">
                <h4 className="text-[22px] font-semibold tracking-[-0.03em] text-(--color-primary-900)">
                  Skincare picks,
                  <br />
                  glow essentials
                </h4>
                <p className="mt-2 text-[14px] font-medium leading-6 text-(--color-primary-900)/72">
                  Fresh beauty picks for radiant, everyday skin.
                </p>
                <Link
                  href={ROUTES.CATEGORY}
                  className="mt-4 inline-flex items-center gap-3 rounded-full bg-(--color-cta) px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_16px_28px_rgba(216,137,31,0.28)] transition hover:bg-(--color-cta-hover)"
                >
                  Shop skincare
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-(--color-primary-900)">
                    <FiArrowUpRight className="text-[16px]" />
                  </span>
                </Link>
              </div>
            </div>
          </article>

          <article className="group relative min-h-[250px] overflow-hidden rounded-[30px] bg-(--color-cta) lg:col-span-4 lg:row-span-2">
            <div className="absolute inset-0">
              <Image
                src="/images/banner/promo-bg-3.jpg"
                alt="Gift spotlight"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="relative z-10 flex h-full p-6 md:p-7">
              <div className="ml-auto mt-auto translate-y-3 w-full max-w-[270px] rounded-[22px] bg-white/30 p-3.5 backdrop-blur-[2px] md:max-w-[300px] md:translate-y-5">
                <span className="inline-flex rounded-full bg-(--color-primary-100) px-3 py-1 text-[11px] font-semibold text-(--color-primary-900)">
                  Enjoy 20% savings
                </span>
                <h3 className="mt-3 text-[18px] font-semibold leading-[1.08] tracking-[-0.04em] text-(--color-primary-900) md:text-[21px]">
                  Gift box
                  <br />
                  spotlight
                </h3>
                <p className="mt-2 text-[12px] font-medium leading-5 text-(--color-primary-900)/78">
                  Quick picks when you need a good-looking gift bundle for checkout.
                </p>

                <Link
                  href={ROUTES.BRAND}
                  className="mt-4 ml-auto inline-flex w-fit items-center gap-3 rounded-full bg-(--color-primary) px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_16px_28px_rgba(44,95,138,0.24)] transition hover:bg-(--color-primary-dark)"
                >
                  Shop Gift Sets
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-(--color-primary-900)">
                    <FiArrowUpRight className="text-[16px]" />
                  </span>
                </Link>
              </div>
            </div>
          </article>

          <article className="group relative min-h-[280px] overflow-hidden rounded-[30px] lg:col-span-3 lg:row-span-3">
            <div className="absolute inset-0">
              <Image
                src="/images/banner/promo-bg-2.jpg"
                alt="Lifestyle promo"
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="absolute inset-x-7 bottom-5 z-10 rounded-[24px] bg-[#f5d6e9]/46 p-4 backdrop-blur-[2px]">
              <span className="inline-flex rounded-full bg-[#ffe067] px-3 py-1 text-[10px] font-semibold text-(--color-primary-900)">
                Mobile first
              </span>
              <h3 className="mt-3 text-[19px] font-semibold leading-[1.08] tracking-[-0.04em] text-(--color-primary-900)">
                Premium phone
                <br />
                and style picks
              </h3>
              <p className="mt-2 text-[12px] font-medium leading-5 text-(--color-primary-900)/72">
                High-contrast color, portrait imagery, and a clean CTA block for a sharper eCommerce feel.
              </p>
              <Link
                href={ROUTES.CATEGORY}
                className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold text-(--color-primary-900)"
              >
                Browse now
                <FiArrowUpRight className="text-[14px]" />
              </Link>
            </div>
          </article>

          <Link
            href={ROUTES.CATEGORY}
            className="group relative block overflow-hidden rounded-[28px] border border-(--color-border) shadow-[0_16px_36px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 lg:col-span-2 lg:row-span-1"
          >
            <div className="absolute inset-0">
              <Image
                src="/images/banner/promo-bg-1.png"
                alt="Workspace promo"
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(15,23,42,0.14)_36%,rgba(15,23,42,0.52)_100%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/55 text-(--color-primary) shadow-[0_8px_18px_rgba(44,95,138,0.08)]">
                <FiMonitor className="text-[18px]" />
              </span>

              <div className="p-1">
                <h3 className="text-[15px] font-semibold tracking-[-0.03em] text-white md:text-[16px]">
                  Office setup
                </h3>
                <p className="mt-1.5 text-[11px] leading-5 text-white/88 md:text-[12px]">
                  Monitors, desk tools, and calm productivity picks.
                </p>
              </div>
            </div>
          </Link>

          <Link
            href={ROUTES.BRAND}
            className="group relative block overflow-hidden rounded-[28px] border border-(--color-border) shadow-[0_16px_36px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 lg:col-span-2 lg:row-span-1"
          >
            <div className="absolute inset-0 bg-[#f8f8f8]">
              <Image
                src="/images/banner/smart-watch-1.png"
                alt="Smart watch promo"
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(15,23,42,0.12)_34%,rgba(15,23,42,0.56)_100%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/55 text-(--color-primary-900) shadow-[0_8px_18px_rgba(237,108,133,0.10)]">
                <FiGift className="text-[18px]" />
              </span>

              <div className="p-1">
                <p className="text-[11px] leading-5 text-white/88 md:text-[12px]">
                  Smart watch promo
                </p>
                <h3 className="mt-1 text-[15px] font-semibold tracking-[-0.03em] text-white md:text-[16px]">
                  Smart watch spotlight
                </h3>
                <p className="mt-1.5 text-[11px] leading-5 text-white/88 md:text-[12px]">
                  Fitness, calls, and daily essentials.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
