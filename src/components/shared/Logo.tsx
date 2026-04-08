import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

interface LogoProps {
  /** Width of the logo in pixels */
  width?: number;
  /** Height of the logo in pixels */
  height?: number;
  /** If true, logo is not wrapped in a link */
  noLink?: boolean;
  /** Optional extra class names */
  className?: string;
  /** Light variant (for dark backgrounds like footer) */
  variant?: "default" | "light";
}

export default function Logo({
  width = 180,
  height = 48,
  noLink = false,
  className = "",
  variant = "default",
}: LogoProps) {
  const image = (
    <Image
      src="/images/andgatePOS.jpeg"
      alt="Andgate POS"
      width={width}
      height={height}
      priority
      style={{ width: 'auto', height: 'auto' }}
      className={`object-contain ${
        variant === "light" ? "brightness-0 invert" : ""
      } ${className}`}
    />
  );

  if (noLink) return image;

  return (
    <Link href={ROUTES.HOME} className="inline-flex items-center shrink-0">
      {image}
    </Link>
  );
}
