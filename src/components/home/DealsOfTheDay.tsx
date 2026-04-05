import Image from "next/image";
import Link from "next/link";
import { FiChevronRight, FiShoppingCart } from "react-icons/fi";
import { dealsOfTheDay } from "@/components/home/dealsOfTheDayData";

const labels = ["Days", "Hours", "Mins", "Sec"];

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={index < rating ? "text-[#f5c044]" : "text-[#d7dee5]"}
    >
      ★
    </span>
  ));
}

export default function DealsOfTheDay() {
  return (
    <section className="px-4 pb-12 pt-2 md:px-8 md:pb-14 lg:px-12 lg:pb-16">
      <div className="mx-auto max-w-[1680px]">
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-[var(--color-primary-900)] md:text-[38px]">
            Deals Of The Day
          </h2>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[17px] font-medium text-[#7a8594] transition hover:text-[var(--color-primary)]"
          >
            All Deals
            <FiChevronRight className="text-base" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
          {dealsOfTheDay.map((deal) => (
            <article key={deal.id} className="group relative">

              {/* Product Image */}
              <div className="relative h-[200px] overflow-hidden rounded-[18px]">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>

              {/* Countdown Timer — centered, straddling image/card boundary */}
              <div className="absolute left-1/2 z-20 flex -translate-x-1/2 items-center gap-[6px]" style={{ top: "calc(200px - 70px)" }}>
                {Object.values(deal.timeLeft).map((value, index) => (
                  <div
                    key={`${deal.id}-${labels[index]}`}
                    className="flex min-w-[66px] flex-col items-center rounded-[8px] bg-white px-2 py-[9px] shadow-[0_4px_14px_rgba(15,23,42,0.14)]"
                  >
                    <span className="text-[17px] font-semibold leading-none text-[#3bb77e]">
                      {value}
                    </span>
                    <span className="mt-[6px] text-[12px] leading-none text-[#7e7e7e]">
                      {labels[index]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Floating White Info Card */}
              <div className="relative z-10 mx-3 -mt-10 rounded-[12px] bg-white px-5 pb-5 pt-[44px] shadow-[0_8px_28px_rgba(15,23,42,0.09)]">
                {/* Title */}
                <h3 className="min-h-[48px] text-[16px] font-semibold leading-[1.3] text-[var(--color-primary-900)] line-clamp-2">
                  {deal.title}
                </h3>

                {/* Stars */}
                <div className="mt-2 flex items-center gap-2 text-[16px] leading-none">
                  <div className="flex items-center gap-[1px]">
                    {renderStars(deal.rating)}
                  </div>
                  <span className="text-[13px] text-[#b6b6b6]">
                    ({deal.rating}.0)
                  </span>
                </div>

                {/* Vendor */}
                <p className="mt-2 text-[14px] text-[#7e7e7e]">
                  By <span className="text-[#3bb77e]">{deal.vendor}</span>
                </p>

                {/* Price + Add Button */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-end gap-2">
                    <span className="text-[18px] font-semibold text-[#3bb77e]">
                      ${deal.price.toFixed(2)}
                    </span>
                    <span className="mb-[2px] text-[13px] font-medium text-[#adadad] line-through">
                      ${deal.oldPrice}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-[6px] rounded-[6px] bg-[#def9ec] px-4 py-[9px] text-[14px] font-semibold text-[#3bb77e] transition hover:bg-[#3bb77e] hover:text-white"
                  >
                    <FiShoppingCart className="text-sm" />
                    Add
                  </button>
                </div>
              </div>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
