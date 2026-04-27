export function getBackendMessage(error: unknown, fallback: string) {
  if (!error || typeof error !== "object" || !("data" in error)) {
    return fallback;
  }

  const responseData = (error as { data?: unknown }).data;

  if (!responseData || typeof responseData !== "object") {
    return fallback;
  }

  if ("message" in responseData && typeof responseData.message === "string" && responseData.message.trim()) {
    return responseData.message;
  }

  return fallback;
}
