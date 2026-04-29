import {
  FiCreditCard,
  FiHeadphones,
  FiRefreshCcw,
  FiTruck,
} from "react-icons/fi";
import Container from "@/components/shared/Container";

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
    <section className={["pb-8 md:pb-10 lg:pb-12", className].filter(Boolean).join(" ")}>
      <Container>
        <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-4">
          {serviceHighlights.map((item) => (
            <article
              key={item.id}
              className="flex flex-col items-center rounded-[20px] px-4.5 py-3.5 text-center md:px-5 md:py-4"
              style={{ backgroundColor: item.background }}
            >
              <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_rgba(19,45,69,0.08)]">
                <item.icon className="text-[20px] text-(--color-primary-900)" />
              </div>

              <h3 className="mt-2.5 text-[16px] font-semibold leading-[1.15] tracking-[-0.03em] text-(--color-primary-900)">
                {item.title}
              </h3>
              <p className="mt-1 max-w-[280px] text-[13px] leading-[1.45] text-(--color-primary-900)">
                {item.subtitle}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
