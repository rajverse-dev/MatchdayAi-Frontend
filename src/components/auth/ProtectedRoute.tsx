import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

function normalizeRole(role: string | null | undefined) {
  if (!role) return null;

  const cleaned = role.trim().toUpperCase();

  if (cleaned.startsWith("ROLE_")) {
    return cleaned;
  }

  return `ROLE_${cleaned}`;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const normalizedRole = normalizeRole(role);
  const allowed = allowedRoles.map(normalizeRole);

  if (!normalizedRole || !allowed.includes(normalizedRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}