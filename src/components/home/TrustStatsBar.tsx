"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/shared/Container";
import { FiPackage, FiShoppingBag, FiSmile, FiTruck } from "react-icons/fi";

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

const stats = [
    { icon: FiShoppingBag, end: 500, suffix: "+", label: "Active Stores" },
    { icon: FiPackage, end: 15000, suffix: "+", label: "Products Listed" },
    { icon: FiSmile, end: 25000, suffix: "+", label: "Happy Customers" },
    { icon: FiTruck, end: 100000, suffix: "+", label: "Orders Delivered" },
];

export default function TrustStatsBar() {
    return (
        <section className="py-10 sm:py-14">
            <Container>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="group rounded-2xl border border-primary-100 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-md sm:p-6"
                        >
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-sm transition-transform group-hover:scale-110">
                                <stat.icon className="h-5 w-5" />
                            </div>
                            <div className="text-2xl font-extrabold text-primary-900 sm:text-3xl">
                                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                            </div>
                            <p className="mt-1 text-sm font-medium text-neutral">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
