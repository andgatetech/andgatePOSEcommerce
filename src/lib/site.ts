export const SITE_URL =
  process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_SITE_URL?.includes("localhost")
    ? "https://www.hawkeri.com"
    : process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.hawkeri.com";
