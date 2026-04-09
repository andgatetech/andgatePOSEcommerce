import { AuthData } from "@/types";

const AUTH_STORAGE_KEY = "ecommerce_auth";

function hasWindow() {
  return typeof window !== "undefined";
}

export function isTokenExpired(expiresAt: string | null | undefined) {
  if (!expiresAt) {
    return true;
  }

  return new Date(expiresAt).getTime() <= Date.now();
}

export function loadStoredAuth(): AuthData | null {
  if (!hasWindow()) {
    return null;
  }

  const rawAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawAuth) {
    return null;
  }

  try {
    const parsedAuth = JSON.parse(rawAuth) as AuthData;

    if (!parsedAuth.token || !parsedAuth.expires_at || !parsedAuth.user) {
      clearStoredAuth();
      return null;
    }

    if (isTokenExpired(parsedAuth.expires_at)) {
      clearStoredAuth();
      return null;
    }

    return parsedAuth;
  } catch {
    clearStoredAuth();
    return null;
  }
}

export function saveStoredAuth(authData: AuthData) {
  if (!hasWindow()) {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
}

export function clearStoredAuth() {
  if (!hasWindow()) {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
