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

      <style>{`
        .cart-lottie-animation {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: visible;
          transition: transform 180ms ease;
        }

        .cart-lottie-animation--desktop {
          width: 3rem;
          height: 3rem;
        }

        .cart-lottie-animation--mobile {
          width: 2.65rem;
          height: 2.65rem;
        }

        .cart-lottie-animation > div,
        .cart-lottie-animation svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
        }

        .group:hover .cart-lottie-animation--desktop,
        .cart-lottie-animation--desktop:hover {
          transform: translateY(-1px);
        }

        .cart-lottie-animation__count {
          position: absolute;
          right: 0.05rem;
          top: 0.08rem;
          z-index: 2;
          display: flex;
          min-width: 1.05rem;
          height: 1.05rem;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: var(--color-cta);
          color: #ffffff;
          font-size: 0.63rem;
          font-weight: 800;
          line-height: 1;
          padding: 0 0.24rem;
          box-shadow: 0 0.1rem 0.3rem rgba(17, 17, 17, 0.16);
        }

        .cart-lottie-animation--mobile .cart-lottie-animation__count {
          right: -0.12rem;
          top: 0.02rem;
        }

        .cart-lottie-animation__count--up {
          animation: cart-count-up 360ms ease-out 1;
        }

        .cart-lottie-animation__count--down {
          animation: cart-count-down 360ms ease-out 1;
        }

        @keyframes cart-count-up {
          0% {
            transform: translateY(0) scale(1);
          }
          45% {
            transform: translateY(-0.28rem) scale(1.18);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes cart-count-down {
          0% {
            transform: translateY(0) scale(1);
          }
          45% {
            transform: translateY(0.2rem) scale(0.88);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cart-lottie-animation__count {
            animation: none;
          }
        }
      `}</style>
    </span>
  );
}
