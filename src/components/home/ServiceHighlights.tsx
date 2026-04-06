import Image from "next/image";
import { serviceHighlights } from "@/components/home/serviceHighlightsData";

export default function ServiceHighlights() {
  return (
    <section className="px-4 pb-14 md:px-8 md:pb-16 lg:px-12 lg:pb-20">
      <div className="mx-auto max-w-[1680px]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {serviceHighlights.map((item) => (
            <article
              key={item.id}
              className="flex items-center gap-3 rounded-[16px] bg-[#f4f6fa] px-5 py-6"
            >
              <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={64}
                  height={64}
                  unoptimized
                  className="h-14 w-14"
                />
              </div>

              <div>
                <h3 className="text-[17px] font-semibold leading-[1.2] text-[var(--color-primary-900)]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[14px] text-[var(--color-text-muted)]">
                  {item.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
