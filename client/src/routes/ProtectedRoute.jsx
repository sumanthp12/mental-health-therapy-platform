import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  role,
  roles,
}) {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  // Not authenticated
  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Single role restriction
  if (role && user.role !== role) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  // Multiple role restriction
  if (
    roles &&
    !roles.includes(user.role)
  ) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;