import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { ROUTES } from "@/config/routes";
import Container from "@/components/shared/Container";

const stories = [
  {
    title: "Order-ready essentials",
    subtitle: "Products packed, checked, and ready for customer delivery.",
    image: "/images/hawkeri/home/story-order-packing.jpg",
    href: `${ROUTES.PRODUCT}?search=${encodeURIComponent("online order")}`,
    badge: "Online shopping",
    className: "md:col-span-5 md:row-span-2",
    objectPosition: "object-center",
  },
  {
    title: "Fresh grocery picks",
    subtitle: "Everyday food and household needs from local sellers.",
    image: "/images/hawkeri/home/story-grocery.jpg",
    href: `${ROUTES.PRODUCT}?search=${encodeURIComponent("grocery")}`,
    badge: "Daily needs",
    className: "md:col-span-3",
    objectPosition: "object-center",
  },
  {
    title: "Footwear & fashion",
    subtitle: "Visual product cards that help shoppers choose faster.",
    image: "/images/hawkeri/home/story-footwear.jpg",
    href: `${ROUTES.PRODUCT}?search=${encodeURIComponent("shoes")}`,
    badge: "Fashion",
    className: "md:col-span-4",
    objectPosition: "object-center",
  },
  {
    title: "Beauty & personal care",
    subtitle: "Clean product photography for small, high-margin items.",
    image: "/images/hawkeri/home/story-skincare.jpg",
    href: `${ROUTES.PRODUCT}?search=${encodeURIComponent("beauty")}`,
    badge: "Self care",
    className: "md:col-span-7",
    objectPosition: "object-center",
  },
];

export default function ImageStorySection() {
  return (
    <section className="bg-gradient-to-b from-white via-(--color-primary-50) to-white py-12 md:py-14 lg:py-16">
      <Container>
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[720px]">
            <span className="inline-flex rounded-full border border-(--color-primary-200) bg-white px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.22em] text-(--color-primary) shadow-sm">
              Hawkeri collections
            </span>
            <h2 className="mt-4 text-[30px] font-extrabold leading-[1.08] tracking-[-0.04em] text-(--color-primary-900) md:text-[42px]">
              Shop familiar products with clearer visuals
            </h2>
            <p className="mt-3 max-w-[600px] text-[15px] leading-7 text-(--color-neutral-dark)">
              The homepage should quickly show what customers can buy: grocery, fashion, beauty, and online-order essentials from real sellers.
            </p>
          </div>

          <Link
            href={ROUTES.PRODUCT}
            className="inline-flex w-fit items-center gap-3 rounded-full bg-(--color-primary) px-5 py-3 text-[14px] font-bold text-white shadow-[0_16px_34px_rgba(4,108,169,0.22)] transition hover:bg-(--color-primary-dark)"
          >
            Browse all products
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-(--color-primary-900)">
              <FiArrowUpRight className="text-[18px]" />
            </span>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-12 md:auto-rows-[270px]">
          {stories.map((story) => (
            <Link
              key={story.title}
              href={story.href}
              className={[
                "group relative min-h-[320px] overflow-hidden rounded-[24px] border border-(--color-primary-100) bg-white shadow-[0_18px_48px_rgba(2,58,92,0.08)] transition duration-300 hover:-translate-y-1 md:min-h-0",
                story.className,
              ].join(" ")}
            >
              <Image
                src={story.image}
                alt={story.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={[
                  "object-cover transition duration-700 group-hover:scale-[1.04]",
                  story.objectPosition,
                ].join(" ")}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,58,92,0.02)_0%,rgba(2,58,92,0.16)_42%,rgba(2,58,92,0.76)_100%)]" />
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[linear-gradient(135deg,rgba(4,108,169,0.22),rgba(231,145,55,0.16))]" />

              <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-(--color-primary-900) shadow-sm backdrop-blur-md md:left-5 md:top-5">
                {story.badge}
              </span>

              <div className="absolute inset-x-4 bottom-4 rounded-[18px] border border-white/25 bg-white/90 p-4 shadow-[0_16px_34px_rgba(2,58,92,0.14)] backdrop-blur-md md:inset-x-5 md:bottom-5">
                <h3 className="text-[20px] font-extrabold leading-tight tracking-[-0.03em] text-(--color-primary-900) md:text-[23px]">
                  {story.title}
                </h3>
                <p className="mt-2 max-w-[380px] text-[13px] font-medium leading-6 text-(--color-primary-900)/75">
                  {story.subtitle}
                </p>
                <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-(--color-cta-100) px-3 py-1.5 text-[13px] font-bold text-(--color-cta-dark)">
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
