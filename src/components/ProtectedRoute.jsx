import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthProvider";

const ProtectedRoute = ({ children, checkPhone = false }) => {
  const { user, loading, profile } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate to="/sign-in" replace state={{ from: location.pathname }} />
    );
  }

  if (checkPhone && (!profile || !profile.phone)) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
