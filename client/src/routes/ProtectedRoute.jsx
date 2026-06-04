import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  role,
}) {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const token =
    localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (
    role &&
    user.role !== role
  ) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;