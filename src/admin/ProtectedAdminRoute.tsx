import { Navigate, useLocation } from "react-router-dom";
import { getAdminSession } from "./auth";

export default function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const session = getAdminSession();
  const location = useLocation();
  if (!session || session.role !== "admin") {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
