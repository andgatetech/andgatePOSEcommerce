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
    title: "Local Delivery",
    subtitle: "Delivery-ready checkout flow for customers across Bangladesh",
    icon: FiTruck,
    tone: "border-(--color-primary-200) bg-(--color-primary-50)",
  },
  {
    id: 2,
    title: "Helpful Support",
    subtitle: "Assistance for orders, payment questions, and delivery updates",
    icon: FiHeadphones,
    tone: "border-(--color-cta-200) bg-(--color-cta-100)",
  },
  {
    id: 3,
    title: "Easy Returns",
    subtitle: "Clear return support for eligible products and store policies",
    icon: FiRefreshCcw,
    tone: "border-(--color-neutral-200) bg-(--color-neutral-100)",
  },
  {
    id: 4,
    title: "Flexible Payment",
    subtitle: "Cash on delivery and digital payment options for easier buying",
    icon: FiCreditCard,
    tone: "border-(--color-primary-200) bg-white",
  },
];

export default function ServiceHighlights({ className }: { className?: string }) {
  return (
    <section className={["pb-8 md:pb-10 lg:pb-12", className].filter(Boolean).join(" ")}>
      <Container>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {serviceHighlights.map((item) => (
            <article
              key={item.id}
              className={[
                "flex min-h-[172px] flex-col items-center rounded-[8px] border px-4 py-5 text-center shadow-[0_12px_28px_rgba(2,58,92,0.06)] md:px-5",
                item.tone,
              ].join(" ")}
            >
              <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[8px] bg-white shadow-[0_10px_24px_rgba(19,45,69,0.08)]">
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
