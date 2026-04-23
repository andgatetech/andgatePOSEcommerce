import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { ROUTES } from "@/config/routes";

type PromoBanner = {
  id: number;
  badge: string;
  title: string;
  description: string;
  image: string;
  badgeClassName: string;
  overlayClassName: string;
};

const promoBanners: PromoBanner[] = [
  {
    id: 1,
    badge: "Start From $120.00",
    title: "Audio Essentials",
    description: "Hear every beat, every time.",
    image: "/images/banner/promo-grid-1.jpg",
    badgeClassName: "bg-[rgba(176,204,222,0.92)] text-(--color-primary-900)",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(82,37,161,0.76)_0%,rgba(53,24,109,0.34)_44%,rgba(0,0,0,0)_100%)]",
  },
  {
    id: 2,
    badge: "Up to 30% off",
    title: "New Smart Watch",
    description: "Track your fitness, calls, and more.",
    image: "/images/banner/promo-grid-2.jpg",
    badgeClassName: "bg-[#ffd86a] text-(--color-primary-900)",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(255,106,72,0.60)_0%,rgba(255,106,72,0.18)_46%,rgba(0,0,0,0)_100%)]",
  },
  {
    id: 3,
    badge: "New Arrivals",
    title: "Smart Mobile Devices",
    description: "Smart devices for every lifestyle.",
    image: "/images/banner/promo-grid-3.jpg",
    badgeClassName: "bg-[#b8ef6f] text-(--color-primary-900)",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(17,17,17,0.70)_0%,rgba(17,17,17,0.20)_44%,rgba(0,0,0,0)_100%)]",
  },
];

export default function ProductPromoBanners() {
  return (
    <section className="px-4 pb-10 md:px-8 md:pb-12 lg:px-10 lg:pb-14">
      <div className="mx-auto">
        <div className="grid gap-5 xl:grid-cols-3">
          {promoBanners.map((banner) => (
            <article
              key={banner.id}
              className="group relative min-h-[280px] overflow-hidden rounded-[28px] md:min-h-[320px]"
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                priority={banner.id === 1}
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />

              <div className={`absolute inset-0 ${banner.overlayClassName}`} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.18)_100%)]" />

              <div className="relative z-10 flex h-full items-end p-6 md:p-9">
                <div className="max-w-[280px]">
                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-[13px] font-semibold shadow-[0_12px_22px_rgba(0,0,0,0.12)] ${banner.badgeClassName}`}
                  >
                    {banner.badge}
                  </span>

                  <h3 className="mt-5 text-[26px] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[30px]">
                    {banner.title}
                  </h3>

                  <p className="mt-3 text-[15px] leading-7 text-white/92 md:text-[16px]">
                    {banner.description}
                  </p>

                  <Link
                    href={ROUTES.CATEGORY}
                    className="mt-6 inline-flex items-center gap-3 rounded-full bg-(--color-primary) px-5 py-3 text-[16px] font-semibold text-white shadow-[0_14px_28px_rgba(44,95,138,0.32)] transition hover:bg-(--color-primary-dark)"
                  >
                    Shop Now
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-(--color-primary-900)">
                      <FiArrowUpRight className="text-[18px]" />
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
