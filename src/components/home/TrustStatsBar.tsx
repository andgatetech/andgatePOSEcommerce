"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/shared/Container";
import { FiPackage, FiShoppingBag, FiSmile, FiTruck } from "react-icons/fi";

interface CounterProps {
    end: number;
    suffix?: string;
    prefix?: string;
}

function AnimatedCounter({ end, suffix = "", prefix = "" }: CounterProps) {
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
                        setCount(Math.floor(progress * end));
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

    return (
        <span ref={ref}>
            {prefix}
            {count >= 1000 ? Math.floor(count / 100) / 10 + "k" : count}
            {suffix}
        </span>
    );
}

const stats = [
    { icon: FiShoppingBag, end: 500, suffix: "+", prefix: "", label: "Active Stores", labelBn: "সক্রিয় স্টোর" },
    { icon: FiPackage, end: 15000, suffix: "+", prefix: "", label: "Products Listed", labelBn: "পণ্য তালিকাভুক্ত" },
    { icon: FiSmile, end: 25000, suffix: "+", prefix: "", label: "Happy Customers", labelBn: "সন্তুষ্ট গ্রাহক" },
    { icon: FiTruck, end: 100000, suffix: "+", prefix: "", label: "Orders Delivered", labelBn: "অর্ডার ডেলিভারি" },
];

export default function TrustStatsBar() {
    return (
        <section className="border-y border-gray-100 bg-gradient-to-r from-[#046ca9]/5 via-white to-[#046ca9]/5 py-8 sm:py-10">
            <Container>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <stat.icon className="mx-auto mb-2 h-6 w-6 text-[#046ca9]" />
                            <div className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                <AnimatedCounter end={stat.end} suffix={stat.suffix} prefix={stat.prefix} />
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{stat.labelBn}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
