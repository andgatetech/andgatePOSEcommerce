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
    { icon: FiShoppingBag, end: 500, suffix: "+", label: "Active Stores", gradient: "from-violet-500 to-purple-600", bg: "bg-violet-50" },
    { icon: FiPackage, end: 15000, suffix: "+", label: "Products Listed", gradient: "from-emerald-500 to-teal-600", bg: "bg-emerald-50" },
    { icon: FiSmile, end: 25000, suffix: "+", label: "Happy Customers", gradient: "from-amber-500 to-orange-600", bg: "bg-amber-50" },
    { icon: FiTruck, end: 100000, suffix: "+", label: "Orders Delivered", gradient: "from-sky-500 to-blue-600", bg: "bg-sky-50" },
];

export default function TrustStatsBar() {
    return (
        <section className="py-10 sm:py-14">
            <Container>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className={`group relative overflow-hidden rounded-2xl ${stat.bg} p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6`}
                        >
                            <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg transition-transform group-hover:scale-110`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                            <div className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
