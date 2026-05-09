"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import addToCartAnimation from "../../../../../public/images/svg/Add to cart.json";

type CartIconAnimationProps = {
  count?: number;
  variant?: "desktop" | "mobile";
};

export default function CartIconAnimation({
  count = 0,
  variant = "desktop",
}: CartIconAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const previousCount = useRef(count);
  const [countMotion, setCountMotion] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    lottieRef.current?.goToAndStop(0, true);
  }, []);

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
    lottieRef.current?.stop();

    if (direction === "up") {
      lottieRef.current?.setDirection(1);
      lottieRef.current?.goToAndPlay(0, true);
    }

    const resetTimer = window.setTimeout(() => {
      lottieRef.current?.setDirection(1);
      lottieRef.current?.goToAndStop(0, true);
    }, 1200);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.clearTimeout(resetTimer);
    };
  }, [count]);

  return (
    <span
      className={`cart-lottie-animation cart-lottie-animation--${variant}`}
      aria-hidden="true"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={addToCartAnimation}
        autoplay={false}
        loop={false}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid meet",
        }}
      />
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
