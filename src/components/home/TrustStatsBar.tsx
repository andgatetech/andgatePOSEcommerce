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

    return (
        <section className="py-8 sm:py-10">
            <Container>
                <div className="flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-primary-100 bg-white px-6 py-8 shadow-sm sm:gap-12 sm:px-10 md:gap-16">
                    <div className="text-center">
                        <div className="text-2xl font-extrabold text-primary-900 sm:text-3xl">
                            <AnimatedCounter end={displayStores} suffix="+" />
                        </div>
                        <p className="mt-1 text-sm font-medium text-neutral">Active Stores</p>
                    </div>
                    <div className="hidden h-10 w-px bg-primary-100 sm:block" />
                    <div className="text-center">
                        <div className="text-2xl font-extrabold text-primary-900 sm:text-3xl">
                            <AnimatedCounter end={displayProducts} suffix="+" />
                        </div>
                        <p className="mt-1 text-sm font-medium text-neutral">Products Listed</p>
                    </div>
                    <div className="hidden h-10 w-px bg-primary-100 sm:block" />
                    <div className="text-center">
                        <div className="text-2xl font-extrabold text-primary-900 sm:text-3xl">
                            <AnimatedCounter end={25000} suffix="+" />
                        </div>
                        <p className="mt-1 text-sm font-medium text-neutral">Happy Customers</p>
                    </div>
                    <div className="hidden h-10 w-px bg-primary-100 sm:block" />
                    <div className="text-center">
                        <div className="text-2xl font-extrabold text-primary-900 sm:text-3xl">
                            <AnimatedCounter end={100000} suffix="+" />
                        </div>
                        <p className="mt-1 text-sm font-medium text-neutral">Orders Delivered</p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
