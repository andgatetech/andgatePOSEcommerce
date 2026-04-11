export function resolveStoreLogoUrl(logoPath: string | null | undefined): string | null {
  if (!logoPath) return null;
  if (logoPath.startsWith("http://") || logoPath.startsWith("https://")) return logoPath;

  const base = process.env.NEXT_PUBLIC_IMAGE_BASE_URL?.replace(/\/$/, "") ?? "";
  const normalized = logoPath.replace(/^\/+/, "");

  return `${base}/storage/${normalized}`;
}
