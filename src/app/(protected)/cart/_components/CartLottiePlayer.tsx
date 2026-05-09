"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import addToCartAnimation from "../../../../../public/images/svg/Add to cart.json";

type CartLottiePlayerProps = {
  playToken: number;
};

export default function CartLottiePlayer({ playToken }: CartLottiePlayerProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    lottieRef.current?.goToAndStop(0, true);
  }, []);

  useEffect(() => {
    if (playToken === 0) {
      return;
    }

    lottieRef.current?.stop();
    lottieRef.current?.setDirection(1);
    lottieRef.current?.goToAndPlay(0, true);

    const resetTimer = window.setTimeout(() => {
      lottieRef.current?.setDirection(1);
      lottieRef.current?.goToAndStop(0, true);
    }, 1200);

    return () => {
      window.clearTimeout(resetTimer);
    };
  }, [playToken]);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={addToCartAnimation}
      autoplay={false}
      loop={false}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid meet",
      }}
    />
  );
}
