import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token, isLoading } = useSelector((state) => state.auth || {});
  const location = useLocation();

  // Wait for auth to resolve
  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Checking authentication...
      </div>
    );
  }

  // Not logged in → redirect
  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Authorized
  return children;
}
