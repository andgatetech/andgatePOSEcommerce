import Container from "@/components/shared/Container";
import Image from "next/image";

const steps = [
    {
        step: "01",
        title: "Browse & Choose",
        description: "Explore thousands of products from verified local stores across Bangladesh. Filter by category, brand, or store.",
        image: "/images/banner/banner (1).png",
    },
    {
        step: "02",
        title: "Place Your Order",
        description: "Add items to your cart, choose cash on delivery or online payment, and enter your delivery address.",
        image: "/images/banner/banner (2).png",
    },
    {
        step: "03",
        title: "Fast Delivery",
        description: "Your order is packed and shipped via Pathao, RedX, or Steadfast. Track your order anytime.",
        image: "/images/banner/banner (3).png",
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-gray-50 py-12 sm:py-16">
            <Container>
                <div className="mb-10 text-center">
                    <span className="inline-block rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                        How It Works
                    </span>
                    <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                        Shop in 3 Easy Steps
                    </h2>
                    <p className="mt-2 text-neutral">
                        From browsing to delivery — we make online shopping simple
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-3">
                    {steps.map((step) => (
                        <div key={step.step} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-primary-200 hover:shadow-md">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">
                                    {step.step}
                                </span>
                                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                            </div>
                            <p className="text-sm leading-relaxed text-neutral-dark">{step.description}</p>
                            <div className="mt-4 overflow-hidden rounded-xl bg-gray-100">
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    width={400}
                                    height={200}
                                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
