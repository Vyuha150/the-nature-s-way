import type { AdminSession } from "./types";

type AuthTokens = { accessToken: string; refreshToken: string };

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
const TOKENS_KEY = "tnw_tokens";
const SESSION_KEY = "tnw_admin_session";

function getTokens(): AuthTokens | null {
  const raw = localStorage.getItem(TOKENS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthTokens;
  } catch {
    return null;
  }
}

function setTokens(tokens: AuthTokens) {
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
}

function clearTokens() {
  localStorage.removeItem(TOKENS_KEY);
}

export function getStoredSession(): AdminSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

export function setStoredSession(session: AdminSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearStoredSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function hasTokens() {
  return !!getTokens();
}

async function request<T>(path: string, options: RequestInit = {}, retry = true): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const tokens = getTokens();
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (tokens?.accessToken) {
    headers.set("Authorization", `Bearer ${tokens.accessToken}`);
  }

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401 && retry && tokens?.refreshToken) {
    const refreshed = await refreshTokens(tokens.refreshToken);
    if (refreshed) {
      return request<T>(path, options, false);
    }
  }

  if (!response.ok) {
    let message = response.statusText;
    try {
      const data = await response.json();
      message = data.error ?? message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

async function refreshTokens(refreshToken: string) {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      clearTokens();
      clearStoredSession();
      return false;
    }

    const tokens = (await response.json()) as AuthTokens;
    setTokens(tokens);
    return true;
  } catch {
    clearTokens();
    clearStoredSession();
    return false;
  }
}

export const api = {
  async login(email: string, password: string) {
    const tokens = await request<AuthTokens>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setTokens(tokens);
    const session = await request<AdminSession>("/users/me", { method: "GET" }, true);
    setStoredSession(session);
    return session;
  },

  async logout() {
    const tokens = getTokens();
    if (tokens?.refreshToken) {
      await request<void>("/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken: tokens.refreshToken }),
      });
    }
    clearTokens();
    clearStoredSession();
  },

  async me() {
    const session = await request<AdminSession>("/users/me", { method: "GET" });
    setStoredSession(session);
    return session;
  },

  request,
  hasTokens,
  clearTokens,
  clearStoredSession,
};
