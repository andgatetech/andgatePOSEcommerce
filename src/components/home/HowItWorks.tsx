import Container from "@/components/shared/Container";
import Image from "next/image";
import { FiArrowRight, FiCheckCircle, FiMapPin, FiPackage, FiSearch, FiShoppingCart } from "react-icons/fi";

const steps = [
    {
        step: "01",
        eyebrow: "Discover",
        title: "Browse trusted local stores",
        description: "Find grocery, fashion, beauty, electronics, and daily essentials from verified sellers in one clean marketplace.",
        image: "/images/hawkeri/home/how-browse-store.jpg",
        icon: FiSearch,
        badge: "Category, brand & store filters",
        accent: "bg-(--color-primary)",
    },
    {
        step: "02",
        eyebrow: "Checkout",
        title: "Order with payment flexibility",
        description: "Add products to cart, choose cash on delivery or digital payment, then confirm your address in a few taps.",
        image: "/images/hawkeri/online-order-workspace.jpg",
        icon: FiShoppingCart,
        badge: "COD, bKash, Nagad ready",
        accent: "bg-(--color-cta)",
    },
    {
        step: "03",
        eyebrow: "Delivery",
        title: "Track until it reaches you",
        description: "Stores prepare the parcel, courier partners move it, and shoppers can follow the order journey anytime.",
        image: "/images/hawkeri/home/how-track-delivery.jpg",
        icon: FiPackage,
        badge: "Pathao, RedX, Steadfast flow",
        accent: "bg-(--color-primary-900)",
    },
];

export default function HowItWorks() {
    return (
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,var(--color-primary-50)_48%,#ffffff_100%)] py-14 sm:py-18 lg:py-20">
            <div className="absolute left-[-12rem] top-16 h-80 w-80 rounded-full bg-(--color-primary-100) blur-3xl" />
            <div className="absolute bottom-12 right-[-10rem] h-72 w-72 rounded-full bg-(--color-cta-100) blur-3xl" />
            <Container>
                <div className="relative mb-10 flex flex-col gap-5 text-center md:mb-12 md:flex-row md:items-end md:justify-between md:text-left">
                    <div className="mx-auto max-w-[720px] md:mx-0">
                    <span className="inline-flex rounded-full border border-(--color-primary-200) bg-white px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.22em] text-(--color-primary) shadow-sm">
                        How It Works
                    </span>
                    <h2 className="mt-4 text-[32px] font-extrabold leading-[1.06] tracking-[-0.04em] text-(--color-primary-900) sm:text-[44px]">
                        Shop in 3 easy steps
                    </h2>
                    <p className="mt-3 text-[15px] leading-7 text-(--color-neutral-dark) sm:text-[16px]">
                        From discovery to delivery, Hawkeri makes online shopping feel simple, trustworthy, and local.
                    </p>
                    </div>

                    <div className="mx-auto grid w-full max-w-[360px] grid-cols-3 gap-2 rounded-[22px] border border-(--color-primary-100) bg-white/80 p-2 shadow-[0_16px_36px_rgba(2,58,92,0.08)] backdrop-blur md:mx-0">
                        {["Choose", "Pay", "Track"].map((item) => (
                            <div key={item} className="rounded-2xl bg-(--color-primary-50) px-3 py-3 text-center">
                                <FiCheckCircle className="mx-auto h-4 w-4 text-(--color-primary)" />
                                <p className="mt-1 text-[12px] font-bold text-(--color-primary-900)">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative grid gap-5 lg:grid-cols-3">
                    <div className="absolute left-[16%] right-[16%] top-1/2 hidden h-px bg-[linear-gradient(90deg,transparent,var(--color-primary-200),transparent)] lg:block" />
                    {steps.map((step, index) => (
                        <article
                            key={step.step}
                            className="group relative overflow-hidden rounded-[28px] border border-(--color-primary-100) bg-white p-3 shadow-[0_18px_50px_rgba(2,58,92,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(2,58,92,0.13)]"
                        >
                            {index < steps.length - 1 && (
                                <div className="absolute -right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-(--color-primary-100) bg-white text-(--color-primary) shadow-lg lg:flex">
                                    <FiArrowRight />
                                </div>
                            )}

                            <div className="relative h-[260px] overflow-hidden rounded-[22px] bg-(--color-primary-50)">
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,58,92,0.02)_0%,rgba(2,58,92,0.12)_44%,rgba(2,58,92,0.66)_100%)]" />
                                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-[12px] font-extrabold text-(--color-primary-900) shadow-md backdrop-blur">
                                    <span className={["flex h-7 w-7 items-center justify-center rounded-full text-white", step.accent].join(" ")}>
                                        {step.step}
                                    </span>
                                    {step.eyebrow}
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 rounded-[18px] border border-white/20 bg-white/88 p-4 shadow-[0_16px_34px_rgba(2,58,92,0.16)] backdrop-blur-md">
                                    <div className="flex items-center gap-3">
                                        <span className={["flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg", step.accent].join(" ")}>
                                            <step.icon className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <h3 className="text-[18px] font-extrabold leading-tight tracking-[-0.03em] text-(--color-primary-900)">
                                                {step.title}
                                            </h3>
                                            <p className="mt-1 text-[12px] font-bold text-(--color-cta-dark)">{step.badge}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-3 pb-4 pt-5">
                                <p className="text-[14px] leading-7 text-(--color-neutral-dark)">
                                    {step.description}
                                </p>
                            </div>

                            {index === 2 && (
                                <div className="mx-3 mb-4 flex flex-wrap items-center gap-2 rounded-2xl bg-(--color-primary-50) px-3 py-3">
                                    <FiMapPin className="h-4 w-4 text-(--color-primary)" />
                                    {["Pathao", "RedX", "Steadfast"].map((courier) => (
                                        <span key={courier} className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-(--color-primary-900) shadow-sm">
                                            {courier}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}
