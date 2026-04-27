"use client";

import { FiGrid, FiPackage, FiTag } from "react-icons/fi";

type GeneratedImageFallbackKind = "category" | "brand" | "product";

interface GeneratedImageFallbackProps {
  name: string;
  kind: GeneratedImageFallbackKind;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showLabel?: boolean;
}

const PALETTES = [
  {
    background: "#EAF6F2",
    border: "#B9DED1",
    foreground: "#116850",
    accent: "#D8EFE7",
  },
  {
    background: "#FFF1E5",
    border: "#FFD1AD",
    foreground: "#93501D",
    accent: "#FFE2C9",
  },
  {
    background: "#EEF2FF",
    border: "#C8D2FF",
    foreground: "#394E9E",
    accent: "#DEE5FF",
  },
  {
    background: "#F5F0FF",
    border: "#D8C8FF",
    foreground: "#6541A8",
    accent: "#E8DFFF",
  },
  {
    background: "#FFF8D9",
    border: "#F3DD83",
    foreground: "#80660C",
    accent: "#FFF0A8",
  },
];

function hashName(name: string): number {
  return name.split("").reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) >>> 0;
  }, 7);
}

function initialsFromName(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "NA";

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function getFallbackIcon(kind: GeneratedImageFallbackKind) {
  if (kind === "brand") return FiTag;
  if (kind === "product") return FiPackage;
  return FiGrid;
}

export default function GeneratedImageFallback({
  name,
  kind,
  className = "",
  iconClassName = "",
  textClassName = "",
  showLabel = false,
}: GeneratedImageFallbackProps) {
  const palette = PALETTES[hashName(name) % PALETTES.length];
  const Icon = getFallbackIcon(kind);
  const initials = initialsFromName(name);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: palette.background,
        borderColor: palette.border,
        color: palette.foreground,
      }}
      aria-label={name}
      role="img"
    >
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{ background: palette.accent }}
        aria-hidden
      />
      <div className="relative flex flex-col items-center justify-center">
        <Icon className={`mb-1 ${iconClassName}`} aria-hidden />
        <span className={`font-semibold leading-none ${textClassName}`}>
          {initials}
        </span>
        {showLabel ? (
          <span className="mt-2 max-w-[128px] px-3 text-center text-[12px] font-medium leading-[1.2]">
            {name}
          </span>
        ) : null}
      </div>
    </div>
  );
}
