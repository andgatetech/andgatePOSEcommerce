export type SelectedFacets = Record<string, string[]>;

export function parseSelectedFacets(value?: string | number): SelectedFacets {
  if (typeof value !== "string" || value.trim() === "") return {};

  try {
    const decoded = JSON.parse(value) as unknown;
    if (!decoded || typeof decoded !== "object" || Array.isArray(decoded)) return {};

    return Object.fromEntries(
      Object.entries(decoded)
        .map(([name, values]) => [
          name,
          Array.isArray(values)
            ? values.filter((item): item is string => typeof item === "string" && item.trim() !== "")
            : [],
        ])
        .filter(([, values]) => values.length > 0),
    );
  } catch {
    return {};
  }
}

export function encodeSelectedFacets(facets: SelectedFacets): string | undefined {
  const cleaned = Object.fromEntries(
    Object.entries(facets)
      .map(([name, values]) => [name, Array.from(new Set(values)).filter(Boolean).sort()])
      .filter(([, values]) => values.length > 0),
  );

  return Object.keys(cleaned).length > 0 ? JSON.stringify(cleaned) : undefined;
}

export function toggleSelectedFacet(facets: SelectedFacets, name: string, value: string): SelectedFacets {
  const current = facets[name] ?? [];
  const nextValues = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];

  const next = { ...facets };
  if (nextValues.length > 0) {
    next[name] = nextValues;
  } else {
    delete next[name];
  }

  return next;
}

export function countSelectedFacets(facets: SelectedFacets): number {
  return Object.values(facets).reduce((sum, values) => sum + values.length, 0);
}
