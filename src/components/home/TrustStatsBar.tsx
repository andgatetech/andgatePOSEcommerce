"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/shared/Container";

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || started.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    started.current = true;
                    const duration = 2000;
                    const start = performance.now();
                    const animate = (now: number) => {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * end));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [end]);

    const display = count >= 1000 ? (Math.floor(count / 100) / 10).toFixed(1).replace(/\.0$/, "") + "k" : String(count);
    return <span ref={ref}>{display}{suffix}</span>;
}

interface TrustStats {
    stores: number;
    products: number;
}

const formatStat = (n: number): number => {
    if (n < 10) return Math.max(n, 10); // minimum 10 for display
    if (n < 50) return Math.ceil(n / 5) * 5;
    if (n < 100) return Math.ceil(n / 10) * 10;
    return Math.ceil(n / 100) * 100;
};

export default function TrustStatsBar({ stats }: { stats: TrustStats }) {
    const displayStores = formatStat(stats.stores);
    const displayProducts = formatStat(stats.products);
    const supportMetrics = [
        { value: displayStores, label: "Verified Stores", suffix: "+" },
        { value: displayProducts, label: "Products to Browse", suffix: "+" },
        { value: 64, label: "District Delivery Coverage", suffix: "" },
        { value: 24, label: "Order Support Window", suffix: "/7" },
    ];

    return (
        <section className="py-6 sm:py-8">
            <Container>
                <div className="rounded-3xl border border-primary-100 bg-white px-4 py-5 shadow-[0_16px_42px_rgba(2,58,92,0.07)] sm:px-6 md:px-8">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {supportMetrics.map((item, index) => (
                            <div
                                key={item.label}
                                className={[
                                    "text-center sm:text-left",
                                    index > 0 ? "border-primary-100 sm:border-l sm:pl-6" : "",
                                ].filter(Boolean).join(" ")}
                            >
                                <div className="text-2xl font-extrabold tracking-[-0.03em] text-primary-900 sm:text-3xl">
                                    <AnimatedCounter end={item.value} suffix={item.suffix} />
                                </div>
                                <p className="mt-1 text-sm font-semibold text-neutral-dark">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
