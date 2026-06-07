import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  loggedIn,
  children,
  anonymous = false,
}) {
  const location = useLocation();
  const from = location.state?.from || "/";

  if (anonymous && loggedIn) {
    return <Navigate to={from} replace />;
  }

  if (!anonymous && !loggedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
