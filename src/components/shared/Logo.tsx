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
  /** Visual variant: 'default' (normal), 'light' (white filter), 'invert' (brightness invert for dark BGs) */
  variant?: "default" | "light" | "invert";
  /** Override the default logo image src */
  src?: string;
}

export default function Logo({
  width = 180,
  height = 48,
  noLink = false,
  className = "",
  variant = "default",
  src = "/images/Hawkeri1.png",
}: LogoProps) {
  const image = (
    <Image
      src={src}
      alt="Hawkeri"
      width={width}
      height={height}
      priority
      fetchPriority="high"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...(variant === "default"
          ? { mixBlendMode: "multiply" as const, filter: "brightness(1.08)" }
          : {}),
      }}
      className={`object-contain ${
        variant === "light" || variant === "invert" ? "brightness-0 invert" : ""
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
