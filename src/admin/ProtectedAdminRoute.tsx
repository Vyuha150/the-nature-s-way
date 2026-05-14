// Auth bypassed for prototype access — restore real check when wiring backend.
export default function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
