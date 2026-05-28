import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAdminSession, restoreSession } from "./auth";

export default function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [session, setSession] = useState(() => getAdminSession());

  useEffect(() => {
    let active = true;
    const run = async () => {
      setChecking(true);
      const restored = await restoreSession();
      if (active) {
        setSession(restored);
        setChecking(false);
      }
    };
    if (!session) {
      run();
    } else {
      setChecking(false);
    }
    return () => {
      active = false;
    };
  }, [session]);

  if (checking) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
