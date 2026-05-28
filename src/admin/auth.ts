import { api, clearStoredSession, getStoredSession, hasTokens } from "./api/client";
import type { AdminSession } from "./api/types";

export { AdminSession };

export function getAdminSession(): AdminSession | null {
  return getStoredSession();
}

export async function adminLogin(email: string, password: string) {
  const session = await api.login(email, password);
  if (session.role !== "admin") {
    await api.logout();
    throw new Error("Admin access required");
  }
  return session;
}

export async function adminLogout() {
  await api.logout();
}

export async function restoreSession() {
  if (!hasTokens()) return null;
  try {
    const session = await api.me();
    return session.role === "admin" ? session : null;
  } catch {
    clearStoredSession();
    return null;
  }
}
