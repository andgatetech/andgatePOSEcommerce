import {
  FiCreditCard,
  FiHeadphones,
  FiRefreshCcw,
  FiTruck,
} from "react-icons/fi";

const serviceHighlights = [
  {
    id: 1,
    title: "Free Shipping",
    subtitle: "Enjoy the convenience of free shipping on every order",
    icon: FiTruck,
    background: "#a7dde0",
  },
  {
    id: 2,
    title: "24x7 Support",
    subtitle: "Round-the-clock assistance, anytime you need it",
    icon: FiHeadphones,
    background: "#ffec7a",
  },
  {
    id: 3,
    title: "30 Days Return",
    subtitle: "Your satisfaction is our priority: return any product within 30 days",
    icon: FiRefreshCcw,
    background: "#f8c18e",
  },
  {
    id: 4,
    title: "Secure Payment",
    subtitle: "Seamless shopping backed by safe and secure payment options",
    icon: FiCreditCard,
    background: "#aae46f",
  },
];

export default function ServiceHighlights({ className }: { className?: string }) {
  return (
    <section className={["px-4 pb-14 md:px-8 md:pb-16 lg:px-12 lg:pb-20", className].filter(Boolean).join(" ")}>
      <div className="mx-auto max-w-[1680px]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {serviceHighlights.map((item) => (
            <article
              key={item.id}
              className="flex flex-col items-center rounded-[22px] px-6 py-5 text-center md:px-7 md:py-6"
              style={{ backgroundColor: item.background }}
            >
              <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_12px_28px_rgba(19,45,69,0.08)]">
                <item.icon className="text-[24px] text-(--color-primary-900)" />
              </div>

              <h3 className="mt-4 text-[18px] font-semibold leading-[1.15] tracking-[-0.03em] text-(--color-primary-900)">
                {item.title}
              </h3>
              <p className="mt-2 max-w-[320px] text-[14px] leading-6 text-(--color-primary-900)">
                {item.subtitle}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
