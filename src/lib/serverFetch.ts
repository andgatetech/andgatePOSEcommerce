/**
 * Server-side fetch helper for React Server Components.
 *
 * RTK Query hooks cannot run on the server, so RSC data loading goes through
 * plain `fetch`. This helper builds the URL from `NEXT_PUBLIC_API_URL`, strips
 * empty params, and caches page 1 for 60s via `next.revalidate`.
 */
export async function serverFetchJson<T>(
  path: string,
  params?: Record<string, string | number | undefined | null>,
  init?: { revalidate?: number },
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }

  const url = new URL(base.replace(/\/$/, "") + path);
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value === undefined || value === null || value === "") continue;
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    next: { revalidate: init?.revalidate ?? 60 },
  });

  if (!response.ok) {
    throw new Error(`serverFetchJson failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
