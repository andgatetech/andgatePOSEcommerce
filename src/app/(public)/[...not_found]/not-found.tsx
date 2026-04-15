import { ROUTES } from "@/config/routes";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] mb-1.5 pb-2 flex-col items-center justify-center bg-white px-4 text-center">
      <div className="relative -mt-4 mb-0 h-[37vh] w-full max-w-md overflow-hidden md:-mt-6 md:h-[43vh] md:max-w-2xl lg:-mt-8 lg:h-[47vh] lg:max-w-3xl">
        {/*
        <Image
          src="/images/404.png"
          alt="Page not found"
          fill
          className="object-contain"
          priority
        />
        */}
        <Image
          src="/svg/444.gif"
          alt="Page not found"
          fill
          className="object-contain object-top -translate-y-4 md:-translate-y-6 lg:-translate-y-11"
          priority
          unoptimized
        />
      </div>

      <h1 className="-mt-8 mb-2 text-2xl font-bold tracking-tight text-(--color-primary-900) md:text-3xl">
        Oops! Page Not Found
      </h1>
      <p className="mx-auto mb-4 max-w-md text-base text-(--color-text-muted) md:text-lg">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        href={ROUTES.HOME}
        className="inline-flex items-center justify-center rounded px-8 py-3 font-medium text-white shadow-sm transition-colors duration-200 bg-(--color-cta) hover:bg-(--color-cta-hover) active:bg-(--color-cta-dark)">
        Back to Home
      </Link>
    </div>
  );
}
