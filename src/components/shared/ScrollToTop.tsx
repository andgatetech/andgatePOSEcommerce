"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 600);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-20 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#046ca9] text-white shadow-lg transition-all hover:bg-[#035b8e] hover:shadow-xl hover:-translate-y-0.5 sm:bottom-6"
        >
            <FiArrowUp className="h-5 w-5" />
        </button>
    );
}
