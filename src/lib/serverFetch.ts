export async function serverFetchJson<T>(
  path: string,
  params?: Record<string, string | number | undefined | null>,
  init?: { revalidate?: number; cache?: RequestCache; timeout?: number },
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

  const timeoutMs = init?.timeout ?? 5000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      cache: init?.cache,
      next: init?.cache === "no-store" ? undefined : { revalidate: init?.revalidate ?? 60 },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`serverFetchJson failed: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  } finally {
    clearTimeout(timer);
  }
}
