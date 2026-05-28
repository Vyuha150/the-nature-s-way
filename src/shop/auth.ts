import { api, clearStoredSession, getStoredSession, hasTokens } from "./api/client";
import type { UserSession } from "./api/types";

export { UserSession };

export function getUserSession(): UserSession | null {
  return getStoredSession();
}

export async function userLogin(email: string, password: string) {
  const session = await api.login(email, password);
  if (session.role !== "customer") {
    await api.logout();
    throw new Error("Customer access required");
  }
  return session;
}

export async function userRegister(name: string, email: string, password: string) {
  const session = await api.register(name, email, password);
  if (session.role !== "customer") {
    await api.logout();
    throw new Error("Customer access required");
  }
  return session;
}

export async function userLogout() {
  await api.logout();
}

export async function restoreUserSession() {
  if (!hasTokens()) return null;
  try {
    const session = await api.me();
    return session.role === "customer" ? session : null;
  } catch {
    clearStoredSession();
    return null;
  }
}
