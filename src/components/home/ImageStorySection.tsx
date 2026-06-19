import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { ROUTES } from "@/config/routes";
import Container from "@/components/shared/Container";

const stories = [
  {
    title: "Beauty & self care",
    subtitle: "Skincare, grooming, and daily confidence picks.",
    image: "/images/banner/female.jpg",
    href: `${ROUTES.PRODUCT}?search=${encodeURIComponent("beauty skincare")}`,
    badge: "Personal care",
    className: "md:col-span-5 md:row-span-2",
  },
  {
    title: "Smart lifestyle",
    subtitle: "Wearables and handy tech for everyday routines.",
    image: "/images/banner/smart-watch-1.png",
    href: `${ROUTES.PRODUCT}?search=${encodeURIComponent("smart watch")}`,
    badge: "Tech picks",
    className: "md:col-span-3",
  },
  {
    title: "Home entertainment",
    subtitle: "Screens, audio, and family-time upgrades.",
    image: "/images/banner/promo-bg-1.png",
    href: `${ROUTES.PRODUCT}?search=${encodeURIComponent("home entertainment")}`,
    badge: "Home setup",
    className: "md:col-span-4",
  },
  {
    title: "Gift-ready finds",
    subtitle: "Easy products to send, share, and surprise.",
    image: "/images/banner/promo-bg-3.jpg",
    href: `${ROUTES.PRODUCT}?search=${encodeURIComponent("gift")}`,
    badge: "Trending",
    className: "md:col-span-7",
  },
];

export default function ImageStorySection() {
  return (
    <section className="py-12 md:py-14 lg:py-16">
      <Container>
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[720px]">
            <span className="inline-flex rounded-full border border-primary-200 bg-primary-100 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.22em] text-primary">
              Visual shopping
            </span>
            <h2 className="mt-4 text-[30px] font-extrabold leading-[1.08] tracking-[-0.04em] text-primary-900 md:text-[42px]">
              Shop by real-life moments
            </h2>
            <p className="mt-3 max-w-[600px] text-[15px] leading-7 text-neutral-dark">
              Help visitors feel the product before they click. Hawkeri can guide shoppers through familiar needs: care, home, tech, and gifting.
            </p>
          </div>

          <Link
            href={ROUTES.PRODUCT}
            className="inline-flex w-fit items-center gap-3 rounded-full bg-primary px-5 py-3 text-[14px] font-bold text-white shadow-[0_16px_34px_rgba(4,108,169,0.22)] transition hover:bg-primary-dark"
          >
            Browse all products
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary-900">
              <FiArrowUpRight className="text-[18px]" />
            </span>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-12 md:auto-rows-[235px]">
          {stories.map((story) => (
            <Link
              key={story.title}
              href={story.href}
              className={[
                "group relative min-h-[280px] overflow-hidden rounded-[28px] border border-primary-100 bg-primary-50 shadow-[0_18px_48px_rgba(2,58,92,0.08)] transition duration-300 hover:-translate-y-1",
                story.className,
              ].join(" ")}
            >
              <Image
                src={story.image}
                alt={story.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,58,92,0.05)_0%,rgba(2,58,92,0.18)_44%,rgba(2,58,92,0.74)_100%)]" />

              <div className="absolute inset-x-4 bottom-4 rounded-[24px] border border-white/20 bg-white/72 p-4 shadow-[0_16px_34px_rgba(2,58,92,0.14)] backdrop-blur-md md:inset-x-5 md:bottom-5 md:p-5">
                <span className="inline-flex rounded-full bg-cta px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                  {story.badge}
                </span>
                <h3 className="mt-3 text-[20px] font-extrabold tracking-[-0.03em] text-primary-900 md:text-[24px]">
                  {story.title}
                </h3>
                <p className="mt-1.5 max-w-[380px] text-[13px] font-medium leading-6 text-primary-900/75">
                  {story.subtitle}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-primary">
                  Shop now
                  <FiArrowUpRight className="text-[16px]" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
