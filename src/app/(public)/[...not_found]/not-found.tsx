import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from "@/config/routes";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-(--color-bg)">
      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-6 drop-shadow-sm">
        <Image
          src="/images/404.png"
          alt="Page not found"
          fill
          className="object-contain"
          priority
        />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-(--color-primary-900) mb-4 tracking-tight">
        Oops! Page Not Found
      </h1>
      <p className="text-(--color-text-muted) text-lg mb-8 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <Link 
        href={ROUTES.HOME}
        className="inline-flex items-center justify-center px-8 py-3 text-white bg-(--color-cta) hover:bg-(--color-cta-hover) active:bg-(--color-cta-dark) rounded font-medium transition-colors duration-200 shadow-sm"
      >
        Back to Home
      </Link>
    </div>
  );
}
