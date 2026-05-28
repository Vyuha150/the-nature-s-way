import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserSession, restoreUserSession } from "./auth";

export default function ProtectedUserRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [session, setSession] = useState(() => getUserSession());

  useEffect(() => {
    let active = true;
    const run = async () => {
      setChecking(true);
      const restored = await restoreUserSession();
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
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
