// Mock admin auth (UI prototype only — NOT secure).
// Replace with Lovable Cloud + role-based RLS when wiring real backend.

const KEY = "admin_mock_session";

export type AdminSession = { email: string; role: "admin"; loggedInAt: number };

export function getAdminSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AdminSession) : null;
  } catch {
    return null;
  }
}

export function adminLogin(email: string, password: string): AdminSession | null {
  // Mock credential check — DEMO ONLY
  if (email === "admin@natures.way" && password === "admin123") {
    const session: AdminSession = { email, role: "admin", loggedInAt: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(session));
    return session;
  }
  return null;
}

export function adminLogout() {
  localStorage.removeItem(KEY);
}
