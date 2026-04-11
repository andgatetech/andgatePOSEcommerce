/**
 * Resolves a backend image URL to an absolute URL.
 *
 * The Laravel backend sometimes returns relative paths like
 * `/storage/ecommerce/...` instead of full URLs. This helper prepends
 * NEXT_PUBLIC_IMAGE_BASE_URL so Next.js <Image> always gets an absolute URL
 * that matches the configured remotePatterns.
 */
export function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = process.env.NEXT_PUBLIC_IMAGE_BASE_URL?.replace(/\/$/, "") ?? "";
  return `${base}${url.startsWith("/") ? "" : "/"}${url}`;
}
