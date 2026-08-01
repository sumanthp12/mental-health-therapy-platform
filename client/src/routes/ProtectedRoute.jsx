import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  role,
  roles,
}) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token =
    localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Backward compatibility (existing routes)
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  // New: allow multiple roles
  if (
    roles &&
    !roles.includes(user.role)
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;