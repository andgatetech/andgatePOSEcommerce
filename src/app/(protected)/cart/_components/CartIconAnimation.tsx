"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const CartLottiePlayer = dynamic(() => import("./CartLottiePlayer"), {
  ssr: false,
});

type CartIconAnimationProps = {
  count?: number;
  variant?: "desktop" | "mobile";
};

export default function CartIconAnimation({
  count = 0,
  variant = "desktop",
}: CartIconAnimationProps) {
  const previousCount = useRef(count);
  const [countMotion, setCountMotion] = useState<"up" | "down" | null>(null);
  const [playToken, setPlayToken] = useState(0);

  useEffect(() => {
    if (count === previousCount.current) {
      return;
    }

    const direction = count > previousCount.current ? "up" : "down";
    setCountMotion(null);

    const frame = requestAnimationFrame(() => {
      setCountMotion(direction);
    });
    const timer = window.setTimeout(() => {
      setCountMotion(null);
    }, 380);

    previousCount.current = count;

    if (direction === "up") {
      setPlayToken((token) => token + 1);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [count]);

  return (
    <span
      className={`cart-lottie-animation cart-lottie-animation--${variant}`}
      aria-hidden="true"
    >
      <CartLottiePlayer playToken={playToken} />
      <span
        key={count}
        className={`cart-lottie-animation__count ${
          countMotion ? `cart-lottie-animation__count--${countMotion}` : ""
        }`}
      >
        {count}
      </span>
    </span>
  );
}
